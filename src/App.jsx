import { useState, useEffect } from "react";
import Header   from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobList  from "./components/JobList";
 
// ── Helper: map a raw API post → a job object ──────────────────────────────
const COMPANIES = [
  "TechNova", "Infosys", "Wipro", "HCL Technologies", "Zomato",
  "Swiggy", "Razorpay", "CRED", "Freshworks", "Meesho",
];
 
function mapPostToJob(post) {
  return {
    id:          post.id,
    title:       post.title.charAt(0).toUpperCase() + post.title.slice(1, 40),
    company:     COMPANIES[post.id % COMPANIES.length],
    description: post.body.slice(0, 120) + "…",
  };
}
// ───────────────────────────────────────────────────────────────────────────
 
function App() {
  // ── State ──────────────────────────────────────────────────────────────
  const [jobs,       setJobs]       = useState([]);       // all fetched jobs
  const [searchText, setSearchText] = useState("");       // search input
  const [savedJobs,  setSavedJobs]  = useState([]);       // saved job objects
  const [viewMode,   setViewMode]   = useState("All");    // "All" | "Saved"
  const [loading,    setLoading]    = useState(true);     // API loading flag
 
  // ── Fetch jobs on first render using useEffect ─────────────────────────
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res  = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        // API returns 100 posts — we use the first 30 as job listings
        setJobs(data.slice(0, 30).map(mapPostToJob));
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }
 
    fetchJobs();
  }, []); // empty array → runs only once, on mount
 
  // ── Save a job (add to savedJobs if not already there) ─────────────────
  function handleSave(job) {
    setSavedJobs((prev) => {
      const alreadySaved = prev.some((j) => j.id === job.id);
      if (alreadySaved) return prev;          // no duplicate
      return [...prev, job];                  // array spread = no mutation
    });
  }
 
  // ── Remove a job from savedJobs (Bonus requirement) ────────────────────
  function handleRemove(jobId) {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
  }
 
  // ── Derive the list of saved job IDs (for easy lookup in child) ─────────
  const savedIds = savedJobs.map((j) => j.id);
 
  // ── Filter logic ───────────────────────────────────────────────────────
  const sourceList = viewMode === "Saved" ? savedJobs : jobs;
 
  const filteredJobs = sourceList.filter((job) =>
    job.title.toLowerCase().includes(searchText.toLowerCase()) ||
    job.company.toLowerCase().includes(searchText.toLowerCase())
  );
 
  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="app">
 
      {/* Sticky top nav with saved count */}
      <Header savedCount={savedJobs.length} />
 
      {/* Hero section with search bar */}
      <section className="hero">
        <h1>Find Your <em>Dream</em> Job</h1>
        <p>Browse {jobs.length} live openings across India's top companies</p>
        <SearchBar searchText={searchText} onChange={setSearchText} />
      </section>
 
      {/* Main content */}
      <main className="main">
 
        {/* View mode tabs: All Jobs / Saved Jobs */}
        <div className="tabs">
          <button
            className={`tab-btn ${viewMode === "All" ? "active" : ""}`}
            onClick={() => setViewMode("All")}
          >
            All Jobs ({jobs.length})
          </button>
          <button
            className={`tab-btn ${viewMode === "Saved" ? "active" : ""}`}
            onClick={() => setViewMode("Saved")}
          >
            ★ Saved ({savedJobs.length})
          </button>
        </div>
 
        {/* Result count info */}
        {!loading && (
          <div className="stats-row">
            Showing <strong>&nbsp;{filteredJobs.length}&nbsp;</strong>
            {searchText ? `result${filteredJobs.length !== 1 ? "s" : ""} for "${searchText}"` : "jobs"}
          </div>
        )}
 
        {/* Job cards grid */}
        <JobList
          jobs={filteredJobs}
          savedIds={savedIds}
          onSave={handleSave}
          onRemove={handleRemove}
          loading={loading}
          viewMode={viewMode}
        />
 
      </main>
 
      <footer className="footer">
        Built with <span>♥</span> using React · Data from JSONPlaceholder API
      </footer>
 
    </div>
  );
}
 
export default App;
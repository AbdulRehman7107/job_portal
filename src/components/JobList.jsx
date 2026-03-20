import JobCard from "./JobCard";
 
function JobList({ jobs, savedIds, onSave, onRemove, loading, viewMode }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Fetching jobs…</p>
      </div>
    );
  }
 
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <div className="emoji">{viewMode === "Saved" ? "🔖" : "🔎"}</div>
        <h3>
          {viewMode === "Saved"
            ? "No saved jobs yet"
            : "No jobs match your search"}
        </h3>
        <p>
          {viewMode === "Saved"
            ? "Browse All Jobs and hit \"+ Save Job\" on anything interesting."
            : "Try a different keyword."}
        </p>
      </div>
    );
  }
 
  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedIds.includes(job.id)}
          onSave={onSave}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
 
export default JobList;
const JOB_TYPES   = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];
const LOCATIONS   = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune", "Chennai", "Remote"];
const SALARIES    = ["₹4–6 LPA", "₹6–10 LPA", "₹10–15 LPA", "₹15–25 LPA", "₹25L+ LPA"];
 
// Deterministic "random" — same job always gets the same tags
function pick(arr, id) {
  return arr[id % arr.length];
}
 
function JobCard({ job, isSaved, onSave, onRemove }) {
  const initials = job.title.slice(0, 2).toUpperCase();
 
  return (
    <div className={`job-card ${isSaved ? "saved" : ""}`}>
 
      {/* Top row: avatar + title + saved star */}
      <div className="card-top">
        <div className="company-avatar">{initials}</div>
 
        <div className="card-meta">
          <div className="job-title">{job.title}</div>
          <div className="company-name">{job.company}</div>
        </div>
 
        {/* Star icon only shows when job is already saved */}
        {isSaved && <span className="saved-star">★</span>}
      </div>
 
      {/* Short description */}
      <p className="job-desc">{job.description}</p>
 
      {/* Tags: type · location · salary */}
      <div className="tags">
        <span className="tag tag-type">{pick(JOB_TYPES, job.id)}</span>
        <span className="tag tag-loc">📍 {pick(LOCATIONS, job.id + 1)}</span>
        <span className="tag tag-salary">{pick(SALARIES, job.id + 2)}</span>
      </div>
 
      {/* Footer: job ID + action button */}
      <div className="card-footer">
        <span className="job-id">#{job.id}</span>
 
        {isSaved ? (
          <button
            className="btn-save is-saved"
            onClick={() => onRemove(job.id)}
            title="Click to remove from saved"
          >
            ✓ Saved — Remove
          </button>
        ) : (
          <button
            className="btn-save"
            onClick={() => onSave(job)}
          >
            + Save Job
          </button>
        )}
      </div>
 
    </div>
  );
}
 
export default JobCard;
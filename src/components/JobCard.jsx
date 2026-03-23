const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];
const LOCATIONS = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune", "Chennai", "Remote"];
const SALARIES  = ["₹4–6 LPA", "₹6–10 LPA", "₹10–15 LPA", "₹15–25 LPA", "₹25L+ LPA"];
 
function pick(arr, id) {
  return arr[id % arr.length];
}
 
function JobCard({ job, isSaved, onSave, onRemove, onApply }) {
  const initials = job.title.slice(0, 2).toUpperCase();
 
  return (
    <div className={`job-card ${isSaved ? "saved" : ""}`}>
 
      <div className="card-top">
        <div className="company-avatar">{initials}</div>
        <div className="card-meta">
          <div className="job-title">{job.title}</div>
          <div className="company-name">{job.company}</div>
        </div>
        {isSaved && <span className="saved-star">★</span>}
      </div>
 
      <p className="job-desc">{job.description}</p>
 
      <div className="tags">
        <span className="tag tag-type">{pick(JOB_TYPES, job.id)}</span>
        <span className="tag tag-loc">📍 {pick(LOCATIONS, job.id + 1)}</span>
        <span className="tag tag-salary">{pick(SALARIES, job.id + 2)}</span>
      </div>
 
      <div className="card-footer">
        <span className="job-id">#{job.id}</span>
 
        <div className="card-actions">
          {isSaved ? (
            <button className="btn-save is-saved" onClick={() => onRemove(job.id)}>
              ✓ Saved — Remove
            </button>
          ) : (
            <button className="btn-save" onClick={() => onSave(job)}>
              + Save
            </button>
          )}
          <button className="btn-apply" onClick={() => onApply(job)}>
            Apply Now
          </button>
        </div>
      </div>
 
    </div>
  );
}
 
export default JobCard;
import { useState } from "react";
 
function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
 
  // Update the right field when user types
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 
  function handleSubmit() {
    // Basic validation — make sure required fields are filled
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in your Name, Email and Phone.");
      return;
    }
    setSubmitted(true);
  }
 
  return (
    // Clicking the dark backdrop closes the modal
    <div className="modal-backdrop" onClick={onClose}>
 
      {/* Stop clicks inside the card from closing it */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
 
        <button className="modal-close" onClick={onClose}>✕</button>
 
        {submitted ? (
          /* ── Success screen ── */
          <div className="modal-success">
            <div className="success-icon">🎉</div>
            <h2>Application Sent!</h2>
            <p>
              You applied for <strong>{job.title}</strong> at{" "}
              <strong>{job.company}</strong>.
            </p>
            <p className="success-sub">
              They'll reach you at <em>{form.email}</em>. Good luck!
            </p>
            <button className="btn-close-success" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          /* ── Application Form ── */
          <>
            <div className="modal-header">
              <div className="modal-avatar">
                {job.title.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="modal-title">{job.title}</h2>
                <p className="modal-company">{job.company}</p>
              </div>
            </div>
 
            <p className="modal-desc">{job.description}</p>
 
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Abdul Rehman"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
 
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
 
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
 
              <div className="form-group">
                <label>Years of Experience</label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                >
                  <option value="">Select…</option>
                  <option>Fresher (0 years)</option>
                  <option>1–2 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
 
              <div className="form-group full-width">
                <label>Cover Letter / Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us why you're a great fit…"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
            </div>
 
            <button className="btn-apply-submit" onClick={handleSubmit}>
              Submit Application →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
 
export default ApplyModal;
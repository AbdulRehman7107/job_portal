function Header({ savedCount }) {
  return (
    <header className="header">
      <div className="header-logo">
        Job<span>Board</span>
      </div>
 
      <div className="header-saved-badge">
        <span className="badge-dot"></span>
        {savedCount} Saved {savedCount === 1 ? "Job" : "Jobs"}
      </div>
    </header>
  );
}
 
export default Header;
function SearchBar({ searchText, onChange }) {
  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search by role, e.g. Developer, Designer…"
        value={searchText}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
 
export default SearchBar;
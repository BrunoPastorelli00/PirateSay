function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      className="searchBar"
      placeholder="Search for a song, artist..."
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
export default SearchBar;

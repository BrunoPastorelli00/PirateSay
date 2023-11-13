import {AiOutlineSearch} from "react-icons/ai";

function SearchBar () {
    return (
        <div className="search-bar-container">
        <input className="search-input" type="text" placeholder="Search..." />
        <button className="search-button" placeholder="AiOutlineSearch" type="submit"><AiOutlineSearch /></button>
      </div>
    )
}

export default SearchBar;
const Search = () => {
    return (
        <div className='searchBar'>
            <h1>Search Artifacts</h1>
            <form action="#">
                <div className="form-input">
                    <input type="search" placeholder="Search with listed tags for the documentation" />
                    <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                </div>
            </form>
        </div>
    );
};

export default Search;
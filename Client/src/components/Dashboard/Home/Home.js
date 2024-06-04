import SearchedTags from './SearchedTags';
import Contributers from './Contributers';

const Main = () => {
    return (
        <main>
            <ul className="box-info">
                <li>
                    <i class='bx bx-store-alt'></i>
                    <span className="text">
                        <h4>Total Artifacts(Docs)</h4>
                        <p>10</p>
                    </span>
                </li>
                <li>
                    <i class='bx bx-link' ></i>
                    <span className="text">
                        <h4>Total URLs Shared</h4>
                        <p>6</p>
                    </span>
                </li>
                <li>
                    <i className='bx bx-search'></i>
                    <span className="text">
                        <h4>Searches in 2024</h4>
                        <p>65</p>
                    </span>
                </li>
                <li>
                    <i class='bx bx-search-alt'></i>
                    <span className="text">
                        <h4>Searches in May'24</h4>
                        <p>23</p>
                    </span>
                </li>
            </ul>
            <div className="table-data">
                <SearchedTags />
                <Contributers />
            </div>
        </main>
    );
};

export default Main;

import { useState, useEffect } from 'react';
import { fetchArtifactsCounts, fetchTopContributors } from './ApiHandler/artifactsFunctions';
import { fetchSearchesCounts, fetchTopSearchedTags } from './ApiHandler/tagsFunctions';
import { fetchAllocatedUsedSpace } from './ApiHandler/settingsFunctions';

const Home = () => {
    const [totalDocsCount, setTotalDocsCount] = useState(0);
    const [totalUrlsCount, setTotalUrlsCount] = useState(0);
    const [totalSearches, setTotalSearches] = useState(0);
    const [currentMonthSearches, setCurrentMonthSearches] = useState(0);
    const [usedSpace, setUsedSpace] = useState(0);
    const [totalAllocatedSpace, setTotalAllocatedSpace] = useState(0);
    const [searchedTags, setSearchedTags] = useState([]);
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        fetchArtifactsCounts(setTotalDocsCount, setTotalUrlsCount);
        fetchSearchesCounts(setTotalSearches, setCurrentMonthSearches);
        fetchAllocatedUsedSpace(setTotalAllocatedSpace, setUsedSpace, null, null, null);
        fetchTopSearchedTags(setSearchedTags);
        fetchTopContributors(setContributors);
    }, []);

    const usedSpacePercentage = totalAllocatedSpace > 0 ? (usedSpace / totalAllocatedSpace) * 100 : 0;

    return (
        <main>
            <ul className="box-info">
                <li>
                    <i className='bx bx-store-alt'></i>
                    <span className="text">
                        <h4>Total Artifacts(Docs)</h4>
                        <p>{totalDocsCount}</p>
                    </span>
                </li>
                <li>
                    <i className='bx bx-link' ></i>
                    <span className="text">
                        <h4>Total URLs Shared</h4>
                        <p>{totalUrlsCount}</p>
                    </span>
                </li>
                <li>
                    <i className='bx bx-search'></i>
                    <span className="text">
                        <h4>Searches in {new Date().getFullYear()}</h4>
                        <p>{totalSearches}</p>
                    </span>
                </li>
                <li>
                    <i className='bx bx-search-alt'></i>
                    <span className="text">
                        <h4>Searches in {new Date().toLocaleString('default', { month: 'long' })} '{new Date().getFullYear()}</h4>
                        <p>{currentMonthSearches}</p>
                    </span>
                </li>
            </ul>
            <div className='table-data'>
                <div className='order'>
                    <div className='space-text'>
                        <p>Allocated Space: {(totalAllocatedSpace).toFixed(2)}GB</p>
                        {/* <p>Available Space : {(totalAllocatedSpace - usedSpace).toFixed(2)} GB</p> */}
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${usedSpacePercentage}%` }}>
                            {usedSpacePercentage.toFixed(2)}% used
                        </div>
                    </div>
                </div>
                <div className='order'>
                </div>
            </div>
            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3>Top 10 Searched Tags</h3>
                    </div>
                    <table>
                        <tbody>
                            {searchedTags.map(tag => (
                                <tr key={tag.tag_nm}>
                                    <td>
                                        <p>{tag.tag_nm}</p>
                                    </td>
                                    <td>
                                        <p className="count">{tag.search_count}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="order">
                    <div className="head">
                        <h3>Top 10 Contributers</h3>
                    </div>
                    <table>
                        <tbody>
                            {contributors.map(contributor => (
                                <tr key={contributor.owner_author_id}>
                                    <td>
                                        <p>{contributor.owner_author_id}</p>
                                    </td>
                                    <td className='count'>{contributor.doc_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default Home;
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchUploadTags, saveSearchedTag } from '../ApiHandler/tagsFunctions';
import { fetchAllArtifacts } from '../ApiHandler/artifactsFunctions';

const Search = () => {
    const [availableTags, setAvailableTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [allArtifacts, setAllArtifacts] = useState([]);
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);

    useEffect(() => {
        fetchUploadTags(setAvailableTags);
        fetchAllArtifacts(setAllArtifacts);
    }, []);

    useEffect(() => {
        filterArtifacts();
    }, [tags, allArtifacts]);

    const handleTagChange = async (newValue) => {
        const previousTags = tags;
        setTags(newValue);
        // Determine the newly added tag
        const previousTagsSet = new Set(previousTags.map(tag => tag.value));
        const addedTags = newValue.filter(tag => !previousTagsSet.has(tag.value));
        if (addedTags.length > 0) {
            // Save the newly added tag to the database
            const latestTag = addedTags[0]; // Assuming we want the most recently added tag
            await saveSearchedTag(latestTag.value, latestTag.label);
        }
    };

    // Function to filter artifacts on the basis of tags
    const filterArtifacts = () => {
        if (tags.length === 0) {
            setFilteredArtifacts([]);
            return;
        }
        const selectedTagValues = tags.map(tag => tag.value);
        const filtered = allArtifacts.filter(artifact => {
            if (artifact.doc_status !== 'active') {
                return false;
            }
            const artifactTags = artifact.assoc_tags.split(',').map(tag => parseInt(tag.trim(), 10));
            return selectedTagValues.some(tag => artifactTags.includes(tag));
        });
        setFilteredArtifacts(filtered);
    };

    // Function to get tag names using tag ids
    const getTagNames = (tagIds) => {
        return tagIds.split(',').map(tagId => {
            const tag = availableTags.find(tag => tag.value === parseInt(tagId));
            return tag ? tag.label : null;
        }).filter(tag => tag !== null).join(', ');
    };

    return (
        <div className='artifacts-container searchBar'>
            <header className="artifacts-header">
                <h1>Search Artifacts</h1>
            </header>
            <div className="artifacts-table-container search-form">
                <div className="form-input">
                    <Select
                        isMulti
                        value={tags}
                        onChange={handleTagChange}
                        options={availableTags}
                        placeholder="Search with listed tags for the documentation"
                        className="document-tags-select"
                        required
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 })
                        }}
                    />
                    <button className="search-btn"><i className='bx bx-search'></i></button>
                </div>
            </div>
            <div className="search-results">
                {tags.length > 0 && filteredArtifacts.length === 0 ? (
                    <p className="no-docs">No documents found</p>
                ) : (
                    filteredArtifacts.map(doc => (
                        <div key={doc.id} className="document-item">
                            <a href={doc.doc_path} target='_blank' rel='noreferrer'><h3>{doc.doc_format === 'url' ? <i className='bx bx-link'></i> : <i className='bx bx-download'></i>} {doc.doc_nm} </h3></a>
                            <p className="description">{doc.doc_description}</p>
                            <div className="document-type">
                                <p><span className="highlight">By </span>: {doc.owner_author_id}</p>
                                <p><span className="highlight">Last Updated </span>: {new Date(doc.date_uploaded).toLocaleString()}</p>
                                <p className="type">{doc.doctype_nm}</p>
                            </div>
                            <p className="tags">
                                <span className='tag-content'>{getTagNames(doc.assoc_tags)}</span>
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;
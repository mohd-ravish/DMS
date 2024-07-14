import { useState } from 'react';

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(data.length / entriesPerPage)) {
            setCurrentPage(newPage);
        }
    };

    const handleEntriesChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1);  // Reset to first page when entries per page changes
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

    return {
        currentPage,
        entriesPerPage,
        currentEntries,
        handlePageChange,
        handleEntriesChange,
        totalEntries: data.length,
        startEntry: indexOfFirstEntry + 1,
        endEntry: Math.min(indexOfLastEntry, data.length),
        totalPages: Math.ceil(data.length / entriesPerPage),
    };
};

export default usePagination;
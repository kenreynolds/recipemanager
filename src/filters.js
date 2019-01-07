let searchFilter = '';

const getSearchFilter = () => searchFilter;

const setSearchFilter = (searchText) => {
    if (typeof searchText === 'string') {
        searchFilter = searchText;
    }
};

export { getSearchFilter, setSearchFilter }
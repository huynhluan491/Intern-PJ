const initialState = {
    searchQuery: '',
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.searchQuery,
            };
        default:
            return {
                ...state,
            };
    }
};

export default SearchReducer;

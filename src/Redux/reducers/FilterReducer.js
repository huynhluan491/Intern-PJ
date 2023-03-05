const initialState = {
    typeCategories: {
        product: true,
        post: true,
    },
};

const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER_TYPE_CATEGORIES':
            const { product, post } = action.newTypeCategories;

            const newTypeValue = {
                product,
                post,
            };

            return {
                ...state,
                typeCategories: newTypeValue,
            };
        default:
            return { ...state };
    }
};

export default FilterReducer;

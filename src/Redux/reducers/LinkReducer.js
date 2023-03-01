import { LinkArray as initialLinkArray } from '~/DashBoard/Stuff';

const initialState = {
    LinkData: initialLinkArray,
};

const LinkReducer = (state = initialState, action) => {
    console.log('LinkReducer state:', state);
    switch (action.type) {
        case 'LINKS':
            return {
                ...state,
            };
        case 'ADD_LINK':
            console.log('payload: ', action.payload);
            const { description, old_link, new_link, type } = action.payload;

            const newLinkObj = {
                id: state.LinkData[state.LinkData.length - 1].id + 1,
                type,
                description,
                old_link,
                new_link,
            };

            return {
                ...state,
                LinkData: [...state.LinkData, newLinkObj],
            };
        default:
            return state;
    }
};

export default LinkReducer;

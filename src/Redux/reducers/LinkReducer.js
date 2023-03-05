import { LinkArray as initialLinkArray } from '~/DashBoard/Stuff';

const initialState = {
    LinkData: initialLinkArray,
    mappingList: [],
};

const LinkReducer = (state = initialState, action) => {
    console.log(action.payload);
    console.log(state);
    switch (action.type) {
        case 'LINKS':
            return {
                ...state,
            };
        case 'ADD_LINK':
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

        case 'EDIT_LINK':
            const { idLink, updateDescription, updateOldLink, updateNewLink, updateType } = action.payload;
            const index = state.LinkData.findIndex((item) => item.id === idLink);
            const availableLink = state.LinkData[index];
            const updatedLink = {
                id: idLink,
                description: updateDescription,
                old_link: updateOldLink,
                new_link: updateNewLink,
                type: updateType,
            };

            const updatedLinkData = [...state.LinkData];
            updatedLinkData[index] = updatedLink;

            return {
                ...state,
                LinkData: updatedLinkData,
            };

        case 'DELETE_LINK':
            const id = action.payload.idLink;
            const newUpdatedList = state.LinkData.filter((item) => item.id !== id);
            return {
                ...state,
                LinkData: newUpdatedList,
            };

        case 'UPDATE_MAPPING':
            const inputValue = action.payload.inputValue;
            const Idx = state.mappingList.findIndex((item) => item === inputValue);
            let newMappingList = [];

            if (Idx === -1) {
                newMappingList = [...state.mappingList, inputValue];
            } else {
                newMappingList = state.mappingList.filter((item) => item !== inputValue);
            }

            return {
                ...state,
                mappingList: newMappingList,
            };

        case 'CANCEL_MAPPING_LIST':
            return {
                ...state,
                mappingList: [],
            };

        case 'DELETE_MAPPING_LINK':
            const newLinkList = state.LinkData.filter((item) => !state.mappingList.includes(item.id));
            const deletedMapping = [];
            return {
                ...state,
                LinkData: newLinkList,
                mappingList: deletedMapping,
            };
        default:
            return {
                ...state,
            };
    }
};

export default LinkReducer;

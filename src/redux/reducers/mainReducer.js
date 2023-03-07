import { 
    SET_ALL_PROFILES,
    SET_PROFILE,
} from '../actions';

const initialState = {
    allProfiles: [],
    profile: null,
    searchedProfile: null
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PROFILES: 
            const sortedProfiles = action.data.sort((a, b) => a.name.localeCompare(b.name));

            return { 
                ...state, 
                allProfiles: sortedProfiles
            };
        
        case SET_PROFILE: 
            return { 
                ...state, 
                profile: action.data, 
            };

        default:
            return state;
    }
}
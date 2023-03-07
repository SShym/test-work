import { 
    AUTH,
    LOGOUT,
} from '../actions';

const initialState = {
    authData: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { 
                ...state, 
                authData: action.data, 
            };
        
        case LOGOUT: 
            localStorage.removeItem('profile');
            return { 
                ...state, 
                authData: undefined, 
            };
            
        default:
            return state;
    }
}
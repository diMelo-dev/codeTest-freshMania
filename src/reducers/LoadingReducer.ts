import { LoadingType } from "../types/LoadingType";
import { reducerActionType } from "../types/reducerActionType";

export const loadingInitialState: LoadingType = {
    isLoading: false
}

export const loadingReducer = (state: LoadingType, action: reducerActionType) => {

    switch(action.type) {
        case 'SET_LOADING':
            return {...state, isLoading: action.payload.isLoading};
        break;
    }

    return state;

}
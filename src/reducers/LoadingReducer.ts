import { LoadingType } from "../types/LoadingType";
import { reducerActionType } from "../types/reducerActionType";

export const loadingInitialState: LoadingType = {
    isLoading: false
}

//Função reducer passada para o objeto mainReducer
//Quando invocada, recebe o estado (no caso um objeto Loading) e uma ação
export const loadingReducer = (state: LoadingType, action: reducerActionType) => {

    switch(action.type) {
        case 'SET_LOADING':
            //retorno uma cópia do estado, com o isLoading fornecido no payload
            return {...state, isLoading: action.payload.isLoading};
        break;
    }

    return state;

}
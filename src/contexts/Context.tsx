import { createContext, PropsWithChildren, useReducer } from "react";
import { loadingInitialState, loadingReducer } from "../reducers/LoadingReducer";
import { ProductListInitialState, productListReducer } from "../reducers/ProductListReducer";
import { LoadingType } from "../types/LoadingType";
import { ProductType } from "../types/ProductType";
import { reducerActionType } from "../types/reducerActionType";

//Definio o tipo do initialState para passar para o mainReducer 
type initialStateType = {
    productList: ProductType[],
    loading: LoadingType
}

//O meu contexto é um objeto com state e dispatch
type ContextType = {
    state: initialStateType;
    dispatch: React.Dispatch<any>;
}

//Initial State passado para o createContext
const initialState = {
    productList: ProductListInitialState,
    loading: loadingInitialState
}


//Crio o object context (representa de qual contexto os componentes lerão as infos)
//O parâmetro é o valor que o context terá caso n tenha provider acima do component que chamar o context
//No nosso caso o valor padrão é um valor inicial e uma função que retorna null
export const Context = createContext<ContextType>({
    state: initialState,
    dispatch: () => null
});

//função q engloba todos os meus reducers
//Para cada reducer, passo o estado apropriado
//O reducer retornará um novo estado com base nele e na action
const mainReducer = (state: initialStateType, action: reducerActionType) => ({
    productList: productListReducer(state.productList, action),
    loading: loadingReducer(state.loading, action) 
});

//Crio o Provider que é de onde os componentes vão ler e alterar os dados
export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    
    //recebo o estado atual e uma função dispatch
    //o hook useReducer recebe uma função reducer e o estado inicial
    //a função reducer passada é o mainReducer, que engloba todos os reducers
    const [state, dispatch] = useReducer(mainReducer, initialState);
    
    //os componentes filhos poderão acessar o estado atual e a função dispatch
    return(
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}
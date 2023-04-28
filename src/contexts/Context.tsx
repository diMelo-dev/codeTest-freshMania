import { createContext, PropsWithChildren, useReducer } from "react";
import { ProductListInitialState, productListReducer } from "../reducers/ProductListReducer";
import { ProductType } from "../types/ProductType";
import { reducerActionType } from "../types/reducerActionType";

type initiaStateType = {
    productList: ProductType[]
}

type ContexType = {
    state: initiaStateType;
    dispatch: React.Dispatch<any>;
}

const initialState = {
    productList: ProductListInitialState
}


//Crio o object context (representa de qual contexto os componentes lerão as infos)
//O parâmetro é o valor que o context terá caso n tenha provider acima do component que chamar o context
//No nosso caso o valor padrão é um valor inicial e uma função que retorna null
export const Context = createContext<ContexType>({
    state: initialState,
    dispatch: () => null
});

//função q engloba todos os meus reducers
//Para cada reducer, passo o estado apropriado
//O reducer retornará um novo estado com base nele e na action
const mainReducer = (state: initiaStateType, action: reducerActionType) => ({
    productList: productListReducer(state.productList, action)
});

//Crio o Provider que é de onde os componentes vão ler e alterar os dados
export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    
    //recebo o estado atual e uma função dispatch
    const [state, dispatch] = useReducer(mainReducer, initialState);
    
    //os componentes filhos poderão acessar o estado atual e a função dispatch
    return(
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}
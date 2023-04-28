import { ProductType } from "../types/ProductType";
import { reducerActionType } from "../types/reducerActionType";


export const ProductListInitialState: ProductType[] = [
    { id: '0', name: 'Produto 0', price: 7.99, img: 'teste' },
    { id: '1', name: 'Produto 1', price: 7.99, img: 'teste' }
]

export const productListReducer = (state: ProductType[], action: reducerActionType) => {
    
    switch(action.type) {
        case 'CHANGE_PRODUCT_NAME':
            {
            //armanezo as informações do payload
            const { id, name } = action.payload;
            
            //encontro o index do produto na lista
            let productIndex = 0;
            for(let i in state) {
                if(state[i].id === id) {
                    productIndex = parseInt(i);
                }
            }

            const newProduct = { ...state[productIndex], name: name };
            
            //retorno uma cópia do estado com o produto alterado
            return [...state.slice(0, productIndex), newProduct, ...state.slice(productIndex + 1)];
            }
        break;
        case 'CHANGE_PRODUCT_PRICE':
            {
                const { id, price } = action.payload;
                
                
                let productIndex = 0;
                for(let i in state) {
                    if(state[i].id === id) {
                        productIndex = parseInt(i);
                    }
                }
    
                const newProduct = { ...state[productIndex], price: price };
                
                return [...state.slice(0, productIndex), newProduct, ...state.slice(productIndex + 1)];
                }
        break;
    }

    return state;
}
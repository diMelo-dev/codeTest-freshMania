import { productList } from "../helpers/productList";
import { ProductType } from "../types/ProductType";
import { reducerActionType } from "../types/reducerActionType";


export const ProductListInitialState: ProductType[] = productList;

export const productListReducer = (state: ProductType[], action: reducerActionType) => {
    
    switch(action.type) {
        case 'CHANGE_PRODUCT_LIST':
            {
            //armanezo as informações do payload
            const { id, name, price, img } = action.payload;
        
            const newProduct:ProductType = { id: id, name: name, price: price, img: img }
            
            //retorno uma cópia do estado com o produto alterado
            return [...state, newProduct];
            }
        break;
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
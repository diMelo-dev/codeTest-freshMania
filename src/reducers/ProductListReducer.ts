import { productList } from "../helpers/productList";
import { ProductType } from "../types/ProductType";
import { reducerActionType } from "../types/reducerActionType";


export const ProductListInitialState: ProductType[] = productList;


//Minha função reducer, passada para o objeto mainReducer
//quando invocada, recebe o estado (no caso a lista de produtos) e uma ação
export const productListReducer = (state: ProductType[], action: reducerActionType) => {
    
    switch(action.type) {
        case 'CREATE_PRODUCT':
            {
            //armanezo as informações do payload
            const { id, name, price, img } = action.payload;
        
            //crio um novo produto
            const newProduct:ProductType = { id: id, name: name, price: price, img: img }
            
            //retorno uma cópia do estado com a adição de um produto
            return [...state, newProduct];
            }
        break;
        case 'DELETE_PRODUCT':
            {
            //armanezo as informações do payload
            const { id } = action.payload;

            //encontro o index do produto na lista
            let productIndex = 0;
            for(let i in state) {
                if(state[i].id === id) {
                    productIndex = parseInt(i);
                }
            }
            
            //retorno uma cópia do estado sem o produto com id passado no payload
            return [...state.slice(0, productIndex), ...state.slice(productIndex + 1)];
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

            //Altero o nome do produto
            const newProduct = { ...state[productIndex], name: name };
            
            //retorno uma cópia do estado com o produto alterado
            return [...state.slice(0, productIndex), newProduct, ...state.slice(productIndex + 1)];
            }
        break;
        case 'CHANGE_PRODUCT_PRICE':
            {
                //armanezo as informações do payload
                const { id, price } = action.payload;
                
                //encontro o index do produto na lista
                let productIndex = 0;
                for(let i in state) {
                    if(state[i].id === id) {
                        productIndex = parseInt(i);
                    }
                }
    
                //Altero o preço do produto
                const newProduct = { ...state[productIndex], price: price };
                
                //retorno uma cópia do estado com o produto alterado
                return [...state.slice(0, productIndex), newProduct, ...state.slice(productIndex + 1)];
                }
        break;
        case 'CHANGE_PRODUCT_IMG':
            {
                //armanezo as informações do payload
                const { id, img } = action.payload;
                
                //encontro o index do produto na lista
                let productIndex = 0;
                for(let i in state) {
                    if(state[i].id === id) {
                        productIndex = parseInt(i);
                    }
                }
    
                //Altero a img do produto
                const newProduct = { ...state[productIndex], img: img };
                

                //retorno uma cópia do estado com o produto alterado
                return [...state.slice(0, productIndex), newProduct, ...state.slice(productIndex + 1)];
                }
        break;
    }

    return state;
}
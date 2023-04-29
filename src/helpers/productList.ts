import { ProductType } from "../types/ProductType";
import milk from '../assets/images/Product Images/leite.png'
import cheese from '../assets/images/Product Images/queijo.png'

export const productList: ProductType[] = [
    { id: '0', name: 'Leite', price: 7.99, img: milk },
    { id: '1', name: 'Queijo', price: 7.99, img: cheese }
];
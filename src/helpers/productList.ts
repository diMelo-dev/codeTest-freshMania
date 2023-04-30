import { ProductType } from "../types/ProductType";
import milk from '../assets/images/Product Images/leite.png'
import cheese from '../assets/images/Product Images/queijo.png'

import { v4 as uuidv4 } from 'uuid';



export const productList: ProductType[] = [
    { id: uuidv4(), name: 'Leite', price: 7.99, img: milk },
    { id: uuidv4(), name: 'Queijo', price: 7.99, img: cheese }
];
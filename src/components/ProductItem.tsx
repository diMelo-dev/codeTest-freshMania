import { useState } from "react";
import { ProductType } from "../types/ProductType";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";

type Props = {
    data: ProductType
}

export function ProductItem({data}: Props) {

    const [activeEdit, setActiveEdit] = useState(false);
    const [activeDelete, setActiveDelete] = useState(false);


    
    function handleModalEditClick() {
        //Essa função tem como objetivo determinar se o modal de edição
        //deste produto ficará visível ou não
        //Essa função é chamada pelo clique no ícone do lápis ou pelo clique no
        //botão cancelar do modal
        if(!activeEdit) {
            setActiveEdit(true);
        } else {
            setActiveEdit(false);
        }
    }

    function handleModalDeleteClick() {
        if(!activeDelete) {
            setActiveDelete(true);
        } else {
            setActiveDelete(false);
        }
    }

    return(
        <div className="">

            <div className="relative w-[160px] min-h-[250px] border-[2px] rounded-2xl border-[#808080]">
                <div className="relative min-h-[250px] p-2 flex flex-col justify-center gap-3 rounded-2xl text-[#808080] bg-[#dddddd] z-10">

                    <div className="p-3 flex items-center justify-center">
                        <img src={data.img} className="h-[120px]" />
                    </div>

                    <div className="h-full flex-1 flex flex-col justify-end gap-1">

                        <h2 className="text-[#202020] font-bold break-all">
                            {data.name}
                        </h2>

                        <span className="self-end text-[#202020]">
                            R$ {data.price.toFixed(2)}
                        </span>

                    </div>

                </div>

                <div className="absolute top-0 right-[-36px] w-[72px] p-2 flex flex-col items-end gap-2 justify-end border-[2px] rounded-2xl border-[#808080]">

                    <div onClick={handleModalEditClick} className="cursor-pointer">
                        <svg width="20" height="20" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M20.71 5.63c.39.39.39 1.02 0 1.41l-1.83 1.83-3.75-3.75 1.83-1.83a.996.996 0 0 1 1.41 0l2.34 2.34ZM3 21v-3.75L14.06 6.19l3.75 3.75L6.75 21H3Z" clipRule="evenodd"></path>
                        </svg>
                    </div>

                    <div onClick={handleModalDeleteClick} className="cursor-pointer">
                        <svg width="20" height="20" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
                        </svg>
                    </div>

                </div>
            </div>

            {/* Para o modal de edição é necessário enviar:
                -as informações do produto
                -se ele está visível
                -função para fechar o modal
            */}
            <EditModal item={data} active={activeEdit} cancelClick={handleModalEditClick} />
            
            {/* Para o modal de deletar é necessário enviar:
                -o id do produto
                -se ele está visível
                -função para fechar o modal
            */}
            <DeleteModal id={data.id} active={activeDelete} cancelClick={handleModalDeleteClick} />
        
        </div>
    );
}
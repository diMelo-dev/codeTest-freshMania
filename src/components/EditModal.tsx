import { useEffect, useState } from "react";
import { ProductType } from "../types/ProductType";


type Props = {
    item: ProductType
    active: boolean,
    cancelClick: () => void
}

export function EditModal({item, active, cancelClick}: Props) {

    const [nameField, setNameField] = useState(item.name);
    const [priceField, setPriceField] = useState(item.price.toString());

    const [activeSave, setActiveSave] = useState(true);

    const [errorName, setErrorName] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    function handleSave() {
        if(activeSave) {
            //Faço a alteração no produto
        }
    }

    useEffect(() => {
        const formatedPrice = Number(priceField.replace(',', '.'));
        if(nameField.trim() === '' || priceField.trim() === '' || isNaN(formatedPrice)) {
            setActiveSave(false);
        } else {
            setActiveSave(true);
        }
    }, [nameField, priceField]);

    return(
        <div className={`fixed top-0 left-0 w-full ${active ? 'h-screen p-3' : 'h-0'}  flex items-center justify-center bg-[#777]/80 overflow-hidden transition-all z-20`}>
            <div className="max-w-[460px] w-full p-6 flex flex-col gap-6 border-[1px] border-[#999] rounded-2xl bg-white">

                <h1 className="text-[22px] leading-[26px] font-bold">
                    Editar Item
                </h1>

                <div className="flex flex-col gap-6 min-[500px]:flex-row">

                    <div className="p-3 flex items-center justify-center">
                        <img src={item.img} className="h-[120px]" />
                    </div>

                    <div className="flex flex-col gap-6">

                        <div className="flex flex-col gap-2">
                            <span className="text-[16px] text-[#808080]">
                                Nome do produto
                            </span>

                            <input 
                                type='text' 
                                placeholder="Nome do produto"
                                value={nameField}
                                onChange={(e) => setNameField(e.target.value)}
                                className={`py-2 px-4 border-[2px] rounded-full bg-transparent outline-none ${errorName ? 'border-red-500 placeholder:text-red-500' : 'border-[#808080]'}`} 
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[16px] text-[#808080]">
                                Preço
                            </span>

                            <input 
                                type='text' 
                                placeholder="Preço"
                                size={6}
                                value={priceField}
                                onChange={(e) => setPriceField(e.target.value)}
                                className={`py-2 px-4 border-[2px] rounded-full bg-transparent outline-none ${errorPrice ? 'border-red-500 text-red-500 placeholder:text-red-500' : 'border-[#808080]'}`} 
                            />
                        </div>
                    </div>

                </div>

                <div className="flex gap-5 text-white font-bold">

                    <div onClick={cancelClick} className="p-2 flex-1 rounded-lg text-center bg-red-500 cursor-pointer transition-all hover:bg-red-500/90">
                        Cancelar
                    </div>

                    <div onClick={handleSave} className={`p-2 flex-1 rounded-lg text-center transition-all  ${activeSave ? 'bg-green-500 hover:bg-green-500/90 cursor-pointer' : 'bg-green-500/80'}`}>
                        Salvar
                    </div>

                </div>

            </div>
        </div>
    );
}
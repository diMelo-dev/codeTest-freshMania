import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../contexts/Context";
import { ProductType } from "../types/ProductType";


type Props = {
    item: ProductType
    active: boolean,
    cancelClick: () => void
}

export function EditModal({item, active, cancelClick}: Props) {

    const { state, dispatch } = useContext(Context);
    
    const imgInput = useRef<HTMLInputElement | null>(null);
    const [imgURL, setImgURL] = useState(item.img);

    const [imgFile, setImgFile] = useState<File>();
    const [nameField, setNameField] = useState(item.name);
    const [priceField, setPriceField] = useState(item.price.toString());

    const [activeSave, setActiveSave] = useState(true);

    const [errorName, setErrorName] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    function handleImgInputClick() {
        if(imgInput.current) {
            imgInput.current.click();
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files) {
            setImgFile(e.target.files[0]);
        }
    }

    function handleCancelClick() {
        setImgURL(item.img);
        setNameField(item.name);
        setPriceField(item.price.toString());
        cancelClick();
    }
    
    function handleSave() {
        if(activeSave) {
            //Faço a alteração no produto
            dispatch({
                type: 'SET_LOADING',
                payload: {
                    isLoading: true
                }
            });

            setTimeout(updateProduct, 1000);

            function updateProduct() {
            
                if(nameField !== item.name) {
                    dispatch({
                        type: 'CHANGE_PRODUCT_NAME',
                        payload: {
                            id: item.id,
                            name: nameField
                        }
                    });
                }
                
                const formatedPrice = parseFloat(priceField.replace(',', '.'));
                if(formatedPrice !== item.price) {
                    dispatch({
                        type: 'CHANGE_PRODUCT_PRICE',
                        payload: {
                            id: item.id,
                            price: formatedPrice
                        }
                    });
                }

                if(imgURL !== item.img) {
                    dispatch({
                        type: 'CHANGE_PRODUCT_IMG',
                        payload: {
                            id: item.id,
                            img: imgURL
                        }
                    });
                }

                dispatch({
                    type: 'SET_LOADING',
                    payload: {
                        isLoading: false
                    }
                });
            }
        }

        cancelClick();
    }

    useEffect(() => {
        const formatedPrice = Number(priceField.replace(',', '.'));
        if(nameField.trim() === '' || priceField.trim() === '' || isNaN(formatedPrice)) {
            setActiveSave(false);
        } else {
            setActiveSave(true);
        }
    }, [nameField, priceField]);

    useEffect(() => {
        if(imgFile instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(imgFile);
            reader.onloadend = () => {
                setImgURL(reader.result as string);
            }
        }
    }, [imgFile]);

    return(
        <div className={`fixed top-0 left-0 w-full ${active ? 'h-screen p-3' : 'h-0'}  flex items-center justify-center bg-[#777]/80 overflow-hidden transition-all z-20`}>
            <div className="max-w-[460px] w-full p-6 flex flex-col gap-6 border-[1px] border-[#999] rounded-2xl bg-white">

                <h1 className="text-[22px] leading-[26px] font-bold">
                    Editar Item
                </h1>

                <div className="flex flex-col gap-6 min-[500px]:flex-row">

                    <div className="p-3 flex-1 flex items-center justify-center">
                        <img onClick={handleImgInputClick} src={imgURL} className="h-[120px] cursor-pointer" />

                        <input 
                            ref={imgInput} 
                            accept='image/*' 
                            type='file'
                            onChange={(e) => handleFileChange(e)}
                            className="hidden" 
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-6">

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

                    <div onClick={handleCancelClick} className="p-2 flex-1 rounded-lg text-center bg-red-500 cursor-pointer transition-all hover:bg-red-500/90">
                        Cancelar
                    </div>

                    <div onClick={handleSave} className={`p-2 flex-1 rounded-lg text-center transition-all  ${activeSave ? 'bg-green-500 hover:bg-green-500/90 cursor-pointer' : 'bg-green-500/60'}`}>
                        Salvar
                    </div>

                </div>

            </div>
        </div>
    );
}
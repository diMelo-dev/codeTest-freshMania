import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../contexts/Context";


import { v4 as uuidv4 } from 'uuid';

export function InputArea() {

    const { state, dispatch } = useContext(Context);

    const imgInput = useRef<HTMLInputElement | null>(null);

    const [imgFile, setImgFile] = useState<File>();
    const [imgFileName, setImgFileName] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [nameField, setNameField] = useState('');
    const [priceField, setPriceField] = useState('');


    const [errorImg, setErrorImg] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    function handleImgInputClick() {
        if(imgInput.current) {
            imgInput.current.click();
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files) {
            setImgFile(event.target.files[0]);
            setImgFileName(event.target.files[0].name);
        }
    }

    function checkErrors() {
        setErrorImg(false);
        setErrorName(false);
        setErrorPrice(false);

        if(imgInput.current) {
            if(imgInput.current.files) {
                if(imgInput.current.files.length === 0) {
                    setErrorImg(true);
                }
            }
        }

        if(nameField.trim() === '') {
            setErrorName(true);
        }

        const formatPrice = priceField.replace(',', '.');
        if(priceField.trim() === '' || isNaN(Number(formatPrice))) {
            setErrorPrice(true)
        }
        
        if(nameField.trim() === '' || priceField.trim() === '' || isNaN(Number(formatPrice)) || imgFileName.trim() === '') {
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit() {
        let hasErrors = checkErrors();


        if(!hasErrors) {
            //Altero no context
            dispatch({
                type: 'SET_LOADING',
                payload: {
                    isLoading: true
                }
            });

            setTimeout(createProduct, 1000);

            function createProduct() {
                dispatch({
                    type: 'CREATE_PRODUCT',
                    payload: {
                        id: uuidv4(),
                        name: nameField,
                        price: formatPrice(priceField),
                        img: imgURL
                    }
                });
    
                handleErase();

                dispatch({
                    type: 'SET_LOADING',
                    payload: {
                        isLoading: false
                    }
                });
            }
            
        }
    }

    function handleErase() {
        imgInput.current = null;
        setImgFileName('');
        setNameField('');
        setPriceField('');
    }

    function formatPrice(price: string) {
        return parseFloat(price.replace(',', '.'));
    }

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
        <div className="flex items-center justify-center">
            <div className="relative border-[2px] rounded-2xl border-[#808080]">
                <div className="relative p-6 flex flex-col gap-3 rounded-2xl text-[#808080] bg-[#dddddd] z-10">
                    
                    <div className="flex flex-col gap-2">
                        
                        {imgFileName === '' &&
                            <div onClick={handleImgInputClick} className={`min-h-[100px] p-3 flex flex-col gap-3 items-center border-[2px] rounded-2xl cursor-pointer ${errorImg ? 'border-red-500' : 'border-[#808080]'}`}>
                                <div className="">
                                    <svg className={`${errorImg ? ' fill-red-500' : 'fill-[#808080]'}`} width="50" height="50" fill="#808080" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M15 10v6H9v-6H5l7-7 7 7h-4Zm4 10v-2H5v2h14Z" clipRule="evenodd"></path>
                                    </svg>
                                </div>

                                <span className={`${errorImg ? 'text-red-500' : 'text-[#808080]'}`}>
                                    Upload da imagem
                                </span>

                                <input 
                                    ref={imgInput} 
                                    accept='image/*' 
                                    type='file'
                                    onChange={(e) => handleFileChange(e)}
                                    className="hidden" 
                                />
                            </div>
                        }

                        {imgFileName !== '' &&
                            <span className="min-h-[100px] p-3 flex items-center justify-center border-[2px] rounded-2xl border-[#808080]">
                                {imgFileName}
                            </span>
                        }
                    </div>

                    <input 
                        type='text' 
                        placeholder="Nome do produto"
                        value={nameField}
                        onChange={(e) => setNameField(e.target.value)}
                        className={`py-2 px-4 border-[2px] rounded-full bg-transparent outline-none ${errorName ? 'border-red-500 placeholder:text-red-500' : 'border-[#808080]'}`} 
                    />
                    
                    <input 
                        type='text' 
                        placeholder="Preço"
                        size={6}
                        value={priceField}
                        onChange={(e) => setPriceField(e.target.value)}
                        className={`self-end py-2 px-4 border-[2px] rounded-full bg-transparent outline-none ${errorPrice ? 'border-red-500 text-red-500 placeholder:text-red-500' : 'border-[#808080]'}`} 
                    />

                </div>

                <div className="absolute top-0 right-[-41px] w-[82px] p-2 flex flex-col items-end gap-2 justify-end border-[2px] rounded-2xl border-[#808080]">

                    <div onClick={handleSubmit} className="cursor-pointer">
                        <svg width="25" height="25" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z"></path>
                        </svg>
                    </div>

                    <div onClick={handleErase} className="cursor-pointer">
                        <svg width="25" height="25" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 19.002h7v2h-9l-3.998.002-6.487-6.487a1 1 0 0 1 0-1.414L12.12 2.496a1 1 0 0 1 1.415 0l7.778 7.778a1 1 0 0 1 0 1.414L14 19.002Zm1.657-4.485 3.535-3.536-6.364-6.364-3.535 3.536 6.364 6.364Z"></path>
                        </svg>
                    </div>

                </div>
            </div>
        </div>
    );
}
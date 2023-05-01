import { useContext } from "react";
import { Context } from "../contexts/Context";


type Props = {
    id: string,
    active: boolean,
    cancelClick: () => void
}

export function DeleteModal({id, active, cancelClick}: Props) {

    const { state, dispatch } = useContext(Context);

    function handleDeleteClick() {

        dispatch({
            type: 'SET_LOADING',
            payload: {
                isLoading: true
            }
        });

        setTimeout(deleteProduct, 1000);
        
        function deleteProduct() {

            dispatch({
                type: 'DELETE_PRODUCT',
                payload: {
                    id: id
                }
            });

            dispatch({
                type: 'SET_LOADING',
                payload: {
                    isLoading: false
                }
            });
        }
    }

    return(
        <div className={`fixed top-0 left-0 w-full ${active ? 'h-screen p-3' : 'h-0'}  flex items-center justify-center bg-[#777]/80 overflow-hidden transition-all z-20`}>
            <div className={`max-w-[660px] w-full min-h-[146px] p-6 flex flex-col gap-10 border-[1px] border-[#999] rounded-2xl bg-white`}>

                <h1 className="text-[22px] leading-[26px] font-bold">Tem certeza que quer deletar esse produto?</h1>

                <div className="w-full flex gap-4 text-[16px] leading-[19px] font-bold">
                    
                    <div onClick={cancelClick} className="ml-auto max-w-[120px] w-full min-h-[32px] flex items-center justify-center border-[1px] border-[#999] rounded-lg cursor-pointer">
                        Cancelar
                    </div>

                    <div onClick={handleDeleteClick} className="max-w-[120px] w-full min-h-[32px] flex items-center justify-center rounded-lg bg-[#FF5151] text-white cursor-pointer transition-all hover:bg-[#FF5151]/90">
                        Deletar
                    </div>

                </div>

            </div>
        </div>
    );
}
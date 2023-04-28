

export function ProductItem() {

    return(
        <div className="relative border-[2px] rounded-2xl border-[#808080]">
            <div className="relative p-6 flex flex-col gap-3 rounded-2xl text-[#808080] bg-[#dddddd] z-10">

                <div className="min-h-[100px] p-3">
                    img
                </div>

                <h2 className="text-[#202020] font-bold">
                    Leite Integral
                </h2>

                <span className="text-[#202020]">
                    R$ 7.99
                </span>

            </div>

            <div className="absolute top-0 right-[-41px] w-[82px] p-2 flex flex-col items-end gap-2 justify-end border rounded-2xl border-[#808080]">

                <div className="cursor-pointer">
                    <svg width="25" height="25" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M20.71 5.63c.39.39.39 1.02 0 1.41l-1.83 1.83-3.75-3.75 1.83-1.83a.996.996 0 0 1 1.41 0l2.34 2.34ZM3 21v-3.75L14.06 6.19l3.75 3.75L6.75 21H3Z" clipRule="evenodd"></path>
                    </svg>
                </div>

                <div className="cursor-pointer">
                    <svg width="25" height="25" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
                    </svg>
                </div>

            </div>
        </div>
    );
}
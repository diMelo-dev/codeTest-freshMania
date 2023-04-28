

export function Header() {

    return(
        <header className="w-full p-3 flex flex-col items-center gap-3 text-white bg-[#3f51b5] min-[250px]:flex-row">
            
            <div className="">
                <svg width="35" height="35" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2Zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12Z"></path>
                </svg>
            </div>

            <h1 className="text-3xl font-bold">DevMarket</h1>
        </header>
    );
}
import { useContext } from "react"
import { Header } from "./components/Header";
import { InputArea } from "./components/InputArea";
import { ProductItem } from "./components/ProductItem";
import { Context } from "./contexts/Context"


function App() {

    const { state, dispatch } = useContext(Context);

    

    return (
    <div className="min-h-screen flex flex-col bg-[#dddddd] font-sans">
        <Header />

        <div className="p-3 flex flex-col gap-6">
            <InputArea />

            <main className="flex items-center gap-16">
                {state.productList.map((item) => (
                    <ProductItem key={item.id} data={item} />
                ))}
            </main>
        </div>

    </div>
    )
}

export default App

import { useState } from "react"
import FormAddFile from "../../components/Form/AddFile"

const Home = () =>{
    const [stateFormAddFile, setStateFormAddFile] = useState(false)

    return (
        <>  
            <button onClick={()=>{setStateFormAddFile(!stateFormAddFile)}} className="h-[40px] ml-[8px] bg-slate-600 rounded-[5px] mt-[5px] px-[8px] text-white font-medium">
                Thêm hồ sơ mới
            </button>
                <FormAddFile stateFormAddFile={stateFormAddFile} setStateFormAddFile={setStateFormAddFile}/>

        </>
    )
}

export default Home
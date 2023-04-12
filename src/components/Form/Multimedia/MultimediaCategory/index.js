import { useState, useEffect } from "react"
import Table from "../../../Table"
import axios from "axios"

const API_DOCUMENT = "https://6381f08c53081dd5498bea48.mockapi.io/api/v1/document"
const API_PDF = "http://127.0.0.1:5500/src/assets/TTTT.pdf"

const FIELDS_TABLE = [
    { title: "Tác giả", key: "OrganName", width: "100%" },
    { title: "Số ký hiệu", key: "CodeNotation", width: "100%" },
    { title: "Ngày văn bản", key: "IssuedDate", width: "100%" },
    { title: "Trích yếu", key: "Subject", width: "100%" },
    { title: "Số thứ tự VB trong hồ sơ", key: "PhysicalNum", width: "100%" },
    { title: "File", key: "File", width: "100%" },
    { title: "Chức năng", key: "Function", width: "100px" },
]

const MultimediaCategory = ({stateMultimediaCategory, setStateMultimediaCategory}) => {
    const [stateAddDoc, setStateAddDoc] = useState(false)
    const [stateFixDoc, setStateFixDoc] = useState(false)
    const [evFilesUploaded, setEvFilesUploaded] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [files, setFiles] = useState([])
    const [pdfFile, setPdfFile] = useState(null)

    
    const handleClick = async (ev) => {
        await axios.get(API_PDF).then(res => {
            console.log("pdf data: ", res.data);
            setPdfFile(res.data)
            setStateFixDoc(true)
        }).catch(err => console.log("errors:", err))

    }
    
    const FUNCTIONS = [
        <button onClick={handleClick} className="font-bold italic block text-left text-[10px] hover:underline">Xem chi tiết</button>,
        <button className="font-bold italic block text-left text-[10px] hover:underline" >Xóa</button>,
        <button className="font-bold italic block text-left text-[10px] hover:underline">Phân quyền</button>,
    ]

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await fetch(API_DOCUMENT);
                setIsLoading(false);
                if (response.ok) {
                    const rawDatas = await response.json();
                    let filesArray = []
                    for (let i = 0; i < rawDatas.length; i++) {
                        const rawData = rawDatas[i]
                        filesArray.push({
                            "OrganName": rawData.OrganName,
                            "CodeNotation": rawData.CodeNotation,
                            "IssuedDate": rawData.IssuedDate,
                            "Subject": rawData.Subject,
                            "PhysicalNum": rawData.PhysicalNum,
                            "File": rawData.File,
                            "Function": FUNCTIONS,
                        })
                    }
                    setFiles(filesArray)
                }
            } catch (err) {
                console.log(err)
            }
        };
        fetchFileData();
    }, [])

    return (
        <>
            {
                stateMultimediaCategory &&
                <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-10 bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
                        <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className="relative">
                                <button onClick={() => { setStateMultimediaCategory(false) }} className="text-[20px] absolute right-0 w-[40px] h-full bg-[#2f54eb] top-0 text-white ">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                                <div className="bg-[#2f54eb] text-white py-[8px] px-[24px]">
                                    <p className='text-bold'>Mục lục tệp đa phương tiện     </p>

                                </div>
                            </div>
                            <div className="w-full pb-[24px] bg-[#f0f2f5]">
                                <div className="pt-[16px] mx-[24px] flex ">
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Tác giả" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Số ký hiệu VB" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Trích yếu VB" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Ngày VB" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] text-white text-center px-[5px] flex">
                                        <button className="rounded-[5px] h-[30px] flex justify-center bg-[#00f] w-full px-[16px] items-center text-[12px] ">
                                            <div className="mr-[8px]">
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                            Tìm kiếm
                                        </button>

                                    </div>

                                    <div className="w-[12.5%] text-white  text-center px-[5px]">
                                        <form encType="multipart/form-data">
                                            <label className='flex justify-center items-center cursor-pointer w-auto h-[30px] bg-[#00f] rounded-[5px] text-white hover:opacity-90 text-[12px]' htmlFor="file-upload">
                                                <i class="fa-solid fa-upload"></i>
                                                <p className='ml-[8px]'>Thêm văn bản</p>
                                            </label>
                                            <input onClick={(ev) => { ev.target.value = '' }} type='file' id="file-upload" name="file-upload" className="hidden" onChange={(ev) => {
                                                setStateAddDoc(true)
                                                setEvFilesUploaded(prev => ev)
                                            }} accept="application/pdf" multiple></input>
                                        </form>

                                    </div>
                                    <div className="w-[12.5%] text-white text-center px-[5px] flex">

                                        <button className="rounded-[5px] h-[30px] flex justify-center bg-[#00f] w-full px-[4px] items-center text-[12px] ">
                                            <div className="mr-[8px]">
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                            Thêm VB từ EOFFICE
                                        </button>

                                    </div>

                                </div>
                                <Table fieldNames={FIELDS_TABLE} fieldDatas={files} isLoading={isLoading} isCheckBox={true} />
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </>
    )
}
export default MultimediaCategory
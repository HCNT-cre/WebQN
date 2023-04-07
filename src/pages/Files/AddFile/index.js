import { useState, useEffect } from "react"
import FormAddFile from "../../../components/Form/AddFile"
import DocCategory from "../../../components/Form/Document/DocCategory"
import MultimediaCategory from "../../../components/Form/Multimedia/MultimediaCategory"
import axios from "axios"
import Table from "../../../components/Table"
import { useSelector } from "react-redux"

const API_GET_FILES = 'http://127.0.0.1:8000/get_gov_files/'
const API_SEARCH = 'https://641e04a5945125fff3db0a63.mockapi.io/file'


const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "70px" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Số lượng tờ", key: "sheet_number", width: "70px" },
    { title: "Số lượng văn bản", key: "TotalDoc", width: "70px" },
    { title: "Thời gian (bắt đầu - kết thúc)", key: "start_date", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "Status", width: "150%" },
    { title: "Chức năng", key: "Function", width: "100%" },
]

const ButtonFunctions = ({ handleClickOnFile, IDFile }) => {
    const [stateMoreFunction, setStateMoreFunction] = useState(false)

    return (
        <div className="flex flex-wrap">
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#0984e3] px-[2px] font-bold italic block text-left text-[16px] hover:underline" onClick={() => { handleClickOnFile(IDFile) }} title="Thêm văn bản">
                <i className="fa-solid fa-upload"></i>
            </button>
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#19376D] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Thêm tài liệu đa phương tiện">
                <i class="fa-solid fa-photo-film"></i>
            </button>
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#FF8400] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Xem hồ sơ">
                <i class="fa-regular fa-folder-open"></i></button>

            <div className="relative">
                <button onClick={() => setStateMoreFunction(!stateMoreFunction)} className="px-[2px] text-[#7d8183] cursor-pointer" title="Xem thêm">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
                {stateMoreFunction &&
                    <div className="absolute right-[0] top-[-25px] flex">
                        <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#E7B10A] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Sửa hồ sơ">
                            <i class="fa-solid fa-hammer"></i>
                        </button>
                        <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#20262E] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Xóa hồ sơ">
                            <i class="fa-sharp fa-solid fa-trash"></i></button>
                        <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#FF8B13] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Nhật ký hồ sơ">
                            <i class="fa-solid fa-book"></i>
                        </button>
                        <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#7d8183] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Nộp lưu">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </button>
                        <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#0014FF] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Phân quyền">
                            <i class="fa-solid fa-user-doctor"></i>
                        </button>
                    </div>
                }
            </div>

        </div>
    )
}


const AddFile = () => {
    const [files, setFiles] = useState([])
    const [stateFormAddFile, setStateFormAddFile] = useState(false)
    const [stateDocCategory, setStateDocCategory] = useState(false)
    const [stateMultimediaCategory, setStateMultimediaCategory] = useState(false)
    const [IDFile, setIDFile] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [stateAction, setStateAction] = useState(false)

    const [search, setSearch] = useState({
        "Title": "",
        "Organld": "",
        "Office": "",
        "Status": "",
        "Type": ""

    })

    const handleClickOnFile = (IDFile) => {
        console.log(IDFile);
        setIDFile(IDFile)
        setStateDocCategory(true)
    }

    const handleSearch = async (ev) => {
        try {
            const response = await axios.post(API_SEARCH, search, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setFiles(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeSearch = (ev) => {
        const { name, value } = ev.target
        setSearch((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await fetch(API_GET_FILES);
                setIsLoading(false);
                if (response.ok) {
                    const rawDatas = await response.json();
                    let filesArray = []
                    for (const rawData of rawDatas) {
                        const row = {
                            'id': rawData.id,
                            'gov_file_code': rawData.gov_file_code || 'test',
                            'title': rawData.title || 'test',
                            'organ_id': rawData.organ_id || 'test',
                            'sheet_number': rawData.sheet_number || 'test',
                            'total_doc': rawData.total_doc || 'test',
                            'start_date': rawData.start_date || 'test',
                            'maintenance': rawData.maintenance || 'test',
                            'rights': rawData.rights || 'test',
                            'Status': rawData.state || 'test',
                            'Function': <ButtonFunctions handleClickOnFile={handleClickOnFile} IDFile={rawData.id} />
                        }
                        filesArray.push(row)
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
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Hồ sơ, tài liệu / </span>
                    <span>
                        Danh sách hồ sơ tài liệu
                    </span>
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white">
                <p className="text-[20px] font-bold ">Danh sách hồ sơ tài liệu</p>
            </div>

            <div className="w-full my-[24px]">
                <div className="mt-[16px] mx-[24px] flex ">
                    <div className="w-[11.11111%] px-[5px]">
                        <input onChange={handleChangeSearch} name="Title" placeholder="Tiêu đề hồ sơ" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input onChange={handleChangeSearch} name="Organld" placeholder="Phông" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input onChange={handleChangeSearch} name="Office" placeholder="Cơ quan" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input onChange={handleChangeSearch} name="Status" placeholder="Trạng thái" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input onChange={handleChangeSearch} name="Type" placeholder="Loại hồ sơ" className="bar-page-input"></input>
                    </div>

                    <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px]  flex">
                        <button onClick={handleSearch} className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] ">
                            <div className="mr-[8px]">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="w-[11.11111%] text-white  text-center px-[5px] rounded-[5px] ">
                        <button onClick={() => { setStateFormAddFile(!stateFormAddFile) }} className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px]">
                            Thêm hồ sơ mới
                        </button>
                    </div>
                    <div className="w-[11.11111%] text-white  text-center px-[5px] rounded-[5px]  ">
                        <button className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] ">
                            <div className="mr-[8px]">
                                <i class="fa-regular fa-file-excel"></i>
                            </div>
                            Xuất Excel
                        </button>
                    </div>
                    <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px]  relative">
                        <button onClick={() => { setStateAction(!stateAction) }} className="rounded-[5px] flex justify-center items-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] ">
                            Hành động
                            <div className="ml-[4px]">
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                        </button>
                        {stateAction &&
                            <div className="rounded-[5px] text-left top-[40px] absolute bg-[#00f] w-full px-[12px] py-[6px] text-[14px] z-50">
                                <button>Đóng hồ sơ</button>
                                <button>Nộp lưu cơ quan</button>
                                <button>Nộp lưu lịch sử</button>
                            </div>
                        }
                    </div>

                </div>
                <Table fieldNames={FIELDS_TABLE} fieldDatas={files} isLoading={isLoading} isCheckBox={true} />
            </div>

            <FormAddFile stateFormAddFile={stateFormAddFile} setStateFormAddFile={setStateFormAddFile} />
            <DocCategory govFileID={IDFile} stateDocCategory={stateDocCategory} setStateDocCategory={setStateDocCategory} />
            <MultimediaCategory stateMultimediaCategory={stateMultimediaCategory} setStateMultimediaCategory={setStateMultimediaCategory} />
        </>
    )
}

export default AddFile
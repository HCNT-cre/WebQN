import { useState, useEffect } from "react"
import FormAddFile from "../../../components/Form/AddFile"
import DocCategory from "../../../components/Form/Document/DocCategory"
import MultimediaCategory from "../../../components/Form/Multimedia/MultimediaCategory"
import axios from "axios"
import Table from "../../../components/Table"
import { useSelector } from "react-redux"
import { AutoFixOffSharp } from "@mui/icons-material"

const API_GOV_FILE_GET_ALL = process.env.REACT_APP_API_GOV_FILE_GET_ALL
const API_UPDATE_STATE_GOV_FILE = process.env.REACT_APP_API_GOV_FILE_UPDATE_STATE
const API_GOV_FILE_SEARCH = process.env.REACT_APP_API_GOV_FILE_GET_ALL

const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150px" },
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

const STATE = ["", "Mở", "Đóng", "Nộp lưu cơ quan", "Lưu trữ cơ quan", "Nộp lưu lịch sử", "Lưu trữ lịch sử"]

const ButtonFunctions = ({ handleClickOnFile, IDFile }) => {
    const [stateMoreFunction, setStateMoreFunction] = useState(false)

    return (
        <div className="flex flex-wrap">
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#537FE7] px-[2px] font-bold italic block text-left text-[16px] hover:underline" onClick={() => { handleClickOnFile(IDFile) }} title="Thêm văn bản">
                <i className="fa-solid fa-upload"></i>
            </button>
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#19376D] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Thêm tài liệu đa phương tiện">
                <i class="fa-solid fa-photo-film"></i>
            </button>
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#FF8400] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Xem hồ sơ">
                <i class="fa-regular fa-folder-open"></i></button>

            <div className="relative">
                <button onClick={() => setStateMoreFunction(!stateMoreFunction)} className="px-[2px] text-[#000] cursor-pointer" title="Xem thêm">
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
    const [stateCheckBox, setStateCheckBox] = useState([])
    const userPermissionId = useSelector(state => state.user.permission_id)
    const userPermissions = useSelector(state => state.user.permissions)

    const [search, setSearch] = useState({
        "title": "",
        "organ_id": "",
        "offce": "",
        "state": "",
        "type": ""
    })

    const handleClickOnFile = (IDFile) => {
        setIDFile(IDFile)
        setStateDocCategory(true)
    }

    const getFileFromResponse = (response) => {
        const rawDatas = response.data
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
                'Status': STATE[rawData.state] || 'test',
                'Function': <ButtonFunctions handleClickOnFile={handleClickOnFile} IDFile={rawData.id} />
            }
            filesArray.push(row)
        }
        return filesArray
    }
    const handleSearch = async (ev) => {
        try {
            setIsLoading(true)
            const response = await axios.get(API_GOV_FILE_SEARCH + userPermissionId + "&state=" + search["state"], {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsLoading(false)
            setFiles(getFileFromResponse(response))
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeSearch = (ev) => {
        const { name, value } = ev.target
        console.log(name, value)
        setSearch((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeStateFile = async (newState) => {
        const listState = []

        for (const state of stateCheckBox) {
            const id = parseInt(state.substring(state.indexOf("checkbox") + "checkbox".length))
            listState.push({
                ...newState,
                gov_file_id: id,
                perm_token: userPermissionId
            })
        }


        try {
            await axios.patch(API_UPDATE_STATE_GOV_FILE, JSON.stringify(listState), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // console.log(response);
            alert("Thay đổi trạng thái hồ sơ thành công")
            document.location.reload()
        }
        catch (error) {
            alert("Thay đổi trạng thái hồ sơ thất bại")
            // console.log(error.response);
        }
    }

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(API_GOV_FILE_GET_ALL + userPermissionId,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setIsLoading(false);
                setFiles(getFileFromResponse(response))
            } catch (err) {
                console.log(err)
            }
        };

        fetchFileData();
    }, [userPermissionId])


    return (
        <>
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Hồ sơ, tài liệu / </span>
                    <span>
                        Danh sách hồ sơ
                    </span>
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white">
                <p className="text-[20px] font-bold ">Danh sách hồ sơ</p>
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
                        <select onChange={handleChangeSearch} id="state-file" className="bar-page-input" placeholder="Trạng thái" name="state" >
                            <option value="0">Tất cả</option>
                            <option value="1">Mở</option>
                            <option value="2">Đóng</option>
                            <option value="3">Nộp lưu cơ quan</option>
                            <option value="4">Lưu trữ cơ quan</option>
                            <option value="5">Nộp lưu lịch sử</option>
                            <option value="6">Lưu trữ lịch sử</option>
                        </select>
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
                            <div className="rounded-[5px]  text-left top-[40px] absolute bg-[#00f] w-full  text-[14px] z-10">
                                {userPermissions.map((permission, index) => {
                                    return (
                                        <button className="rounded-[5px]  px-[12px] py-[6px] w-full h-full text-left text-[12px] hover:bg-[#2727aa]" onClick={() => handleChangeStateFile(permission.update_state)}>{permission.permission_title}</button>
                                    )
                                })}
                            </div>
                        }
                    </div>

                </div>
                <Table setStateCheckBox={setStateCheckBox} fieldNames={FIELDS_TABLE} fieldDatas={files} isLoading={isLoading} isCheckBox={true} />
            </div>

            <FormAddFile stateFormAddFile={stateFormAddFile} setStateFormAddFile={setStateFormAddFile} />
            <DocCategory govFileID={IDFile} stateDocCategory={stateDocCategory} setStateDocCategory={setStateDocCategory} />
            <MultimediaCategory stateMultimediaCategory={stateMultimediaCategory} setStateMultimediaCategory={setStateMultimediaCategory} />
        </>
    )
}

export default AddFile
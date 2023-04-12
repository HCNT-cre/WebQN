/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import DocCategory from "../../../components/Form/Document/DocCategory"
import MultimediaCategory from "../../../components/Form/Multimedia/MultimediaCategory"
import axios from "axios"
import Table from "../../../components/Table"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Select } from "antd"
import * as actionFile from "../../../actions/formFile"
import File from "../../../components/Form/File/File"

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

const ButtonFunctions = ({ handleClickOnFile, IDFile, dispatch }) => {
    const [stateMoreFunction, setStateMoreFunction] = useState(false)

    return (
        <div className="flex flex-wrap">
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#537FE7] px-[2px] font-bold italic block text-left text-[16px] hover:underline" onClick={() => { handleClickOnFile(IDFile) }} title="Thêm văn bản">
                <i className="fa-solid fa-upload"></i>
            </button>
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#19376D] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Thêm tài liệu đa phương tiện">
                <i class="fa-solid fa-photo-film"></i>
            </button>
            <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#FF8400] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Xem hồ sơ" onClick={() => {
                dispatch(actionFile.OpenFile("watch_file", IDFile))
            }}>
                <i class="fa-regular fa-folder-open"></i></button>

            <div className="relative">
                <button onClick={() => setStateMoreFunction(!stateMoreFunction)} className="px-[2px] text-[#000] cursor-pointer" title="Xem thêm">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
                {stateMoreFunction &&
                    <div className="absolute right-[0] top-[-25px] flex">
                        <button className="cursor-pointer basis-1/4 max-w-[25%] text-[#E7B10A] px-[2px] font-bold italic block text-left text-[16px] hover:underline" title="Sửa hồ sơ" onClick={() => dispatch(actionFile.OpenFile("update_file", IDFile))}>
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

    const dispatch = useDispatch();
    const [files, setFiles] = useState([])
    const [stateDocCategory, setStateDocCategory] = useState(false)
    const [stateMultimediaCategory, setStateMultimediaCategory] = useState(false)
    const [IDFile, setIDFile] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [stateAction, setStateAction] = useState(false)
    const [stateCheckBox, setStateCheckBox] = useState([])
    const userPermissionId = useSelector(state => state.user.permission_id)
    const userPermissions = useSelector(state => state.user.permissions)

    const reloadPage = () => {
        document.location.reload()
    }

    const [search, setSearch] = useState({
        "title": null,
        "organ_id": null,
        "offce": null,
        "state": null,
        "type": null
    })

    const resetSearch = async () => {
        let request = API_GOV_FILE_SEARCH + userPermissionId
        const response = await axios.get(request)
        setFiles(getFileFromResponse(response))
        setSearch(prev => ({
            "title": '',
            "organ_id": '',
            "offce": '',
            "state": '',
            "type": ''
        }))
    }
    console.log(search)
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
                'gov_file_code': rawData.gov_file_code || '',
                'title': rawData.title || '',
                'organ_id': rawData.organ_id || '',
                'sheet_number': rawData.sheet_number || '',
                'total_doc': rawData.total_doc || '',
                'start_date': rawData.start_date || '',
                'maintenance': rawData.maintenance || '',
                'rights': rawData.rights || '',
                'Status': <button onClick={() => {
                    search["state"] = rawData.state
                    handleSearch()
                }}>{STATE[rawData.state]}</button>,
                'Function': <ButtonFunctions handleClickOnFile={handleClickOnFile} IDFile={rawData.id} dispatch={dispatch} />
            }
            filesArray.push(row)
        }
        return filesArray
    }

    const handleSearch = async (ev) => {
        try {

            let request = API_GOV_FILE_SEARCH + userPermissionId
            console.log(search)
            Object.keys(search).forEach(key => {
                const value = search[key]
                if (value !== null & value !== '')
                    request += ("&" + key + "=" + value)
            })
            console.log(request)
            setIsLoading(true)
            const response = await axios.get(request, {
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
                id: id,
                perm_token: userPermissionId
            })
        }

        try {
            const response = await axios.patch(API_UPDATE_STATE_GOV_FILE, listState, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const error_code = response.data.error_code
            if (error_code === undefined) {
                toast.success('Thay đổi trạng thái thành công', {
                    toastId: "success1",
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    onClose: reloadPage
                });
            } else {
                const description = response.data.description
                toast.error(description, {
                    position: "top-center",
                    toastId: "error1",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }
        }
        catch (error) {
            toast.error('Thay đổi trạng thái thất bại', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            console.log(error)
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
                        <input onChange={handleChangeSearch} value={search["title"]} name="title" placeholder="Tiêu đề hồ sơ" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input onChange={handleChangeSearch} name="start_date" placeholder="Ngày bắt đầu" type="text" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input onChange={handleChangeSearch} name="end_date" placeholder="Ngày kết thúc" type="text" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <select value={search["state"]} onChange={handleChangeSearch} id="state-file" className="bar-page-input" placeholder="Trạng thái" name="state" >
                            <option value="">Tất cả</option>
                            <option value="1">Mở</option>
                            <option value="2">Đóng</option>
                            <option value="3">Nộp lưu cơ quan</option>
                            <option value="4">Lưu trữ cơ quan</option>
                            <option value="5">Nộp lưu lịch sử</option>
                            <option value="6">Lưu trữ lịch sử</option>
                        </select>
                    </div>
                    
                    <div onClick={resetSearch} className="w-[11.11111%] text-white  text-center px-[5px] rounded-[5px]">
                        <Button className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] text-white items-center">
                            Xóa tìm kiếm
                        </Button>
                    </div>
                    <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px]  flex">
                        <Button onClick={handleSearch} className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] text-white items-center">
                            <div className="mr-[8px]">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            Tìm kiếm
                        </Button>
                    </div>
                    <div className="w-[11.11111%] text-white  text-center px-[5px] rounded-[5px] ">
                        <Button onClick={() => { dispatch(actionFile.OpenFile("open_upload")) }} className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] text-white items-center">
                            Thêm hồ sơ mới
                        </Button>
                    </div>
                    <div className="w-[11.11111%] text-white  text-center px-[5px] rounded-[5px]  ">
                        <Button className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] text-white items-center">
                            <div className="mr-[8px]">
                                <i class="fa-regular fa-file-excel"></i>
                            </div>
                            Xuất Excel
                        </Button>
                    </div>
                    <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px]  relative">
                        <Button onClick={() => { setStateAction(!stateAction) }} className="rounded-[5px] flex justify-center items-center bg-[#00f] w-full px-[12px] py-[6px] text-[14px] text-white">
                            Hành động
                            <div className="ml-[4px]">
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                        </Button>
                        {stateAction &&
                            <div className="rounded-[5px]  text-left top-[40px] absolute bg-[#00f] w-full text-[14px] z-10 ">
                                {userPermissions.map((permission, index) => {
                                    return (
                                        <button className="hover:text-white rounded-[5px]  px-[12px] py-[6px] w-full h-full text-left text-[12px] text-white border-none truncate" onClick={() => handleChangeStateFile(permission.update_state)}>{permission.permission_title}</button>
                                    )
                                })}
                            </div>
                        }
                    </div>



                </div>
                <Table setStateCheckBox={setStateCheckBox} fieldNames={FIELDS_TABLE} fieldDatas={files} isLoading={isLoading} isCheckBox={true} />
            </div >

            <File />
            <DocCategory govFileID={IDFile} stateDocCategory={stateDocCategory} setStateDocCategory={setStateDocCategory} />
            <MultimediaCategory stateMultimediaCategory={stateMultimediaCategory} setStateMultimediaCategory={setStateMultimediaCategory} />
        </>
    )
}

export default AddFile
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import * as actionFile from "../../../actions/formFile";
import { IDENTIFIER } from "../../../storage/FileStorage";
import { Select, Input } from "antd";
import { notifyError, notifySuccess } from "../../../custom/Function";

const API_GOV_FILE_CREATE = process.env.REACT_APP_API_GOV_FILE_CREATE
const API_GOV_FILE_GET = process.env.REACT_APP_API_GOV_FILE_GET
const API_GOV_FILE_UPDATE = process.env.REACT_APP_API_GOV_FILE_UPDATE

const FIELDS_LEFT = [
    {
        key: "gov_file_code",
        title: "Mã hồ sơ",
        require: false,
        type: "text",
    },
    {
        key: "identifier",
        title: "Mã cơ quan lưu trữ lịch sử",
        require: true,
        type: "select",
        options: IDENTIFIER,
    },
    {
        key: "organ_id",
        title: "Mã phông/công trình/sưu tập lưu trữ",
        require: false,
        type: "options",
    },
    {
        key: "file_catalog",
        title: "Mục lục hoặc năm hình thành hồ sơ",
        require: false,
        type: "number",
    },
    {
        key: "file_notation",
        title: "Số và ký hiệu hồ sơ",
        require: true,
        type: "text",
    },
    { key: "title", title: "Tiêu đề hồ sơ", require: true, type: "text" },
    {
        key: "maintenance",
        title: "Thời hạn bảo quản",
        require: false,
        type: "options",
    },
    {
        key: "rights",
        title: "Chế độ sử dụng",
        require: false,
        type: "select",
        options: [
            { value: "Công Khai", label: "Công Khai" },
            { value: "Riêng tư", label: "Riêng tư" },
        ],
    },
    { key: "language", title: "Ngôn ngữ", require: false, type: "text" },
];

const FIELDS_RIGHT = [
    {
        key: "start_date",
        title: "Thời gian bắt đầu",
        require: true,
        type: "date",
    },
    {
        key: "end_date",
        title: "Thời gian kết thúc",
        require: false,
        type: "date",
    },
    {
        key: "total_doc",
        title: "Tổng số văn bản trong hồ sơ",
        require: false,
        type: "number",
    },
    { key: "description", title: "Chú giải", require: false, type: "options" },
    {
        key: "infor_sign",
        title: "Ký hiệu thông tin",
        require: false,
        type: "text",
    },
    { key: "keyword", title: "Từ khóa", require: false, type: "text" },
    { key: "sheet_number", title: "Số lượng tờ", require: false, type: "number" },
    {
        key: "page_number",
        title: "Số lượng trang",
        require: false,
        type: "number",
    },
    { key: "format", title: "Tình trạng vật lý", require: false, type: "text" },
];

const File = ({ reset }) => {
    const userPermissionId = useSelector(state => state.user.permission_id)
    const data = useSelector((state) => state.formFile.data)

    let stateForm = useSelector((state) => state.formFile.state);
    let title = "Tạo hồ sơ"
    let fileID = null

    if (data !== undefined && data.id !== null) {
        title = data.state === "watch_file" ? "Xem hồ sơ" : "Sửa hồ sơ"
        fileID = data.id
    }

    const dispatch = useDispatch();
    const [request, setRequest] = useState({
        rights: "Công khai",
        gov_file_code: null,
        identifier: null,
        organ_id: null,
        file_catalog: null,
        file_notation: null,
        title: null,
        maintenance: null,
        language: null,
        start_date: null,
        end_date: null,
        total_doc: null,
        description: null,
        infor_sign: null,
        keyword: null,
        sheet_number: null,
        page_number: null,
        format: null
    })

    useEffect(() => {
        if (fileID === null) {
            const updatedRequest = {}
            Object.keys(request).forEach(key => {
                updatedRequest[key] = null
            })
            updatedRequest['rights'] = "Công khai"
            setRequest(updatedRequest)
            return
        }

        const fetchData = async () => {
            const response = await axios.get(API_GOV_FILE_GET + "id=" + fileID + "&perm_token=" + userPermissionId)
            const error_code = response.data.error_code
            if (error_code === undefined) {
                setRequest(response.data[0])
            }
        }

        fetchData()

    }, [fileID])

    const handleChangeForm = (name, value) => {
        setRequest(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (let field of FIELDS_LEFT) {
            if (field.require && (request[field.key] === null || request[field.key] === "")) {
                notifyError("Vui lòng nhập " + field.title)
                return
            }
        }

        for (let field of FIELDS_RIGHT) {
            if (field.require && (request[field.key] === null || request[field.key] === "")) {
                notifyError("Vui lòng nhập " + field.title)
                return
            }
        }

        try {
            const gov_file_code = request["identifier"] + "." + request["start_date"].split("-")[0] + "." + request["file_notation"]
            const API = title === "Tạo hồ sơ" ? API_GOV_FILE_CREATE : API_GOV_FILE_UPDATE
            let response
            response = await axios.post(API, { ...request, gov_file_code: gov_file_code, perm_token: userPermissionId})


            const error_code = response.data.error_code
            if (error_code === undefined) {
                notifySuccess(title + ' thành công');
                setRequest((prev) => {
                    return {
                        ...prev,
                        rights: "Công khai",
                        gov_file_code: null,
                        identifier: null,
                        organ_id: null,
                        file_catalog: null,
                        file_notation: null,
                        title: null,
                        maintenance: null,
                        language: null,
                        start_date: null,
                        end_date: null,
                        total_doc: null,
                        description: null,
                        infor_sign: null,
                        keyword: null,
                        sheet_number: null,
                        page_number: null,
                        format: null
                    }
                })
                reset()
            } else {
                notifyError(title + ' thất bại');
            }
        } catch (err) {
            notifyError(title + ' thất bại');
        }
    }

    return (
        <>
            {
                (stateForm !== "close") && <div className="overflow-y-scroll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[200] bg-[rgba(0,0,0,.45)]">
                    <div className="relative top-[50px] pb-[30px] ">
                        <div className="w-[1000px] max-w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className="relative rounded-[2px] bg-white">
                                <button onClick={() => { dispatch(actionFile.CloseFile()) }} className="text-[20px] absolute right-0 w-[40px] h-[40px] bg-[#2f54eb] top-0 text-white ">
                                    <i className="fa-solid fa-xmark"></i>

                                </button>
                                <div className="bg-[#2f54eb] text-white py-[16px] px-[24px]">
                                    <p>{title}</p>
                                </div>

                                <div className="p-[24px] text-[14px] ">
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex justify-between">
                                            <div className="w-[50%] px-[10px]">
                                                {FIELDS_LEFT.map((field, index) => {
                                                    return (
                                                        <div
                                                            key={field.key}
                                                            className="mt-[8px] w-full mb-[24px] h-[65px]"
                                                        >
                                                            <label
                                                                className={`${field.require ? "after-form" : ""
                                                                    } text-[14px]`}
                                                                title={field.title}
                                                            >
                                                                {field.title}
                                                            </label>

                                                            {field.type === "select" ? (
                                                                field.key === 'identifier' ? (
                                                                    <Select
                                                                        onChange={(value) => handleChangeForm(field.key, value)}
                                                                        className="block mt-[12px]"
                                                                        options={field.options}
                                                                    />
                                                                ) : (
                                                                    <Select
                                                                        onChange={(value) => handleChangeForm(field.key, value)}
                                                                        className="block mt-[12px]"
                                                                        options={field.options}
                                                                        defaultValue={field.options[0]}
                                                                    />
                                                                )
                                                            ) : (
                                                                <Input
                                                                    onChange={(ev) => handleChangeForm(field.key, ev.target.value)}
                                                                    name={field.key}
                                                                    placeholder={field.title}
                                                                    type={field.type}
                                                                    min="0"
                                                                    value={request[field.key] === null ? "" : request[field.key]}
                                                                    className="w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px] h-[30px]"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="w-[50%] px-[10px]">
                                                {FIELDS_RIGHT.map((field, index) => {
                                                    return (
                                                        <div
                                                            key={field.key}
                                                            className="mt-[8px] w-full mb-[24px] h-[65px]"
                                                        >
                                                            <label
                                                                className={`${field.require ? "after-form" : ""
                                                                    } text-[14px]`}
                                                                title={field.title}
                                                            >
                                                                {field.title}
                                                            </label>

                                                            {field.type === "select" ? (
                                                                field.key === 'identifier' ? (
                                                                    <Select
                                                                        onChange={(value) => handleChangeForm(field.key, value)}
                                                                        className="block mt-[12px]"
                                                                        options={field.options}
                                                                    />
                                                                ) : (
                                                                    <Select
                                                                        onChange={(value) => handleChangeForm(field.key, value)}
                                                                        className="block mt-[12px]"
                                                                        options={field.options}
                                                                        defaultValue={field.options[0]}
                                                                    />
                                                                )
                                                            ) : (
                                                                <Input
                                                                    onChange={(ev) => handleChangeForm(field.key, ev.target.value)}
                                                                    name={field.key}
                                                                    placeholder={field.title}
                                                                    type={field.type}
                                                                    min="0"
                                                                    value={request[field.key] === null ? "" : request[field.key]}
                                                                    className="w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px] h-[30px]"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <input className="mr-[12px] h-[32px] w-[60px] rounded-[2px] text-white bg-[#2f54eb] cursor-pointer" type="submit" value="Lưu" />
                                            <button onClick={() => { dispatch(actionFile.CloseFile()) }} className="h-[32px] w-[60px] border-[#2f54eb] border-solid border-[1px] rounded-[2px]">Đóng</button>
                                        </div>

                                    </form>

                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }

        </>
    );
};

export default File;
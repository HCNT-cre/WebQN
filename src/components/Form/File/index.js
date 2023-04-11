import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_GOV_FILE_CREATE = process.env.REACT_APP_API_GOV_FILE_CREATE

const FIELDS_LEFT = [
    {
        key: "identifier",
        title: "Mã cơ quan lưu trữ lịch sử",
        require: false,
        type: "text",
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
        require: false,
        type: "text",
    },
    { key: "title", title: "Tiêu đề hồ sơ", require: false, type: "text" },
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

const FormAddFile = ({ stateFormAddFile, setStateFormAddFile }) => {
    const [request, setRequest] = useState(
        { 'rights': 'Công khai' },
        { 'identifier': '' },
        { 'organ_id': '' },
        { 'file_catalog': '' },
        { 'file_notation': '' },
        { 'title': '' },
        { 'maintenance': '' },
        { 'language': '' },
        { 'start_date': '' },
        { 'end_date': '' },
        { 'total_doc': '' },
        { 'description': '' },
        { 'infor_sign': '' },
        { 'keyword': '' },
        { 'sheet_number': '' },
        { 'page_number': '' },
        { 'format': '' }
    )


    const handleChangeForm = (event) => {
        const name = event.target.name;
        let cur = request;
        cur[name] = event.target.value;
        setRequest(cur);
    };

    const reloadPage = () => {
        document.location.reload();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(request)

        try {
            const response = await axios.post(API_GOV_FILE_CREATE, request, {
                'Content-Type': 'application/json'
            })
            const error_code = response.data.error_code
            if (error_code === undefined) {
                toast.success('Thêm hồ sơ thành công', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    onClose: reloadPage
                });
            } else {
                toast.error('Thêm hồ sơ thất bại', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }
        } catch (err) {
            toast.error('Thêm hồ sơ thất bại', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    }

    return (
        <>
            {
                stateFormAddFile && <div className="overflow-y-scroll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[200] bg-[rgba(0,0,0,.45)]">
                    <div className="relative top-[50px] pb-[30px] ">
                        <div className="w-[1000px] max-w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className="relative rounded-[2px] bg-white">
                                <button onClick={() => { setStateFormAddFile(false) }} className="text-[20px] absolute right-0 w-[40px] h-[40px] bg-[#2f54eb] top-0 text-white ">
                                    <i class="fa-solid fa-xmark"></i>

                                </button>
                                <div className="bg-[#2f54eb] text-white py-[16px] px-[24px]">
                                    <p>Tạo hồ sơ</p>
                                </div>

                                <div className="p-[24px] text-[14px] ">
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex justify-between">
                                            <div className="w-[50%] px-[10px]">
                                                {FIELDS_LEFT.map((field, index) => {
                                                    return (
                                                        <div
                                                            key={field.key}
                                                            className="mt-[8px] w-full mb-[24px]"
                                                        >
                                                            <label
                                                                className={`${field.require ? "after-form" : ""
                                                                    } text-[14px]`}
                                                                title={field.title}
                                                            >
                                                                {field.title}
                                                            </label>

                                                            {field.type === "select" ? (
                                                                <select
                                                                    required={field.require}
                                                                    onChange={(ev) => handleChangeForm(ev)}
                                                                    name={field.key}
                                                                    placeholder={field.title}
                                                                    className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px]"
                                                                >
                                                                    {field.options.map((option, index) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <input
                                                                    required={field.require}
                                                                    onChange={(ev) => handleChangeForm(ev)}
                                                                    name={field.key}
                                                                    placeholder={field.title}
                                                                    type={field.type}
                                                                    min="0"
                                                                    className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px]"
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
                                                            className="mt-[8px] w-full mb-[24px]"
                                                        >
                                                            <label
                                                                className={`${field.require ? "after-form" : ""
                                                                    } text-[14px]`}
                                                                title={field.title}
                                                            >
                                                                {field.title}
                                                            </label>

                                                            {field.type === "select" ? (
                                                                <select
                                                                    required={field.require}
                                                                    onChange={(ev) => handleChangeForm(ev)}
                                                                    name={field.key}
                                                                    placeholder={field.title}
                                                                    className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px]"
                                                                >
                                                                    {field.options.map((option, index) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <input
                                                                    required={field.require}
                                                                    onChange={(ev) => handleChangeForm(ev)}
                                                                    name={field.key}
                                                                    placeholder={field.title}
                                                                    type={field.type}
                                                                    min="0"
                                                                    className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px]"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <input className="mr-[12px] h-[32px] w-[60px] rounded-[2px] text-white bg-[#2f54eb] cursor-pointer" type="submit" value="Lưu" />
                                            <button onClick={() => { setStateFormAddFile(false) }} className="h-[32px] w-[60px] border-[#2f54eb] border-solid border-[1px] rounded-[2px]">Đóng</button>
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
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </>
    );
};

export default FormAddFile;
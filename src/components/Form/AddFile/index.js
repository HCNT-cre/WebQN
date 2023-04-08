import axios from "axios";
import { useState } from "react"

const API_CREATE_GOV_FILE = 'http://127.0.0.1:8000/create_gov_file/'

const FIELDS_LEFT = [
    {
        key: "gov_file_code",
        title: "Mã định danh cơ quan",
        require: true,
        type: "text",
    },
    {
        key: "identifier",
        title: "Mã cơ quan lưu trữ lịch sử",
        require: false,
        type: "text",
    },
    {
        key: "organ_id",
        title: "Mã phông/công trình/sưu tập lưu trữ",
        require: true,
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
    { key: "title", title: "Tiêu đề hồ sơ", require: true, type: "text" },
    {
        key: "maintenance",
        title: "Thời hạn bảo quản",
        require: true,
        type: "options",
    },
    {
        key: "rights",
        title: "Chế độ sử dụng",
        require: true,
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
        { 'gov_file_code': ''},
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date().toISOString().slice(0, 10);
        request['end_date'] = currentDate

        console.log(request);

        try {
            await axios.post(API_CREATE_GOV_FILE,request, {
                'Content-Type': 'application/json'
            })
            alert("Thêm hồ sơ thành công!")
            document.location.reload();
        }catch(err){
            alert("Thêm hồ sơ thất bại!")
            console.log(err)
        }
    }

    return (
        <>
            {
                stateFormAddFile && <div className="overflow-y-scroll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-10 bg-[rgba(0,0,0,.45)]">
                    <div className="relative top-[50px] pb-[30px] ">
                        <div className="w-[1000px] max-w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className="relative rounded-[2px] bg-white">
                                <button onClick={() => { setStateFormAddFile(false) }} className="text-[20px] absolute right-0 w-[40px] h-[40px] bg-[#2f54eb] top-0 text-white ">x</button>
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
        </>
    );
};

export default FormAddFile;
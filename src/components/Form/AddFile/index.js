import { useState } from "react"
import Expand from "react-expand-animated";

const API = 'https://641e04a5945125fff3db0a63.mockapi.io/file'
const fieldsLeft = [
    {
        key: "Identifier",
        title: "Mã cơ quan lưu trữ lịch sử",
        require: false,
        type: "text",
    },
    {
        key: "Organld",
        title: "Mã phông/công trình/sưu tập lưu trữ",
        require: true,
        type: "options",
    },
    {
        key: "FileCatalog",
        title: "Mục lục hoặc năm hình thành hồ sơ",
        require: false,
        type: "number",
    },
    {
        key: "FileNotation",
        title: "Số và ký hiệu hồ sơ",
        require: false,
        type: "text",
    },
    { key: "Title", title: "Tiêu đề hồ sơ", require: true, type: "text" },
    {
        key: "Maintenance",
        title: "Thời hạn bảo quản",
        require: true,
        type: "options",
    },
    {
        key: "Rights",
        title: "Chế độ sử dụng",
        require: true,
        type: "select",
        options: [
            { value: "Công Khai", label: "Công Khai" },
            { value: "Riêng tư", label: "Riêng tư" },
        ],
    },
    { key: "Language", title: "Ngôn ngữ", require: false, type: "text" },
];

const fieldsRight = [
    {
        key: "StartDate",
        title: "Thời gian bắt đầu",
        require: false,
        type: "date",
    },
    {
        key: "TotalDoc",
        title: "Tổng số văn bản trong hồ sơ",
        require: false,
        type: "number",
    },
    { key: "Description", title: "Chú giải", require: false, type: "options" },
    {
        key: "InforSign",
        title: "Ký hiệu thông tin",
        require: false,
        type: "text",
    },
    { key: "Keyword", title: "Từ khóa", require: false, type: "text" },
    { key: "PhysicalNum", title: "Số lượng tờ", require: false, type: "number" },
    {
        key: "PageNumber",
        title: "Số lượng trang",
        require: false,
        type: "number",
    },
    { key: "Format", title: "Tình trạng vật lý", require: false, type: "text" },
];

const FormAddFile = ({ stateFormAddFile, setStateFormAddFile }) => {
    const [request, setRequest] = useState(
        { 'Rights': 'Công khai' },
        { 'Identifier': '' },
        { 'Organld': '' },
        { 'FileCatalog': '' },
        { 'FileNotation': '' },
        { 'Title': '' },
        { 'Maintenance': '' },
        { 'Language': '' },
        { 'StartDate': '' },
        { 'EndDate': '' },
        { 'TotalDoc': '' },
        { 'Description': '' },
        { 'InforSign': '' },
        { 'Keyword': '' },
        { 'PhysicalNum': '' },
        { 'PageNumber': '' },
        { 'Format': '' }
    )


    const handleChangeForm = (event) => {
        const name = event.target.name;
        let cur = request;
        cur[name] = event.target.value;
        console.log(cur);
        setRequest(cur);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date().toISOString().slice(0, 10);
        request['EndDate'] = currentDate
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        await fetch(API, requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data); });

        setStateFormAddFile(false);
        alert("Success")
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
                                                {fieldsLeft.map((field, index) => {
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
                                                {fieldsRight.map((field, index) => {
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
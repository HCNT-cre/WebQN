
const fieldsLeft = [
    { key: 'FileCode', title: 'Mã hồ sơ', require: true, type: "text" },
    { key: 'Identifier', title: 'Mã cơ quan lưu trữ lịch sử', require: false, type: "text" },
    { key: 'Organld', title: 'Mã phông/công trình/sưu tập lưu trữ', require: true, type: "options" },
    { key: 'FileCatalog', title: 'Mục lục hoặc năm hình thành hồ sơ', require: false, type: "number" },
    { key: 'FileNotation', title: 'Số và ký hiệu hồ sơ', require: false, type: "text" },
    { key: 'Title', title: 'Tiêu đề hồ sơ', require: true, type: "text" },
    { key: 'Maintenance', title: 'Thời hạn bảo quản', require: true, type: "options" },
    { key: 'Rights', title: 'Chế độ sử dụng', require: true, type: "options" },
    { key: 'Language', title: 'Ngôn ngữ', require: false, type: "text" },
]

const fieldsRight = [
    { key: 'StartDate', title: 'Thời gian bắt đầu', require: false, type: "date" },
    { key: 'EndDate', title: 'Thời gian kết thúc', require: false, type: "date" },
    { key: 'TotalDoc', title: 'Tổng số văn bản trong hồ sơ', require: false, type: "number" },
    { key: 'Description', title: 'Chú giải', require: false, type: "options" },
    { key: 'InforSign', title: 'Ký hiệu thông tin', require: false, type: "text" },
    { key: 'Keyword', title: 'Từ khóa', require: false, type: "text" },
    { key: 'Maintenance', title: 'Số lượng tờ', require: false, type: "number" },
    { key: 'PageNumber', title: 'Số lượng trang', require: false, type: "number" },
    { key: 'Format', title: 'Tình trạng vật lý', require: false, type: "text" },

]

// <div className="w-[50%] px-[10px]">
//     <div className="flex items-center justify-between ">
//         <div className="mr-[8px] flex w-[150px] justify-end">
//             <label className="before-form" title="Tiêu đề hồ sơ">Tiêu đề hồ sơ</label>
//         </div>
//         <div className="mt-[8px] w-[calc(100%-150px)]">
//             <input className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px]"></input>
//         </div>
//     </div>

// </div>


const FormAddFile = ({ stateFormAddFile, setStateFormAddFile }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit");
    }

  

    return (
        <>
            {stateFormAddFile &&
                <div className="fixed top-0 right-0 bottom-0 left-0 h-full w-full z-10 bg-[rgba(0,0,0,.45)]">
                    <div className="overflow-x-auto relative top-[100px] w-[1200px] max-w-[calc(100vw-32px)] my-0 mx-auto bg-white">
                        <div className="overflow-x-auto  relative rounded-[2px] bg-white">
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
                                                    <div key={field.key} className="flex items-center justify-between mb-[24px]">
                                                        <div className="mr-[8px] flex w-[250px] justify-end">
                                                            <label className={`${field.require ? "after-form" : ""} text-[14px]`} title={field.title}>{field.title}</label>
                                                        </div>
                                                        <div className="mt-[8px] w-[calc(100%-250px)]">
                                                            <input placeholder={field.title} type={field.type} min="0" className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px]"></input>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="w-[50%] px-[10px]">
                                            {fieldsRight.map((field, index) => {
                                                return (
                                                    <div key={field.key} className="flex items-center justify-between mb-[24px]">
                                                        <div className="mr-[8px] flex w-[250px] justify-end">
                                                            <label className={`${field.require ? "after-form" : ""} text-[14px]`} title={field.title}>{field.title}</label>
                                                        </div>
                                                        <div className="mt-[8px] w-[calc(100%-250px)]">
                                                            <input placeholder={field.title} type={field.type} min="0" className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px]"></input>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <input className="mr-[12px] h-[32px] w-[60px] rounded-[2px] text-white bg-[#2f54eb] cursor-pointer" type="submit" value="Lưu"/>
                                        <button className="h-[32px] w-[60px] border-[#2f54eb] border-solid border-[1px] rounded-[2px]">Đóng</button>
                                    </div>

                                </form>

                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FormAddFile;
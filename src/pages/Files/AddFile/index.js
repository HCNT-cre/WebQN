import { useState, useEffect } from "react"
import FormAddFile from "../../../components/Form/AddFile"
import DocCategory from "../../../components/Form/DocCategory"
import Loading from "../../../components/Loading"

const API = 'https://641e04a5945125fff3db0a63.mockapi.io/file'
const INPUT = () => {

}


const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "FileCode" },
    { title: "Tiêu đề hồ sơ", key: "FileCode" },
    { title: "Phông", key: "Organld" },
    { title: "Hồ sơ số", key: "FileCode" },
    { title: "Số lượng tờ", key: "PhysicalNum" },
    { title: "Số lượng văn bản", key: "TotalDoc" },
    { title: "Thời gian (bắt đầu - kết thúc)", key: "Date" },
    { title: "Thời hạn bảo quản", key: "Maintenance" },
    { title: "Chế độ sử dụng", key: "Rights" },
    { title: "Trạng thái", key: "Status" },
]

const CheckBox = ({ id, type, name, handleClick, isChecked }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            onChange={handleClick}
            checked={isChecked}
            className="outline-none"
        />
    );
};

const AddFile = () => {
    const [files, setFiles] = useState([])
    const [stateFormAddFile, setStateFormAddFile] = useState(false)
    const [stateDocCategory, setStateDocCategory] = useState(false)

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(files.map((file, index) => ("checkbox" + index)))
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await fetch(API);
                setIsLoading(false);
                if (response.ok) {
                    const rawDatas = await response.json();
                    let filesArray = []
                    for (let i = 0; i < rawDatas.length; i++) {
                        const rawData = rawDatas[i]
                        filesArray.push({
                            'Maintenance': rawData.Maintenance, 'Title': rawData.Title, 'Organld': rawData.Organld, 'Rights': rawData.Rights, 'FileCode': rawData.FileCode
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
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Hồ sơ, tài liệu / </span>
                    <span>
                        Tạo hồ sơ điện tử
                    </span>
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white">
                <p className="text-[20px] font-bold ">Tạo hồ sơ tài liệu</p>
            </div>

            <div className="w-full my-[24px]">
                <div className="mt-[16px] mx-[24px] flex ">
                    <div className="w-[11.11111%] px-[5px]">
                        <input placeholder="Tiêu đề hồ sơ" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input placeholder="Phông" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input placeholder="Cơ quan" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input placeholder="Trạng thái" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <input placeholder="Loại hồ sơ" className="bar-page-input"></input>
                    </div>
                    <div className="w-[11.11111%] text-white text-center px-[5px] flex">
                        <button className="flex justify-center bg-[#00f] w-full px-[16px] py-[6px] text-[14px] ">
                            <div className="mr-[8px]">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="w-[11.11111%] text-white  text-center px-[5px]">
                        <button onClick={() => { setStateFormAddFile(!stateFormAddFile) }} className="flex justify-center bg-[#00f] w-full px-[16px] py-[6px] text-[14px]">
                            Thêm hồ sơ mới
                        </button>
                    </div>
                    <div className="w-[11.11111%] text-white  text-center px-[5px]">
                        <button className="flex justify-center bg-[#00f] w-full px-[16px] py-[6px] text-[14px] ">
                            <div className="mr-[8px]">
                                <i class="fa-regular fa-file-excel"></i>
                            </div>
                            Xuất Excel
                        </button>
                    </div>
                    <div className="w-[11.11111%] text-white  text-center px-[5px]">
                        <button className="flex justify-center bg-[#00f] w-full px-[16px] py-[6px] text-[14px] ">
                            <div className="mr-[8px]">
                                <i class="fa-regular fa-file-excel"></i>
                            </div>
                            Xuất Excel
                        </button>
                    </div>

                </div>
                <div className="p-[24px] bg-[#f0f2f5] rounded-[2px]">
                    <table className="table-fixed w-full">
                        <colgroup></colgroup>
                        <thead className="bg-[#fafafa]">
                            <tr>
                                <th className="relative w-[40px] text-center px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">TT</th>
                                <th className="relative w-[55px] text-center px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">
                                    Chọn
                                    <CheckBox
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        handleClick={handleSelectAll}
                                        isChecked={isCheckAll}
                                    />
                                </th>

                                {FIELDS_TABLE.map((field, index) => {
                                    return (
                                        <th className="relative text-center px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">{field.title}</th>
                                    )
                                })}
                                <th className="relative text-left px-[8px] py-[12px]" >Chức năng </th>
                            </tr></thead>

                        <tbody>
                            {
                                !files.length &&
                                <tr className="hover:bg-[#fafafa] bg-white border-t-[1px] border-solid border-[#e0e0e0]">
                                    <td colSpan={13}>
                                        {isLoading ? <Loading /> :
                                            <div className="w-full bg-white text-gray-400">
                                                <div className="text-center p-[16px]">
                                                    <div><i className="text-[50px] fa-solid fa-box-open"></i></div>
                                                    <p>Không có dữ liệu</p>
                                                </div>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            }


                            {
                                files.map((file, index) => {
                                    return (
                                        <tr className="hover:bg-[#fafafa] bg-white border-t-[1px] border-solid border-[#e0e0e0]" key={index}>
                                            <td className="text-center px-[12px] py-[16px]"><span className="block w-[24px] h-[24px] rounded-[50%] bg-[#ccc]">{index + 1}</span></td>
                                            <td className="px-[12px] py-[16px] overflow-hidden text-center" >
                                                <CheckBox
                                                    key={index}
                                                    type="checkbox"
                                                    id={"checkbox" + index}
                                                    handleClick={handleClick}
                                                    isChecked={isCheck.includes("checkbox" + index)}
                                                />
                                            </td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.FileCode}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Title}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Organld}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Maintenance}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Rights}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Rights}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Rights}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Rights}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Rights}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden" >{file.Rights}</td>
                                            <td className="px-[12px] py-[16px] overflow-hidden cursor-pointer"  >
                                                <button className="block text-left text-[14px] hover:underline" onClick={() => { setStateDocCategory(!stateDocCategory) }}>Thêm văn bản</button>
                                                <button className="block text-left text-[14px] hover:underline">Thêm tài liệu đa phương tiện</button>
                                                <button className="block text-left text-[14px] hover:underline">Xem hồ sơ</button>
                                                <button className="block text-left text-[14px] hover:underline" >Sửa hồ sơ</button>
                                                <button className="block text-left text-[14px] hover:underline">Xóa hồ sơ</button>
                                                <button className="block text-left text-[14px] hover:underline">Nhật ký hồ sơ</button>
                                                <button className="block text-left text-[14px] hover:underline">Nộp lưu</button>
                                                <button className="block text-left text-[14px] hover:underline">Phân quyền</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>

            <FormAddFile stateFormAddFile={stateFormAddFile} setStateFormAddFile={setStateFormAddFile} />
            <DocCategory stateDocCategory={stateDocCategory} setStateDocCategory={setStateDocCategory} />
        </>
    )
}

export default AddFile
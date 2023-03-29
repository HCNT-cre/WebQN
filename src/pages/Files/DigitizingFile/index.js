import { useState, useEffect } from "react"
import FormAddFile from "../../../components/Form/AddFile"
import EditFile from "../../../components/Form/EditFile"

const DigitizingFile = () => {
    const [files, setFiles] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchFileData = async () => {
            const response = await fetch('https://641e04a5945125fff3db0a63.mockapi.io/file');
            const rawDatas = await response.json();
            let filesArray = []
            for (let i = 0; i < rawDatas.length; i++) {
                const rawData = rawDatas[i]
                filesArray.push({
                    'Maintenance': rawData.Maintenance, 'Title': rawData.Title, 'Organld': rawData.Organld, 'Rights': rawData.Rights, 'FileCode': rawData.FileCode
                })
            }
            setFiles(filesArray)
        };
        fetchFileData();
    }, [])


    const [stateFormAddFile, setStateFormAddFile] = useState(false)
    const [stateFormEditFile, setStateFormEditFile] = useState(false)
    return (
        <>
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Hồ sơ, tài liệu / </span>
                    <span>
                        Số hoá hồ sơ tài liệu
                    </span>
                </p>
            </div>
            <div className="w-full px-[24px] pb-[16px] bg-white">
                <p className="text-[20px] font-bold ">Số hoá hồ sơ tài liệu</p>
            </div>

            <div className="w-full my-[24px]">
                <div className="mt-[16px] mx-[24px] flex ">
                    <div className="w-[12.5%] px-[5px]">
                        <input placeholder="Tiêu đề hồ sơ" className="bar-page-input"></input>
                    </div>
                    <div className="w-[12.5%] px-[5px]">
                        <input placeholder="Phông" className="bar-page-input"></input>
                    </div>
                    <div className="w-[12.5%] px-[5px]">
                        <input placeholder="Cơ quan" className="bar-page-input"></input>
                    </div>
                    <div className="w-[12.5%] px-[5px]">
                        <input placeholder="Trạng thái" className="bar-page-input"></input>
                    </div>
                    <div className="w-[12.5%] px-[5px]">
                        <input placeholder="Loại hồ sơ" className="bar-page-input"></input>
                    </div>
                    <div className="w-[12.5%] px-[5px] text-white text-center flex">
                        <button className="bar-page-button">
                            <div className="mr-[8px]">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="w-[12.5%] px-[5px] text-white  text-center ">
                        <button className="bar-page-button">
                            Duyệt hồ sơ vào kho
                        </button>
                    </div>
                    <div className="w-[12.5%] px-[5px] text-white  text-center ">
                        <button className="bar-page-button">
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
                                <th className="relative w-[40px] text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">TT</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]   ">Mã hồ sơ</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" >Tiêu đề hồ sơ</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" >Phông</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" >Thời hạn bảo quản</th>
                                <th className="relative text-left px-[8px] py-[12px] " >Chế độ sử dụng</th>

                            </tr></thead>
                        <tbody>{files.map((file, index) => {
                            return (
                                <tr className="hover:bg-[#fafafa] bg-white border-t-[1px] border-solid border-[#e0e0e0]" key={index}>
                                    <td className="text-center px-[12px] py-[16px]"><span className="block w-[24px] h-[24px] rounded-[50%] bg-[#ccc]">{index + 1}</span></td>
                                    <td className="px-[12px] py-[16px] overflow-hidden" >{file.FileCode}</td>
                                    <td className="px-[12px] py-[16px] overflow-hidden" >{file.Title}</td>
                                    <td className="px-[12px] py-[16px] overflow-hidden" >{file.Organld}</td>
                                    <td className="px-[12px] py-[16px] overflow-hidden" >{file.Maintenance}</td>
                                    <td className="px-[12px] py-[16px] overflow-hidden" >{file.Rights}</td>

                                </tr>
                            )
                        })}</tbody>


                    </table>
                </div>
            </div>

            <FormAddFile stateFormAddFile={stateFormAddFile} setStateFormAddFile={setStateFormAddFile} />
            
        </>
    )
}

export default DigitizingFile
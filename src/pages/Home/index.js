import { useState, useEffect } from "react"
const Home = () => {
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

    return (
        <>
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[20px] font-bold ">Trang chủ</p>
                <div className="mt-[8px]">
                    <p className="mb-[12px] font-[500]">Cơ sở dữ liệu tài liệu lưu trữ điện tử</p>
                    <p className="mb-[12px]">Tổng số phông: <span className="text-[#ff0000]">12</span></p>
                    <p className="mb-[12px]">Tổng số hồ sơ: <span className="text-[#ff0000]">1234</span></p>
                    <p className="mb-[12px]">Tổng số văn bản: <span className="text-[#ff0000]">4567</span></p>
                </div>
            </div>
            <div className="w-full my-[24px]">
                <div className="mt-[16px] ml-[24px] flex ">
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
                        <select className="w-full py-[6px] px-[4px] text-[14px] outline-none">
                            <option>Tất cả</option>
                        </select>
                    </div>
                    <div className="w-[12.5%] text-white text-center px-[5px] flex">
                        <button className="flex justify-center bg-[#00f] w-full px-[16px] py-[6px] text-[14px] ">
                            <div className="mr-[8px]">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="w-[12.5%] text-white  text-center px-[5px]">
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
                                <th className="relative w-[40px] text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">TT</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]   ">Mã hồ sơ</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" >Tiêu đề hồ sơ</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" >Phông</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" >Thời hạn bảo quản</th>
                                <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" >Chế độ sử dụng</th>
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
        </>
    )
}

export default Home
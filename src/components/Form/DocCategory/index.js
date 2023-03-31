import { useState } from "react"
import AddDoc from "../AddDoc"
const DocCategory = ({ stateDocCategory, setStateDocCategory }) => {

    const [stateAddDoc, setStateAddDoc] = useState(false)
    return (
        <>
            {
                stateDocCategory &&
                <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-10 bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
                        <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <button onClick={() => { setStateDocCategory(false) }} className="text-[20px] absolute right-0 w-[40px] h-[40px] bg-[#2f54eb] top-0 text-white ">x</button>
                            <div className="bg-[#2f54eb] text-white py-[16px] px-[24px]">
                                <p className='text-bold'>Mục lục văn bản</p>
                            </div>

                            <div className="w-full my-[24px] bg-[#f0f2f5]">
                                <div className="pt-[16px] mx-[24px] flex ">
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
                                    <div className="w-[12.5%] text-white text-center px-[5px] flex">

                                        <button className="flex justify-center bg-[#00f] w-full px-[16px] py-[6px] text-[14px] ">
                                            <div className="mr-[8px]">
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                            Tìm kiếm
                                        </button>

                                    </div>

                                    <div className="w-[12.5%] text-white  text-center px-[5px]">
                                        <button onClick={() => setStateAddDoc(true)} className="flex justify-center bg-[#00f] w-full px-[16px] py-[6px] text-[14px] ">
                                            Thêm văn bản
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
                                                <th className="relative text-left px-[8px] py-[12px]" >Chức năng </th>
                                            </tr>
                                        </thead>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
            <AddDoc stateAddDoc={stateAddDoc} setStateAddDoc={setStateAddDoc} />
        </>
    )
}
export default DocCategory
/* eslint-disable react-hooks/exhaustive-deps */
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';
import { EofficeFile } from '../../../storage/Eoffice';

const EOFFICE = ({ setStateEoffice, stateEoffice }) => {
    const [select, setSelect] = useState([])
    const [doc, setDoc] = useState([])

    const handleClickFile = (ev) => {
        const { id } = ev.target
        const gov_file_id = id.split("-")[1]
        for (const file of EofficeFile) {
            if (file.gov_file_id === parseInt(gov_file_id)) {
                setDoc(file.doc)
                setSelect([])
            }
        }
    }

    const handleSelectDoc = (ev) => {
        const { id, dataset } = ev.target;
        const doesselected = dataset.doesselected === "true"
        if (!doesselected) {
            setSelect([...select, id]);
        }
        else {
            setSelect(select.filter(item => item !== id));
        }
    }


    return (
        <>
            {
                stateEoffice &&
                <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[1001] bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
                        <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-[#f0f2f5]">
                            <div className="relative">
                                <button onClick={() => setStateEoffice(false)} className="text-[20px] absolute right-0 w-[40px] h-full bg-blue-300 top-0 text-black ">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                                <div className="bg-blue-300 text-black font-bold py-[8px] px-[24px]">
                                    <p className='text-bold'>Thêm văn bản từ EOFFICE</p>

                                </div>
                            </div>
                            <div className="pt-[16px] mx-[24px] flex justify-end">
                                <div className="w-[12.5%] text-center px-[5px] flex">
                                    <button className="rounded-[5px] h-[30px] flex justify-center w-full px-[16px] items-center text-[12px] font-medium custom-btn-add-file">

                                        Thêm văn bản
                                    </button>

                                </div>
                            </div>

                            <div className="w-full h-full  py-[24px] bg-[#f0f2f5]">
                                <div className='flex h-full'>
                                    <div className='ml-[24px] h-full w-[50%] border-r-[4px]'>
                                        <h2 className='text-[28px] font-medium'>Hồ sơ</h2>
                                        <ul>
                                            {EofficeFile.map((item, index) => {
                                                return (
                                                    <li id={`file-${item.gov_file_id}`} onClick={handleClickFile} className='font-medium border-b-2 text-[14px] cursor-pointer py-[8px] hover:bg-[#e1e1e1]'>
                                                        <span className='mx-[12px] text-[#ccc]'>
                                                            <i className="fa-solid fa-folder"></i>
                                                        </span>
                                                        {item.file_name}
                                                    </li>
                                                )
                                            })}

                                        </ul>

                                    </div>
                                    <div className='ml-[24px] h-full w-[50%]'>
                                        <h2 className='text-[28px] font-medium'>Văn bản, Tài liệu</h2>
                                        {doc.length > 0 &&
                                            <ul>
                                                {
                                                    doc.map((item, index) => {
                                                        return (
                                                            <li id={`select-file-${index}`} onClick={handleSelectDoc} data-doesSelected={select.includes(`select-file-${index}`)} className={`font-medium border-b-2 text-[14px] cursor-pointer py-[8px] ${select.includes(`select-file-${index}`) ? "bg-[#e1e1e1]" : ""} `}>
                                                                <span className='mx-[12px] text-[#ccc]'>
                                                                    <i class="fa-solid fa-file"></i>
                                                                </span>
                                                                {item.name}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}
export default EOFFICE
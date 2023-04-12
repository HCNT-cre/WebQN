import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

const API_DOC_UPDATE = process.env.REACT_APP_API_DOC_UPDATE

const FORM_FIELDS = [
    { key: "issued_date", title: "Ngày tháng năm văn bản", require: true, type: "text" },
    { key: "autograph", title: "Bút tích", require: true, type: "text" },
    { key: "code_number", title: "Số của văn bản", require: true, type: "text" },
]


const FixDoc = ({ pdfData, pdfFile, setStateFixDoc, stateFixDoc, API_PDF, pdfID }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [form, setForm] = useState(null)

    useEffect(() => {
        setForm(pdfData)
    }, [pdfData])

    console.log(pdfData, form)
    console.log(pdfID)

    const extractDataOCR = async () => {
        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('ratio', '20,1');
        formData.append('threshold', '0.7');
        try {
            console.log("start fetch API");
            const response = await axios.post('http://157.230.37.228:4444/extract', formData);
            console.log(response);
            console.log(response.data.no.join(' '));
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = async () => {
        const response = await axios.patch(API_DOC_UPDATE + pdfID, form)
        alert('Lưu thành công')
        window.location.reload()
    }
    const handleChangeForm = (ev) => {
        const { name, value } = ev.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            {stateFixDoc &&
                <div className="overflow-y-scoll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[200] bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)]  top-[20px] pb-[30px] ">
                        <div className="h-full  w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className=" h-full relative rounded-[2px] bg-white">
                                <div className="bg-[#2f54eb] text-white py-[8px] px-[24px] relative">
                                    <p className='text-bold'>Xem và chỉnh sửa</p>
                                    <button onClick={() => { setStateFixDoc(false) }} className="text-[20px] absolute right-0 w-[2%] h-full flex items-center justify-center bg-[#2f54eb] top-0 text-white ">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className='w-full'>
                                    <div className="flex pt-[8px]">
                                        <div className='h-full pl-[12px] w-[50%]'>
                                            <div className='flex'>
                                                <div className="w-full h-[85vh] overflow-x-hidden overflow-y-auto bg-[#e4e4e4] flex justify-center items-center">
                                                    {pdfFile && (
                                                        <Worker className="w-[60%]" workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
                                                            <Viewer className="w-[60%]" fileUrl={API_PDF}
                                                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                                                        </Worker>
                                                    )}

                                                    {/* render this if we have pdfFile state null   */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='h-full w-[50%] pl-[12px] mr-[12px] '>
                                            <div className='w-full flex justify-end'>
                                                <button onClick={extractDataOCR} className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Trích xuất thông tin</button>
                                                <button onClick={handleSubmit} className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Lưu</button>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <p className={`outline-none w-[50%] block text-[14px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</p>
                                            </div>
                                            <div className='h-[75vh] overflow-y-auto mt-[16px]'>
                                                {
                                                    <div>
                                                        <form>
                                                            <div className="flex justify-between">
                                                                <div className="w-full px-[10px]">
                                                                    {FORM_FIELDS.map((field, index) => {
                                                                        return (
                                                                            <div
                                                                                key={field.key}
                                                                                className="mt-[8px] w-full mb-[24px]"
                                                                            >
                                                                                <label
                                                                                    className={`${field.require ? "after-form" : ""
                                                                                        } text-[14px] font-[500]`}
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
                                                                                        value={form === null ? "" : form[field.key]}
                                                                                        className="focus:shadow-[0_0_0_2px_rgba(0,0,255,.2)] focus:outline-none focus:border-[#2930ff] hover:border-[#2930ff] hover:border-r-[1px] w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px]"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>

                                                            </div>
                                                        </form>
                                                    </div>
                                                }
                                            </div>
                                        </div>
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

export default FixDoc
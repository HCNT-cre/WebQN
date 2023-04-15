import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { notifyError, notifySuccess } from '../../../../custom/Function';
import { Button, Spin } from 'antd';
import { GetDateFromString } from '../../../../custom/Function';
import { FORM_FIELDS } from '../../../../storage/DocumentStorage';
import { ValidateFormDoc } from '../../../../custom/Function';


const API_DOCUMENT_UPDATE = process.env.REACT_APP_API_DOCUMENT_UPDATE
const API_EXTRACT_OCR = process.env.REACT_APP_API_EXTRACT_OCR


const FixDoc = ({ pdfData, pdfFile, setStateFixDoc, stateFixDoc, API_PDF, pdfID }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setFormData(pdfData)
    }, [pdfData])

    const extractDataOCR = async () => {
        try {
            setIsLoading(true)

            const dataExtract = new FormData();
            await axios.get(API_PDF, {
                responseType: 'blob',
            }).then(res => {
                dataExtract.append('file', res.data);
            })
            dataExtract.append('ratio', '20,1');
            dataExtract.append('threshold', '0.7');
            const response = await axios.post(API_EXTRACT_OCR, dataExtract, {
                timeout: 20000
            });

            handleChangeForm("code_number", response.data.no.join(' '));
            handleChangeForm("issued_date", response.data.date.join(' '));
            handleChangeForm("autograph", response.data.signer.join(' '));

            setIsLoading(false)
            notifySuccess('Trích xuất thành công')
        } catch (error) {
            setIsLoading(false)
            notifyError('Trích xuất thất bại')
        }
    }

    const handleSubmitForm = async (ev) => {
        ev.preventDefault()
        formData["issued_date"] = GetDateFromString(formData["issued_date"])
        if (formData["code_number"] !== null && formData["code_number"] !== undefined)
            formData["code_number"] = formData["code_number"].split('').splice(0, Math.min(10, formData["code_number"].length)).join('');

        const formDataValidated = ValidateFormDoc(formData)
        try {
            setIsLoading(true)
            await axios.post(API_DOCUMENT_UPDATE, { ...formDataValidated, id: pdfID })
            setIsLoading(false)
            notifySuccess('Cập nhật thành công')
        } catch (error) {
            setIsLoading(false)
            notifyError('Cập nhật thất bại')
        }
    }

    const handleChangeForm = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
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
                                                <Button onClick={extractDataOCR} className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Trích xuất thông tin</Button>
                                                <Button htmlType="submit" form="fix-doc-form" className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Lưu</Button>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <p className={`outline-none w-[50%] block text-[14px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</p>
                                            </div>
                                            <div className='h-[75vh] overflow-y-auto mt-[16px]'>
                                                {
                                                    <Spin tip="Đang xử lý" spinning={isLoading} delay={0}>
                                                        <div>
                                                            <form id="fix-doc-form" onSubmit={handleSubmitForm}>
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
                                                                                            onChange={(ev) => handleChangeForm(ev.target.name, ev.target.value)}
                                                                                            name={field.key}
                                                                                            placeholder={field.title}
                                                                                            type={field.type}
                                                                                            min="0"
                                                                                            value={formData === null ? "" : formData[field.key]}
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
                                                    </Spin>
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
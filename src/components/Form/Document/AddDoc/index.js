/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { Spin, Select } from "antd"
import { FORM_FIELDS } from '../../../../storage/DocumentStorage';
import { notifyError, notifySuccess } from '../../../../custom/Function';
import { Input, Button } from "antd"
import { ValidateFormDoc } from '../../../../custom/Function';
import { FirstLower } from '../../../../custom/Function';
import { SetNull } from '../../../../custom/Function';

const API_EXTRACT_OCR = process.env.REACT_APP_API_EXTRACT_OCR
const API_DOCUMENT_UPLOAD = process.env.REACT_APP_API_DOCUMENT_UPLOAD


const AddDoc = ({ stateAddDoc, setStateAddDoc, evFilesUploaded, fetchDocumentsOfFile, govFileID }) => {
    const [request, setRequest] = useState({
        gov_file_id: null,
        file: null,
        issued_date: null,
        autograph: null,
        code_number: null,
        doc_ordinal: null,
        num_page: null,

        doc_code: null,
        identifier: null,
        organ_id: null,
        file_catalog: null,
        file_notation: null,
        type_name: null,
        code_notation: null,
        organ_name: null,
        subject: null,
        language: null,
        page_amount: null,
        description: null,
        infor_sign: null,
        keyword: null,
        mode: null,
        confidence_level: null,
        format: null,
    });

    const [currentTab, setCurrentTab] = useState(0)
    const [pdfFile, setPdfFile] = useState(null);
    const [files, setFiles] = useState(null)
    const [isSubmitFormSuccess, setIsSubmitFormSuccess] = useState(false)
    const allowedFiles = ['application/pdf']
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setRequest(prev => ({
            ...prev,
            "gov_file_id": govFileID
        }))
    }, [govFileID])


    useEffect(() => {
        if (evFilesUploaded !== null)
            setFiles(Array.from(evFilesUploaded.target.files))
    }, [evFilesUploaded])

    const handleChangePdfFile = (index) => {
        if (files === null || files.length === 0) return null
        const selectedFile = files[index];
        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                }
            } else {
                setPdfFile('');
            }
        } else {
            console.log('please select a PDF');
        }
    }

    useEffect(() => {
        handleChangePdfFile(0)
    }, [files])

    // tab operations
    const handleChangeTab = (index) => {
        setRequest((prev) => {
            return SetNull(prev)
        })
        handleChangePdfFile(index)
        setCurrentTab(index);
    };

    const handleCloseAllTab = () => {
        setStateAddDoc(false)
        setCurrentTab(0)
        setPdfFile(null)
        setFiles(null)
        setRequest(prev => {
            return SetNull(prev)
        })
        if (isSubmitFormSuccess === true) {
            fetchDocumentsOfFile(govFileID)
        }
    }

    const handleCloseTab = (index) => {
        setRequest(prev => {
            return SetNull(prev)
        })

        if (index >= files.length)
            return

        if (files.length === 1) {
            handleCloseAllTab()
            return
        }

        setFiles(preFiles => {
            const newFiles = [...preFiles]
            newFiles.splice(index, 1)
            return newFiles
        })
    }

    const handleAddMoreFiles = (ev) => {
        setFiles(preFiles => {
            let newFiles = [...preFiles]
            let addFile = Array.from(ev.target.files)
            newFiles = newFiles.concat(addFile)
            return newFiles
        })
    }

    const extractDataOCR = async () => {
        const selectedFile = files[currentTab]
        const dataExtract = new FormData();
        dataExtract.append('file', selectedFile);
        dataExtract.append('ratio', '20,1');
        dataExtract.append('threshold', '0.7');

        try {
            setIsLoading(true)
            const response = await axios.post(API_EXTRACT_OCR, dataExtract, {
                timeout: 20000
            });
            console.log(response)
            setIsLoading(false)

            handleChangeForm("code_number", response.data.no.join(' '));
            handleChangeForm("issued_date", response.data.date.join(' '));
            handleChangeForm("autograph", response.data.signer.join(' '));

            notifySuccess('Trích xuất thành công')
        } catch (error) {
            setIsLoading(false)
            notifyError('Trích xuất thất bại')
        }
    }

    const handleChangeForm = (name, value) => {
        setRequest(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmitForm = async (ev) => {
        ev.preventDefault()

        for (const field of FORM_FIELDS) {
            if (field.require && (request[field.key] === null || request[field.key] === "")) {
                notifyError("Vui lòng nhập " + FirstLower(field.title))
                return
            }
        }

        const num_page = Number(document.getElementsByClassName("rpv-toolbar__label")[0].textContent.split(" ")[1])
        request["num_page"] = num_page
        request["file"] = files[0]
        const formDataValidated = ValidateFormDoc(request)

        try {
            setIsLoading(true)
            await axios.post(API_DOCUMENT_UPLOAD, formDataValidated, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            setIsLoading(false)
            setIsSubmitFormSuccess(true)
            notifySuccess("Thêm văn bản thành công")
        } catch (error) {
            setIsLoading(false)
            notifyError("Thêm văn bản thất bại")
        }
    }

    return (
        <>
            {stateAddDoc &&
                <div className="overflow-y-scoll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[200] bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)]  top-[20px] pb-[30px] ">
                        <div className="h-full  w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className=" h-full relative rounded-[2px] bg-white">
                                <div className="bg-[#2f54eb] text-white py-[8px] px-[24px] relative">
                                    <p className='text-bold'>Thêm văn bản</p>
                                    <button onClick={handleCloseAllTab} className="text-[20px] absolute right-0 w-[2%] h-full flex items-center justify-center bg-[#2f54eb] top-0 text-white ">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className='w-full'>
                                    <div className='pl-[4px] flex w-full h-[40px] bg-gray-400 items-center relative cursor-pointer'>
                                        {files !== null && files.map((file, index) => {
                                            const width = 95 / files.length + "%"
                                            const bgColor = index === currentTab ? "bg-white" : "bg-gray-300"
                                            return (
                                                <div key={index} onClick={() => handleChangeTab(index)} style={{ width: width }} className='max-w-[15%] pr-[4px]'>
                                                    <div className={` ${bgColor}  px-[4px] h-[30px] border-solid border-[1px] rounded-[5px] flex items-center cursor-pointe hover:bg-gray-200 justify-between pl-[6px]`}>
                                                        <p className='leading-[20px] h-[20px] text-[10px] overflow-hidden '>{file.name}</p>
                                                        <div onClick={() => handleCloseTab(index)} className='text-[12px] w-[15px] h-[15px] rounded-[5px] hover:bg-white flex items-center justify-center'>
                                                            <i class="fa-solid fa-xmark"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <div className='w-[2%] absolute right-0 text-white h-full rounded-[5px] flex items-center justify-center cursor-pointer'>
                                            <form encType="multipart/form-data">
                                                <label className='cursor-pointer' htmlFor="file-add-upload">
                                                    <i class="fa-solid fa-plus"></i>
                                                </label>
                                                <input onClick={(ev) => { ev.target.value = '' }} type='file' id="file-add-upload" name="file-upload" className="hidden" onChange={(ev) => {
                                                    handleAddMoreFiles(ev)
                                                }
                                                } accept="application/pdf" multiple></input>
                                            </form>
                                        </div>

                                    </div>


                                    <div className="flex pt-[8px]">
                                        <div className='h-full pl-[12px] w-[50%]'>
                                            <div className='flex'>
                                                <div className="w-full h-[80vh] overflow-x-hidden overflow-y-auto bg-[#e4e4e4] flex justify-center items-center">
                                                    {pdfFile && (
                                                        <Worker className="w-[60%]" workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
                                                            <Viewer className="w-[60%]" fileUrl={pdfFile}
                                                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                                                        </Worker>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='h-full w-[50%] pl-[12px] mr-[12px] '>
                                            <div className='w-full flex justify-end'>
                                                <Button onClick={extractDataOCR} className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Trích xuất thông tin</Button>
                                                <Button htmlType="submit" form="add-doc-form" className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Lưu</Button>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <div className={`outline-none w-[50%] block text-[14px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</div>
                                            </div>

                                            <div className='h-[70vh] overflow-y-auto mt-[16px]'>

                                                <Spin tip="Đang xử lý" spinning={isLoading} delay={0}>
                                                    <div>
                                                        <form id="add-doc-form" onSubmit={handleSubmitForm}>
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
                                                                                    field.default === true ? (
                                                                                        <Select
                                                                                            onChange={(value) => handleChangeForm(field.key, value)}
                                                                                            options={field.options}
                                                                                            className="w-full mt-[12px]"
                                                                                            defaultValue={field.options[0]}
                                                                                        >
                                                                                        </Select>
                                                                                    ) : (
                                                                                        <Select
                                                                                            onChange={(value) => handleChangeForm(field.key, value)}
                                                                                            options={field.options}
                                                                                            className="w-full mt-[12px]"
                                                                                        >
                                                                                        </Select>
                                                                                    )
                                                                                ) : (
                                                                                    <Input
                                                                                        required={field.require}
                                                                                        onChange={(ev) => handleChangeForm(ev.target.name, ev.target.value)}
                                                                                        value={request[field.key]}
                                                                                        name={field.key}
                                                                                        placeholder={field.title}
                                                                                        type={field.type}
                                                                                        min="0"
                                                                                        className="w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px]"
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

export default AddDoc


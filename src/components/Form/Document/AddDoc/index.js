import { useEffect, useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';

const API_EXTRACT_OCR = process.env.REACT_APP_API_EXTRACT_OCR
const API_DOCUMENT_UPLOAD = process.env.REACT_APP_API_DOCUMENT_UPLOAD

const FORM_FIELDS = [
    { key: "doc_ordinal", title: "Số thứ tự", require: true, type: "number" },
    { key: "doc_code", title: "Mã định danh văn bản", require: false, type: "text" },
    { key: "identifier", title: "Mã cơ quan lưu trữ lịch sử", require: false, type: "text" },
    { key: "issued_date", title: "Ngày, tháng, năm văn bản", require: false, type: "text" },
    { key: "autograph", title: "Bút tích", require: false, type: "text" },
    { key: "code_number", title: "Số của văn bản", require: false, type: "text" },
    { key: "organ_id", title: "Mã phông/công trình/sưu tập lưu trữ", require: false, type: "text" },
    { key: "file_catalog", title: "Mục lục số hoặc năm hình thành hồ sơ", require: false, type: "number" },
    { key: "file_notation", title: "Số và ký hiệu hồ sơ", require: false, type: "text" },
    { key: "type_name", title: "Tên loại văn bản", require: false, type: "text" },
    { key: "code_notation", title: "Ký hiệu của văn bản", require: false, type: "text" },
    { key: "organ_name", title: "Tên cơ quan, tổ chức ban hành văn bản", require: false, type: "text" },
    { key: "subject", title: "Trích yếu nội dung", require: false, type: "text" },
    { key: "language", title: "Ngôn ngữ", require: false, type: "text" },
    { key: "page_amount", title: "Số lượng trang của văn bản", require: false, type: "number" },
    { key: "description", title: "Ghi chú", require: false, type: "text" },
    { key: "infor_sign", title: "Ký hiệu thông tin", require: false, type: "text" },
    { key: "keyword", title: "Từ khóa", require: false, type: "text" },
    { key: "mode", title: "Chế độ sử dụng", require: false, type: "text" },
    { key: "confidence_level", title: "Mức độ tin cậy", require: false, type: "text" },
    { key: "format", title: "Tình trạng vật lý", require: false, type: "text" },
    
]

const AddDoc = ({ stateAddDoc, setStateAddDoc, evFilesUploaded, fetchDocumentsOfFile, govFileID }) => {
    const [formData, setFormData] = useState({
        "gov_file_id": null,
        "file": null,
        "issued_date": null,
        "autograph": null,
        "code_number": null,
        "doc_ordinal": null,
    });
        
    const [currentTab, setCurrentTab] = useState(0)
    const [pdfFile, setPdfFile] = useState(null);
    const [files, setFiles] = useState(null)
    const [isSubmitFormSuccess, setIsSubmitFormSuccess] = useState(false)
    const allowedFiles = ['application/pdf'];
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        setFormData(prev => ({
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

    const handleChangeTab = (index) => {
        setFormData((prev) => ({
            ...prev,
            "file": null,
            "issued_date": null,
            "autograph": null,
            "code_number": null,
        }))
        handleChangePdfFile(index)
        setCurrentTab(index);
    };

    const extractDataOCR = async () => {
        const selectedFile = files[currentTab]
        const dataExtract = new FormData();
        dataExtract.append('file', selectedFile);
        dataExtract.append('ratio', '20,1');
        dataExtract.append('threshold', '0.7');

        const changeFormWhenExtractOCR = (data) => {
            for (const key in formData) {
                if (key === "file" || key === "gov_file_id") continue
                if (data === "Processing") {
                    handleChangeForm(key, "Đang xử lý...")
                }
            }
        }

        try {
            changeFormWhenExtractOCR("Processing")
            const response = await axios.post(API_EXTRACT_OCR, dataExtract);
            handleChangeForm("code_number", response.data.no.join(' '));
            handleChangeForm("issued_date", response.data.date.join(' '));
            if (response.data.signer.join(' ') === "")
                handleChangeForm("autograph", null);
            else handleChangeForm("autograph", response.data.signer.join(' '));

        } catch (error) {
            alert("Xử lý thất bại")
        }
    }

    const handleCloseAllTab = () => {
        setStateAddDoc(false)
        setCurrentTab(0)
        setPdfFile(null)
        setFiles(null)
        setFormData(prev => ({
            "file": null,
            "gov_file_id": govFileID,
            "issued_date": null,
            "autograph": null,
            "code_number": null,
        }))
        if (isSubmitFormSuccess === true) {
            fetchDocumentsOfFile(govFileID)
        }
    }

    const handleCloseTab = (index) => {
        setFormData({
            "IssuedDate": "",
            "Autograph": "",
            "CodeNumber": "",
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

    const handleChangeForm = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmitForm = async (ev) => {
        ev.preventDefault()
        formData["issued_date"] = "2022-01-01"
        formData["code_number"] = "AAAAAAAAA"
        formData["file"] = files[0]

        try {
            await axios.post(API_DOCUMENT_UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsSubmitFormSuccess(true)
            alert("Thêm văn bản thành công")
        } catch (error) {
            alert("Thêm văn bản thất bại")
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
                                    <div className='pl-[4px] flex w-full h-[40px] bg-gray-400 items-center relative'>
                                        {files !== null && files.map((file, index) => {
                                            const width = 95 / files.length + "%"
                                            const isActive = index === currentTab ? "white" : ""
                                            return (
                                                <div onClick={() => handleChangeTab(index)} style={{ width: width }} className='max-w-[15%] pr-[4px]'>
                                                    <div style={{ backgroundColor: isActive }} className='px-[4px] h-[30px] border-solid border-[1px] rounded-[5px] flex items-center cursor-pointer bg-gray-300 hover:bg-gray-200 justify-between pl-[6px]'>
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

                                                    {/* render this if we have pdfFile state null   */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='h-full w-[50%] pl-[12px] mr-[12px] '>
                                            <div className='w-full flex justify-end'>
                                                <button onClick={extractDataOCR} className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Trích xuất thông tin</button>
                                                <button type="submit" form="add-doc-form" className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Lưu</button>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <button className={`outline-none w-[50%] block text-[14px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</button>
                                            </div>
                                            <div className='h-[70vh] overflow-y-auto mt-[16px]'>
                                                {
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
                                                                                    <select
                                                                                        required={field.require}
                                                                                        onChange={(ev) => handleChangeForm(ev.target.name, ev.target.value)}
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
                                                                                        value={formData[field.key]}
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

export default AddDoc
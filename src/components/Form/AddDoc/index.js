import { useEffect, useState, useMemo } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';

const formFields = [
    {
        key: "Identifier",
        title: "Mã cơ quan lưu trữ lịch sử",
        require: false,
        type: "text",
    },
    {
        key: "Organld",
        title: "Mã phông/công trình/sưu tập lưu trữ",
        require: true,
        type: "options",
    },
    {
        key: "FileCatalog",
        title: "Mục lục hoặc năm hình thành hồ sơ",
        require: false,
        type: "number",
    },
    {
        key: "FileNotation",
        title: "Số và ký hiệu hồ sơ",
        require: false,
        type: "text",
    },
    { key: "Title", title: "Tiêu đề hồ sơ", require: true, type: "text" },
    {
        key: "Maintenance",
        title: "Thời hạn bảo quản",
        require: true,
        type: "options",
    },
    {
        key: "Rights",
        title: "Chế độ sử dụng",
        require: true,
        type: "select",
        options: [
            { value: "Công Khai", label: "Công Khai" },
            { value: "Riêng tư", label: "Riêng tư" },
        ],
    },
    { key: "Language", title: "Ngôn ngữ", require: false, type: "text" },
];


const AddDoc = ({ stateAddDoc, setStateAddDoc, evFilesUploaded }) => {
    
    const [currentTab, setCurrentTab] = useState(0)
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState('');
    
    const allowedFiles = ['application/pdf'];
    const [docNo, setDocNo] = useState('')
    const [docDate, setDocDate] = useState('')
    const [docSigner, setDocSigner] = useState('')
    const [files, setFiles] = useState(null)

    useEffect(() => {
        if(evFilesUploaded !== null)
            setFiles(Array.from(evFilesUploaded.target.files))
    },[evFilesUploaded])

    useEffect(() => {
        console.log("files changed");
        console.log("files: ", files);
        if (files === null) return
        const selectedFile = files[0];
        console.log("selectedFile: ", selectedFile);
        if (selectedFile) {
            console.log("uploaded file:", selectedFile);
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfError('');
                    setPdfFile(e.target.result);
                }
            }
            else {
                setPdfError('Chỉ hỗ trợ file PDF');
                setPdfFile('');
            }
        }
        else {
            console.log('please select a PDF');
        }
    }, [files])

    const handleChangeTab = (index) => {
        console.log("change tab", index);
        if (files === null || files.length === 0) return
        const selectedFile = files[index];
        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                setCurrentTab(index);
                reader.onloadend = (e) => {
                    setPdfError('');
                    setPdfFile(e.target.result);
                }
            }
            else {
                setPdfError('Chỉ hỗ trợ file PDF');
                setPdfFile('');
            }
        }
        else {
            console.log('please select a PDF');
        }
    };

    const extractDataOCR = async () => {
        console.log("start fetch data...");
        const selectedFile = files[currentTab]
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('ratio', '20,1');
        formData.append('threshold', '0.7');
        try {
            console.log("start fetch API");
            setDocNo('đang xử lý...');
            setDocDate('đang xử lý...');
            setDocSigner('đang xử lý...');
            const response = await axios.post('http://157.230.37.228:4444/extract', formData);
            console.log(response);
            setDocNo(response.data.no.join(' '));
            setDocDate(response.data.date.join(' '));
            setDocSigner(response.data.signer.join(' '));
            console.log(response.data.no.join(' '));

        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseTabAllTab = () => {
        setStateAddDoc(false)
        setCurrentTab(0)
        setPdfFile(null)
    }

    const handleCloseTab = (index) => {
        console.log("close tab: ", index);
        if (index >= files.length)
            return
        setFiles(preFiles =>{
            const newFiles = [...preFiles]
            newFiles.splice(index, 1)
            return newFiles
        })
    }

    const handleAddMoreFiles = (ev) => {
        setFiles(preFiles =>{
            let newFiles = [...preFiles]
            let addFile = Array.from(ev.target.files)
            newFiles = newFiles.concat(addFile)
            return newFiles
        })
    }

    const handleChangeForm = (ev) => { }

    return (
        <>
            {stateAddDoc &&
                <div className="overflow-y-scoll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-10 bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)]  top-[20px] pb-[30px] ">
                        <div className="h-full  w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className=" h-full relative rounded-[2px] bg-white">

                                <div className="bg-[#2f54eb] text-white py-[8px] px-[24px] relative">
                                    <p className='text-bold'>Thêm văn bản</p>
                                    <button onClick={handleCloseTabAllTab} className="text-[20px] absolute right-0 w-[2%] h-full flex items-center justify-center bg-[#2f54eb] top-0 text-white ">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                {
                                    // <div className="z-50">
                                    //     <h1>Add Doc</h1>
                                    //     <form
                                    //         encType="multipart/form-data"
                                    //     >
                                    //         <input accept="application/pdf, image/jpeg, .avi, .wmv, .MPEG-4, audio/mp3, .vma" onChange={(ev) => { console.log(ev.target.files) }} type="file" id="file" multiple />
                                    //     </form>
                                    // </div>
                                }

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
                                                    console.log("on change");
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
                                                <button className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px]'>Lưu</button>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <button className={`outline-none w-[50%] block text-[14px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</button>
                                            </div>
                                            <div className='h-[70vh] overflow-y-auto mt-[16px]'>
                                                {
                                                    <div>
                                                        <form>
                                                            <div className="flex justify-between">
                                                                <div className="w-full px-[10px]">
                                                                    {formFields.map((field, index) => {
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
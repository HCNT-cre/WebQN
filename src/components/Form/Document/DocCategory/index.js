/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import AddDoc from "../AddDoc"
import { Table } from "../../../../custom/Components"
import axios from "axios"
import FixDoc from "../FixDoc"
import { DeleteData, GetDataFromIDFile } from "../../../../custom/Function"
import { Button, Popconfirm } from 'antd';

import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector } from "react-redux"

const API_DOCUMENT_GET = process.env.REACT_APP_API_DOCUMENT_GET
const API_DOCUMENT_DELETE = process.env.REACT_APP_API_DOCUMENT_DELETE

const TABLE_FIELDS = [
    { title: "TT", key: "doc_ordinal", width: "50px" },
    { title: "Ngày ban hành", key: "issued_date", width: "100%" },
    { title: "Bút ký", key: "autograph", width: "100%" },
    { title: "Mã văn bản", key: "code_number", width: "100%" },
    { title: "Tên văn bản", key: "doc_name", width: "100%" },
    { title: "Chức năng", key: "Function", width: "100px" },
]

const ButtonFunctions = ({ pdfData, URL_PDF_FILE, handleClickOnDocument, pdfID, fetchDocumentsOfFile, govFileID }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        DeleteData(API_DOCUMENT_DELETE, { id: pdfID }, "Xóa văn bản thành công")
        setTimeout(async () => {
            await fetchDocumentsOfFile(govFileID)
        }, 500)
        setOpen(false)
    }

    useEffect(() => {
        const popupContainer = document.querySelectorAll(".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1vtf12y.css-dev-only-do-not-override-1vtf12y.ant-popover-placement-top")[0]

        if (popupContainer === undefined)
            return

        const buttonAccepts = document.querySelectorAll(".ant-popconfirm-buttons > .ant-btn-primary")
        buttonAccepts.forEach((buttonCancel) => {
            buttonCancel.textContent = "Xóa"
        })

        const buttonCancels = document.querySelectorAll(".ant-popconfirm-buttons > .ant-btn-default ")
        buttonCancels.forEach((buttonAccept) => {
            buttonAccept.textContent = "Hủy"
        })
    }, [open])

    return (
        <div className="flex justify-between">
            <Button onClick={(ev) => handleClickOnDocument(URL_PDF_FILE, pdfData, pdfID)} className="w-[33%] px-[2px] border-none font-bold italic block text-center text-[16px] hover:underline text-[#537FE7]" title="Xem chi tiết"><i className="fa-regular fa-eye"></i></Button>

            <Popconfirm title="Xóa văn bản"
                open={open}
                description="Bạn có chắc chắn xóa?"
                onConfirm={handleConfirm}
                onCancel={handleClose}
            >
                <Button onClick={() => { setOpen(true) }} className="w-[33%] px-[2px] border-none font-bold italic block text-center text-[16px] hover:underline text-[#7d8183]" title="Xóa" ><i className="fa-solid fa-trash-can"></i></Button>
            </Popconfirm>


            <Button className="w-[33%] px-[2px] border-none font-bold italic block text-center text-[16px] hover:underline text-[#FF8400]" title="Phân quyền"><i className="fa-solid fa-user-doctor"></i></Button>
        </div>
    )
}

const DocCategory = ({ stateDocCategory, setStateDocCategory, govFileID }) => {
    const [stateAddDoc, setStateAddDoc] = useState(false)
    const [stateFixDoc, setStateFixDoc] = useState(false)
    const [evFilesUploaded, setEvFilesUploaded] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [files, setFiles] = useState([])
    const [pdfFile, setPdfFile] = useState(null)
    const [pdfFileLink, setPdfFileLink] = useState(null)
    const [pdfData, setPdfData] = useState(null)
    const [pdfID, setPdfID] = useState(null)
    const [fileData, setFileData] = useState(null)
    const userPermissionId = useSelector(state => state.user.permission_id)
    const handleClickOnDocument = async (URL_PDF_FILE, pdfData, pdfID) => {
        setPdfFileLink(URL_PDF_FILE)
        setPdfData(pdfData)
        setPdfID(pdfID)
        await axios.get(URL_PDF_FILE).then(res => {
            setPdfFile(res.data)
            setStateFixDoc(true)
        }).catch(err => console.log("errors:", err))
    }

    const fetchDocumentsOfFile = (govFileID) => {
        const fetchData = async (govFileID) => {
            const currentAPI = `${API_DOCUMENT_GET}${govFileID}`;
            try {
                setIsLoading(true)
                const response = await fetch(currentAPI);
                if (response.ok) {
                    const rawDatas = await response.json();
                    const filesArray = []
                    for (const rawData of rawDatas) {
                        filesArray.push({
                            "id": rawData.id,
                            "doc_ordinal": rawData.doc_ordinal,
                            "issued_date": rawData.issued_date,
                            "autograph": rawData.autograph,
                            "code_number": rawData.code_number,
                            "doc_name": rawData.doc_name,
                            "Function": <ButtonFunctions pdfData={rawData} URL_PDF_FILE={rawData.url} handleClickOnDocument={handleClickOnDocument} pdfID={rawData.id} fetchDocumentsOfFile={fetchDocumentsOfFile} govFileID={govFileID} />,
                        })
                    }
                    setFiles(filesArray)
                }
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        fetchData(govFileID)
    }


    useEffect(() => {
        const fetchData = async () => {
            fetchDocumentsOfFile(govFileID);
            const data = await GetDataFromIDFile(govFileID, userPermissionId)
            setFileData(data)
        }

        if (govFileID === -1 || govFileID === null)
            return

        fetchData()
    }, [govFileID])


    return (
        <>
            {
                stateDocCategory &&
                <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[100] bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
                        <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-[#f0f2f5]">
                            <div className="relative">
                                <button onClick={() => { setStateDocCategory(false) }} className="text-[20px] absolute right-0 w-[40px] h-full bg-[#2f54eb] top-0 text-white ">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                                <div className="bg-[#2f54eb] text-white py-[8px] px-[24px]">
                                    <p className='text-bold'>Mục lục văn bản</p>

                                </div>
                            </div>
                            <div className="w-full pb-[24px] bg-[#f0f2f5]">
                                <div className="pt-[16px] mx-[24px] flex ">
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Tác giả" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Số ký hiệu VB" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Trích yếu VB" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] px-[5px]">
                                        <input placeholder="Ngày VB" className="bar-page-input"></input>
                                    </div>
                                    <div className="w-[12.5%] text-white text-center px-[5px] flex">
                                        <button className="rounded-[5px] h-[30px] flex justify-center bg-[#00f] w-full px-[16px] items-center text-[12px] ">
                                            <div className="mr-[8px]">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                            Tìm kiếm
                                        </button>

                                    </div>

                                    <div className="w-[12.5%] text-white  text-center px-[5px]">
                                        <form encType="multipart/form-data">
                                            <label className='flex justify-center items-center cursor-pointer w-auto h-[30px] bg-[#00f] rounded-[5px] text-white hover:opacity-90 text-[12px]' htmlFor="file-upload">
                                                <i className="fa-solid fa-upload"></i>
                                                <p className='ml-[8px]'>Thêm văn bản</p>
                                            </label>
                                            <input onClick={(ev) => { ev.target.value = '' }} type='file' id="file-upload" name="file-upload" className="hidden" onChange={(ev) => {
                                                setStateAddDoc(true)
                                                setEvFilesUploaded(prev => ev)
                                            }} accept="application/pdf" multiple></input>
                                        </form>

                                    </div>
                                    <div className="w-[12.5%] text-white text-center px-[5px] flex">

                                        <button className="rounded-[5px] h-[30px] flex justify-center bg-[#00f] w-full px-[4px] items-center text-[12px] ">
                                            <div className="mr-[8px]">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                            Thêm VB từ EOFFICE
                                        </button>

                                    </div>

                                </div>
                                <Table fieldNames={TABLE_FIELDS} fieldDatas={files} isLoading={isLoading} />
                            </div>
                        </div>
                    </div>
                </div>
            }

            <FixDoc pdfID={pdfID} pdfData={pdfData} pdfFile={pdfFile} setStateFixDoc={setStateFixDoc} stateFixDoc={stateFixDoc} API_PDF={pdfFileLink} fetchDocumentsOfFile={fetchDocumentsOfFile} govFileID={govFileID} fileData={fileData} />
            <AddDoc stateAddDoc={stateAddDoc} setStateAddDoc={setStateAddDoc} evFilesUploaded={evFilesUploaded} fetchDocumentsOfFile={fetchDocumentsOfFile} govFileID={govFileID} fileData={fileData} />
        </>
    )
}
export default DocCategory
/* eslint-disable react-hooks/exhaustive-deps */
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';
import { INCOMING_DOC, OUTCOMING_DOC, MARKED_DOC } from '../../../storage/Eoffice';
import AddDoc from './AddDoc';
import { useSelector } from 'react-redux';
import { GetDataFromIDFile } from '../../../custom/Function';
import axios from 'axios';
import { Table } from '../../../custom/Components'
import { Button, Input, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

const Search = Input.Search;

const TABLE_FIELDS = [
    { title: "Số ký hiệu", width: "100%" },
    { title: "Trích yếu", width: "200%" },
    { title: "Tên văn bản", width: "100%" }]

const SIDEBAR = [
    { id: 1, docs: INCOMING_DOC, gov_file_id_of_doc: 39 },
    { id: 2, docs: OUTCOMING_DOC, gov_file_id_of_doc: 39 },
    { id: 3, docs: MARKED_DOC, gov_file_id_of_doc: 39 },
    { id: 4, docs: INCOMING_DOC, gov_file_id_of_doc: 39 },
    { id: 5, docs: OUTCOMING_DOC, gov_file_id_of_doc: 39 },
    { id: 6, docs: MARKED_DOC, gov_file_id_of_doc: 39 },
    { id: 7, docs: INCOMING_DOC, gov_file_id_of_doc: 39 },
    { id: 8, docs: OUTCOMING_DOC, gov_file_id_of_doc: 39 },
    { id: 9, docs: MARKED_DOC, gov_file_id_of_doc: 39 }
]


const EOFFICE = ({ setStateEoffice, stateEoffice, fetchDocumentsOfFile, govFileID }) => {

    const [docs, setDocs] = useState([])
    const [stateAddDoc, setStateAddDoc] = useState(false)
    const [fileData, setFileData] = useState(null)
    const [fileUploaded, setFileUploaded] = useState(null)
    const userPermissionId = useSelector(state => state.user.permission_id)
    const [govFileIdOfDoc, setGovFileIdOfDoc] = useState(null)
    const [stateCheckBox, setStateCheckBox] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dataTable, setDataTable] = useState([])

    const handleClickFile = (id) => {
        setIsLoading(true)
        const gov_file_id = id.split("-")[1]
        for (const tab of SIDEBAR) {
            if (tab.id === parseInt(gov_file_id)) {
                setDocs(tab.docs)
                const _doc = []
                for (const doc of tab.docs) {
                    let __doc = { ...doc }
                    delete __doc.link
                    _doc.push(__doc)
                }
                setDataTable(_doc)
                setGovFileIdOfDoc(tab.gov_file_id_of_doc)
            }
        }
        setIsLoading(false)
    }

    const item = [
        {
            key: 1,
            icon:
                <span className='mx-[12px] text-[#FF8400]'>
                    <i className="fa-solid fa-folder"></i>,
                </span>,
            label: "Văn bản đến",
            children: [
                {
                    id: "file-1",
                    key: "sub-1",
                    label: "Văn bản đến cần xử lý",
                    onClick: () => { handleClickFile("file-1") }
                },
                {
                    id: "file-2",
                    key: "sub-2",
                    label: "Văn bản đến có ký số",
                    onClick: () => { handleClickFile("file-2") }
                },
                {
                    id: "file-3",
                    key: "sub-3",
                    label: "Văn bản đến không có ký số",
                    onClick: () => { handleClickFile("file-3") }
                },
                {
                    id: "file-4",
                    key: "sub-4",
                    label: "Văn bản đến đã xử lý",
                    onClick: () => { handleClickFile("file-4") }
                }
            ]
        },
        {
            key: 2,
            icon: <span className='mx-[12px] text-[#FF8400]'>
                <i className="fa-solid fa-folder"></i>,
            </span>,
            label: "Văn bản đi",
            children: [
                {
                    id: "file-5",
                    key: "sub-5",
                    label: "Văn bản đi cần xử lý",
                    onClick: () => { handleClickFile("file-5") }
                },
                {
                    id: "file-6",
                    key: "sub-6",
                    label: "Văn bản đi có ký số",
                    onClick: () => { handleClickFile("file-6") }
                },
                {
                    id: "file-7",
                    key: "sub-7",
                    label: "Văn bản đi không có ký số",
                    onClick: () => { handleClickFile("file-7") }
                },
                {
                    id: "file-8",
                    key: "sub-8",
                    label: "Văn bản đến đã xử lý",
                    onClick: () => { handleClickFile("file-8") }
                }
            ]
        },
        {
            key: 3,
            icon: <span className='mx-[12px] text-[#FF8400]'>
                <i className="fa-solid fa-folder"></i>,
            </span>,
            label: "Văn bản đánh dấu",
            id: `file-9`,
            onClick: () => { handleClickFile("file-9") }
        }
    ]


    const fetchDoc = async () => {
        const _docs = []
        for (const doc of docs) {
            for (const cb of stateCheckBox) {
                const idOfCb = parseInt(cb.substring(cb.indexOf("checkbox") + "checkbox".length))
                if (doc.id === idOfCb) {
                    await axios.get(doc.link, {
                        responseType: 'blob',
                    }).then(res => {
                        const uploadedFile = res.data
                        uploadedFile.name = doc.doc_name
                        _docs.push(uploadedFile);
                    })
                }
            }
        }
        setFileUploaded(_docs)
        setStateAddDoc(true)
    }

    const fetchFile = async () => {
        const data = await GetDataFromIDFile(govFileIdOfDoc, userPermissionId)
        setFileData(data)
    }

    const handleAddFile = () => {
        setIsLoading(true)
        fetchFile()
        fetchDoc()
        setIsLoading(false)
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


                            <div className="w-full h-full  py-[24px] bg-[#f0f2f5]">
                                <div className='flex h-full'>
                                    <div className='ml-[24px] h-full w-[20%] border-r-[4px] pr-[8px]'>


                                        <Sider width={"100%"}>
                                            <Menu mode="inline"
                                                defaultSelectedKeys={['1']}
                                                defaultOpenKeys={['sub1']}
                                                style={{
                                                    height: '100%',
                                                    borderRight: 0,
                                                    backgroundColor: '#e1e1e1'
                                                }}
                                                items={item}
                                            />
                                        </Sider>
                                    </div>
                                    <div className='ml-[24px] h-full w-[80%]'>
                                        <div className="pt-[12px] mx-[24px] flex justify-between">
                                            <div className='flex'>
                                                <Search allowClear placeholder="Nhập tên văn bản" enterButton />
                                            </div>
                                            <div className="w-[12.5%] text-center px-[5px] flex">
                                                <button onClick={handleAddFile} className="rounded-[5px] h-[30px] flex justify-center w-full px-[16px] items-center text-[12px] font-medium custom-btn-add-file">
                                                    Thêm văn bản
                                                </button>
                                            </div>
                                        </div>
                                        <div className='mt-[16px]'>
                                            <h2 className='text-[20px] pl-[24px] font-medium'>Văn bản, Tài liệu</h2>
                                            <Table isLoading={isLoading} setStateCheckBox={setStateCheckBox} fieldNames={TABLE_FIELDS} fieldDatas={dataTable} isCheckBox={true} headerBgColor='#ccc'/>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }

            <AddDoc stateAddDoc={stateAddDoc} setStateAddDoc={setStateAddDoc} fileData={fileData} govFileID={govFileID} fetchDocumentsOfFile={fetchDocumentsOfFile} fileUploaded={fileUploaded} />
        </>
    )
}
export default EOFFICE
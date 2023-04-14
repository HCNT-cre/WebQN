/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector} from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Select} from "antd"
import { Table } from "../../custom/Components";
import { FIELDS_TABLE } from "../../storage/HomeStorage"
import { STATE } from "../../storage/Storage"


const API_GOV_FILE_GET_ALL = process.env.REACT_APP_API_GOV_FILE_GET_ALL
const API_GOV_FILE_SEARCH = process.env.REACT_APP_API_GOV_FILE_GET_ALL


const Home = () => {
    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userPermissionId = useSelector(state => state.user.permission_id)


    const [search, setSearch] = useState({
        "title": null,
        "organ_id": null,
        "offce": null,
        "state": null,
        "type": null
    })


    const getFileFromResponse = (response) => {
        const rawDatas = response.data
        let filesArray = []
        for (const rawData of rawDatas) {
            const row = {
                'id': rawData.id,
                'gov_file_code': rawData.gov_file_code || '',
                'title': rawData.title || '',
                'organ_id': rawData.organ_id || '',
                'sheet_number': rawData.sheet_number || '',
                'total_doc': rawData.total_doc || '',
                'start_date': rawData.start_date || '',
                'maintenance': rawData.maintenance || '',
                'rights': rawData.rights || '',
                'state': <button onClick={() => {
                    search["state"] = rawData.state
                    handleSearch()
                }}>{STATE[rawData.state]}</button>,
            }
            filesArray.push(row)
        }
        return filesArray
    }

    const resetSearch = async () => {
        let request = API_GOV_FILE_SEARCH + userPermissionId
        const response = await axios.get(request)
        setFiles(getFileFromResponse(response))
        setSearch(prev => ({
            "title": '',
            "organ_id": '',
            "offce": '',
            "state": 'Tất cả',
            "type": ''
        }))
    }

    const reset = () => {
        const fetchFileData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(API_GOV_FILE_GET_ALL + userPermissionId)
                setIsLoading(false);
                setFiles(getFileFromResponse(response))
            } catch (err) {
                console.log(err)
            }
        };
        fetchFileData();
    }

    const handleSearch = async (ev) => {
        try {

            let request = API_GOV_FILE_SEARCH + userPermissionId
            console.log(search)
            Object.keys(search).forEach(key => {
                const value = search[key]
                if (value !== null & value !== '')
                    request += ("&" + key + "=" + value)
            })
            console.log(request)
            setIsLoading(true)
            const response = await axios.get(request, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsLoading(false)
            setFiles(getFileFromResponse(response))
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeSearch = (name, value) => {
        setSearch((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    useEffect(() => {
        reset()
    }, [userPermissionId])

    const BUTTON_ACTIONS = [
        { title: "Tìm kiếm", icon: <i className="fa-solid fa-magnifying-glass"></i>, onClick: handleSearch },
        { title: "Làm mới", icon: <i className="fa-solid fa-sync"></i>, onClick: resetSearch },
    ]

    return (
        <>
            <div className="w-full px-[24px] pb-[16px] bg-white">
                <p className="text-[20px] font-bold ">Trang chủ</p>
            </div>

            <div className="w-full my-[24px]">
                <div className="mt-[16px] mx-[24px] flex ">

                    <div className="w-[11.11111%] px-[5px]">
                        <Input allowClear onChange={(ev) => handleChangeSearch("title", ev.target.value)} value={search["title"]} name="title" placeholder="Tiêu đề hồ sơ" className="rounded-none text-[12px] w-full px-[12px] py-[6px] truncate h-[32px] flex items-center"></Input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <Input onChange={(ev) => handleChangeSearch("start_date", ev.target.value)} name="start_date" placeholder="Ngày bắt đầu" type="text" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} className="rounded-none text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"></Input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <Input onChange={(ev) => handleChangeSearch("end_date", ev.target.value)} name="end_date" placeholder="Ngày kết thúc" type="text" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} className="rounded-none text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"></Input>
                    </div>
                    <div className="w-[11.11111%] px-[5px]">
                        <Select
                            name="state"
                            className="w-full bg-white outline-none rounded-none"
                            allowClear
                            showSearch
                            defaultValue="Tất cả"
                            value={search["state"]}
                            optionFilterProp="children"
                            onChange={(value) => handleChangeSearch("state", value)}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: 'Mở',
                                },
                                {
                                    value: '2',
                                    label: 'Đóng',
                                },
                                {
                                    value: '3',
                                    label: 'Nộp lưu cơ quan',
                                },
                                {
                                    value: '4',
                                    label: 'Lưu trữ cơ quan',
                                },
                                {
                                    value: '5',
                                    label: 'Nộp lưu lịch sử',
                                },
                                {
                                    value: '6',
                                    label: 'Lưu trữ lịch sử',
                                },
                            ]}
                        />
                    </div>

                    {BUTTON_ACTIONS.map((item, index) => {
                        return (
                            <div key={index} className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
                                <Button onClick={item.onClick} className="rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center">
                                    <div className="mr-[8px]">
                                        {item.icon}
                                    </div>
                                    {item.title}
                                </Button>
                            </div>
                        )
                    }
                    )}

                </div>
                <Table fieldNames={FIELDS_TABLE} fieldDatas={files} isLoading={isLoading}  />
            </div >

        </>
    )
}

export default Home
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Select } from "antd"
import { useEffect, useState } from "react"
import { Input, Table, Modal } from "antd"
import axios from "axios";

const CATEGORY_FILE_API = process.env.REACT_APP_CATEGORY_FILE_API

// API: 
//     #id
//     #name
//     #description
//     #parent
//     #order

const Search = Input.Search;

const SearchBar = () => {
    return (
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[25%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

        </div>
    )
}

const Create = ({
    modalOpen,
    setModelOpen,
    reFetchData,
    order, // 1: first, 2: second, 3: third
    parent, // for 2 and 3
    select // for 2 and 3, 1 is "Đề mục gốc"
}) => {
    const [request, setRequest] = useState({})
    const [selectOrder, setSelectOrder] = useState([])
    const [defaultValue, setDefaultValue] = useState("Đề mục gốc")

    console.log(defaultValue)
    useEffect(() => {
        let selectFiltered = null
        const newSelect = []

        if (order === 1) {
            setSelectOrder([])
            return
        }

        if (order === 2)
            selectFiltered = select.filter(item => item.order === 1)
        if (order === 3)
            selectFiltered = select.filter(item => item.order === 2)

        selectFiltered.forEach(item => {
            const newItem = {
                label: item.name,
                value: item.id
            }
            newSelect.push(newItem)
        })

        setDefaultValue(newSelect.filter(item => item.value === parent)[0].label)
        setSelectOrder(prev => newSelect)
    }, [order])

    const handleOk = async () => {
        request["order"] = order
        request["parent"] = parent
        await axios.post(`${CATEGORY_FILE_API}`, request)
        reFetchData()
        setRequest({})
        setModelOpen(false)
    }


    const handleCancle = () => {
        setModelOpen(false)
    }

    const handleChangeRequest = (name, value) => {
        setRequest({
            ...request,
            [name]: value
        })
    }

    return (
        <Modal
            title="Tạo mới"
            style={{
                top: 20,
            }}
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancle}
        >
            <div>
                <div className="flex justify-between py-[12px]">
                    <span>Tên</span>
                    <Input name="name" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["name"]} />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Đề mục / Nhóm lớn</span>
                    <Select
                        options={selectOrder}
                        defaultValue={defaultValue}
                        name="parent"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="text"
                        className="w-[70%]"
                    // value={order === 1 ? "Đề mục gốc" : request["parent"]}
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Mô tả</span>
                    <Input name="description" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["description"]} />
                </div>
            </div>
        </Modal>
    )
}

const DanhMucHoSo = () => {
    const [order, setOrder] = useState(1)
    const [parent, setParent] = useState(null)

    const columnsFirst = [
        { title: "Tên đề mục và tiêu đề hồ sơ", dataIndex: "name", key: "name" },
        {
            title: "Hành động",
            dataIndex: "",
            width: "120px",
            render: (record) => {
                return (
                    <div className="flex items-center justify-between">
                        <div>
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                        <div>
                            <i className="fa-regular fa-pen-to-square"></i>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setModelOpen(true)
                                setOrder(2)
                                setParent(record.id)
                            }}>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>)
            }

        }
    ];

    const columnsSecond = [
        { title: "Tên đề mục và tiêu đề hồ sơ", dataIndex: "name", key: "name" },
        {
            title: "Hành động",
            dataIndex: "",
            width: "120px",
            render: (record) => {
                return (
                    <div className="flex items-center justify-between">
                        <div>
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                        <div>
                            <i className="fa-regular fa-pen-to-square"></i>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setModelOpen(true)
                                setOrder(3)
                                setParent(record.id)
                            }}>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>)
            }
        }
    ];

    const columnsThird = [
        { title: "Tên đề mục và tiêu đề hồ sơ", dataIndex: "name", key: "name" },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            width: "120px"
        }
    ];

    const [modalOpen, setModelOpen] = useState(false)
    const [data, setData] = useState([])


    const reFetchData = async () => {
        const res = await axios.get(`${CATEGORY_FILE_API}`)
        setData(res.data)
    }

    useEffect(() => {
        reFetchData()
    }, [])

    const expandedRow1 = row => {
        const inTable = []
        data.forEach((item) => {
            if (item.parent === row.id) {
                inTable.push(item)
            }
        })
        return <Table columns={columnsThird} dataSource={inTable} pagination={false} className="pl-[50px]" showHeader={false} />;
    };

    const expandedRow = row => {
        const inTable = []
        data.forEach((item) => {
            if (item.parent === row.id) {
                inTable.push(item)
            }
        })

        return <Table columns={columnsSecond}
            expandable={{
                expandedRowRender: expandedRow1,
                rowExpandable: (record) => data.find(rc => rc.parent === record.id),
            }}
            dataSource={inTable}
            pagination={false}
            className="pl-[24px]"
            showHeader={false} />;
    };

    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Khai báo danh mục / Danh mục hồ sơ </span>
                </p>

            </div>
            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold">Danh mục hồ sơ</p>

                <Button className="text-white bg-[#00f]" onClick={() => {
                    setOrder(1)
                    setModelOpen(true)
                }}>Tạo mới</Button>

                <Create
                    modalOpen={modalOpen}
                    setModelOpen={setModelOpen}
                    reFetchData={reFetchData}
                    order={order}
                    select={data}
                    parent={parent}
                />

            </div>

            {<SearchBar />}

            <div className="mt-[30px] px-[24px]">
                <Table columns={columnsFirst}
                    expandable={{
                        expandedRowRender: expandedRow,
                        rowExpandable: (record) => data.find(rc => rc.parent === record.id)
                        ,
                    }}
                    dataSource={data.filter((item) => item.order === 1)} />

            </div>

        </div>
    )
}

export default DanhMucHoSo
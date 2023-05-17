import DanhMucCoQuan from "."
import { DEPARTMENT, DEPARTMENT_DECENTRALIZATION_INPUTS } from "../../../storage/StorageOffice"
import { Input, Select, Modal, Button } from "antd";
import { Collapse } from "antd";
import { GetKey } from "../../../custom/Function";
import { notifyError, notifySuccess } from "../../../custom/Function";
import { useEffect, useState } from "react";
import axios from "axios";

const Panel = Collapse.Panel
const Search = Input.Search

const API_STORAGE_GET_ORGAN = process.env.REACT_APP_API_STORAGE_GET_ORGAN
const API_ORGAN_POST_DEPARTMENT = process.env.REACT_APP_API_ORGAN_GET_DEPARTMENT
const API_ORGAN_GET_DEPARTMENT = process.env.REACT_APP_API_ORGAN_GET_DEPARTMENT

const Create = ({ modalOpen, setModalOpen }) => {
    const [request, setRequest] = useState(null)
    const [permission, setPermission] = useState([])
    const [organ, setOrgan] = useState([])

    useEffect(() => {
        const fetchOrgan = async () => {
            const res = await axios.get(API_STORAGE_GET_ORGAN)
            const data = res.data
            console.log(data)

            const organ = data.map((item) => ({
                label: item.name,
                value: item.name
            }))
            setOrgan(organ)
        }
        fetchOrgan()
    }, [])
    const handleCancle = () => {
        setModalOpen(false)
    }

    const handleChangeRequest = (name, value) => {
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePermission = (value) => {
        const index = permission.findIndex((item) => item === value)
        console.log(index)
        console.log(value)
        if (index === -1) {
            setPermission(prev => {
                handleChangeRequest("permission", [...prev, value])
                return [...prev, value]
            })
        }
        else {
            setPermission(prev => {
                handleChangeRequest("permission", prev.filter((item) => item !== value))
                return prev.filter((item) => item !== value)
            })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!request) {
            notifyError("Vui lòng nhập đầy đủ thông tin")
            return
        }
        for (const input of DEPARTMENT_DECENTRALIZATION_INPUTS) {
            if (input.require && !request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }

        console.log(request)

        await axios.post(API_ORGAN_POST_DEPARTMENT, request)
        notifySuccess("Tạo phòng ban thành công")
        setModalOpen(false)
        setRequest(null)
    }

    return (
        <Modal
            title="Tạo phòng ban"
            style={{
                top: 20,
            }}
            className="w-[700px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >
            <form id="tao-phong-ban" onSubmit={onSubmit}>
                <div>
                    {DEPARTMENT_DECENTRALIZATION_INPUTS.map((input, index) => {
                        return (
                            <div className="flex mb-[30px]">
                                <div className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                                    {input.label}
                                </div>
                                <div className="w-[70%]">
                                    {input.type === "select" ?
                                        <Select name={input.name} options={organ} onChange={(ev) => handleChangeRequest(input.name, ev)}
                                            className="w-full" value={request !== null ? request[input.name] : ""} />
                                        : <Input type={input.type} name={input.name} onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)} />
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between mt-[30px]">
                    <Button onClick={handleCancle}>Hủy</Button>
                    <Button form="tao-phong-ban" type="submit" className="bg-[#00f] text-white" onClick={onSubmit}>
                        Tạo
                    </Button>
                </div>
            </form>

        </Modal>
    )
}

const SearchBar = () => {
    return (
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[25%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

            <div className="bg-white p-[12px] w-[300px] max-w-[25%] ml-[20px]">
                <p className="mb-[12px]">Cơ quan</p>
                <div>
                    <Select
                        name="state"
                        className="w-full bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn cơ quan"
                        optionFilterProp="children"
                        onChange={(value) => console.log(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[]}
                    ></Select>
                </div>
            </div>
        </div>
    )
}

const PhongBan = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axios.get(API_ORGAN_GET_DEPARTMENT)
        const datas = res.data

        const newData = []
        for (const data of datas) {
            newData.push({
                "id": data.id,
                "name": data.name,
                "code": data.code,
                "organ": data.organ,
                "total_staff": 0,
                "update": <span className="cursor-pointer"><i className="fa-regular fa-pen-to-square"></i></span>
            })
        }

        setFieldData(newData)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchFieldData()
    }, [])

    return (
        <DanhMucCoQuan title="Phòng ban" fieldNames={DEPARTMENT} fieldDatas={fieldData} SearchBar={<SearchBar />} Create={<Create />} isLoading={isLoading} />
    )
}

export default PhongBan
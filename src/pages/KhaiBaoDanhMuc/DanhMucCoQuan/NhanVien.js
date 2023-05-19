/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucCoQuan from "."
import { STAFF, STAFF_DECENTRALIZATION } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Select, Collapse, Checkbox, Row, Col } from "antd";
import { GetKey } from "../../../custom/Function";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../custom/Function";
import { CheckBox } from "@mui/icons-material";

const Search = Input.Search
const { Panel } = Collapse

const API_ORGAN_GET_STAFF = process.env.REACT_APP_API_ORGAN_GET_STAFF
const API_ORGAN_POST_STAFF = process.env.REACT_APP_API_ORGAN_POST_STAFF
const API_ORGAN_GET_DEPARTMENT = process.env.REACT_APP_API_ORGAN_GET_DEPARTMENT
const API_GROUP_PERMISSION = process.env.REACT_APP_API_GROUP_PERMISSION

const Create = ({ modalOpen, setModalOpen }) => {
    const [request, setRequest] = useState(null)
    const [department, setDepartment] = useState([])
    const [organ, setOrgan] = useState({})
    const [groupPermission, setGroupPermission] = useState([])
    const [permissionGroup, setPermissionGroup] = useState([])

    useEffect(() => {
        const fetchDepartment = async () => {
            const res = await axios.get(API_ORGAN_GET_DEPARTMENT)
            const data = res.data

            const department = data.map((item) => {
                organ[item.name] = item.organ
                return {
                    label: item.name,
                    value: item.name
                }
            })

            setOrgan(organ)
            setDepartment(department)
        }

        const fetchGroupPermission = async () => {
            const res = await axios.get(API_GROUP_PERMISSION)
            const data = res.data

            const groupPermission = data.map((item) => {
                return {
                    label: item.name,
                    value: item.name
                }
            })
            setGroupPermission(groupPermission)
        }
        fetchGroupPermission()
        fetchDepartment()
    }, [])

    const handleCancle = () => {
        setModalOpen(false)
    }

    const onSubmit = async (e) => {
        console.log(request)

        e.preventDefault()
        if (!request) {
            notifyError("Vui lòng nhập đầy đủ thông tin")
            return
        }
        for (const input of STAFF_DECENTRALIZATION) {
            if (input.require && !request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }

        request["organ"] = organ[request.department]
        await axios.post(API_ORGAN_POST_STAFF, request)
        notifySuccess("Tạo phòng ban thành công")
        setModalOpen(false)
        setRequest(null)
    }

    const handleChangeRequest = (name, value) => {
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangePermission = (value) => {
        if (permissionGroup.includes(value)) {
            handleChangeRequest("permission_group", permissionGroup.filter((item) => item !== value))
            setPermissionGroup(prev => prev.filter((item) => item !== value))
        } else {
            handleChangeRequest("permission_group", [...permissionGroup, value])
            setPermissionGroup(prev => [...prev, value])
        }
    }


    console.log(permissionGroup);
    console.log(request);
    return (
        <Modal
            title="Tạo nhân viên"
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >
            <form id="tao-nhan-vien">
                <div>
                    {STAFF_DECENTRALIZATION.map((input, index) => {
                        return (
                            <div className="flex mb-[30px]">
                                <div className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                                    {input.label}
                                </div>
                                <div className="w-[70%]">
                                    {input.type === "select" ?
                                        <Select className="w-full" value={request !== null ? request[input.name] : ""} name={input.name} options={department} onChange={(ev) => handleChangeRequest(input.name, ev)} /> : <Input type={input.type} name={input.name} onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)} value={request !== null ? request[input.name] : ""} />}
                                </div>
                            </div>
                        )
                    })}
                    <Collapse defaultActiveKey={['1']} >
                        <Panel header="Nhóm quyền" key="1">
                            <Row className="w-full">
                                {groupPermission.map((item) => {
                                    return (
                                        <Col span={12}>
                                            <Checkbox checked={
                                                permissionGroup.includes(item.value)
                                            } onChange={(e) =>handleChangePermission(e.target.value)} value={item.value}>
                                                {item.label}
                                            </Checkbox>
                                        </Col>
                                        
                                    )
                                })}
                            </Row>

                        </Panel>

                    </Collapse>
                </div>
                <div className="flex justify-between mt-[30px]">
                    <Button onClick={handleCancle}>Hủy</Button>
                    <Button form="tao-nhan-vien" type="submit" className="bg-[#00f] text-white" onClick={onSubmit}>
                        Tạo
                    </Button>
                </div>
            </form>
        </Modal >
    )
}

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


const NhanVien = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axios.get(API_ORGAN_GET_STAFF)
        const datas = res.data

        const newData = []
        for (const data of datas) {
            newData.push({
                "id": data.id,
                "name": data.name,
                "email": data.email,
                "address": data.address,
                "phone": data.phone,
                "organ": data.organ,
                "department": data.department,
                "position": data.position,
                // "state": 0,
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
        <DanhMucCoQuan title="Nhân viên" fieldNames={STAFF} fieldDatas={fieldData} SearchBar={<SearchBar />} Create={<Create />} isLoading={isLoading} />
    )
}

export default NhanVien
/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucCoQuan from "."
import { STAFF, STAFF_DECENTRALIZATION } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Select, Collapse, Checkbox, Row, Col } from "antd";
import { GetKey } from "../../../custom/Function";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../custom/Function";
import { Link, useParams } from "react-router-dom";

const Search = Input.Search
const { Panel } = Collapse

const API_ORGAN_GET_STAFF = process.env.REACT_APP_API_ORGAN_GET_STAFF
const API_ORGAN_POST_STAFF = process.env.REACT_APP_API_ORGAN_POST_STAFF
const API_ORGAN_GET_DEPARTMENT = process.env.REACT_APP_API_ORGAN_GET_DEPARTMENT
const API_GROUP_PERMISSION = process.env.REACT_APP_API_GROUP_PERMISSION

const Form = ({ modalOpen, setModalOpen, fetchFieldData, id = null }) => {
    const [request, setRequest] = useState({})
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
                    value: item.id
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

    useEffect(() => {
        const fetchData = async () => {
            if (!id)
                return
            const res = await axios.get(API_ORGAN_GET_STAFF + id)
            const data = res.data

            setRequest(data)
            setPermissionGroup(data.permission_group)
        }
        fetchData()
    }, [id, modalOpen])

    const handleCancle = () => {
        setModalOpen(false)
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

    const onSubmit = async (e) => {
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
        request["department_id"] = request["department"]
        request["department"] = department.find((item) => item.value === request.department).label

        if (id !== null) {
            await axios.put(API_ORGAN_POST_STAFF + id, request)
            notifySuccess("Cập nhật nhân viên thành công")
        } else {
            await axios.post(API_ORGAN_POST_STAFF, request)
            notifySuccess("Tạo nhân viên thành công")
        }

        setRequest({})
        setTimeout(() => {
            setModalOpen(false)
            fetchFieldData()
        }, 500)
    }



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
                            <div className="flex mb-[30px]" key={GetKey()}>
                                <div className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                                    {input.label}
                                </div>
                                <div className="w-[70%]">
                                    {input.type === "select" ?
                                        <Select
                                            className="w-full"
                                            value={request[input.name]}
                                            name={input.name}
                                            options={department}
                                            onChange={(ev) => handleChangeRequest(input.name, ev)} /> :

                                        <Input
                                            type={input.type}
                                            name={input.name}
                                            onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)}
                                            value={request[input.name]}
                                        />}
                                </div>
                            </div>
                        )
                    })}
                    <Collapse defaultActiveKey={['1']} >
                        <Panel header="Nhóm quyền" key="1">
                            <Row className="w-full">
                                {groupPermission.map((item) => {
                                    return (
                                        <Col span={12} key={GetKey()}>
                                            <Checkbox checked={
                                                permissionGroup.includes(item.value)
                                            } onChange={(e) => handleChangePermission(e.target.value)} value={item.value}>
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
                        Cập nhật
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

const Update = ({ modalOpen, setModalOpen, id, fetchFieldData }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} fetchFieldData={fetchFieldData} />
}

const Read = ({ modalOpenRead, setModalOpenRead, id, fetchFieldData }) => {
    const [request, setRequest] = useState({})
    const [permissionGroup, setPermissionGroup] = useState([])
    const [groupPermission, setGroupPermission] = useState([])

    useEffect(() => {
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
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            const res = await axios.get(API_ORGAN_GET_STAFF + id)
            const data = res.data

            setRequest(data)
            setPermissionGroup(data.permission_group)
        }
        fetchData()
    }, [id, modalOpenRead])

    const handleChangeRequest = (name, value) => {
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCancle = () => {
        setModalOpenRead(false)
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

    const onSubmit = async (e) => {
        if (id !== null) {
            await axios.put(API_ORGAN_POST_STAFF + id, request)
            notifySuccess("Cập nhật nhân viên thành công")
        } else {
            await axios.post(API_ORGAN_POST_STAFF, request)
            notifySuccess("Tạo nhân viên thành công")
        }

        setRequest({})
        setTimeout(() => {
            setModalOpenRead(false)
            fetchFieldData()
        }, 500)
    }

    return (
        <Modal
            title="Tạo nhân viên"
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpenRead}
            onCancel={handleCancle}
            footer={null}
        >
            <form id="tao-nhan-vien">
                <div>

                    <Collapse defaultActiveKey={['1']} >
                        <Panel header="Nhóm quyền" key="1">
                            <Row className="w-full">
                                {groupPermission.map((item) => {
                                    return (
                                        <Col span={12} key={GetKey()}>
                                            <Checkbox checked={
                                                permissionGroup.includes(item.value)
                                            } onChange={(e) => handleChangePermission(e.target.value)} value={item.value}>
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
                        Cập nhật
                    </Button>
                </div>
            </form>
        </Modal >
    )
}
const NhanVien = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const [id, setId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpenRead, setModalOpenRead] = useState(false)

    const params = useParams()

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axios.get(API_ORGAN_GET_STAFF)
        const datas = res.data

        const newData = []
        for (const data of datas) {
            if (data.department_id !== params.department_id) continue
            newData.push({
                "id": data.id,
                "name": <span
                    className="cursor-pointer"
                    onClick={() => {
                        setModalOpenRead(true)
                        setId(data.id)
                    }}> {data.name}</span>,
                "email": data.email,
                "address": data.address,
                "phone": data.phone,
                "organ": data.organ,
                "department": data.department,
                "position": data.position,
                // "state": 0,
                "update": <span className="cursor-pointer" onClick={() => {
                    setModalOpen(true)
                    setId(data.id)
                }}><i className="fa-regular fa-pen-to-square"></i></span>
            })
        }

        setFieldData(newData)
        setIsLoading(false)

    }

    useEffect(() => {
        fetchFieldData()
    }, [])

    return (
        <div>
            <DanhMucCoQuan
                title={
                    <span>
                        <Link to="/khai-bao-danh-muc/danh-muc-co-quan/">Danh mục cơ quan</Link> /
                        <Link to={`/khai-bao-danh-muc/danh-muc-co-quan/${params.organ_id}`}> Phòng ban </Link> /
                        <span className="text-black"> Nhân viên </span>
                    </span>
                }
                fieldNames={STAFF}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                isLoading={isLoading}
            />

            <Update modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} fetchFieldData={fetchFieldData} />
            <Read modalOpenRead={modalOpenRead} setModalOpenRead={setModalOpenRead} id={id}></Read>
        </div>

    )
}

export default NhanVien
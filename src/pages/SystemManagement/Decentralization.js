/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input } from "antd";
import Search from "antd/es/input/Search";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { Table } from "../../custom/Components"
import { LIST_PERMISSION } from "../../storage/Storage";
import { notifyError, notifySuccess } from "../../custom/Function";
import axios from "axios";

const API_GROUP_PERMISSION = process.env.REACT_APP_API_GROUP_PERMISSION
const API_USER_PERMISSION = process.env.REACT_APP_API_USER_PERMISSION

const columns = [
    {
        title: 'Tên người dùng',
        width: "100%"

    },
    {
        title: 'Email',
        width: "100%"

    },
    {
        title: 'Tên',
        width: "100%"

    },
    {
        title: 'Họ',
        width: "100%"

    },
    {
        title: 'Trạng thái',
        width: "100%"

    },
];

const GroupChange = ({ setStateGroupChange, stateGroupChange, reFetchGroups }) => {
    const [chosenPermission, setChosenPermission] = useState([])
    const [selectPermission, setSelectPermission] = useState([])
    const [selectAddedPermission, setSelectAddedPermission] = useState([])
    const [choosePermission, setChoosePermission] = useState([])

    const group = stateGroupChange === null ? null : stateGroupChange.group
    const state = stateGroupChange === null ? null : stateGroupChange.state

    const [groupName, setGroupName] = useState(group === null ? "" : group.name)

    useEffect(() => {
        const getGroupPermission = () => {
            if (group !== null) {
                setChosenPermission(group.permissions)
                const newPermission = LIST_PERMISSION.filter((item) => !group.permissions.some((i) => i.id === item.id))
                setChoosePermission(newPermission)
            } else setChoosePermission(LIST_PERMISSION)
        }

        getGroupPermission()
    }, [group])

    const handleSelectPermission = (id) => {
        if (selectPermission.includes(id)) {
            setSelectPermission(selectPermission.filter((i) => i !== id))
        } else {
            setSelectPermission([...selectPermission, id])
        }
    }

    const handleSelectAddedPermission = (id) => {
        if (selectAddedPermission.includes(id)) {
            setSelectAddedPermission(selectAddedPermission.filter((i) => i !== id))
        } else {
            setSelectAddedPermission([...selectAddedPermission, id])
        }
    }

    const handleAddPermission = () => {
        const selectedPermisson = LIST_PERMISSION.filter((item) => selectPermission.includes(item.id))
        setChosenPermission((prev) => {
            const newPermission = prev.concat(selectedPermisson)
            return newPermission
        })

        setChoosePermission((prev) => {
            const newPermission = prev.filter((item) => !selectPermission.includes(item.id))
            return newPermission
        })

        setSelectPermission([])
    }

    const handleRemovePermission = () => {
        const selectedPermisson = chosenPermission.filter((item) => selectAddedPermission.includes(item.id))
        setChoosePermission((prev) => {
            const newPermission = prev.concat(selectedPermisson)
            return newPermission
        })
        setChosenPermission((prev) => {
            const newPermission = prev.filter((item) => !selectAddedPermission.includes(item.id))
            return newPermission
        })
        setSelectAddedPermission([])
    }

    const handleSubmitGroupPermission = () => {
        if (groupName.length === 0) {
            notifyError("Vui lòng nhập tên nhóm")
            return
        }

        if (chosenPermission.length === 0) {
            notifyError("Vui lòng chọn quyền")
            return
        }

        try {
            if (group === null) {
                axios.post(API_GROUP_PERMISSION, { name: groupName, permissions: chosenPermission })
            } else {
                axios.put(API_GROUP_PERMISSION + group.id, { name: groupName, permissions: chosenPermission })
            }
            notifySuccess("Thêm nhóm thành công")
            setTimeout(() => {
                reFetchGroups()
            }, 500)
        } catch (error) {
            notifyError("Đã có lỗi xảy ra")
        }


    }

    const handleChangeGroupName = (e) => {
        setGroupName(e.target.value)
    }

    const handleDeleteGroupPermission = () => {
        try {
            axios.delete(API_GROUP_PERMISSION + group.id)
            notifySuccess("Xóa nhóm thành công")
            setTimeout(() => {
                reFetchGroups()
            }, 500)
        } catch (e) {
            notifyError("Đã có lỗi xảy ra")
        }
    }

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="font-medium text-[20px]">{state === "ADD_GROUP" ? "Thêm nhóm" : "Thay đổi nhóm"}</h2>
                <Button onClick={() => setStateGroupChange(null)}>Đóng</Button>

            </div>

            <div className="mt-[12px]">
                <h2 className="font-medium text-[16px]">{group === null ? "" : group.name}</h2>
            </div>

            <div>
                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Tên nhóm: </p>
                    <Input value={groupName} onChange={handleChangeGroupName} />
                </div>
            </div>
            <div>
                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Quyền: </p>
                    <div className="w-full flex">
                        <div className="w-[45%] mr-[4px] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những quyền khả thi</h2>
                            <Search title="Lọc" enterButton allowClear className="h-[40px]" />
                            <ul className="h-[200px] overflow-auto">
                                {choosePermission.map((item, index) => {
                                    const doesSelected = selectPermission.includes(item.id)
                                    return (
                                        <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} onClick={() => handleSelectPermission(item.id)} key={index}>
                                            {item.name}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center mx-[2px]">

                            <Button className="w-[2px] rounded-[50%]" onClick={handleRemovePermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i class="fa-solid fa-left-long"></i>
                                </span>
                            </Button>

                            <Button className="w-[2px] rounded-[50%]" onClick={handleAddPermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i class="fa-solid fa-right-long"></i>
                                </span>
                            </Button>

                        </div>
                        <div className="w-[45%] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những quyền đã chọn</h2>
                            <ul className="h-[200px] overflow-auto">
                                {chosenPermission.map((item, index) => {
                                    const doesSelected = selectAddedPermission.includes(item.id)
                                    return <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} key={index} onClick={() => handleSelectAddedPermission(item.id)}>{item.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-end mt-[16px]">
                {
                    group === null ?
                        <Button className="mr-[12px]" danger onClick={handleDeleteGroupPermission}>Xóa</Button>
                        : ""
                }
                <Button onClick={handleSubmitGroupPermission}>Lưu</Button>
            </div>
        </div>
    )
}

const Group = ({ stateGroup, setStateGroup }) => {

    const [stateGroupChange, setStateGroupChange] = useState(null)
    const [groups, setGroups] = useState([])

    const reFetchGroups = async () => {
        const response = await axios.get(API_GROUP_PERMISSION)
        setGroups(response.data)
    }

    useEffect(() => {
        reFetchGroups()
    }, [])

    return (
        stateGroup &&
        <div className="w-full pl-[24px]">
            {stateGroupChange === null ? <div>
                <div className="flex justify-between">
                    <h2 className="font-medium text-[20px]">Chọn nhóm để thay đổi</h2>
                    <Button onClick={() => setStateGroupChange({ action: "ADD_GROUP", group: null })}>Thêm nhóm +</Button>
                </div>
                <div className="mt-[12px]">
                    <Search allowClear placeholder="Nhập tên group" enterButton />
                </div>
                <div>
                    <div className="py-[4px] border-b-4 font-medium cursor-pointer">
                        <Checkbox className="mr-[8px]" />
                        Nhóm
                    </div>
                    {groups.map((group, index) => {
                        return (
                            <div className="py-[4px] font-medium cursor-pointer" onClick={() => setStateGroupChange({ action: "CHANGE_GROUP_PERMISSION", group: group })}>
                                <Checkbox className="mr-[8px]" />
                                {group.name}
                            </div>
                        )
                    })}
                </div>
            </div>
                :
                <GroupChange stateGroupChange={stateGroupChange} setStateGroupChange={setStateGroupChange} reFetchGroups={reFetchGroups} />}
        </div>
    )
}

const CreateUser = ({ setStateUserChange, reFetchUser }) => {
    const [confirmPassword, setConfirmPassword] = useState("")

    const [request, setRequest] = useState({
        username: "",
        password: "",
        first_name:"",
        last_name:"",
        email:""
    })

    const handleChangeRequest = (e) => {
        const { name, value } = e.target
        setRequest({ ...request, [name]: value })
    }

    const handleChangeConfirmPassword = (e) => {
        const { value } = e.target
        setConfirmPassword(value)
    }

    const handleSubmit = () => {
        if (request.username.length === 0) {
            notifyError("Vui lòng nhập tên người dùng")
            return
        }
        if (request.password.length === 0) {
            notifyError("Vui lòng nhập mật khẩu")
            return
        }
        if (request.password !== confirmPassword) {
            notifyError("Mật khẩu không khớp")
            return
        }
        try {
            axios.post(API_USER_PERMISSION, request)
            notifySuccess("Tạo người dùng thành công")
            setTimeout(() => {
                reFetchUser()
            }, 500)
        } catch (e) {
            notifyError("Tạo người dùng thất bại")
        }
    }

    return (
        <div className="mb-[50px]">
            <div className="flex justify-between">
                <h2 className="font-medium text-[20px]">Thêm người dùng</h2>
                <Button onClick={() => setStateUserChange(null)}>Đóng</Button>

            </div>


            <div>
                <div className="mt-[16px] flex justify-between">
                    <p>Tên người dùng</p>
                    <Input name="username" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Mật khẩu</p>
                    <Input name="password" className="w-[70%]" onChange={handleChangeRequest} type="password" allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Xác nhận mật khẩu</p>
                    <Input className="w-[70%]" type="password" allowClear onChange={handleChangeConfirmPassword} />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Tên</p>
                    <Input name="first_name" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Họ</p>
                    <Input name="last_name" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Email</p>
                    <Input name="email" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
            </div>

            <div className="flex justify-end mt-[12px]" onClick={handleSubmit}>
                <Button>Lưu</Button>
            </div>
        </div>
    )
}

const UserChange = ({ setStateUserChange, stateUserChange, reFetchUser, LIST_GROUP }) => {
    const [chosenPermission, setChosenPermission] = useState([])
    const [selectPermission, setSelectPermission] = useState([])
    const [selectAddedPermission, setSelectAddedPermission] = useState([])
    const [choosePermission, setChoosePermission] = useState([])


    const [chosenGroup, setChosenGroup] = useState([])
    const [selectGroup, setSelectGroup] = useState([])
    const [selectAddedGroup, setSelectAddedGroup] = useState([])
    const [chooseGroup, setChooseGroup] = useState([])


    const user = stateUserChange === null ? null : stateUserChange.user
    const state = stateUserChange === null ? null : stateUserChange.state

    useEffect(() => {
        const getGroupPermission = () => {
            if (user !== null) {
                setChosenPermission(user.permissions)
                const newPermission = LIST_PERMISSION.filter((item) => !user.permissions.some((i) => i.id === item.id))
                setChoosePermission(newPermission)
            } else setChoosePermission(LIST_PERMISSION)
        }

        const getGroup = () => {
            if (user !== null) {
                setChosenGroup(user.groups)
                const newGroup = LIST_GROUP.filter((item) => !user.groups.some((i) => i.id === item.id))
                setChooseGroup(newGroup)
            } else setChooseGroup(LIST_GROUP)
        }

        getGroup()
        getGroupPermission()
    }, [user])

    const handleSelectPermission = (id) => {
        if (selectPermission.includes(id)) {
            setSelectPermission(selectPermission.filter((i) => i !== id))
        } else {
            setSelectPermission([...selectPermission, id])
        }
    }

    const handleSelectAddedPermission = (id) => {
        if (selectAddedPermission.includes(id)) {
            setSelectAddedPermission(selectAddedPermission.filter((i) => i !== id))
        } else {
            setSelectAddedPermission([...selectAddedPermission, id])
        }
    }

    const handleAddPermission = () => {
        const selectedPermisson = LIST_PERMISSION.filter((item) => selectPermission.includes(item.id))
        setChosenPermission((prev) => {
            const newPermission = prev.concat(selectedPermisson)
            return newPermission
        })

        setChoosePermission((prev) => {
            const newPermission = prev.filter((item) => !selectPermission.includes(item.id))
            return newPermission
        })

        setSelectPermission([])
    }

    const handleRemovePermission = () => {
        const selectedPermisson = chosenPermission.filter((item) => selectAddedPermission.includes(item.id))
        setChoosePermission((prev) => {
            const newPermission = prev.concat(selectedPermisson)
            return newPermission
        })
        setChosenPermission((prev) => {
            const newPermission = prev.filter((item) => !selectAddedPermission.includes(item.id))
            return newPermission
        })
        setSelectAddedPermission([])
    }

    const handleSelectGroup = (id) => {
        if (selectGroup.includes(id)) {
            setSelectGroup(selectGroup.filter((i) => i !== id))
        } else {
            setSelectGroup([...selectGroup, id])
        }
    }

    const handleSelectAddedGroup = (id) => {
        if (selectAddedPermission.includes(id)) {
            setSelectAddedPermission(selectAddedPermission.filter((i) => i !== id))
        } else {
            setSelectAddedPermission([...selectAddedPermission, id])
        }
    }

    const handleAddGroup = () => {
        const selectedGroup = LIST_PERMISSION.filter((item) => selectPermission.includes(item.id))
        setChosenGroup((prev) => {
            const newGroup = prev.concat(selectedGroup)
            return newGroup
        })

        setChooseGroup((prev) => {
            const newGroup = prev.filter((item) => !selectGroup.includes(item.id))
            return newGroup
        })

        setSelectGroup([])
    }

    const handleRemoveGroup = () => {
        const selectedPermisson = chosenGroup.filter((item) => selectAddedGroup.includes(item.id))
        setChooseGroup((prev) => {
            const newGroup = prev.concat(selectedPermisson)
            return newGroup
        })
        setChosenGroup((prev) => {
            const newGroup = prev.filter((item) => !selectAddedGroup.includes(item.id))
            return newGroup
        })
        setSelectAddedGroup([])
    }

    return (
        <div className="mb-[50px]">
            <div className="flex justify-between">
                <h2 className="font-medium text-[20px]">{ }</h2>
                <Button onClick={() => setStateUserChange(null)}>Đóng</Button>

            </div>


            <div>
                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Nhóm: </p>
                    <div className="w-full flex">
                        <div className="w-[45%] mr-[4px] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những nhóm khả thi</h2>
                            <Search title="Lọc" enterButton allowClear className="h-[40px]" />
                            <ul className="h-[200px] overflow-auto">

                                {chooseGroup.map((item, index) => {
                                    const doesSelected = selectGroup.includes(item.id)
                                    return (
                                        <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} onClick={() => handleSelectPermission(item.id)} key={index}>
                                            {item.name}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center mx-[2px]">

                            <Button className="w-[2px] rounded-[50%]" onClick={handleRemovePermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i class="fa-solid fa-left-long"></i>
                                </span>
                            </Button>

                            <Button className="w-[2px] rounded-[50%]" onClick={handleAddPermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i class="fa-solid fa-right-long"></i>
                                </span>
                            </Button>

                        </div>
                        <div className="w-[45%] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những nhóm đã chọn</h2>
                            <ul className="h-[200px] overflow-auto">
                                {chooseGroup.map((item, index) => {
                                    const doesSelected = selectAddedPermission.includes(item.id)
                                    return <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} key={index} onClick={() => handleSelectAddedPermission(item.id)}>{item.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Quyền: </p>
                    <div className="w-full flex">
                        <div className="w-[45%] mr-[4px] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những quyền khả thi</h2>
                            <Search title="Lọc" enterButton allowClear className="h-[40px]" />
                            <ul className="h-[200px] overflow-auto">

                                {choosePermission.map((item, index) => {
                                    const doesSelected = selectPermission.includes(item.id)
                                    return (
                                        <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} onClick={() => handleSelectPermission(item.id)} key={index}>
                                            {item.name}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center mx-[2px]">

                            <Button className="w-[2px] rounded-[50%]" onClick={handleRemovePermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i class="fa-solid fa-left-long"></i>
                                </span>
                            </Button>

                            <Button className="w-[2px] rounded-[50%]" onClick={handleAddPermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i class="fa-solid fa-right-long"></i>
                                </span>
                            </Button>

                        </div>
                        <div className="w-[45%] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những quyền đã chọn</h2>
                            <ul className="h-[200px] overflow-auto">
                                {chosenPermission.map((item, index) => {
                                    const doesSelected = selectAddedPermission.includes(item.id)
                                    return <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} key={index} onClick={() => handleSelectAddedPermission(item.id)}>{item.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const User = ({ stateUser, setStateUser }) => {
    const [stateUserChange, setStateUserChange] = useState(null)
    const [dataSource, setDataSource] = useState([])
    const [listGroup, setListGroup] = useState([])

    const handleClickTable = (user) => {
        setStateUserChange({ state: "CHANGE_USER", user: user })
    }

    const handleClickAddUser = () => {
        setStateUserChange({ state: "CREATE_USER", user: null })
    }

    const reFetchUser = async () => {
        const res = await axios.get(API_USER_PERMISSION)
        const data = res.data.map((item, index) => {
            return {
                id: item.id,
                username: <span className="cursor-pointer" onClick={() => handleClickTable(item)}>{item.username}</span>,
                email: <span className="cursor-pointer" onClick={() => handleClickTable(item)}>{item.email}</span>,
                firstname: item.first_name,
                lastname: item.last_name,
                staffstatus: item.staff_status
            }
        })

        setDataSource(data)
    }

    const fetchGroup = async () => {
        const res = await axios.get(API_GROUP_PERMISSION)
        const data = res.data.map((item, index) => {
            return {
                id: item.id,
                name: item.name
            }
        })
        setListGroup(data)
    }
    useEffect(() => {
        fetchGroup()
        reFetchUser()
    }, [])

    return (
        stateUser &&
        <div className="w-full pl-[24px]">
            {stateUserChange === null ? <div>
                <div className="flex justify-between">
                    <h2 className="font-medium text-[20px]">Chọn người dùng để thay đổi</h2>
                    <Button onClick={() => handleClickAddUser()}>Thêm người dùng +</Button>
                </div>
                <div className="mt-[12px]">
                    <Search allowClear placeholder="Nhập tên người dùng" enterButton />
                </div>
                <Table fieldDatas={dataSource} fieldNames={columns} />

            </div>
                :
                <div>
                    {stateUserChange.state === "CREATE_USER" ? <CreateUser setStateUserChange={setStateUserChange} reFetchUser={reFetchUser}  /> : <UserChange setStateUser={setStateUser} stateUserChange={setStateUserChange} reFetchUser={reFetchUser} LIST_GROUP={listGroup} />
                    }
                </div>}

        </div>
    )
}

const Decentralization = () => {
    const [stateGroup, setStateGroup] = useState(false)
    const [stateUser, setStateUser] = useState(false)

    return (
        <div className="flex justify-between mx-[24px] h-full">
            <div className="w-[25%] border-r-4 h-full">
                <h2 className="text-[14px] font-bold">PHÂN QUYỀN</h2>
                <div>
                    <div className="flex items-center border-b-4 py-[8px] cursor-pointer" onClick={() => {
                        setStateGroup(true)
                        setStateUser(false)
                    }}>
                        <span className="text-[#00f] w-[30px]"><i className="fa-solid fa-user-group"></i></span>
                        <p className="text-[14px] font-medium">
                            Nhóm
                        </p>
                    </div>
                    <div className="flex items-center py-[8px] cursor-pointer" onClick={() => {
                        setStateUser(true)
                        setStateGroup(false)
                    }}>
                        <span className="text-[#00f] w-[30px]"><i className="fa-solid fa-user"></i></span>
                        <p className="text-[14px] font-medium">
                            Người dùng
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[75%]">
                <Group stateGroup={stateGroup} setStateGroup={setStateGroup} />
                <User stateUser={stateUser} setStateUser={setStateUser} />
            </div>
        </div>
    )
}

export default Decentralization
/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucCoQuan from "."
import { STAFF, STAFF_DECENTRALIZATION } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Select, Checkbox, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
import { notifyError, notifySuccess } from "../../../custom/Function";
import { Link, useParams } from "react-router-dom";
import { getAllPermissionsRelate, getDepartmentbyId, getOrganbyId, getParentOfPermission } from "./helper";
import { ACTION_GROUP, PERMISSION_GROUP, TABS_SIDEBAR } from "src/storage/Storage";
import UserAPIService from "src/service/api/userAPIService";
const Search = Input.Search


const API_SINGLE_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN;
const API_ORGAN_GET_STAFF = import.meta.env.VITE_API_ORGAN_GET_STAFF
const VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN
const API_ORGAN_GET_SINGLE_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_SINGLE_DEPARTMENT
const API_ROLE_BY_ORGAN = import.meta.env.VITE_API_ROLE_BY_ORGAN
const API_ORGAN_ROLE = import.meta.env.VITE_API_ORGAN_ROLE

const Form = ({
    modalOpen,
    setModalOpen,
    fetchFieldData,
    idOrgan,
    state,
    id = null }) => {

    const [request, setRequest] = useState({})
    const [department, setDepartment] = useState([])
    const [role, setRole] = useState([])
    const [listPermission, setListPermission] = useState([]);
    const [listAction, setListAction] = useState([]);
    useEffect(() => {
        const fetchDepartment = async () => {
            if (!idOrgan) return;
            const res = await axiosHttpService.get(VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN + '/' + idOrgan)
            const datas = res.data
            const department = []
            for (const data of datas) {
                department.push({
                    label: data.name,
                    value: data.id
                })
            }
            setDepartment(department)
        }
        const fetchRole = async () => {
            if (!idOrgan) return;
            const res = await axiosHttpService.get(API_ROLE_BY_ORGAN + '/' + idOrgan)
            const datas = res.data
            const role = []
            for (const data of datas) {
                role.push({
                    label: data.name,
                    value: data.id
                })
            }
            setRole(role)
        }
        fetchRole();
        fetchDepartment()
    }, [idOrgan])

    useEffect(() => {
        const fetchData = async () => {
            if (!id)
                return
            const res = await UserAPIService.getUserById(id);
            const menuPermission = res.menu_permission;
            const listPermission = menuPermission.split('-');
            setListPermission(listPermission.map((item) => parseInt(item)).filter((item) => item < 200));
            setListAction(listPermission.map((item) => parseInt(item)).filter((item) => item >= 200));
            res['action'] = listPermission.map((item) => parseInt(item)).filter((item) => item >= 200).join('-');
            setRequest(res);
        }
        fetchData()
    }, [id, modalOpen])

    const handleClickPermission = (group) => {
        let _listPermission = [...listPermission];
        const listPermissionOfGroup = getAllPermissionsRelate(group);

        if (listPermission.includes(group)) {
            const parent = getParentOfPermission(group);
            _listPermission = _listPermission.filter((item) => item != group);
            if (parent.length > 0) {
                const root = parent[0];
                if (!checkChecked(root)) {
                    _listPermission = _listPermission.filter((item) => item != root);
                }
                if (parent.length > 1) {
                    const root2 = parent[1];
                    if (!checkChecked(root2)) {
                        _listPermission = _listPermission.filter((item) => item != root2);
                    }
                }
                setListPermission([..._listPermission]);
            }
            else
                setListPermission(prev => prev.filter((item) => !listPermissionOfGroup.includes(item)))
        } else {
            const parent = getParentOfPermission(group);
            setListPermission(prev => [...prev, ...listPermissionOfGroup].filter((item) => !parent.includes(item)).concat(parent));
        }
    }

    console.log(listPermission);
    const checkChecked = (group) => {
        const listPermissionOfGroup = getAllPermissionsRelate(group);
        if (listPermissionOfGroup.length >= 2) {
            listPermissionOfGroup.shift();
        }
        return listPermissionOfGroup.every((item) => listPermission.includes(item));
    }

    const handleCancel = () => {
        setModalOpen(false)
    }

    console.log(listPermission);
    const handleChangeRequest = (name, value) => {
        console.log(name, value);
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!request) {
            notifyError("Vui lòng nhập đầy đủ thông tin")
            return
        }

        request["menu_permission"] = listPermission.join('-') + '-' + request["action"];

        if (request["is_staff"] === undefined || request["is_staff"] === null) request["is_staff"] = true;
        if (request["role"] === undefined) request["role"] = null;
        for (const input of STAFF_DECENTRALIZATION) {
            if (input.require && !request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }

        delete request["permission"];
        delete request["action"];

        if (id !== null) {
            await UserAPIService.updateUserById(id, request);
            notifySuccess("Cập nhật nhân viên thành công")
        } else {
            await UserAPIService.createUser(request);
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
            title={state === "update" ? "Cập nhật nhân viên" : "Tạo nhân viên"}
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <form id="tao-nhan-vien">
                <div>
                    {STAFF_DECENTRALIZATION.map((input, index) => {
                        return (
                            (!(input.name === 'password') || !id) && <div className="flex mb-[30px]" key={index}>
                                <div className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                                    {input.label}
                                </div>
                                <div className="w-[70%]">
                                    {input.type === "select" ?
                                        <Select
                                            disabled={state === "read"}
                                            className="w-full"
                                            value={request[input.name]}
                                            name={input.name}
                                            options={input.name === "department" ?
                                                department :
                                                input.name === "role" ?
                                                    role :
                                                    input.name === "permission" ?
                                                        PERMISSION_GROUP :
                                                        ACTION_GROUP

                                            }
                                            onChange={(ev) => handleChangeRequest(input.name, ev)} /> :
                                        input.type === "checkbox" ?
                                            <Checkbox
                                                onChange={(ev) => handleChangeRequest(input.name, !ev.target.checked)}
                                            /> :
                                            input.type === "list_checkbox" ?
                                                <div>
                                                    {
                                                        TABS_SIDEBAR.map((item, index) => {
                                                            if (item.title === "Trang chủ") return;
                                                            return (
                                                                <div key={index}>
                                                                    <div>
                                                                        <Checkbox onChange={
                                                                            () => {
                                                                                handleClickPermission(item.number)
                                                                            }
                                                                        }
                                                                            checked={checkChecked(item.number)}
                                                                        ><p className="font-bold  text-[20px]">{item.title}</p></Checkbox>
                                                                    </div>
                                                                    <div className="ml-[12px]">
                                                                        {item.childTabs && item.childTabs.map((child, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <Checkbox onChange={() => {
                                                                                        handleClickPermission(child.number)
                                                                                    }}
                                                                                        checked={checkChecked(child.number)}
                                                                                        key={index} className={`${child.isParent === true ? "font-bold" : ""}`} >{child.title}</Checkbox>
                                                                                    {child.isParent === true &&
                                                                                        <div className="ml-[12px] text-[16px]">
                                                                                            {child.childTabs.map((child2, index) => {
                                                                                                return (
                                                                                                    <div key={index}>
                                                                                                        <Checkbox
                                                                                                            checked={checkChecked(child2.number)}
                                                                                                            onChange={() => {
                                                                                                                handleClickPermission(child2.number)
                                                                                                            }}
                                                                                                        >{child2.title}</Checkbox>
                                                                                                    </div>
                                                                                                )

                                                                                            })}
                                                                                        </div>

                                                                                    }
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>

                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                :
                                                <Input
                                                    disabled={state === "read"}
                                                    type={input.type}
                                                    name={input.name}
                                                    onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)}
                                                    value={request[input.name]}
                                                />

                                    }
                                </div>
                            </div>
                        )
                    })}

                </div>
                {
                    <div className="flex justify-between mt-[30px]">
                        <Button onClick={handleCancel}>Hủy</Button>
                        <Button form="tao-nhan-vien" type="submit" className="bg-[#00f] text-white" onClick={onSubmit}>
                            {state === "update" ? "Cập nhật" : "Tạo"}
                        </Button>
                    </div>
                }
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

const Create = ({ modalOpen, setModalOpen, idOrgan, idOrganDepartment, fetchFieldData }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} idOrgan={idOrgan} idOrganDepartment={idOrganDepartment} fetchFieldData={fetchFieldData} />
}

const Update = ({
    modalOpen,
    setModalOpen,
    id,
    fetchFieldData,
    idOrgan }) => {

    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} fetchFieldData={fetchFieldData} idOrgan={idOrgan} state="update" />
}

const Read = ({
    modalOpenRead,
    setModalOpenRead,
    id,
    fetchFieldData,
    idOrgan }) => {

    return <Form modalOpen={modalOpenRead} setModalOpen={setModalOpenRead} id={id} fetchFieldData={fetchFieldData} idOrgan={idOrgan} state="read" />
}

const UpdatePassword = ({
    id,
    modalOpen,
    setModalOpen,
}) => {
    const [password, setPassword] = useState(null);

    const handleChangePassword = (value) => {
        setPassword(value);
    }

    const handleCancel = () => {
        setModalOpen(false);
    }

    const handleOk = async () => {
        if (!password) {
            notifyError("Vui lòng nhập mật khẩu");
            return;
        }

        const res = await UserAPIService.changePassword({ new_password: password }, id);
        if (res) {
            notifySuccess("Cập nhật mật khẩu thành công");
            setModalOpen(false);
        }
        else notifyError("Cập nhật mật khẩu thất bại");
    }

    return (

        <Modal
            title="Cập nhật mật khẩu"
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Input.Password
                placeholder="Mật khẩu mới"
                onChange={(ev) => handleChangePassword(ev.target.value)}

            />
        </Modal>
    )
}


const Delete = ({ id, reFetchData }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        await UserAPIService.deleteUserById(id);
        setTimeout(() => {
            reFetchData();
            setOpen(false);
            notifySuccess("Xóa nhân viên thành công");
        }, 500)
    };

    useEffect(() => {
        const popupContainer = document.querySelectorAll(
            ".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1fviqcj.css-dev-only-do-not-override-1fviqcj.ant-popover-placement-top"
        )[0];

        if (popupContainer === undefined) return;

        const buttonAccepts = document.querySelectorAll(
            ".ant-popconfirm-buttons > .ant-btn-primary"
        );
        buttonAccepts.forEach((buttonCancel) => {
            buttonCancel.textContent = "Xóa";
        });

        const buttonCancels = document.querySelectorAll(
            ".ant-popconfirm-buttons > .ant-btn-default "
        );
        buttonCancels.forEach((buttonAccept) => {
            buttonAccept.textContent = "Hủy";
        });
    }, [open]);

    return (
        <Popconfirm
            className="p-0"
            title="Xóa"
            open={open}
            description="Bạn có chắc chắn xóa?"
            onConfirm={handleConfirm}
            onCancel={handleClose}
        >
            <Button
                className="border-none"
                onClick={() => {
                    setOpen(true);
                }}
                title="Xóa"
            >
                <i className="fa-solid fa-trash-can"></i>
            </Button>
        </Popconfirm>

    );
};


const NhanVien = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const [id, setId] = useState(null)
    const [idOrgan, setIdOrgan] = useState(null)
    const [idOrganDepartment, setIdOrganDepartment] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpenRead, setModalOpenRead] = useState(false)
    const [organ, setOrgan] = useState(null);
    const [openUpdatePassword, setOpenUpdatePassword] = useState(false)
    const params = useParams()
    const [department, setDepartment] = useState(null);

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axiosHttpService.get(API_ORGAN_GET_STAFF + '/' + params.department_id)
        const datas = res.data
        console.log("params: ", params)
        const newData = []
        const organData = await axiosHttpService.get(API_SINGLE_ORGAN + '/' + params.organ_id)
        const departmentData = await axiosHttpService.get(API_ORGAN_GET_SINGLE_DEPARTMENT + '/' + params.department_id)
        for (const data of datas) {
            let roleStr = "Chưa có vai trò"
            if (data.role !== null) {
                let roleData = await axiosHttpService.get(API_ORGAN_ROLE + '/' + data.role);
                roleStr = roleData.data.name;
            }
            // if (data.department_id !== params.department_id) continue
            newData.push({
                "id": data.id,
                "name": data.full_name,
                "email": data.email,
                "phone": data.phone,
                "organ": organData.data.name,
                "department": departmentData.data.name,
                "role": roleStr,
                "update":
                    <div className="flex justify-between items-center">
                        <div className="cursor-pointer" onClick={() => {
                            setModalOpen(true)
                            setId(data.id)
                        }}><i className="fa-regular fa-pen-to-square"></i></div>

                        <div className="cursor-pointer" onClick={() => {
                            setOpenUpdatePassword(true)
                            setId(data.id)
                        }}><i className="fa-solid fa-lock"></i></div>

                        <Delete id={data.id} reFetchData={fetchFieldData} />
                    </div>

            })
        }

        setFieldData(newData)
        setIdOrgan(params.organ_id)
        setIdOrganDepartment(params.department_id)
        setIsLoading(false)
    }

    const fetchDepartment = async () => {
        const department = await getDepartmentbyId(params.department_id);
        setDepartment(department);
    }

    const fetchOrgan = async () => {
        const organ = await getOrganbyId(params.organ_id);
        setOrgan(organ);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([
                fetchFieldData(),
                fetchOrgan(),
                fetchDepartment()
            ]);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <div>
            <DanhMucCoQuan
                title={
                    <span>
                        <span>{organ ? organ.name : "Danh mục cơ quan"}</span> /
                        <span> {department ? department.name : "Phòng ban"} </span> /
                        <span className="text-black"> Nhân viên </span>
                    </span>
                }
                breadcrumb={
                    <span>
                        <Link to="/khai-bao-danh-muc/danh-muc-co-quan/">Danh mục cơ quan</Link> /
                        <Link to={`/khai-bao-danh-muc/danh-muc-co-quan/${params.organ_id}`}> Phòng ban </Link> /
                        <span className="text-black"> Nhân viên </span>
                    </span>
                }
                fieldNames={STAFF}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                Create={<Create idOrgan={idOrgan} idOrganDepartment={idOrganDepartment} fetchFieldData={fetchFieldData} />}
                isLoading={isLoading}
            />

            <Update
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                id={id}
                fetchFieldData={fetchFieldData}
                idOrgan={params.organ_id}
            />
            <Read
                modalOpenRead={modalOpenRead}
                setModalOpenRead={setModalOpenRead}
                id={id}
                idOrgan={params.organ_id}
            >
            </Read>

            <UpdatePassword
                id={id}
                modalOpen={openUpdatePassword}
                setModalOpen={setOpenUpdatePassword}
            />

        </div>

    )
}

export default NhanVien

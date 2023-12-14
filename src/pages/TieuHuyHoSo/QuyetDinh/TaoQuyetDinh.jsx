/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/TieuHuyHoSo/QuyetDinh/Base";
import { useEffect, useState, useCallback } from "react";
import axiosHttpService from "src/utils/httpService";
import { Button, Input, Modal, Popconfirm, Select } from "antd";
import ThemHoSo from "src/pages/TieuHuyHoSo/QuyetDinh/modal/ThemHoSo";
import PlanAPIService from "src/service/api/PlanAPIService";
import UserAPIService from "src/service/api/userAPIService";
import { ENUM_TYPE_PLAN } from "src/storage/Storage";

const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_DELETE_PLAN = import.meta.env.VITE_API_DELETE_PLAN

const parent =
{
    title: "Tiêu hủy hồ sơ",
    //link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh" 
}

const current = {
    link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh",
    title: "Tạo quyết định"
}

const Create = ({
    modalOpen,
    setModelOpen,
    reFetchData
}) => {
    const [request, setRequest] = useState({
        state: "Tạo mới"
    });
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [organName, setOrganName] = useState("");

    useEffect(() => {
        const getOrgan = async () => {
            const organ = await UserAPIService.getUserOrgan();
            handleChangeRequest("organ", organ.id);
            setOrganName(organ.name);
        };

        getOrgan();
    }, []);

    const handleOk = async () => {
        request["state"] = "Mới lập";
		request["type"] = ENUM_TYPE_PLAN.QUYET_DINH_TIEU_HUY;
		const response = await PlanAPIService.createPlan(request);
		const idPlan = response.id;

		selectedFiles.forEach(async (file) => {
			const payload = {
				plan_id: idPlan,
				gov_file_id: parseInt(file.substring(file.indexOf("checkbox") + "checkbox".length)),
			};
			await PlanAPIService.setPlanForFile(payload);
		});

		setTimeout(() => {
			reFetchData();
			setRequest({});
			setModelOpen(false);
		}, 500);

    };

    const handleCancel = () => {
        setModelOpen(false);
    };

    const handleChangeRequest = (name, value) => {
        setRequest({
            ...request,
            [name]: value,
        });
    };

    useEffect(() => {
        handleChangeRequest("files", selectedFiles)
    }, [JSON.stringify(selectedFiles)])


    return (
        <div>
            <Modal
                title="Tạo mới"
                style={{
                    top: 20,
                }}
                open={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <div className="flex justify-between py-[12px]">
                        <span>Tên quyết định</span>
                        <Input
                            name="name"
                            onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                            type="text"
                            className="w-[70%]"
                            value={request["name"]}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Ngày quyết định</span>
                        <Input
                            name="date"
                            onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                            type="date"
                            className="w-[70%]"
                            value={request["date"]}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Cơ quan / Đơn vị  </span>
                        <Input
                            disabled={true}
                            name="organ"
                            className="w-[70%]"
                            value={organName}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Hồ sơ</span>
                        <div
                            className="w-[70%]"
                        >
                            <Button onClick={() => {
                                setOpenModalAddFile(true)
                            }}> Chọn hồ sơ </Button>
                        </div>
                    </div>

                </div>

                <ThemHoSo
                    open={openModalAddFile}
                    setOpen={setOpenModalAddFile}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
            </Modal>
        </div>

    );
};

const Delete = ({ id, reFetchData }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const deletePlan = async () => {
            await axiosHttpService.delete(API_DELETE_PLAN + id);
        };

        deletePlan();
        setTimeout(() => {
            reFetchData();
            setOpen(false);
        }, 500);
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

const Update = ({ reFetchData, id }) => {
    const [request, setRequest] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [organName, setOrganName] = useState("");
    const getPlan = async () => {
        if(!id) return ;
        const data = await PlanAPIService.getPlanById(id);
        setRequest({
            name: data.name,
            date: data.start_date,
            organ: data.organ,
        });
        setOrganName(data.organ_name);
        setSelectedFiles(data.files)
    };

    useEffect(() => {
        getPlan();
    }, [id]);

    const handleChangeRequest = (name, value) => {
        return setRequest({
            ...request,
            [name]: value,
        });
    };

    const handleClick = () => {
        setModalOpen(true);
    };

    const handleOk = async () => {
        await axiosHttpService.put(API_DELETE_PLAN + id, request);
        setModalOpen(false);
        reFetchData();
    };

    const handleCancle = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        handleChangeRequest("files", selectedFiles)
    }, [JSON.stringify(selectedFiles)])

    return (
        <div>
            <Button onClick={handleClick} className="border-none">
                <i className="fa-regular fa-pen-to-square"></i>
            </Button>
            <Modal
                open={modalOpen}
                title="Sửa"
                onOk={handleOk}
                onCancel={handleCancle}
            >
                <div className="flex justify-between items-center">
                    <span>Tên quyết định</span>
                    <Input
                        name="name"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        className="w-[70%]"
                        value={request["name"]}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Ngày quyết định</span>
                    <Input
                        name="date"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="date"
                        className="w-[70%]"
                        value={request["date"]}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan / Đơn vị</span>
                    <Input
                        name="organ"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="text"
                        className="w-[70%]"
                        value={organName}
                        disabled={true}
                    />

                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Hồ sơ</span>
                    <div
                        className="w-[70%]"
                    >
                        <Button onClick={() => {
                            setOpenModalAddFile(true)
                        }}> Xem hồ sơ </Button>
                    </div>
                </div>
                <ThemHoSo
                    open={openModalAddFile}
                    setOpen={setOpenModalAddFile}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
            </Modal>
        </div>
    );
};


const TaoQuyetDinh = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState([]);


    const BUTTON_ACTIONS = [
        {
            title: "Tạo quyết định",
            btn_class_name: "custom-btn-add-file",
            icon: <i className="fa-solid fa-plus"></i>,
            onClick: () => {
                setModalOpen(true);
            },
        },
        {
            title: "Gửi quyết định",
            btn_class_name: "custom-btn-clear-filter",
            icon: <i className="fa-solid fa-sync"></i>,
            onClick: async () => {
                const sentPlan = async () => {
                    for (const item of selectedPlan) {
                        const id = item.split("checkbox")[1]
                        const { data } = await axiosHttpService.get(API_DELETE_PLAN + id);
                        data.state = "Chờ Duyệt"
                        delete data["id"]
                        await axiosHttpService.put(API_DELETE_PLAN + id, data);
                    }
                }
                await sentPlan()
                setTimeout(() => {
                    reFetchData()
                }, 500)
            }
        }
    ]

    const reFetchData = useCallback(async () => {
        setIsLoading(true);
        const rawDatas = await PlanAPIService.getDeletePlan();
        const plans = [];
        for (const rawData of rawDatas) {
            const row = {
                id: rawData.id,
                name: rawData.name,
                date: rawData.date,
                organ: rawData.organ,
                state: (
                    <button>{rawData.state}
                    </button>
                ),
                function: (
                    <div className="flex">
                        <Delete id={rawData.id} reFetchData={reFetchData} />
                        <Update id={rawData.id} reFetchData={reFetchData} />
                    </div>
                ),
            };
            plans.push(row);
        }
        setPlan(plans);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        reFetchData()
    }, [])

    return (
        <div>
            <BasePage
                parent={parent}
                current={current}
                plan={plan}
                btnActions={BUTTON_ACTIONS}
                isLoading={isLoading}
                setSelectedPlan={setSelectedPlan}
            />

            <Create
                setModelOpen={setModalOpen}
                modalOpen={modalOpen}
                reFetchData={reFetchData}
            />

        </div>
    )
}

export default TaoQuyetDinh;

/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/TieuHuyHoSo/QuyetDinh/Base";
import { useEffect, useState, useCallback } from "react";
import axiosHttpService from "src/utils/httpService";
import { Button, Input, Modal, Popconfirm, Select } from "antd";
import ThemHoSo from "src/pages/TieuHuyHoSo/QuyetDinh/modal/ThemHoSo";

const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_RESTORE_PLAN = import.meta.env.VITE_API_RESTORE_PLAN

const parent =
    { title: "Tiêu hủy hồ sơ", 
    // link: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-bi-tieu-huy"
 }

const current = {
    link: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-bi-tieu-huy",
    title: "Danh sách hồ sơ bị tiêu huỷ"
}

const Create = ({
    modalOpen,
    setModelOpen,
    reFetchData
}) => {
    const [request, setRequest] = useState({
        state: "Tạo mới"
    });
    const [organ, setOrgan] = useState([]);
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const getOrgan = async () => {
            const { data } = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL);
            const _ = data.map((item) => {
                return {
                    label: item.name,
                    value: item.name,
                };
            });
            setOrgan(_);
        };

        getOrgan();
    }, []);

    const handleOk = async () => {
        await axiosHttpService.post(`${API_RESTORE_PLAN}`, request);
        setTimeout(() => {
            reFetchData();
            setRequest({
                state: "Tạo mới"
            });
            setModelOpen(false);
        }, 500);
    };

    const handleCancle = () => {
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
                onCancel={handleCancle}
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
                        <Select
                            name="organ"
                            onChange={(value) => handleChangeRequest("organ", value)}
                            className="w-[70%]"
                            value={request["organ"]}
                            options={organ}
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
            await axiosHttpService.delete(API_RESTORE_PLAN + id);
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



const KhoiPhucHoSo = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState([]);


    const BUTTON_ACTIONS = [
        {
            title: "Khôi phục",
            btn_class_name: "custom-btn-add-file",
            icon: <i class="fa-solid fa-rotate-left"></i>,
            onClick: () => {
                setModalOpen(true);
            },
        },
    ]

    const reFetchData = useCallback(async () => {
        setIsLoading(true);
        const res = await axiosHttpService.get(`${API_RESTORE_PLAN}`);
        const rawDatas = res.data;
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

export default KhoiPhucHoSo;

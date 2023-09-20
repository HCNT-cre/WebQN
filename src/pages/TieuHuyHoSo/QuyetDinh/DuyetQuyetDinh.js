/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "pages/TieuHuyHoSo/QuyetDinh/Base";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button, Input, Modal} from "antd";
import ThemHoSo from "pages/TieuHuyHoSo/QuyetDinh/modal/ThemHoSo";

const API_DELETE_PLAN = process.env.REACT_APP_API_DELETE_PLAN

const parent =
    { title: "Tiêu hủy hồ sơ", link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh" }

const current = {
    link: "/tieu-huy-ho-so/quyet-dinh/duyet-quyet-dinh",
    title: "Duyệt quyết định"
}


const Update = ({ reFetchData, id }) => {
    const [request, setRequest] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const getPlan = async () => {
        const { data } = await axios.get(API_DELETE_PLAN + id);
        setRequest({
            name: data.name,
            date: data.date,
            organ: data.organ,
        });
        setSelectedFiles(data.files)
    };

    useEffect(() => {
        getPlan();
        console.log("id", id)
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
        await axios.put(API_DELETE_PLAN + id, request);
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
                        value={request["organ"]}
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


const DuyetQuyetDinh = () => {
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState([]);


    const BUTTON_ACTIONS = [
        {
            title: "Duyệt",
            btn_class_name: "custom-btn-add-file",
            icon: <i className="fa-solid fa-check"></i>,
            onClick: async () => {
                const sentPlan = async () => {
                    for (const item of selectedPlan) {
                        const id = item.split("checkbox")[1]
                        const { data } = await axios.get(API_DELETE_PLAN + id);
                        data.state = "Đã Duyệt"
                        delete data["id"]
                        await axios.put(API_DELETE_PLAN + id, data);
                    }
                }
                await sentPlan()
                setTimeout(() => {
                    reFetchData()
                }, 500)
            }
        },
        {
            title: "Trả về",
            btn_class_name: "custom-btn-clear-filter",
            icon: <i className="fa-solid fa-sync"></i>,
            onClick: async () => {
                const sentPlan = async () => {
                    for (const item of selectedPlan) {
                        const id = item.split("checkbox")[1]
                        const { data } = await axios.get(API_DELETE_PLAN + id);
                        data.state = "Trả Về"
                        delete data["id"]
                        await axios.put(API_DELETE_PLAN + id, data);
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
        const res = await axios.get(`${API_DELETE_PLAN}`);
        const rawDatas = res.data;
        const plans = [];
        for (const rawData of rawDatas) {
            if (rawData.state !== "Chờ Duyệt") continue
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

        </div>
    )
}

export default DuyetQuyetDinh;
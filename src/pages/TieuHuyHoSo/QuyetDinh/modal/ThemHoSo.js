/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd"
import { Table } from "custom/Components"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { STATE } from "storage/Storage";
import { FIELDS_TABLE } from "storage/FileStorage";

import axios from "axios";
import { Button, Input, Select } from "antd";

const API_GOV_FILE_GET_ALL = process.env.REACT_APP_API_GOV_FILE_GET_ALL;
const API_GOV_FILE_SEARCH = process.env.REACT_APP_API_GOV_FILE_SEARCH;

const fieldsTable = FIELDS_TABLE
fieldsTable.pop()

const TAB = [
    { text: 'Tất cả', className: 'mb-[12px] text-[12px]' },
    { text: 'Hết thời hạn bảo quản', className: 'mb-[12px] text-[12px]' },
    { text: 'Thời gian kết thúc', className: 'mb-[12px] text-[12px]' }
];

const ThemHoSo = ({
    open,
    setOpen,
}) => {

    const [activeTab, setActiveTab] = useState("Tất cả");
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();
    const userPermissionId = useSelector((state) => state.user.permission_id);

    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({
        title: null,
        organ_id: null,
        offce: null,
        state: 0,
        type: null,
    });
    const [doesFilter, setDoesFilter] = useState(true);

    const getFileFromResponse = (response) => {
        const rawDatas = response.data;
        let filesArray = [];
        for (const rawData of rawDatas) {
            let newButton = null;
            const row = {
                id: rawData.id,
                gov_file_code: (
                    <p
                        className="cursor-pointer hover:underline"
                        onClick={() => handleClickOnFile(rawData.id)}
                    >
                        {rawData.gov_file_code || ""}
                    </p>
                ),
                title: (
                    <p
                        className="cursor-pointer hover:underline"
                        onClick={() => handleClickOnFile(rawData.id)}
                    >
                        {rawData.title || ""}
                    </p>
                ),
                organ_id: rawData.organ_id || "",
                sheet_number: rawData.sheet_number || "",
                total_doc: rawData.total_doc || "",
                start_date: rawData.start_date || "",
                end_date: rawData.end_date || "",
                maintenance: rawData.maintenance || "",
                rights: rawData.rights || "",
                state: (
                    <button
                        onClick={() => {
                            search["state"] = rawData.state;
                            handleSearch();
                        }}
                    >
                        {STATE[rawData.state]}
                    </button>
                ),
            };
            filesArray.push(row);
        }
        return filesArray;
    };

    const reset = () => {
        const fetchFileData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    API_GOV_FILE_GET_ALL + userPermissionId
                );
                setIsLoading(false);
                setFiles(getFileFromResponse(response));
                setDoesFilter(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFileData();
    };

    const handleSearch = async (ev) => {
        try {
            let request = API_GOV_FILE_SEARCH + userPermissionId;
            Object.keys(search).forEach((key) => {
                if (key === "state" && (search[key] === 0 || search[key] === "Tất cả"))
                    return;
                const value = search[key];
                if ((value !== null) & (value !== ""))
                    request += "&" + key + "=" + value;
            });
            setIsLoading(true);
            const response = await axios.get(request, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setIsLoading(false);
            setFiles(getFileFromResponse(response));
            setDoesFilter(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickOnFile = (IDFile) => {
        dispatch({ type: "open", id: IDFile });
    };
    const resetSearch = async () => {
        let request = API_GOV_FILE_SEARCH + userPermissionId;
        const response = await axios.get(request);
        setFiles(getFileFromResponse(response));
        setDoesFilter(true);
        setSearch((prev) => ({
            title: "",
            organ_id: "",
            offce: "",
            state: 0,
            type: "",
            end_date: "",
            start_date: "",
        }));
    };
    const handleChangeSearch = (name, value) => {
        setSearch((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const BUTTON_ACTIONS = [
        {
            title: "Tìm kiếm",
            btn_class_name: "custom-btn-search",
            icon: <i className="fa-solid fa-magnifying-glass"></i>,
            onClick: handleSearch,
        },
        {
            title: "Xóa bộ lọc",
            btn_class_name: "custom-btn-clear-filter",
            icon: <i className="fa-solid fa-sync"></i>,
            onClick: resetSearch,
        }
    ];
    useEffect(() => {
        reset()
    }, [])
    return (
        <Modal
            style={{
                top: 20,
            }}
            title="Thêm hồ sơ"
            onCancel={() => setOpen(false)}
            open={open}
            className="w-10/12">

            <div className="flex justify-between">
                <div className="flex flex-col mt-[72px]">
                    {TAB.map((button, index) => (
                        <Button
                            onClick={() => setActiveTab(button.text)}
                            key={index}
                            className={`${activeTab === button.text
                                    ? 'text-white bg-sky-700'
                                    : ''
                                } ${button.className}`}
                        >
                            {button.text}
                        </Button>
                    ))}
                </div>
                <div className="w-11/12">
                    <div className="mt-[16px] mx-[24px] flex ">
                        <div className="w-[11.11111%] px-[5px]">
                            <Input
                                allowClear
                                onChange={(ev) =>
                                    handleChangeSearch("title", ev.target.value)
                                }
                                value={search["title"]}
                                name="title"
                                placeholder="Tiêu đề hồ sơ"
                                className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px] flex items-center"
                            ></Input>
                        </div>
                        <div className="w-[11.11111%] px-[5px]">
                            <Input
                                value={search["start_date"]}
                                onChange={(ev) =>
                                    handleChangeSearch("start_date", ev.target.value)
                                }
                                name="start_date"
                                placeholder="Ngày bắt đầu"
                                type="text"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
                            ></Input>
                        </div>
                        <div className="w-[11.11111%] px-[5px]">
                            <Input
                                value={search["end_date"]}
                                onChange={(ev) =>
                                    handleChangeSearch("end_date", ev.target.value)
                                }
                                name="end_date"
                                placeholder="Ngày kết thúc"
                                type="text"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
                            ></Input>
                        </div>
                        <div className="w-[11.11111%] px-[5px]">
                            <Input
                                placeholder="Kế hoạch"
                                type="text"
                                className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
                            ></Input>
                        </div>
                        <div className="w-[11.11111%] px-[5px] rounded-none">
                            <Select
                                name="state"
                                className="w-full bg-white outline-none rounded-md"
                                showSearch
                                defaultValue="Tất cả"
                                value={search["state"]}
                                optionFilterProp="children"
                                onChange={(value) => handleChangeSearch("state", value)}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={[
                                    { value: 0, label: "Tất cả" },
                                    {
                                        value: 1,
                                        label: "Mở",
                                    },
                                    {
                                        value: 2,
                                        label: "Đóng",
                                    },
                                    {
                                        value: 3,
                                        label: "Nộp lưu cơ quan",
                                    },
                                    {
                                        value: 4,
                                        label: "Lưu trữ cơ quan",
                                    },
                                    {
                                        value: 5,
                                        label: "Nộp lưu lịch sử",
                                    },
                                    {
                                        value: 6,
                                        label: "Lưu trữ lịch sử",
                                    },
                                ]}
                            />
                        </div>

                        {BUTTON_ACTIONS.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex"
                                >
                                    <Button
                                        onClick={item.onClick}
                                        className={`rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center ${item.btn_class_name}`}
                                    >
                                        <div className="mr-[8px]">{item.icon}</div>
                                        {item.title}
                                    </Button>
                                </div>
                            );
                        })}

                    </div>
                    <Table fieldDatas={files} isLoading={isLoading} fieldNames={fieldsTable} />
                </div>
            </div>

        </Modal>
    )
}

export default ThemHoSo
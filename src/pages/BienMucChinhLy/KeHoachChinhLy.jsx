import { Button, Input, Modal, Popconfirm, Select } from "antd";
import { Table } from "src/custom/Components/Table";
import { useState, useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { KE_HOACH_CHINH_LY_INPUT, KE_HOACH_CHINH_LY_FIELD_TABLE } from "src/storage/BienMucChinhLy";
import { useSelector } from "react-redux";
const API_DOCUMENT_MODIFICATION_PLAN = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_PLAN;
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;



const Create = ({ modalOpen, setModelOpen, reFetchData }) => {
	const [request, setRequest] = useState({});
	const [organ, setOrgan] = useState([]);
	const organId = useSelector((state) => state.organId.organId)

	const kehoachchinhlyOption = {
		organId: organId,
		organ: organ,
	}
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
		request["state"] = "Mới lập";
		await axiosHttpService.post(`${API_DOCUMENT_MODIFICATION_PLAN}`, request);
		setTimeout(() => {
			reFetchData();
			setRequest({});
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
				{KE_HOACH_CHINH_LY_INPUT.map((item, index) => {
					return (
						<div>
							{
								item.type === "select" ?
									<div className="flex justify-between py-[12px]">
										<span>{item.label}</span>
										<Select
											name={item.name}
											onChange={(value) => handleChangeRequest(item.name, value)}
											className="w-[70%]"
											value={request[item.name]}
											options={kehoachchinhlyOption[item.name]}
										/>
									</div>
									:
									<div className="flex justify-between py-[12px]">
										<span>{item.label}</span>
										<Input
											name={item.name}
											onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
											type={item.type}
											className="w-[70%]"
											value={request[item.name]}
										/>
									</div>
							}
						</div>
					);
				})}
			</div>
		</Modal>
	);
};

const Delete = ({ id, reFetchData }) => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirm = async () => {
		const deletePlan = async () => {
			await axiosHttpService.delete(API_DOCUMENT_MODIFICATION_PLAN + id);
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
	const [organ, setOrgan] = useState([]);
	const organId = useSelector((state) => state.organId.organId)

	const kehoachchinhlyOption = {
		organId: organId,
		organ: organ,
	}

	useEffect(() => {
		const getPlan = async () => {
			const { data } = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_PLAN + id);
			setRequest({
				
				code: data.code,
				name: data.name,
				date_start: data.date_start,
				date_end: data.date_end,
				organ: data.organ,
				organId: data.organId,
				organ: data.organ,
			});
		};
		getPlan();
	}, [id]);

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
		await axiosHttpService.put(API_DOCUMENT_MODIFICATION_PLAN + id, request);
		setModalOpen(false);
		reFetchData();
	};

	const handleCancle = () => {
		setModalOpen(false);
	};

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
				<div>
					{KE_HOACH_CHINH_LY_INPUT.map((item, index) => {
						return (
							<div>
								{
									item.type === "select" ?
										<div className="flex justify-between py-[12px]">
											<span>{item.label}</span>
											<Select
												name={item.name}
												onChange={(value) => handleChangeRequest(item.name, value)}
												className="w-[70%]"
												value={request[item.name]}
												options={kehoachchinhlyOption[item.name]}
											/>
										</div>
										:
										<div className="flex justify-between py-[12px]">
											<span>{item.label}</span>
											<Input
												name={item.name}
												onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
												type={item.type}
												className="w-[70%]"
												value={request[item.name]}
											/>
										</div>
								}
							</div>
						);
					})}
				</div>
			</Modal>
		</div>
	);
};

const KeHoachChinhLy = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [stateCheckBox, setStateCheckBox] = useState([]);
	const [plan, setPlan] = useState([]);

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
		},
		{
			title: "Tạo kế hoạch",
			btn_class_name: "custom-btn-add-file",
			icon: <i className="fa-solid fa-plus"></i>,
			onClick: () => {
				setModalOpen(true);
			},
		},
		{
			title: "Gửi kế hoạch",
			btn_class_name: "custom-btn-clear-filter",
			icon: <i className="fa-solid fa-sync"></i>,
		},
		{
			title: "Duyệt kế hoạch",
			btn_class_name: "custom-btn-export-excel",
			icon: <i className="fa-solid fa-file-excel"></i>,
		},
	];

	const reFetchData = async () => {
		setIsLoading(true);
		const res = await axiosHttpService.get(`${API_DOCUMENT_MODIFICATION_PLAN}`);
		const rawDatas = res.data;
		const plan = [];
		for (const rawData of rawDatas) {
			const row = {
				id: rawData.id,
				code: rawData.code,
				name: rawData.name,
				date_start: rawData.date_start,
				date_end: rawData.date_end,
				organ: rawData.organ,
				organId: rawData.organId,
				organ: rawData.organ,
				function: (
					<div className="flex ">
						<Delete id={rawData.id} reFetchData={reFetchData} />
						<Update id={rawData.id} reFetchData={reFetchData} />
					</div>
				),
			};
			plan.push(row);
		}
		setPlan(plan);
		setIsLoading(false);
	};

	useEffect(() => {
		reFetchData();
	}, []);

	return (
		<div className="w-full">
			<div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
				<p className="text-[14px] font-300 cursor-pointer ">
					<span className="text-[rgba(0,0,0,.45)]">
						<Link to="/bien-muc-chinh-ly/ke-hoach-chinh-ly">
							Biên mục chỉnh lý /{" "}
						</Link>
					</span>
					<span>
						<Link to="/bien-muc-chinh-ly/ke-hoach-chinh-ly">
							Kế hoạch chỉnh lý
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Kế hoạch chỉnh lý </p>
			</div>

			<div className="mt-[16px] mx-[24px] flex ">
				<div className="w-[11.11111%] px-[5px]">
					<Input
						allowClear
						name="title"
						placeholder="Tìm kiếm tên kế hoạch"
						className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px] flex items-center"
					></Input>
				</div>
				<div className="w-[11.11111%] px-[5px]">
					<Input
						name="start_date"
						placeholder="Năm"
						type="text"
						onBlur={(e) => (e.target.type = "text")}
						className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
					></Input>
				</div>
				<div className="w-[11.11111%] px-[5px]">
					<Input
						name="end_date"
						placeholder="Cơ quan đơn vị"
						type="text"
						onBlur={(e) => (e.target.type = "text")}
						className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
					></Input>
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

			<Table
				setStateCheckBox={setStateCheckBox}
				fieldNames={KE_HOACH_CHINH_LY_FIELD_TABLE}
				fieldDatas={plan}
				isLoading={isLoading}
				isCheckBox={true}
			/>

			<Create
				modalOpen={modalOpen}
				setModelOpen={setModalOpen}
				reFetchData={reFetchData}
			/>
		</div>
	);
};

export default KeHoachChinhLy;

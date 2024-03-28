import { Button, Input, Modal, Popconfirm, Select } from "antd";
import { Table } from "src/custom/Components/Table";
import { useState, useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";
import FileAPIService from "src/service/api/FileAPIService";
import ThemHoSo from "src/pages/LuuTruLichSu/modals/ThemHoSoLuuTruLS";
import SuaHoSo from "../LuuTruLichSu/modals/SuaHoSoLuuTruLS";
import { notifySuccess, notifyError } from "src/custom/Function";
import PlanAPIService from "src/service/api/PlanAPIService";
import XoaHoSo from "../LuuTruLichSu/modals/XoaHoSoLuuTruLS";
import { useDispatch } from "react-redux";
import { ModalConfirmSendPlan } from "./Modals/LuuTruLichSu";
const API_GET_PLAN = import.meta.env.VITE_API_PLAN;
const API_DELETE_PLAN = import.meta.env.VITE_API_PLAN;
const API_GET_PLAN_BY_TYPE = import.meta.env.VITE_API_GET_PLAN_BY_TYPE
const API_STORAGE_GET_ORGAN_ALL =
	import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_SET_PLAN_FOR_FILE = import.meta.env.VITE_API_SET_PLAN_FOR_FILE;

const FIELDS_TABLE = [
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Văn bản đính kèm", key: "attachment", width: "100%" },
	{ title: "Ngày kế hoạch", key: "start_date", width: "100%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
	{ title: "Trạng thái", key: "state", width: "70%" },
	{ title: "Chức năng", key: "function", width: "120px" },
	{ title: "Gửi hồ sơ", key: "send", width: "90px" },
];

const Create = ({ modalOpen, setModelOpen, reFetchData }) => {
	const [openModalAddFile, setOpenModalAddFile] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [request, setRequest] = useState({});
	const [organ, setOrgan] = useState([]);
	const [reset, setReset] = useState(false);

	const handleCreate = async () => {
		request["state"] = "Mới lập";
		request["type"] = ENUM_TYPE_PLAN.NOP_LUU_LICH_SU;
		const response = await axiosHttpService.post(`${API_GET_PLAN}`, request);
		const idPlan = response.data.id;

		selectedFiles.forEach(async (file) => {
			const payload = {
				plan_id: idPlan,
				gov_file_id: parseInt(file.substring(file.indexOf("checkbox") + "checkbox".length)),
			};
			await axiosHttpService.post(API_SET_PLAN_FOR_FILE, payload);
		});

		setTimeout(() => {
			reFetchData();
			setRequest({});
			setModelOpen(false);
		}, 500);
	};

	useEffect(() => {
		const getOrgan = async () => {
			const { data } = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL);
			const _ = data.map((item) => {
				return {
					label: item.name,
					value: item.id,
				};
			});
			setOrgan(_);
		};

		getOrgan();
	}, []);

	const handleOk = async () => {
		try {
			await handleCreate();
			setTimeout(() => {
				reFetchData();
				setReset(true);
				notifySuccess("Tạo kế hoạch thành công");
			}, [])
		} catch (err) {
			console.log("err in create file nop luu lich su", err)
			notifyError("Tạo kế hoạch thất bại");
		}
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
				<div className="flex justify-between py-[12px]">
					<span>Tên kế hoạch</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="text"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>

				<div className="flex justify-between py-[12px]">
					<span>Ngày kế hoạch</span>
					<Input
						name="start_date"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="date"
						className="w-[70%]"
						value={request["start_date"]}
					/>
				</div>

				<div className="flex justify-between py-[12px]">
					<span>Cơ quan / Đơn vị </span>
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
			<SuaHoSo
				open={openModalAddFile}
				setOpen={setOpenModalAddFile}
				selectedFiles={selectedFiles}
				setSelectedFiles={setSelectedFiles}
				doesReset={reset}
				setDoesReset={setReset}
			/>
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
			await axiosHttpService.delete(API_DELETE_PLAN + '/' + id);
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
	const [openModalDeleteFile, setOpenModalDeleteFile] = useState(false);
	const [addFile, setAddFile] = useState([]);
	const [removeFile, setRemoveFile] = useState([]);
	const [resetRemove, setResetRemove] = useState(false);
	const [resetAdd, setResetAdd] = useState(false);
	useEffect(() => {
		const getPlan = async () => {
			const { data } = await axiosHttpService.get(API_GET_PLAN + '/' + id);
			setRequest({
				name: data.name,
				start_date: data.start_date,
				organ_name: data.organ_name,
				organ: data.organ,
				state: data.state,
			});
		};
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

	const handleRemoveFile = async () => {
		for (const checkbox of removeFile) {
			const idFile = checkbox.split('checkbox')[1]
			await PlanAPIService.removeFileFromPlan(idFile);
		}
	};

	const handleAddFile = async () => {
		for (const checkbox of addFile) {
			const idFile = checkbox.split('checkbox')[1]
			const payload = {
				plan_id: id,
				gov_file_id: idFile,
			}
			await PlanAPIService.setPlanForFile(payload);
		}
	}

	const handleOk = async () => {
		await axiosHttpService.put(API_GET_PLAN + '/' + id, request);
		await handleRemoveFile();
		await handleAddFile();
		setResetAdd(true);
		setResetRemove(true);
		reFetchData();
		setModalOpen(false);
		notifySuccess("Cập nhật thành công");
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
				<div className="flex justify-between items-center">
					<span>Tên kế hoạch</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Ngày kế hoạch</span>
					<Input
						name="date"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="date"
						className="w-[70%]"
						value={request["start_date"]}
					/>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Cơ quan / Đơn vị</span>
					<Input
						name="organ"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="text"
						className="w-[70%]"
						value={request["organ_name"]}
					/>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Thêm hồ sơ</span>
					<div
						className="w-[70%]"
					>
						<Button onClick={() => {
							setOpenModalAddFile(true)
						}}> Thêm hồ sơ mới vào kế hoạch</Button>
					</div>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Xoá hồ sơ</span>
					<div
						className="w-[70%]"
					>
						<Button onClick={() => {
							setOpenModalDeleteFile(true)
						}}> Xoá hồ sơ trong kế hoạch</Button>
					</div>
				</div>
				<XoaHoSo
					open={openModalDeleteFile}
					idPlan={id}
					setOpen={setOpenModalDeleteFile}
					selectedFiles={removeFile}
					setSelectedFiles={setRemoveFile}
					doesReset={resetRemove}
					setDoesReset={setResetRemove}
				/>
				<ThemHoSo
					open={openModalAddFile}
					setOpen={setOpenModalAddFile}
					selectedFiles={addFile}
					setSelectedFiles={setAddFile}
					doesReset={resetAdd}
					setDoesReset={setResetAdd}
				/>

			</Modal>
		</div>
	);
};

const KeHoachNopLuuLichSu = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [plan, setPlan] = useState([]);
	const dispatch = useDispatch();
	const handleClick = (id, name) => {
		dispatch({ type: "open_modal_confirm_send_plan_luu_tru_lich_su", id, name });
	};
	const handleSendPlan = async (id) => {
		try {
			console.log("id", id);
			await PlanAPIService.updateStatePlan(id, ENUM_STATE_PLAN.DA_THU_THAP);
			await FileAPIService.updateStateByIdPlan(id, {
				current_state: 4, // luu tru co quan
				new_state: 5, // nop luu lich su
			});
			setTimeout(() => {
				reFetchData();
				notifySuccess("Gửi kế hoạch thành công");
			}, 500);
		} catch (err) {
			console.log("err in send plan nop luu lich su", err)
			notifyError("Gửi kế hoạch thất bại");
		}
	}

	const handleDownloadAttachment = async (fileUrl) => {
		const response = await axiosHttpService.get(fileUrl, {
			responseType: "blob",
		});
		const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.setAttribute("download", fileUrl.split("/").pop());
		document.body.appendChild(link);
		link.click();
	};

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
		},
	];

	const reFetchData = async () => {
		setIsLoading(true);
		const rawDatas = await PlanAPIService.getNLLSPlanByOrgan();
		const plan = [];
		for (const rawData of rawDatas) {
			if (rawData.state != 'Đợi thu thập' && rawData.state != 'Đã thu thập') continue;
			let attachmentName = rawData.attachment;
			if (attachmentName) {
				attachmentName = attachmentName.split("/").pop();
			} else {
				attachmentName = "";
			}
			const row = {
				id: rawData.id,
				name: rawData.name,
				attachment: <button onClick={() => handleDownloadAttachment(rawData.attachment)}>{attachmentName}</button>,
				start_date: rawData.start_date,
				organ_name: rawData.organ_name,
				state: <button>{rawData.state}</button>,
				function: (
					<div className="flex ">
						<Delete id={rawData.id} reFetchData={reFetchData} />
						<Update id={rawData.id} reFetchData={reFetchData} />
					</div>
				),
				send: (
					<div>
						<Button onClick={() => handleClick(rawData.id, rawData.name)} className="border-none">
							<i className="fa-solid fa-paper-plane"></i>
						</Button>
					</div>
				)
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
						<Link to="/nop-luu-lich-su/ke-hoach-nop-luu-lich-su">
							Nộp lưu lịch sử /{" "}
						</Link>
					</span>
					<span>
						<Link to="/nop-luu-lich-su/ke-hoach-nop-luu-lich-su">
							Kế hoạch nộp lưu lịch sử
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Kế hoạch nộp lưu lịch sử</p>
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
				fieldNames={FIELDS_TABLE}
				fieldDatas={plan}
				isLoading={isLoading}
			/>

			<Create
				modalOpen={modalOpen}
				setModelOpen={setModalOpen}
				reFetchData={reFetchData}
			/>

			<ModalConfirmSendPlan handleSendPlan={handleSendPlan} />

		</div>
	);
};

export default KeHoachNopLuuLichSu;

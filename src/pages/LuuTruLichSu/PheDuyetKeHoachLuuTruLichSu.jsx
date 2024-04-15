import { Table } from "src/custom/Components";
import { ENUM_STATE_PLAN } from "src/storage/Storage";
import { useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Modal, Popconfirm } from "antd";
import ThemHoSo from "src/pages/LuuTruLichSu/modals/ThemHoSoLuuTruLS";
import { notifySuccess, notifyError } from "src/custom/Function";
import PlanAPIService from "src/service/api/PlanAPIService";
import XoaHoSo from "./modals/XoaHoSoLuuTruLS";
import { SendPlanToOrgan } from "./modals/SendPlanToOrgan";
import { ModalOpenAttachments } from "../Modals";
const API_GET_PLAN = import.meta.env.VITE_API_PLAN;
const API_DELETE_PLAN = import.meta.env.VITE_API_PLAN;

const FIELDS_TABLE = [
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Văn bản đính kèm", key: "attachment", width: "100%" },
	{ title: "Ngày kế hoạch", key: "start_date", width: "100%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
	{ title: "Trạng thái", key: "state", width: "70%" },
	{ title: "Chức năng", key: "function", width: "120px" },
];
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
	const [fileUploaded, setFileUploaded] = useState([]);

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
		if (fileUploaded.length > 0) {
			request["attachment"] = fileUploaded[0];
		}
		await axiosHttpService.put(API_GET_PLAN + '/' + id, request, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			}
		});
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
					<span>Văn bản đính kèm</span>
					<form encType="multipart/form-data">
						<label
							className="flex justify-center items-center cursor-pointer h-[30px] border-[#ccc] border-2 rounded-[5px] text-black hover:opacity-90 text-[12px] w-[100px]"
							htmlFor="file-upload"
						>
							<p className="ml-[8px]">Thêm văn bản</p>
						</label>
						<input
							onClick={(ev) => {
								ev.target.value = "";
							}}
							type="file"
							id="file-upload"
							name="file-upload"
							className="hidden"
							onChange={(ev) => {
								setFileUploaded(Array.from(ev.target.files));
							}}
							accept="application/pdf"
							multiple
						></input>
					</form>
				</div>
				{/**  <div className="flex justify-between py-[12px]">
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
					</div> */}
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


const PheDuyetKeHoachLuuTruLichSu = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [stateCheckBox, setStateCheckBox] = useState([]);
	const [plan, setPlan] = useState([]);
	const modalState = useSelector(state => state.tableSendPlanToOrgan);

	const dispatch = useDispatch();

	useEffect(() => {
		if (modalState.state == false) {
			if (modalState.success === true) {
				setTimeout(() => {
					reFetchData();
					setIsLoading(false);
					notifySuccess("Gửi kế hoạch thành công");
				}, 500);
			} else if (modalState.success === false) {
				notifyError("Gửi kế hoạch thất bại");
			}
		}
	}, [modalState?.state])

	const handleSendPlanToOrgan = () => {
		if (stateCheckBox.length === 0) {
			notifyError("Vui lòng chọn kế hoạch cần gửi");
			return;
		}
	
		const ids = stateCheckBox.map(item => parseInt(item.substring(item.indexOf("checkbox") + "checkbox".length)));
		const filteredPlans = plan.filter(plan => ids.includes(plan.id));
	
		let hasPendingPlan = false; 
	
		filteredPlans.forEach(plan => {
			if (plan.state.props.children == "Đợi duyệt") {
				notifyError(plan.name + " chưa được duyệt");
				hasPendingPlan = true; 
			}
		});
	
		if (!hasPendingPlan) {
			dispatch({ type: "open_table_send_plan_to_organ", data: { "planIds": ids } });
		}
	};

	const handleConfirmPlan = async () => {
		const ids = stateCheckBox.map((item) => item.split('checkbox')[1]);
		if (ids.length == 0) {
			notifyError("Vui lòng chọn kế hoạch cần duyệt");
			return;
		}
		ids.forEach(async (id) => {
			await PlanAPIService.updateStatePlan(id, ENUM_STATE_PLAN.DA_DUYET);
		});
		setTimeout(() => {
			notifySuccess("Duyệt thành công");
			reFetchData();
		}, 300);
	};

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
		},
		{
			title: "Duyệt kế hoạch",
			btn_class_name: "custom-btn-add-file",
			icon: <i className="fa-solid fa-plus"></i>,
			onClick: handleConfirmPlan,
		},
		{
			title: "Gửi đến các cơ quan",
			btn_class_name: "custom-btn-send-plan-to-organ",
			icon: <i className="fa-regular fa-share-from-square"></i>,
			onClick: handleSendPlanToOrgan,
		}
	];

	
	const handleClickAttachments = async (attachments) => {
		dispatch({
			type: "open_modalOpenAttachments",
			attachments,
		})
	};

	const reFetchData = async () => {
		setIsLoading(true);
		const res = await PlanAPIService.getNLLSPlanInternal();
		const plans = [];
		const plansRaw =res.reverse();
		for (const planRaw of plansRaw) {
			const row = {
				id: planRaw.id,
				name: planRaw.name,
				attachment:  planRaw.attachments ? <Button onClick={() => handleClickAttachments(planRaw.attachments)}>Xem danh sách</Button> : "Không có tệp đính kèm",
				start_date: planRaw.start_date,
				organ_name: planRaw.organ_name,
				state: <button>{planRaw.state}</button>,
				function: (
					<div className="flex ">
						<Delete id={planRaw.id} reFetchData={reFetchData} />
						<Update id={planRaw.id} reFetchData={reFetchData} />
					</div>
				),
			};
			plans.push(row);
		}
		setPlan(plans);
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
						<Link to="/luu-tru-lich-su/theo-doi-ke-hoach-nop-luu-lich-su">
							Lưu trữ lịch sử /{" "}
						</Link>
					</span>
					<span>
						<Link to="/luu-tru-lich-su/theo-doi-ke-hoach-nop-luu-lich-su">
							Phê duyệt và gửi kế hoạch nộp lưu lịch sử
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Phê duyệt và gửi kế hoạch nộp lưu lịch sử</p>
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
							className="w-[15%] text-white text-center px-[5px] rounded-[5px] flex"
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
				fieldNames={FIELDS_TABLE}
				fieldDatas={plan}
				isLoading={isLoading}
				isCheckBox={true}
				selectedFiles={stateCheckBox}
			/>
			<ModalOpenAttachments/>
			<SendPlanToOrgan />
		</div>
	);
}

export default PheDuyetKeHoachLuuTruLichSu;

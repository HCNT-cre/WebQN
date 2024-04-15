import { Button, Input, Modal, Popconfirm, Select, Form, Upload } from "antd";
import { Table } from "src/custom/Components/Table";
import { useState, useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";
import ThemHoSo from "src/pages/LuuTruLichSu/modals/ThemHoSoLuuTruLS";
import SuaHoSo from "./modals/SuaHoSoLuuTruLS";
import { notifySuccess, notifyError } from "src/custom/Function";
import PlanAPIService from "src/service/api/PlanAPIService";
import XoaHoSo from "./modals/XoaHoSoLuuTruLS";
import { useDispatch, useSelector } from "react-redux";
import UserAPIService from "src/service/api/userAPIService";
import { ChonNguoiDuyetKeHoach } from "./modals/ChonNguoiDuyetKeHoach";
import PropTypes from 'prop-types';
import { UploadOutlined } from '@ant-design/icons';
import { ModalOpenAttachments } from "../Modals";
import { ModalSendExtraPeople } from "./modals/SendExtraPeople";
import AttachmentAPIService from "src/service/api/attachmentsAPIService";

const API_GET_PLAN = import.meta.env.VITE_API_PLAN;
const API_DELETE_PLAN = import.meta.env.VITE_API_PLAN;
const API_GET_PLAN_BY_TYPE = import.meta.env.VITE_API_GET_PLAN_BY_TYPE
const API_SET_PLAN_FOR_FILE = import.meta.env.VITE_API_SET_PLAN_FOR_FILE;


const FIELDS_TABLE = [
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Văn bản đính kèm", key: "attachment", width: "100%" },
	{ title: "Ngày kế hoạch", key: "start_date", width: "100%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
	{ title: "Trạng thái", key: "state", width: "70%" },
	{ title: "Chức năng", key: "function", width: "120px" },
];

const Create = ({ modalOpen, setModelOpen, reFetchData }) => {
	const [openModalAddFile, setOpenModalAddFile] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [request, setRequest] = useState({});
	const [optionOrgan, setOptionOrgan] = useState([])
	const [reset, setReset] = useState(false);
	const [fileUploaded, setFileUploaded] = useState([]);



	const handleCreate = async () => {
		request["state"] = "Mới lập";
		request["type"] = ENUM_TYPE_PLAN.NOP_LUU_LICH_SU;

		if (fileUploaded.length > 0) {
			fileUploaded.forEach((file, idx) => {
				const key = "attachment" + idx;
				request[key] = file;
			})
		}

		const response = await axiosHttpService.post(`${API_GET_PLAN}`, request, {
			headers: {
				'Accept': 'application/json',
				"content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
			}
		});
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
			setRequest({
				"organ": request.organ,
			});
			setModelOpen(false);
		}, 500);
	};

	useEffect(() => {
		const fetchOrganName = async () => {
			const response = await UserAPIService.getUserOrgan();
			let organObject = {
				value: response.id,
				label: response.name
			}
			setOptionOrgan([organObject]);
			handleChangeRequest('organ', organObject.value)
		}
		fetchOrganName();
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

	const handleFileUpload = (files) => {
		const { fileList } = files;

		const fileObjs = fileList.map((file) => {
			return file.originFileObj;
		});
		setFileUploaded(fileObjs);
	}

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
							className="w-[70%] bg-white outline-none rounded-md"
							showSearch
							allowClear
							defaultValue={optionOrgan[0]?.value}
							optionFilterProp="children"
							onChange={(value) => handleChangeRequest('organ', value)}
							filterOption={(input, option) =>
								(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
							}
							options={optionOrgan}
							disabled={true}
						/>
					</div>
					<div className="flex justify-between py-[12px]">
						<span>Văn bản đính kèm</span>
						<Form encType="multipart/form-data">
							<Form.Item
								rules={[
									{
										required: true,
										message: 'Vui lòng chọn văn bản đính kèm'
									}
								]}
							>
								<Upload
									multiple
									accept="application/pdf"
									beforeUpload={() => false}
									onChange={handleFileUpload}
								>
									<Button htmlType="submit" icon={<UploadOutlined />}>Thêm văn bản</Button>
								</Upload>
							</Form.Item>
						</Form>
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

		const getAttachments = async () => {
			const attachments = await AttachmentAPIService.getAttachmentsByPlanId(id);
			if (attachments && attachments.length > 0) {
				setFileUploaded(
					attachments.map((attachment) => {
						return {
							uid: attachment.id,
							name: attachment.name,
							url: attachment.url,
						}
					})
				);
			}else {
				setFileUploaded([])
			}
		}

		getAttachments();
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
		const fileObjs = fileUploaded.filter((file) => {
			return file.originFileObj;
		}).map((file) => {
			return file.originFileObj;
		});

		request["old_files"] = fileUploaded.filter((file) => {
			return !file.originFileObj;
		});

		let res = await PlanAPIService.updatePlan(id, request);

		if (res && fileObjs.length > 0) {
			const payload = {};
			fileObjs.forEach((file, i) => {
				payload['attachment' + i] = file;
			})
			res = await PlanAPIService.addAttachmentToPlan(id, payload);
		}

		if(res) {
			notifySuccess("Cập nhật kế hoạch thành công");
			reFetchData();
		} else {
			notifySuccess("Cập nhật kế hoạch không thành công");
		}

		setModalOpen(false);
	};

	const handleCancel = () => {
		setModalOpen(false);
	};

	const handleFileUpload = (files) => {
		const { fileList } = files;
		setFileUploaded(fileList);
	}

	const handleDownloadFile = (e) => {
		AttachmentAPIService.downloadAttachment(e.url)
	}

	return (
		<div>
			<Button onClick={handleClick} className="border-none">
				<i className="fa-regular fa-pen-to-square"></i>
			</Button>
			<Modal
				open={modalOpen}
				title="Sửa"
				onOk={handleOk}
				onCancel={handleCancel}
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
						disabled
						name="organ"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="text"
						className="w-[70%]"
						value={request["organ_name"]}
					/>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Văn bản đính kèm</span>
					<Form encType="multipart/form-data">
						<Form.Item
							rules={[
								{
									required: true,
									message: 'Vui lòng chọn văn bản đính kèm'
								}
							]}
						>
							<Upload
								fileList={fileUploaded}
								multiple
								accept="application/pdf"
								beforeUpload={() => false}
								onChange={handleFileUpload}
								onPreview={handleDownloadFile}

							>
								<Button htmlType="submit" icon={<UploadOutlined/>}>Thêm văn bản</Button>
							</Upload>
						</Form.Item>
					</Form>
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

const TaoKeHoachLuuTruLichSu = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [stateCheckBox, setStateCheckBox] = useState([]);
	const [plan, setPlan] = useState([]);
	const dispatch = useDispatch();
	const modalState = useSelector(state => state.modalChoosePerson);
	const sendExtraPeopleState = useSelector(state => state.modalSendExtraPeople);

	const handleChoosePerson = () => {
		if (stateCheckBox.length === 0) {
			notifyError("Vui lòng chọn kế hoạch cần gửi");
			return;
		}
		dispatch({type: "open_modal_choose_person", data: {"planIds": stateCheckBox.map(item => parseInt(item.substring(item.indexOf("checkbox") + "checkbox".length))) } });
	};

	const handleSendExtraPeople = () => {
		if (stateCheckBox.length === 0) {
			notifyError("Vui lòng chọn kế hoạch cần gửi");
			return;
		}
		dispatch({ type: "open_modal_send_extra_people", planIds: stateCheckBox.map(item => parseInt(item.substring(item.indexOf("checkbox") + "checkbox".length))) });
	}

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

			if(modalState.success !== null)
				dispatch({ type: "close_modal_choose_person", success: null});
		}
	}, [modalState?.state])

	useEffect(() => {
		if(sendExtraPeopleState.open === false) {
			if(sendExtraPeopleState.success === true) {
				setTimeout(() => {
					reFetchData();
					setIsLoading(false);
					notifySuccess("Gửi kế hoạch thành công");
				}, 500);
			} else if(sendExtraPeopleState.success === false) {
				notifyError("Gửi kế hoạch thất bại");
			}
			if(sendExtraPeopleState.success !== null)
				dispatch({ type: "close_modal_send_extra_people", success: null});
		}
	}, [sendExtraPeopleState])

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
			title: "Gửi phê duyệt",
			btn_class_name: "custom-btn-clear-filter",
			onClick: handleChoosePerson,
			icon: <i className="fa-solid fa-sync"></i>,
		},
		{
			title: "Gửi đến cá nhân",
			onClick: handleSendExtraPeople,
			btn_class_name: "custom-btn-add-file",
			icon: <i className="fa-solid fa-plus"></i>,
		},
	];

	const handleClickAttachments = async (attachments) => {
		dispatch({
			type: "open_modalOpenAttachments",
			attachments,
		})
	};

	const reFetchData = async () => {
		setIsLoading(true);
		const res = await axiosHttpService.get(`${API_GET_PLAN_BY_TYPE}/${ENUM_TYPE_PLAN.NOP_LUU_LICH_SU}`);
		const rawDatas = res.data.reverse();
		const plan = [];
		for (const rawData of rawDatas) {
			if (rawData.state != ENUM_STATE_PLAN.TAO_MOI && rawData.state != ENUM_STATE_PLAN.CHO_DUYET && rawData.state != ENUM_STATE_PLAN.DA_DUYET) continue;
			const row = {
				id: rawData.id,
				name: rawData.name,
				attachment: rawData.attachments ? <Button onClick={() => handleClickAttachments(rawData.attachments)}> Danh sách tệp đính kèm</Button> : "Không có tệp đính kèm",
				start_date: rawData.start_date,
				organ_name: rawData.organ_name,
				state: <button>{rawData.state}</button>,
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
						<Link to="/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap">
							Lưu trữ lịch sử /{" "}
						</Link>
					</span>
					<span>
						<Link to="/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap">
							Tạo kế hoạch nộp lưu lịch sử
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Tạo kế hoạch nộp lưu lịch sử</p>
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
				fieldNames={FIELDS_TABLE}
				fieldDatas={plan}
				isLoading={isLoading}
				isCheckBox={true}
			/>

			<Create
				modalOpen={modalOpen}
				setModelOpen={setModalOpen}
				reFetchData={reFetchData}
			/>
			<ChonNguoiDuyetKeHoach />
			<ModalOpenAttachments />
			<ModalSendExtraPeople/>
		</div>
	);
};

Create.propTypes = {
	modalOpen: PropTypes.bool.isRequired,
	setModelOpen: PropTypes.func.isRequired,
	reFetchData: PropTypes.func.isRequired,
}

Delete.propTypes = {
	id: PropTypes.number.isRequired,
	reFetchData: PropTypes.func.isRequired,
}

Update.propTypes = {
	id: PropTypes.number.isRequired,
	reFetchData: PropTypes.func.isRequired,
}

export default TaoKeHoachLuuTruLichSu;

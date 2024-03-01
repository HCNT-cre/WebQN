import { Button, Input, Modal, Popconfirm, Select, Upload } from "antd";
import { Table } from "src/custom/Components/Table";
import { useState, useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { ENUM_STATE_PLAN } from "src/storage/Storage";
import { notifySuccess } from "src/custom/Function";

const API_COLLECTION_PLAN = import.meta.env.VITE_API_PLAN;

const FIELDS_TABLE = [
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Văn bản đính kèm", key: "attachment", width: "100%" },
	{ title: "Ngày kế hoạch", key: "date", width: "100%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ_name", width: "100%" },
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
			await axiosHttpService.delete(API_COLLECTION_PLAN + '/' + id);
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

const Update = ({
	reFetchData,
	id,
	modalOpen,
	setModalOpen }) => {
	const [request, setRequest] = useState({});
	const [organName, setOrganName] = useState("");
	const [fileList, setFileList] = useState([]);
	const [fileUploaded, setFileUploaded] = useState([]);
	const props = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	useEffect(() => {
		if (!id) return;
		const getPlan = async () => {
			const { data } = await axiosHttpService.get(API_COLLECTION_PLAN + '/' + id);
			setRequest({
				name: data.name,
				date: data.start_date,
				organ: data.organ,
				state: data.state,
			});
			setOrganName(data.organ_name);
		};
		getPlan();
	}, [id]);



	const handleChangeRequest = (name, value) => {
		return setRequest({
			...request,
			[name]: value,
		});
	};

	const handleOk = async () => {
		if (fileUploaded.length > 0) {
            request["attachment"] = fileUploaded[0];
        }
		await axiosHttpService.put(API_COLLECTION_PLAN + '/' + id, request,  {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			}
		});
		
		setModalOpen(false);
		reFetchData();
		notifySuccess("Cập nhật thành công");
	};

	const handleCancel = () => {
		setModalOpen(false);
	};

	return (
		<div>

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
						value={request["date"]}
					/>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Cơ quan / Đơn vị </span>
					<Input
						disabled
						name="organ"
						className="w-[70%]"
						value={organName}
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
			</Modal>
		</div>
	);
};

const KeHoachThuThapBiTuChoi = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [plan, setPlan] = useState([]);
	const [id, setId] = useState(null);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [stateCheckBox, setStateCheckBox] = useState([]);
	const [mapOrgan, setMapOrgan] = useState({});
	const handleSendCollectPlan = async () => {
		const planIds = stateCheckBox.map((item) => {
			return Number(item.split("checkbox")[1]);
		})

		setIsLoading(true);
		plan.forEach(async (pl) => {
			if (planIds.findIndex((id) => id == pl.id) === -1) return;
			await axiosHttpService.put(API_COLLECTION_PLAN + '/' + pl.id, {
				name: pl.name,
				start_date: pl.date,
				organ: mapOrgan[pl.id],
				state: ENUM_STATE_PLAN.CHO_DUYET,
			});
		});

		setTimeout(() => {
			reFetchData();
			setIsLoading(false);
			notifySuccess("Gửi kế hoạch thành công");
		}, 600);
	}

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
		},
		{
			title: "Gửi kế hoạch",
			btn_class_name: "custom-btn-clear-filter",
			onClick: handleSendCollectPlan,
			icon: <i className="fa-solid fa-sync"></i>,
		},
	];
	const handleClickUpdate = (id) => {
		setUpdateOpen(true);
		setId(id);
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

	const reFetchData = async () => {
		setIsLoading(true);
		const res = await axiosHttpService.get(`${API_COLLECTION_PLAN}`);

		const rawDatas = res.data.reverse().filter((data) => {
			return data.state === ENUM_STATE_PLAN.TU_CHOI;
		});

		const plan = [];
		const mapOrgan = {};
		for (const rawData of rawDatas) {
			let attachmentName = rawData.attachment;
			if (attachmentName) {
				attachmentName = attachmentName.split("/").pop();
			}else {
				attachmentName = "";
			}
			const row = {
				id: rawData.id,
				name: rawData.name,
				attachment: <button onClick={() => handleDownloadAttachment(rawData.attachment)}>{attachmentName}</button>,
				date: rawData.start_date,
				organ: rawData.organ_name,
				state: <button>{rawData.state}</button>,
				function: (
					<div className="flex ">
						<Delete id={rawData.id} reFetchData={reFetchData} />
						<Button onClick={() => handleClickUpdate(rawData.id)} className="border-none">
							<i className="fa-regular fa-pen-to-square"></i>
						</Button>

					</div>
				),
			};
			plan.push(row);
			mapOrgan[rawData.id] = rawData.organ;
		}
		setMapOrgan(mapOrgan);
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
							Thu thập và nộp lưu /{" "}
						</Link>
					</span>
					<span>
						<Link to="/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap">
							Kế hoạch thu thập bị từ chối
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Kế hoạch thu thập bị từ chối</p>
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
				setStateCheckBox={setStateCheckBox}
				fieldDatas={plan}
				isLoading={isLoading}
				isCheckBox={true}
			/>

			<Update
				id={id}
				reFetchData={reFetchData}
				modalOpen={updateOpen}
				setModalOpen={setUpdateOpen}
			/>

		</div>
	);
};

export default KeHoachThuThapBiTuChoi;

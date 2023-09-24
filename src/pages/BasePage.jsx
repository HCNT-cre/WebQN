/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, cloneElement } from "react";
import DocCategory from "../components/Form/Document/DocCategory";
import MultimediaCategory from "../components/Form/Multimedia/MultimediaCategory";
import axiosHttpService from "src/utils/httpService";
import { Table } from "../custom/Components";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input, Select, Popconfirm, Modal } from "antd";
import { OpenFile, EditFile, CreateFile } from "../actions/formFile";
import File from "../components/Form/File/File";
import { FIELDS_TABLE } from "../storage/FileStorage";
import { STATE } from "../storage/Storage";
import { DeleteData, GetKey } from "../custom/Function";
import { useButtonClickOutside } from "../custom/Hook";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../custom/Function";
import { ModalCensorship } from "./Modals";
import * as XLSX from 'xlsx/xlsx.mjs';

const API_GOV_FILE_GET_ALL = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_UPDATE_STATE_GOV_FILE =
	import.meta.env.VITE_API_GOV_FILE_UPDATE_STATE;
const API_GOV_FILE_SEARCH = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_GOV_FILE_DELETE = import.meta.env.VITE_API_GOV_FILE_DELETE;
const API_STORAGE_DELETE_FILE_ORGAN_STORAGE =
	import.meta.env.VITE_API_STORAGE_DELETE_FILE_ORGAN_STORAGE;
const API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL =
	import.meta.env.VITE_API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL;

const CATEGORY_FILE_API = import.meta.env.VITE_CATEGORY_FILE_API;
const API_COLLECTION_PLAN = import.meta.env.VITE_API_COLLECTION_PLAN;

const PlanAndCategoryFile = ({ open, setOpen, API_PLAN }) => {
	const dispatch = useDispatch();
	const [categoryFile, setCategoryFile] = useState([]);
	const [collectionPlan, setCollectionPlan] = useState([]);

	const handleOk = () => {
		setOpen(false);
		dispatch(CreateFile());
	};

	const handleCancle = () => {
		setOpen(false);
	};

	useEffect(() => {
		const getCategoryFile = async () => {
			const { data } = await axiosHttpService.get(CATEGORY_FILE_API);
			const _ = [];
			for (let i = 0; i < data.length; i++) {
				let isParent = false;
				for (let j = 0; j < data.length; j++) {
					if (i === j) continue;
					if (data[i].id === data[j].parent) isParent = true;
				}
				if (!isParent)
					_.push({
						label: data[i].name,
						value: data[i].name,
					});
			}
			setCategoryFile(_);
		};

		const getCollectionPlan = async () => {
			const { data } = await axiosHttpService.get(API_PLAN);
			const _ = data.map((item) => {
				return {
					value: item.name,
					label: item.name,
				};
			});
			setCollectionPlan(_);
		};

		getCategoryFile();
		getCollectionPlan();
	}, []);

	return (
		<Modal
			title="Chọn danh mục và kê hoạch"
			style={{
				top: 20,
			}}
			okButtonProps={{ style: { backgroundColor: 'blue-300' } }}
			className="w-[600px]"
			open={open}
			onCancel={handleCancle}
			onOk={handleOk}
		>
			<div className="flex justify-between py-[12px]">
				<span>Kế hoạch </span>
				<Select
					name="collectionPlan"
					className="w-[70%]"
					options={collectionPlan}
				/>
			</div>
			<div className="flex justify-between py-[12px]">
				<span>Danh mục</span>
				<Select
					name="categoryFile"
					className="w-[70%]"
					options={categoryFile}
				/>
			</div>
		</Modal>
	);
};




const ButtonFunctionOfEachFile = ({
	handleClickOnFile,
	IDFile,
	reset,
	state,
}) => {
	const userPermissionId = useSelector((state) => state.user.permission_id);
	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirm = () => {
		const DeleteOrganFile = async () => {
			const files = axiosHttpService.get(API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL);
			for (const file of files) {
				if (file.file_id === IDFile) {
					await axiosHttpService.delete(API_STORAGE_DELETE_FILE_ORGAN_STORAGE + file.id);
				}
			}
		};

		DeleteData(
			API_GOV_FILE_DELETE,
			{ id: IDFile, perm_token: userPermissionId },
			"Xóa thành công"
		);
		DeleteOrganFile();
		setTimeout(async () => {
			await reset();
		}, 500);
		setOpen(false);
	};

	const [buttonRef, contentRef, toggleContent, showContent] =
		useButtonClickOutside(false, handleClose);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const handleClickUploadFile = () => {
		dispatch({ type: "open", id: IDFile });
		setTimeout(() => {
			document.getElementById("file-upload").click();
		}, 500);
	};

	useEffect(() => {
		const popupContainer = document.querySelectorAll(
			".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1fviqcj.css-dev-only-do-not-override-1fviqcj.ant-popover-placement-top"
		)[0];

		if (popupContainer === undefined) return;

		contentRef.current[0] = popupContainer;

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

	const BUTTON_READ_ONLY = [
		{
			icon: <i className="fa-regular fa-folder-open"></i>,
			title: "Xem hồ sơ",
			color: "text-[#FF8400]",
			onclick: () => {
				dispatch(OpenFile(IDFile));
			},
		},
	];

	const BUTTON_DEFAULT = [
		{
			icon: <i className="fa-solid fa-upload"></i>,
			title: "Thêm văn bản",
			color: "text-[#537FE7]",
			onclick: () => {
				handleClickUploadFile();
			},
		},
		{
			icon: <i className="fa-solid fa-photo-film"></i>,
			title: "Thêm tài liệu đa phương tiện",
			color: "text-[#19376D]",
			onclick: () => { },
		},
		{
			icon: <i className="fa-regular fa-folder-open"></i>,
			title: "Sửa hồ sơ",
			color: "text-[#FF8400]",
			onclick: () => {
				dispatch(EditFile(IDFile));
			},
		},
	];

	const BUTTON_MORE = [
		{
			popup: true,
			element: (
				<Popconfirm
					title="Xóa hồ sơ"
					open={open}
					description="Bạn có chắc chắn xóa?"
					onConfirm={handleConfirm}
					onCancel={handleClose}
					key={GetKey()}
				>
					<Button
						onClick={() => {
							setOpen(true);
						}}
						className={`hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] text-[#20262E] px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
						title="Xóa hồ sơ"
					>
						<i className="fa-solid fa-trash-can"></i>
					</Button>
				</Popconfirm>
			),
		},

		{
			icon: <i className="fa-solid fa-clipboard-list"></i>,
			title: "Xem lịch sử",
			color: "text-[#FF8400]",
			onclick: () => { },
		},
		{
			icon: <i className="fa-solid fa-user-doctor"></i>,
			title: "Phân quyền",
			color: "text-[#0014FF]",
			onclick: () => { },
		},
	];

	return (
		<div>
			<div className="flex flex-wrap">
				{state !== 1 ? (
					<div className="flex justify-center w-full">
						{BUTTON_READ_ONLY.map((item) => {
							return (
								<Button
									key={GetKey()}
									className={` hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] ${item.color} px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
									onClick={item.onclick}
									title={item.title}
								>
									{item.icon}
								</Button>
							);
						})}
					</div>
				) : (
					<div className="flex justify-center">
						{BUTTON_DEFAULT.map((item) => {
							return (
								<Button
									key={GetKey()}
									className={` hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] ${item.color} px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
									onClick={item.onclick}
									title={item.title}
								>
									{item.icon}
								</Button>
							);
						})}

						<div className="relative">
							<Button
								ref={buttonRef}
								onClick={toggleContent}
								className=" hover:bg-blue-300 px-[2px] text-[#000] cursor-pointer border-none text-center icon-button"
								title="Xem thêm"
							>
								<i className="fa-solid fa-ellipsis"></i>
							</Button>
							{showContent && (
								<div
									ref={(el) => {
										contentRef.current[1] = el;
									}}
									className="absolute right-[0] top-[-25px] flex justify-between"
								>
									{BUTTON_MORE.map((item) => {
										if (item.popup) return item.element;
										return (
											<Button
												key={GetKey()}
												className={`hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] ${item.color} px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
												onClick={item.onclick}
												title={item.title}
											>
												{item.icon}
											</Button>
										);
									})}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const BasePage = ({
	parent,
	current,
	filter = null,
	addNewFile = false,
	newButtons = null,
	isCheckBox = true,
	buttonFuctions = null,
	fieldsTableCustom = null,
	showTable = true,
	apiPlan = API_COLLECTION_PLAN,
	eOffice = true
}) => {
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	const [fieldsTable, setFieldsTable] = useState(FIELDS_TABLE);
	const [files, setFiles] = useState([]);
	const [fileSheet, setFileSheet] = useState([]);
	const [doesFilter, setDoesFilter] = useState(true);
	const [stateMultimediaCategory, setStateMultimediaCategory] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [stateCheckBox, setStateCheckBox] = useState([]);
	const userPermissionId = useSelector((state) => state.user.permission_id);
	const userPermissions = useSelector((state) => state.user.permissions);
	const [buttonRef, contentRef, toggleContent, showContent] =
		useButtonClickOutside(false);

	const [search, setSearch] = useState({
		title: null,
		organ_id: null,
		offce: null,
		state: 0,
		type: null,
	});

	const handleClickOnFile = (IDFile) => {
		dispatch({ type: "open", id: IDFile });
	};

	const getFileFromResponse = (response) => {
		const rawDatas = response.data;
		setFileSheet(rawDatas);
		let filesArray = [];
		for (const rawData of rawDatas) {
			let newButton = null;

			if (buttonFuctions != null) {
				newButton = cloneElement(buttonFuctions, {
					clickFunction: () => {
						dispatch({
							type: "open_modal",
							id: rawData.id,
							current_state: rawData.state,
						});
					},
				});
			}

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
				Function: newButton || (
					<ButtonFunctionOfEachFile
						state={parseInt(rawData.state)}
						handleClickOnFile={handleClickOnFile}
						IDFile={rawData.id}
						reset={reset}
					/>
				),
			};
			filesArray.push(row);
		}
		return filesArray;
	};

	const resetSearch = async () => {
		let request = API_GOV_FILE_SEARCH + userPermissionId;
		const response = await axiosHttpService.get(request);
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

	const reset = () => {
		const fetchFileData = async () => {
			try {
				setIsLoading(true);
				const response = await axiosHttpService.get(
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

	useEffect(() => {
		dispatch({ type: "ADD_FETCH_FILE_ACTION", fetchFileFunction: reset });
	}, []);

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
			const response = await axiosHttpService.get(request, {
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

	const handleChangeSearch = (name, value) => {
		setSearch((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeStateFile = async (newState) => {
		const listState = [];
		if (stateCheckBox.length > 1 && newState.new_state === 3) {
			// notifySuccess
		}
		for (const state of stateCheckBox) {
			const id = parseInt(
				state.substring(state.indexOf("checkbox") + "checkbox".length)
			);
			listState.push({
				...newState,
				id: id,
				perm_token: userPermissionId,
			});
		}

		try {
			const response = await axiosHttpService.post(API_UPDATE_STATE_GOV_FILE, listState);
			const error_code = response.data.error_code;
			if (error_code === undefined) {
				notifySuccess("Thay đổi trạng thái thành công");
				// setStateCheckBox([])
				reset();
			} else {
				const description = response.data.description;
				notifyError(description);
			}
		} catch (error) {
			notifyError("Thay đổi trạng thái thất bại");
		}
	};

	useEffect(() => {
		if (filter === null) return;

		setFiles((prev) => {
			return filter(files);
		});

		setDoesFilter(false);
	}, [doesFilter, filter]);

	useEffect(() => {
		reset();
	}, [userPermissionId]);

	useEffect(() => {
		if (fieldsTableCustom === null) setFieldsTable(FIELDS_TABLE);
		else setFieldsTable(fieldsTableCustom);
	}, [fieldsTableCustom]);


	const handleExportDocToExcel = () => {
		console.log(files)
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(fileSheet)
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
		XLSX.writeFile(wb, "sheet.xlsx")

		// const workbook = new Workbook();
		// const worksheet = workbook.addWorksheet('My Data');

		// data.forEach((row, index) => {
		// 	worksheet.cell(index + 1, 1).value = row.name;
		// 	worksheet.cell(index + 1, 2).value = row.age;
		// });

		// workbook.xlsx.writeFile('my-data.xlsx');
	}

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
			onClick: handleSearch,
		},
		{
			title: "Xuất Excel",
			btn_class_name: "custom-btn-export-excel",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
			onClick: handleExportDocToExcel,
		},
		{
			title: "Xóa bộ lọc",
			btn_class_name: "custom-btn-clear-filter",
			icon: <i className="fa-solid fa-sync"></i>,
			onClick: resetSearch,
		},
		{
			title: "Thêm hồ sơ mới",
			btn_class_name: "custom-btn-add-file",
			icon: <i className="fa-solid fa-plus"></i>,
			onClick: () => {
				setModalOpen(true);
			},
		},
	];

	if (!addNewFile) {
		BUTTON_ACTIONS.pop();
		BUTTON_ACTIONS.pop();
	}

	if (newButtons !== null) {
		for (const button of newButtons) {
			BUTTON_ACTIONS.push(button);
		}
	}

	return (
		<>
			<div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
				<p className="text-[14px] font-300 cursor-pointer ">
					<span className="text-[rgba(160,158,158,0.45)]">
						{parent.map((item, index) => {
							return (
								<Link key={index} to={item.link}>
									{item.title} /{" "}
								</Link>
							);
						})}
					</span>
					<span>
						<Link to={current.link}>{current.title}</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white">
				<p className="text-[20px] font-bold ">{current.title}</p>
			</div>
			{showTable && (
				<div>
					<div className="w-full my-[24px]">
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

							<div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px]  relative">
								<Button
									disabled={!(stateCheckBox.length > 0)}
									onClick={toggleContent}
									ref={buttonRef}
									className=" disabled:opacity-30 rounded-[5px] flex justify-center items-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] custom-btn-show-action "
								>
									Hành động
									<div className="ml-[4px]">
										<i className="fa-solid fa-chevron-down"></i>
									</div>
								</Button>

								{showContent && (
									<div
										ref={(el) => {
											contentRef.current[0] = el;
										}}
										className="rounded-[5px]  text-left top-[40px] absolute bg-purple-400 w-full text-[14px] z-10"
									>
										{userPermissions.map((permission, index) => {
											return (
												<button
													className="hover:text-white rounded-[5px]  px-[12px] py-[6px] w-full h-full text-left text-[12px] text-black font-medium border-none truncate"
													onClick={() =>
														handleChangeStateFile(permission.update_state)
													}
												>
													<i className={permission.icon_class}></i>
													{permission.permission_title}
												</button>
											);
										})}
									</div>
								)}
							</div>
						</div>
						<Table
							setStateCheckBox={setStateCheckBox}
							fieldNames={fieldsTable}
							fieldDatas={files}
							isLoading={isLoading}
							isCheckBox={isCheckBox}
						/>
					</div>

					<File reset={reset} />
					<DocCategory
						eOffice={eOffice}
					/>
					<MultimediaCategory
						stateMultimediaCategory={stateMultimediaCategory}
						setStateMultimediaCategory={setStateMultimediaCategory}
					/>
					<ModalCensorship />
					<PlanAndCategoryFile open={modalOpen} setOpen={setModalOpen} API_PLAN={
						apiPlan
					} />
				</div>
			)}
		</>
	);
};

export default BasePage;
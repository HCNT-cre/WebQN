import { Table } from "../../../custom/Components/Table"
export const PheDuyetKeHoachNLLSBase = ({ 
    fieldNames,
    fieldDatas,
    isLoading,
    SearchBar,
    title = null,
    breadcrumb = null
}) => {
    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Lưu trữ lịch sử / {breadcrumb}
                    </span>
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold ">{title}</p>
            </div>
            {SearchBar}
            <Table fieldNames={fieldNames} fieldDatas={fieldDatas} isLoading={isLoading} isCheckBox={false} />
        </div>
    )
}

export default PheDuyetKeHoachNLLSBase

import { Button } from "antd";
import { useDispatch } from "react-redux"
import { Table } from "src/custom/Components"
import { ModalCreateDanhMucCoQuan } from "src/pages/Modals";
export const DanhMucHoSoBase = ({
    fieldNames,
    fieldDatas,
    isLoading,
    SearchBar,
    title = null,
    breadcrumb = null,
    reFetchData
}) => {
    const dispatch = useDispatch();
    const handleClickCreate = () => {
        dispatch({
            type: "open_modalCreateDanhMucCoQuanReducer",
            reFetchData: reFetchData,
            order: 1,
            parent: null,
            select: 1,
        })
    }

    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Khai báo danh mục / {breadcrumb}
                    </span>
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold ">{title}</p>
            </div>

            
            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <div>
                    {SearchBar}
                </div>
                <Button className="text-white bg-[#00f]" onClick={handleClickCreate}>Tạo mới</Button>
            </div>

            <Table fieldNames={fieldNames} fieldDatas={fieldDatas} isLoading={isLoading} isCheckBox={false} />
            <ModalCreateDanhMucCoQuan/>
        </div>
    )
}

export default DanhMucHoSoBase

import { Button } from "antd";
import { useButtonClickOutside } from "src/custom/Hook";
import axiosHttpService from "src/utils/httpService";

const exportAndDownloadExcel = async (fileSheet, cmd, fileName) => {
    const response = await axiosHttpService.post("http://34.142.137.193:5678/excel", {
        luong: 200,
        data: fileSheet,
        cmd: cmd
    }, {
        responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
}

const ExportDocToExcel = ({
    fileSheet
}) => {
    const [buttonRef, contentRef, toggleContent, showContent] =
        useButtonClickOutside(false);

    const excelType = [
        {
            title: "Danh Mục",
            onClick: () => exportAndDownloadExcel(fileSheet, "danhmuc", "DanhMuc")
        },
        {
            title: "Mục Lục",
            onClick: () => exportAndDownloadExcel(fileSheet, "mucluc", "MucLuc")
        },
    ]

    return (
        <div>
            <Button
                onClick={toggleContent}
                ref={buttonRef}
                className=" custom-btn-export-excel disabled:opacity-30 rounded-[5px] flex justify-center items-center  w-full px-[12px] py-[6px] text-[12px]"
            >
                <div className="mr-[4px]">
                    <i className="fa-solid fa-file-csv"></i>
                </div>
                Xuất Excel
            </Button>

            {showContent && (
                <div
                    ref={(el) => {
                        contentRef.current[0] = el;
                    }}
                    className="rounded-[5px]  text-left top-[40px] absolute bg-green-300 w-full text-[14px] z-10"
                >
                    {excelType.map((type, index) => {
                        return (
                            <button
                                className="hover:text-white rounded-[5px]  px-[12px] py-[6px] w-full h-full text-left text-[12px] text-black font-medium border-none truncate"
                                onClick={type.onClick}
                            >
                                {type.title}
                            </button>
                        );
                    })}

                </div>
            )}
        </div>
    )
}

export default ExportDocToExcel;

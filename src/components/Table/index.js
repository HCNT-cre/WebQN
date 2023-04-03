import Loading from "../Loading";
import { useState } from "react";
import axios from "axios";

const CheckBox = ({ id, type, name, handleClickCheckBox, isChecked }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            onChange={handleClickCheckBox}
            checked={isChecked}
            className="outline-none"
        />
    );
};

const ConvertDataToArrayForRenderTableCell = (data) => {
    const dataTableRender = []
    for (let fieldData of data) {
        const data = [] 
        for (const key in fieldData) {
            if (!Array.isArray(fieldData[key])) {
                data.push(<td className="px-[12px] py-[16px] break-words" >{fieldData[key]}</td>)
            } else {
                data.push(<td className="px-[12px] py-[16px] overflow-hidden" >
                    {fieldData[key].map((childData) => {
                        return childData
                    })}
                </td>)
            }
        }
        dataTableRender.push(data)
    }
    return dataTableRender
}

const Table = ({fieldNames, fieldDatas, isCheckBox, isLoading}) => {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const dataTableRenderForTableCell = ConvertDataToArrayForRenderTableCell(fieldDatas)
    const handleCheckBoxAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(fieldDatas.map((file, index) => ("checkbox" + index)))
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClickCheckBox = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };


    return (
        <div className="p-[24px] bg-[#f0f2f5] rounded-[2px]">
            <table className="table-fixed w-full">
                <colgroup></colgroup>
                <thead className="bg-[#fafafa]">
                    <tr>
                        <th className="text-[12px]  relative w-[40px] text-center px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">TT</th>

                        {isCheckBox && <th className="text-[12px]  relative w-[50px] text-center px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">
                            Chọn
                            <CheckBox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClickCheckBox={handleCheckBoxAll}
                                isChecked={isCheckAll}
                            />
                        </th>}

                        {fieldNames.map((field, index) => {
                            let className = "text-[12px] relative text-center px-[8px] py-[12px]"
                            if(index < fieldNames.length - 1) {
                                className += " before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]"
                            }
                            return (
                                <th style={{ width: field.width }} className={className}>{field.title}</th>
                            )

                        })}
                    </tr></thead>

                <tbody>
                    {
                        !fieldDatas.length &&
                        <tr className="hover:bg-[#fafafa] bg-white border-t-[1px] border-solid border-[#e0e0e0]">
                            <td colSpan={13}>
                                {isLoading ? <Loading /> :
                                    <div className="w-full bg-white text-gray-400">
                                        <div className="text-center p-[16px]">
                                            <div><i className="text-[50px] fa-solid fa-box-open"></i></div>
                                            <p>Không có dữ liệu</p>
                                        </div>
                                    </div>
                                }
                            </td>
                        </tr>
                    }
                    {
                        dataTableRenderForTableCell.map((dataRow, index) => {
                            return (
                                <tr className="hover:bg-[#fafafa] bg-white border-t-[1px] border-solid border-[#e0e0e0] text-[13px]" key={index}>
                                    <td className="text-center px-[12px] py-[16px]"><span className="block w-[24px] h-[24px] rounded-[50%] bg-[#ccc]">{index + 1}</span></td>
                                    {
                                        isCheckBox && <td className="px-[12px] py-[16px] overflow-hidden text-center" >
                                            <CheckBox
                                                key={index}
                                                type="checkbox"
                                                id={"checkbox" + index}
                                                handleClickCheckBox={handleClickCheckBox}
                                                isChecked={isCheck.includes("checkbox" + index)}
                                            />
                                        </td>
                                    }
                                    {
                                        dataRow.map((dataCell) => {
                                            return dataCell
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;
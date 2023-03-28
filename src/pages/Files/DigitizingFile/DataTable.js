import React from "react";
import { useTable, useFilters } from "react-table";

const DataTable = (props) => {
    // MEMOS
    const data = React.useMemo(() => props.data, [props.data]);
    const columns = React.useMemo(() => props.columns, [props.columns]);

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: ""
        }),
        []
    );
    const filterTypes = React.useMemo(
        () => ({}),
        []
    );

    // CONFIGURE useTable
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes
        },
        useFilters
    );

    // RENDERING
    return (
        <table {...getTableProps()} className="table-fixed w-full">
            <thead className="bg-[#fafafa]">
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th className="relative text-left px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]" {...column.getHeaderProps()}>
                                <div> {column.canFilter ? column.render("Filter") : null}</div>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr className="hover:bg-[#fafafa] bg-white border-t-[1px] border-solid border-[#e0e0e0]" {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td className="px-[12px] py-[16px] overflow-hidden" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default DataTable;

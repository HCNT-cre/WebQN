import Datatable from "./DataTable";
import { TextSearchFilter } from "./Filter";

const columns = [
    {
        Header: "Mã hồ sơ",
        accessor: "fileCode",
        Filter: TextSearchFilter,

    },
    {
        Header: "Tiêu đề hồ sơ",
        accessor: "Title",
        filter: "text",
        Filter: TextSearchFilter,

    },
    {
        Header: "Phông",
        accessor: "Organld",
    },
    {
        Header: "Thời hạn bảo quản",
        accessor: "Maintenance",
    },
    {
        Header: "Chế độ sử dụng",
        accessor: "Rights",
    },
];

const data = [
    {
        fileCode: "alksdjlasjkd",
        Title: "Hồ sơ test",
        Organld: "accccccccccccccccc",
        Maintenance: "accccccccccccccccc",
        Rights: "accccccccccccccccc",
    },
    {
        fileCode: "accccccccccccccccc",
        Title: "accccccccccccccccc",
        Organld: "accccccccccccccccc",
        Maintenance: "accccccccccccccccc",
        Rights: "accccccccccccccccc",
    },
    {
        fileCode: "accccccccccccccccc",
        Title: "accccccccccccccccc",
        Organld: "accccccccccccccccc",
        Maintenance: "accccccccccccccccc",
        Rights: "accccccccccccccccc"
    },
    {
        fileCode: "accccccccccccccccc",
        Title: "accccccccccccccccc",
        Organld: "accccccccccccccccc",
        Maintenance: "accccccccccccccccc",
        Rights: "accccccccccccccccc"
    },
    {
        fileCode: "accccccccccccccccc",
        Title: "accccccccccccccccc",
        Organld: "accccccccccccccccc",
        Maintenance: "accccccccccccccccc",
        Rights: "accccccccccccccccc"
    },
];

const PeopleDataTable = () => {
    console.log("success");
    // Loading must be handled here because DataTable MUST have data on load
    return <Datatable data={data} columns={columns} />;
}

export default PeopleDataTable;
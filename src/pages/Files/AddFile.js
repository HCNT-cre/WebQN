import BasePage from "../BasePage";

const AddFile = ()=>{
    const parent = [
        {title: "Hồ sơ tài liệu", link: "/ho-so/tao-ho-so-dien-tu"},
    ]

    const current = {
        link: "/ho-so/tao-ho-so-dien-tu",
        title: "Danh sách hồ sơ"
    }

    return <BasePage parent={parent} current={current} addNewFile={true}/>
}

export default AddFile;
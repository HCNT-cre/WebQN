import BasePage from "../BasePage";

const ReturnFile = ()=>{
    const parent = [
        {title: "Hồ sơ tài liệu", link: "/ho-so/tao-ho-so-dien-tu"},
    ]

    const current = {
        link: "/ho-so/ho-so-bi-tra-ve",
        title: "Hồ sơ bị trả về"
    }

    return <BasePage parent={parent} current={current}/>
}

export default ReturnFile;
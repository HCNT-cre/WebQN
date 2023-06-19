import BasePage from "../BasePage";

const ThuThapHoSo = ()=>{
    const parent = [
        
    ]

    const current = {
        link: "/thu-thap-ho-so",
        title: "Thu thập hồ sơ"
    }

    return <BasePage parent={parent} current={current} addNewFile={true}/>
}

export default ThuThapHoSo;
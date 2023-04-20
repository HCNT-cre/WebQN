import BasePage from "../BasePage";

const Search = ()=>{
    const parent = []

    const current = {
        link: "/tra-cuu-va-tim-kiem",
        title: "Tìm kiếm"
    }

    return <BasePage parent={parent} current={current}/>
}

export default Search;
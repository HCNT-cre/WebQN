import BasePage from "pages/BasePage";

const TraVe = ()=>{
    const parent = [
        {title: "Tiêu Hủy Hồ Sơ", link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh"},
    ]

    const current = {
        link: "/tieu-huy-ho-so/quyet-dinh/tra-ve",
        title: "Trả về"
    }

    const filter = (files) => {
        const newFiles = []

        let today = new Date()
        const y = today.getFullYear();
        const m = today.getMonth() + 1; // Months start at 0!
        const d = today.getDate();

        today = new Date(`${y}-${m}-${d}`)
        const dateDiff = (start_date, end_date = today) => {
            start_date = new Date(start_date)
            const diffTime = end_date - start_date
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays / 365
        }

        for (const file of files) {
            if (file.end_date === null || file.end_date === undefined || (file.state.props.children !== 'Lưu trữ cơ quan' || file.maintenance !== "Vĩnh viễn"))
                continue
            if (dateDiff(file.end_date) >= 10)
                newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage parent={parent} current={current} filter={filter} />
}

export default TraVe;
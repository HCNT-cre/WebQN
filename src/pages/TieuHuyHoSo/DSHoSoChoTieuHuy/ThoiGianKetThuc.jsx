import BasePage from "src/pages/BasePage";

const dateDiff = (startDate, endDate) => {
    startDate = new Date(startDate);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays / 365;
}

const DanhSachHoSoChoTieuHuy = () => {
    const parent = []

    const current = {
        link: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy",
        title: "Danh sách hồ sơ chờ tiêu huỷ"
    }

    const filter = (files) => {
        const newFiles = []

        for (const file of files) {
            if(file.maintenance_name === "Vĩnh viễn" || file.state !== 4) continue;

            let today = new Date()
            const y = today.getFullYear();
            const m = today.getMonth() + 1; // Months start at 0!
            const d = today.getDate();
            today = new Date(`${y}-${m}-${d}`);

            const endDate = new Date(file.end_date);
            endDate.setFullYear(endDate.getFullYear() + Number(file.maintenance_name));

            if (dateDiff(endDate, today) >= 0 )
                newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage parent={parent} current={current} filter={filter} />
}

export default DanhSachHoSoChoTieuHuy;

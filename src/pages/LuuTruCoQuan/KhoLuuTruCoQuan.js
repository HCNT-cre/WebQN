// import axios from "axios";
import BasePage from "../BasePage";
// import { useState, useEffect } from "react";

// const API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL = process.env.REACT_APP_API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL

const KhoLuuTruCoQuan = () => {
    // const [allOrganStorageFiles, setAllOrganStorageFiles] = useState([])
    const parent = [
        { title: "Lưu trữ cơ quan", link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop" },
    ]

    const current = {
        link: "/luu-tru-co-quan/kho-luu-tru-co-quan",
        title: "Kho lưu trữ cơ quan"
    }

    // const fetchAllOrganStorageFiles = async () => {
    //     const res = await axios.get(API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL)
    //     setAllOrganStorageFiles(res.data)
    // }

    // useEffect(() => {
    //     fetchAllOrganStorageFiles()
    // }, [])


    const filter = (files) => {

        // console.log(allOrganStorageFiles)
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === "Lưu trữ cơ quan") {
                newFiles.push(file)
                // for (const fileS of allOrganStorageFiles) {
                //     console.log(fileS)
                //     if (fileS.file_id === file.id)

                // }
            }
        }

        return newFiles
    }

    return <BasePage parent={parent} current={current} filter={filter} />
}

export default KhoLuuTruCoQuan;
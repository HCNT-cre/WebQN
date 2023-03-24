import { useState, useEffect } from "react"
import FormAddFile from "../../components/Form/AddFile"

const Home = () => {
    const [files, setFiles] = useState([])

    useEffect(() => {
        const fetchFileData = async () => {
            const response = await fetch('https://6381f08c53081dd5498bea48.mockapi.io/api/v1/file');
            const rawDatas = await response.json();
            let filesArray = []
            for (let i = 0; i < rawDatas.length; i++) {
                const rawData = rawDatas[i]
                filesArray.push({
                    'FileCode': rawData.FileCode, 'Identifier': rawData.Identifier, 'Organld': rawData.Organld
                })
            }
            setFiles(filesArray)
        };
        fetchFileData();
    }, [])

    return (
        <>
            <div className="w-[calc(full-200px)] ">
                <table className="table-fixed w-full">
                    <colgroup></colgroup>
                    <thead><tr>
                        <th>Thứ tự</th>
                        <th>Mã hồ sơ</th>
                        <th>Tiêu đề hồ sơ</th>
                        <th>Phông</th>
                    </tr></thead>
                    <tbody>{files.map((file, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{file.FileCode}</td>
                                <td>{file.Identifier}</td>
                                <td>{file.Organld}</td>
                            </tr>
                        )
                    })}</tbody>


                </table>
            </div>
        </>
    )
}

export default Home
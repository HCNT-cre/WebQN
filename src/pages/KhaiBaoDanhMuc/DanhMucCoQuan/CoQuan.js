/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucCoQuan from "."

import { ORGAN, ORGAN_DECENTRALIZATION_INPUTS } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Switch, Select } from "antd";
import { GetKey, notifyError, notifySuccess } from "../../../custom/Function";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = Input.Search
const API_STORAGE_POST_ORGAN = process.env.REACT_APP_API_STORAGE_POST_ORGAN
const API_STORAGE_GET_ORGAN = process.env.REACT_APP_API_STORAGE_GET_ORGAN

const API_PROVINCES = process.env.REACT_APP_API_PROVINCES
const API_DISTRICTS = process.env.REACT_APP_API_DISTRICTS
const API_WARD = process.env.REACT_APP_API_WARD

const Form = ({ modalOpen, setModalOpen, id }) => {
    const [request, setRequest] = useState({
        storage: false
    })
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const handleChangeRequest = (name, value) => {
        console.log(name, value)

        const getNameProvince = (code) => {
            if (!code) return null
            const province = provinces.find((item) => item.code === code)
            return province.name
        }

        const getNameDistrict = (code) => {
            if (!code) return null
            const district = districts.find((item) => item.code === code)
            return district.name
        }

        const getNameWard = (code) => {
            if (!code) return null
            const ward = wards.find((item) => item.code === code)
            return ward.name
        }

        if (name === "province") {
            setRequest(prev => ({
                ...prev,
                provinceName: getNameProvince(value)
            }))
        }

        if (name === "district") {
            setRequest(prev => ({
                ...prev,
                districtName: getNameDistrict(value)
            }))
        }
        if (name === "ward") {
            setRequest(prev => ({
                ...prev,
                wardName: getNameWard(value)
            }))
        }

        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const res = await axios.get(API_STORAGE_GET_ORGAN + id)
                const data = res.data
                setRequest(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await axios.get(API_PROVINCES)
            const data = res.data
            data.forEach((item) => {
                item.label = item.name
                item.value = item.code
            })
            setProvinces(data)
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchDistricts = async () => {
            setDistricts([])
            setWards([])
            handleChangeRequest("district", null)
            handleChangeRequest("ward", null)

            if (!request.province) return
            try {
                const res = await axios.get(API_DISTRICTS.replace("IDPROVINCE", request.province))
                const data = res.data.districts
                data.forEach((item) => {
                    item.label = item.name
                    item.value = item.code
                })
                setDistricts(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchDistricts()
    }, [request.province])

    useEffect(() => {
        const fetchWards = async () => {
            setWards([])
            handleChangeRequest("ward", null)
            if (!request.district) return
            try {
                const res = await axios.get(API_WARD.replace("IDDISTRICT", request.district))
                const data = res.data.wards
                data.forEach((item) => {
                    item.label = item.name
                    item.value = item.code
                })
                setWards(res.data.wards)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWards()
    }, [request.district])

    const handleCancle = () => {
        setModalOpen(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (request === null) {
            notifyError("Vui lòng điền đầy đủ thông tin")
            return
        }

        for (const input of ORGAN_DECENTRALIZATION_INPUTS) {
            if (input.require && !request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }
        if (id !== null) {
            await axios.put(API_STORAGE_POST_ORGAN + id, request)
            notifySuccess("Cập nhật cơ quan thành công")
        } else {
            await axios.post(API_STORAGE_POST_ORGAN, request)
            notifySuccess("Tạo cơ quan thành công")
        }
        setModalOpen(false)
    }

    return (
        <Modal
            title="Tạo cơ quan"
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >

            {ORGAN_DECENTRALIZATION_INPUTS.map((input) => {
                return (
                    <div className="flex mb-[30px]" key={GetKey()}>
                        <div className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                            {input.label}
                        </div>
                        <div className="w-[70%]">
                            {input.type === "textarea" ?
                                <TextArea
                                    name={input.name}
                                    value={request[input.name]}
                                    onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)} />
                                : input.type === "switch" ?
                                    <Switch
                                        name={input.name}
                                        onChange={(ev) => handleChangeRequest("storage", ev)}
                                    />
                                    :
                                    input.type === "select" ?
                                        <Select
                                            name={input.name}
                                            options={input.name === "province" ? provinces :
                                                input.name === "district" ? districts : wards}
                                            onChange={(ev) => handleChangeRequest(input.name, ev)}
                                            className="w-full" value={request[input.name]} />
                                        : <Input
                                            type={input.type} name={input.name}
                                            defaultValue={request[input.name]}
                                            onChange={(ev) =>
                                                handleChangeRequest(ev.target.name, ev.target.value)
                                            } />
                            }
                        </div>
                    </div>
                )
            })}

            <div className="flex justify-end">
                <Button className="mr-[10px]"
                    onClick={handleCancle}>Hủy</Button>
                <Button
                    type="submit"
                    className="bg-[#00f] text-white"
                    form="tao-co-quan"
                    onClick={onSubmit}>Tạo</Button>
            </div>

        </Modal >
    )
}

const SearchBar = () => {
    return (
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[25%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

        </div>
    )
}

const Create = ({ modalOpen, setModalOpen }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={null} />
}

const Update = ({ modalOpen, setModalOpen, id }) => {
    console.log(id);
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} />
}

const CoQuan = () => {
    const [fieldData, setFieldData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axios.get(API_STORAGE_GET_ORGAN)
        const datas = res.data

        const newData = []
        for (const data of datas) {
            newData.push({
                "id": data.id,
                "name": data.name,
                "code": data.code,
                "address": data.address,
                "phone": data.phone,
                "fax": data.fax,
                "provinceName": data.provinceName,
                "districtName": data.districtName,
                "wardName": data.wardName,
                "update": <span className="cursor-pointer" onClick={() => {
                    setId(data.id)
                    setModalOpen(true)
                }}><i className="fa-regular fa-pen-to-square"></i></span>
            })
        }

        setFieldData(newData)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchFieldData()
    }, [])

    return (
        <div>
            {<Update id={id} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
            <DanhMucCoQuan title="Cơ quan" fieldNames={ORGAN} fieldDatas={fieldData} SearchBar={<SearchBar />} Create={<Create />} isLoading={isLoading} />
        </div>
    )
}

export default CoQuan
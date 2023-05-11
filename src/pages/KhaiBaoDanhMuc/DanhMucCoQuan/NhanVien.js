import DanhMucCoQuan from "."
import { STAFF, STAFF_DECENTRALIZATION } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Form, Select } from "antd";
import { GetKey } from "../../../custom/Function";

const Search = Input.Search


const Create = ({ modalOpen, setModalOpen }) => {
    const handleCancle = () => {
        setModalOpen(false)
    }

    const onFinish = (values) => {
        console.log(values);
    }

    return (
        <Modal
            title="Tạo nhân viên"
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >

            <Form onFinish={onFinish} labelCol={{ span: 7 }}>
                {STAFF_DECENTRALIZATION.map((input) => {
                    return (

                        <div className="relative">
                            <div className="after-form pr-[2px] absolute left-0 top-[2px]" />
                            <Form.Item name={input.name} label={input.label} key={GetKey()} className="ml-[20px]">
                                {input.type === "input" ?
                                    <Input /> : <Select />}
                            </Form.Item>
                        </div>
                    )
                })}


                <Form.Item>
                    <div className="flex justify-between mt-[30px]">
                        <Button onClick={handleCancle} htmlType="reset">Hủy</Button>
                        <Button type="primary" htmlType="submit">
                            Tạo
                        </Button>
                    </div>
                </Form.Item>
            </Form>
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


const NhanVien = () => {
    return (
        <DanhMucCoQuan title="Nhân viên" fieldNames={STAFF} fieldDatas={[]} SearchBar={<SearchBar />} Create={<Create />} />
    )
}

export default NhanVien
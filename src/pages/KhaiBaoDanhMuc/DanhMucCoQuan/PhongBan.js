import DanhMucCoQuan from "."
import { DEPARTMENT, DEPARTMENT_DECENTRALIZATION_COLLASPE, DEPARTMENT_DECENTRALIZATION_INPUTS } from "../../../storage/StorageOffice"
import { Input, Select, Modal, Button, Form, Checkbox, Row, Col } from "antd";
import { Collapse } from "antd";
import { GetKey } from "../../../custom/Function";
import { notifyError, notifySuccess } from "../../../custom/Function";

const Panel = Collapse.Panel
const Search = Input.Search

const Create = ({ modalOpen, setModalOpen }) => {
    const handleCancle = () => {
        setModalOpen(false)
    }

    const onFinish = (values) => {
        for (const input of DEPARTMENT_DECENTRALIZATION_INPUTS) {
            if (input.require && !values[input.name]) {
                notifyError("Vui lòng nhập " + input.title)
                return
            }
        }

        for (const collaspe of DEPARTMENT_DECENTRALIZATION_COLLASPE) {
            if (collaspe.require && !values[collaspe.name]) {
                notifyError("Vui lòng nhập " + collaspe.title)
                return
            }
        }
    }

    return (
        <Modal
            title="Tạo phòng ban"
            style={{
                top: 20,
            }}
            className="w-[700px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >

            <Form onFinish={onFinish} labelCol={{ span: 7 }}>
                {DEPARTMENT_DECENTRALIZATION_INPUTS.map((input, index) => {
                    return (
                        <div className="relative">
                            <div className="after-form pr-[2px] absolute left-0 top-[2px]" />
                            <Form.Item name={input.name} label={input.title} key={GetKey()} className="ml-[20px]" >
                                {input.type === "input" ?
                                    <Input />
                                    :
                                    <Select showSearch
                                        placeholder="Chọn cơ quan"
                                        optionFilterProp="children"
                                    />
                                }
                            </Form.Item>
                        </div>
                    )
                })}


                <Collapse defaultActiveKey={['1']} >
                    <Panel header="Phân quyền" key="1">
                        <div>
                            {DEPARTMENT_DECENTRALIZATION_COLLASPE.map((item) => {
                                return (
                                    <Form.Item name={item.name} key={GetKey()}>
                                        <Checkbox.Group className="mt-[8px] flex-col w-full">
                                            <div className="font-bold">{item.title}</div>
                                            <Row>
                                                {item.permission.map((option) => {
                                                    return (
                                                        <Col span={12} key={GetKey()} className="mt-[8px]">
                                                            <Checkbox value={option.value}>{option.label}</Checkbox>
                                                        </Col>
                                                    )
                                                }
                                                )}
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                )
                            })}



                        </div>
                    </Panel>
                </Collapse>
                <Form.Item>
                    <div className="flex justify-between mt-[30px]">
                        <Button onClick={handleCancle} htmlType="reset">Hủy</Button>
                        <Button type="primary" htmlType="submit">
                            Tạo
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

const SearchBar = () => {
    return (
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[25%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

            <div className="bg-white p-[12px] w-[300px] max-w-[25%] ml-[20px]">
                <p className="mb-[12px]">Cơ quan</p>
                <div>
                    <Select
                        name="state"
                        className="w-full bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn cơ quan"
                        optionFilterProp="children"
                        onChange={(value) => console.log(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[]}
                    ></Select>
                </div>
            </div>
        </div>
    )
}


const PhongBan = () => {

    return (
        <DanhMucCoQuan title="Phòng ban" fieldNames={DEPARTMENT} fieldDatas={[]} SearchBar={<SearchBar />} Create={<Create />} />
    )
}

export default PhongBan
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSSO = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <Input placeholder="tài khoản" />
            <Input placeholder="mật khẩu" type="password" />

            <Button onClick={() => {
                dispatch({ type: "LOGINED" })
                navigate("/")
            }}>Đăng nhập</Button>
        </div>
    )
}

export default LoginSSO;
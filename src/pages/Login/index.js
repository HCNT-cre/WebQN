/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button onClick={() => {
                navigate("/dang-nhap-sso")
            }
            } className="">Đăng nhập SSO</Button>
        </div>
    )
}

export default Login
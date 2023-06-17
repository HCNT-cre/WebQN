/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddFile from "./pages/Files/AddFile";
import { ToastContainer, Zoom } from 'react-toastify';
import DigitizingFile from "./pages/Files/DigitizingFile";
import DueFile from "./pages/Files/DueFile";
import HoSoTaiLieuGiaoNopLS from "./pages/LuuTruLichSu/HoSoTaiLieuGiaoNopLS";
import KhoLuuTruLichSu from "./pages/LuuTruLichSu/KhoLuuTruLichSu";
import HoSoTaiLieuGiaoNop from "./pages/LuuTruCoQuan/HoSoTaiLieuGiaoNop";
import KhoLuuTruCoQuan from "./pages/LuuTruCoQuan/KhoLuuTruCoQuan";
import HSdenhannopluuLS from "./pages/LuuTruCoQuan/HSdenhannopluuLS";
import Search from "./pages/Search";
import BaoCaoThongKe from "./pages/BaoCaoThongKe";
import Decentralization from "./pages/SystemManagement/Decentralization";
import User from "./pages/SystemManagement/User";
import WareHouse from "./pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/WareHouse";
import WareHouseRoom from "./pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/WareHouseRoom";
import Shelf from "./pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/Shelf";
import Drawers from "./pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/Drawers";
import ReturnFile from "./pages/Files/ReturnFile";
import LoginSSO from "./pages/LoginSSO";
import HoSoBiTraVeCoQuan from "./pages/LuuTruCoQuan/HoSoBiTraVeCoQuan";
import NhanVien from "./pages/KhaiBaoDanhMuc/DanhMucCoQuan/NhanVien";
import PhongBan from "./pages/KhaiBaoDanhMuc/DanhMucCoQuan/PhongBan";
import CoQuan from "./pages/KhaiBaoDanhMuc/DanhMucCoQuan/CoQuan";
import DanhMucHoSo from "./pages/KhaiBaoDanhMuc/DanhMucHoSo";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setUserPermission } from "./actions/userPermission"

import axios from "axios";

const API_ORGAN_GET_STAFF = process.env.REACT_APP_API_ORGAN_GET_STAFF

function LoggedIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams();

    console.log(params)
    useEffect(() => {
        const fetchPermission = async () => {
            console.log("id", params.id)
            localStorage.setItem('userID', params.id);
            if (params.id === "0") {
                dispatch(setUserPermission([]));
                return;
            }
            const res = await axios.get(API_ORGAN_GET_STAFF + "/" + params.id);
            dispatch(setUserPermission(res.data.permission_group_id));
        }
        fetchPermission();
        dispatch({ type: "LOGINED" });
        navigate("/")
    }, [])

    return (
        <div></div>
    )
}

const App = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.login)
    const userID = localStorage.getItem('userID')

    console.log("isLogin", isLogin, typeof isLogin)
    const fetchPermission = async (id) => {
        if (id === "0") {
            dispatch(setUserPermission([]));
            return
        }
        const res = await axios.get(API_ORGAN_GET_STAFF + "/" + id);
        dispatch(setUserPermission(res.data.permission_group_id));
    }

    if (userID !== null && isLogin !== 'false') {
        fetchPermission(userID);
    }

    function loginPage() {
        if (isLogin !== 'true')
            return (
                <Login />
            )
        return (
            <Navigate to="/" />
        )
    }

    function loginSSOPage() {
        if (isLogin !== 'true')
            return (
                <LoginSSO />
            )
        return (
            <Navigate to="/" />
        )
    }

    const routes = [
        { path: "/", element: <Home /> },
        { path: "/ho-so/tao-ho-so-dien-tu", element: <AddFile /> },
        { path: "/ho-so/so-hoa-ho-so-tai-lieu", element: <DigitizingFile /> },
        { path: "/ho-so/ho-so-den-han-nop-luu", element: <DueFile /> },
        { path: "/ho-so/ho-so-bi-tra-ve", element: <ReturnFile /> },
        {
            path: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
            element: <HoSoTaiLieuGiaoNop />,
        },
        {
            path: "/luu-tru-co-quan/kho-luu-tru-co-quan",
            element: <KhoLuuTruCoQuan />,
        },
        {
            path: "/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su",
            element: <HSdenhannopluuLS />,
        },
        {
            path: "/luu-tru-co-quan/ho-so-bi-tra-ve",
            element: <HoSoBiTraVeCoQuan />,
        },
        {
            path: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop",
            element: <HoSoTaiLieuGiaoNopLS />,
        },

        {
            path: "/luu-tru-lich-su/kho-luu-tru-lich-su",
            element: <KhoLuuTruLichSu />,
        },
        {
            path: "/tra-cuu-va-tim-kiem",
            element: <Search />
        },
        {
            path: "/bao-cao-va-thong-ke",
            element: <BaoCaoThongKe />
        },
        {
            path: "/quan-ly-he-thong/nguoi-dung",
            element: <User />
        },
        {
            path: "/quan-ly-he-thong/phan-quyen-he-thong",
            element: <Decentralization />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/kho",
            element: <WareHouse />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/phong-kho",
            element: <WareHouseRoom />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/ke",
            element: <Shelf />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/hop",
            element: <Drawers />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-co-quan/:organ_id/:department_id",
            element: <NhanVien />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-co-quan/:id",
            element: <PhongBan />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-co-quan",
            element: <CoQuan />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-ho-so",
            element: <DanhMucHoSo />
        },
    ];

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />

            <BrowserRouter>
                <Routes>
                    <Route path="/dang-nhap" element={loginPage()} />
                    <Route path="/dang-nhap-sso" element={loginSSOPage()} />
                    <Route path="/logged-in/:id" element={<LoggedIn />} />


                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={isLogin === "true" ? <Layout>{route.element}</Layout> : <Navigate to="/dang-nhap" />}
                        />
                    ))}
                </Routes>
            </BrowserRouter>


        </>

    );
};

export default App;

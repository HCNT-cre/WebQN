import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

import { useSelector } from "react-redux";

const App = () => {
    const isLogin = useSelector(state => state.login)
    console.log("isLogin", isLogin, typeof isLogin)

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
        }
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
                    <Route path="/dang-nhap" element={isLogin === "true" ?
                        <Navigate to="/" /> : <Login />} />
                    <Route path="/dang-nhap-sso" element={isLogin === "true" ?
                        <Navigate to="/" /> : <LoginSSO />} />
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddFile from "./pages/Files/AddFile";
import DigitizingFile from "./pages/Files/DigitizingFile";
import DueFile from "./pages/Files/DueFile";
import HoSoTaiLieuGiaoNop from "./pages/Storage/HoSoTaiLieuGiaoNop";
import KhoLuuTruCoQuan from "./pages/Storage/KhoLuuTruCoQuan";
import HSdenhannopluuLS from "./pages/Storage/HSdenhannopluuLS";
import HoSoTaiLieuGiaoNopLS from "./pages/LuuTruLichSu/HoSoTaiLieuGiaoNopLS";
import KhoLuuTruLichSu from "./pages/LuuTruLichSu/KhoLuuTruLichSu";
import Search from "./pages/Search";
import BaoCaoThongKe from "./pages/BaoCaoThongKe";
import Decentralization from "./pages/SystemManagement/Decentralization";
import User from "./pages/SystemManagement/User";
const App = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/ho-so/tao-ho-so-dien-tu", element: <AddFile /> },
    { path: "/ho-so/so-hoa-ho-so-tai-lieu", element: <DigitizingFile /> },
    { path: "/ho-so/ho-so-den-han-nop-luu", element: <DueFile /> },
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
        element: <Search/>
      },
      {
        path:"/bao-cao-va-thong-ke",
        element: <BaoCaoThongKe/>
      },
      {
        path:"//quan-ly-he-thong/nguoi-dung",
        element: <User/>
      },
      {
        path:"/quan-ly-he-thong/phan-quyen-he-thong",
        element:<Decentralization/>
      }
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />

        {routes.map((route, index) => {
          return (
            <Route
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

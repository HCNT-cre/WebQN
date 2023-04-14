import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddFile from "./pages/Files/AddFile";
import { ToastContainer, toast, Zoom } from 'react-toastify';

const App = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/ho-so/tao-ho-so-dien-tu", element: <AddFile /> },
    // { path: "/ho-so/so-hoa-ho-so-tai-lieu", element: <DigitizingFile /> },
    // { path: "/ho-so/ho-so-den-han-nop-luu", element: <DueFile /> },
    // {
    //   path: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
    //   element: <HoSoTaiLieuGiaoNop />,
    // },
    // {
    //   path: "/luu-tru-co-quan/kho-luu-tru-co-quan",
    //   element: <KhoLuuTruCoQuan />,
    // },
    // {
    //   path: "/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su",
    //   element: <HSdenhannopluuLS />,
    // },
    // {
    //     path: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop",
    //     element: <HoSoTaiLieuGiaoNopLS />,
    //   },
    //   {
    //     path: "/luu-tru-lich-su/kho-luu-tru-lich-su",
    //     element: <KhoLuuTruLichSu />,
    //   },
    //   {
    //     path: "/tra-cuu-va-tim-kiem",
    //     element: <Search/>
    //   },
    //   {
    //     path:"/bao-cao-va-thong-ke",
    //     element: <BaoCaoThongKe/>
    //   },
    //   {
    //     path:"//quan-ly-he-thong/nguoi-dung",
    //     element: <User/>
    //   },
    //   {
    //     path:"/quan-ly-he-thong/phan-quyen-he-thong",
    //     element:<Decentralization/>
    //   }
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
          <Route path="/Login" element={<Login />} />
          {routes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    {route.element}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>

    </>

  );
};

export default App;

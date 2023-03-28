import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from './pages/Home'
import Login from './pages/Login'
import AddFile from './pages/Files/AddFile'
import PeopleDataTable from './pages/Files/DigitizingFile'
import DueFile from './pages/Files/DueFile'
const App = () => {
    const routes =
        [
            { path: "/", element: <Home /> },
            { path: "/ho-so/tao-ho-so-dien-tu", element: <AddFile /> },
            { path: "/ho-so/so-hoa-ho-so-tai-lieu", element: <PeopleDataTable /> },
            { path: "/ho-so/ho-so-den-han-nop-luu", element: <DueFile /> },
        ]

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login />} />

                {routes.map((route, index) => {
                    return (
                        <Route path={route.path} element={
                            <Layout>
                                {route.element}
                            </Layout>
                        } />
                    )
                }
                )}


            </Routes>
        </BrowserRouter>
    );
}

export default App
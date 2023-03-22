import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from './pages/Home'
import Login from './pages/Login'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={
                    <Layout>
                        <Home />
                    </Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
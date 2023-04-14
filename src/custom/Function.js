import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const reloadPage = () => {
    document.location.reload()
}

export const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}

export const notifyError = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}

export const GetDateFromString = (dateString) => {
    if (!dateString) return null;
    const regex = /ngày\s+(\d{2})\s+tháng\s+(\d{2})\s+năm\s+(\d{4})/;
    const match = dateString.match(regex);

    if (match) {
        const day = match[1];
        const month = match[2];
        const year = match[3];
        return `${year}-${month}-${day}`;
    }
    return "2023-01-01"
}

export const DeleteData = async (API, id = null, message = "Xóa thành công") => {
    const currentAPI = id ? `${API}${id}` : API;
    await axios.delete(currentAPI)
    notifySuccess(message)
}
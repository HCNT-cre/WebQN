import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_GOV_FILE_GET = process.env.REACT_APP_API_GOV_FILE_GET

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
    return null
}

export const DeleteData = async (API, body, message = "Xóa thành công") => {
    const Delete = async () => {
        const response = await axios.post(API, body)
        if (response.data.error_code !== undefined) {
            notifyError(response.data.description)
        } else notifySuccess(message)
    }
    await Delete()
}

export const GetKey = () => {
    return Math.random();
}

export const ValidateFormDoc = (form) => {
    console.log(form)
    form["issued_date"] = GetDateFromString(form["issued_date"]) === null ? form["issued_date"] : GetDateFromString(form["issued_date"])
    if (form["code_number"] !== null && form["code_number"] !== undefined)
        form["code_number"] = form["code_number"].split('').splice(0, Math.min(10, form["code_number"].length)).join('');


    Object.keys(form).forEach(key => {
        if (form[key] === undefined || (typeof form[key] === 'string' && !form[key].replace(/\s/g, '').length)) {
            form[key] = null
        }
    })

    return form
}

export const FirstLower = (lower) => {
    return lower && (lower[0].toLowerCase() + lower.slice(1) || lower);
}

export const SetVal = (obj, val) => {
    Object.keys(obj).forEach(function (index) {
        obj[index] = val
    });
    return obj
}

export const SetNull = (obj) => {
    return SetVal(obj, null)
}

export const GetDataFromIDFile = async (IDFile, userPermissionId) => {
    const response = await axios.get(API_GOV_FILE_GET + "id=" + IDFile + "&perm_token=" + userPermissionId)
    const error_code = response.data.error_code
    if (error_code === undefined) {
        return response.data[0]
    }
    return null
}
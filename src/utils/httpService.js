import axios from "axios"

const axiosHttpService = axios.create({
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
})

export default axiosHttpService

import axios from "axios"
// import https from "https"

// const httpsAgent = new https.Agent({
//     rejectUnauthorized: false, // (NOTE: this will disable client verification)
// })


// const axiosHttpService = axios.create({ httpsAgent })
const axiosHttpService = axios.create({  })

export default axiosHttpService

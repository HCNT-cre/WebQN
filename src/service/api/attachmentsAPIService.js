import axiosHttpService from "src/utils/httpService";

const API_GET_ATTACHMENT_BY_PLAN_ID = import.meta.env.VITE_API_GET_ATTACHMENT_BY_PLAN_ID;
const API_DOWNLOAD_ATTACHMENT = import.meta.env.VITE_API_DOWNLOAD_ATTACHMENT;

const AttachmentAPIService = {
    getAttachmentsByPlanId: async (planId) => {
        try {
            const response = await axiosHttpService.get(API_GET_ATTACHMENT_BY_PLAN_ID + '/' + planId);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    downloadAttachment: async (fileUrl) => {
        const response = await axiosHttpService.get(API_DOWNLOAD_ATTACHMENT + '/' + fileUrl, {
            responseType: "blob",
        });
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileUrl.split("/").pop());
        document.body.appendChild(link);
        link.click();
    }
}

export default AttachmentAPIService;

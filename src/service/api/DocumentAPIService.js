
import axiosHttpService from "src/utils/httpService";
const API_SEARCH = import.meta.env.VITE_API_SEARCH;
const API_DOCUMENT_GET = import.meta.env.VITE_API_DOCUMENT_GET;
const API_GET_FOND_BY_ORGAN = import.meta.env.VITE_API_GET_FOND_BY_ORGAN;
const API_LANGUAGE = import.meta.env.VITE_API_LANGUAGE;
const API_PHYSICAL_STATE = import.meta.env.VITE_API_PHYSICAL_STATE;
const DocumentAPIService = {
    getDocumentByTitle: async (title) => {
        const response = await axiosHttpService.post(`${API_SEARCH}`,
            {
                query: title
            })
        return response.data;
    },

    getDocumentById: async (idFile, idDoc) => {
        const response = await axiosHttpService.get(`${API_DOCUMENT_GET}${idFile}`)
        const doc = response.data.filter((doc) => doc.id == idDoc);
        return doc[0] || [];
    },

    getAllDocumentByFileId: async (idFile) => {
        const response = await axiosHttpService.get(`${API_DOCUMENT_GET}${idFile}`)
        return response.data;
    },

    getFondByOrgan: async (id) => {
        const res = await axiosHttpService.get(API_GET_FOND_BY_ORGAN + '/' + id);
        return res.data;
    },

    getFormat: async () => {
        const res = await axiosHttpService.get(API_PHYSICAL_STATE);
        return res.data;
    },

    getLanguage: async () => {
        const res = await axiosHttpService.get(API_LANGUAGE);
        return res.data;
    }
}

export default DocumentAPIService;

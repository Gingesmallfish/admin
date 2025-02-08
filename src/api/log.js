import axios from "@/api/axios";
export const logs = (logData) => {
    return axios.post('/api/logs', logData);
};

import axios from "axios";
import { hiddenError } from "@/common/helpers";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    hiddenError(e?.response?.data?.error?.message || defaultMessage);
    axiosInstance.$notifier.error(
      e?.response?.data?.error?.message || defaultMessage
    );
    return Promise.reject(e);
  }
);

export default axiosInstance;

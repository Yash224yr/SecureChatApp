import { SweetAlertToast } from "@/utils/sweetAlert";
import { AXIOS_CLIENT } from "./AXIOS_CLEINT";

export const makeRequest = async (payload, endpoint, method = "post") => {
  try {
    const response = await AXIOS_CLIENT[method](endpoint, payload);
    if (response) {
      return response?.data;
    }
  } catch (error) {
    const message = error.response.data.message || "error calling api"
    SweetAlertToast.fire({
      icon: "error",
      title: message
    });
    console.log(error, "error");
  }
};

export const REGISTER_API = (payload) => {
  return makeRequest(payload , "authentication/register");
};

export const LOGIN_API = (payload) => {
  return makeRequest(payload , "authentication/login");
};


import { AXIOS_CLIENT } from "./AXIOS_CLEINT";

export const makeRequest = async (payload, endpoint, method = "post") => {
  try {
    const response = await AXIOS_CLIENT[method](endpoint, payload);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error, "error");
  }
};

export const REGISTER_API = (payload) => {
  return makeRequest(payload , "authentication/register");
};

import axios from "./myAxios";

export default function loginReq(values) {
  return axios.post('/login',values)
}


import axios from "axios";

const Axios = axios.create({
  baseURL: "https://asianabpolymer.com/abpolymer/salesforce_api.php",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;

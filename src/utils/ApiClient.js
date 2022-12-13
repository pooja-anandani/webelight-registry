import axios from "axios";



const axiosClient = axios.create({
    baseURL: 'http://ssh-registry-rotation.webelight.co.in',
      
    headers: {
      'Content-Type': 'application/json',
      'secret':process.env.REACT_APP_SECRET_HEADER,
    },
    
  });
  axiosClient.interceptors.request.use(function (config) {
    
  
    return config;
  });



export default axiosClient;

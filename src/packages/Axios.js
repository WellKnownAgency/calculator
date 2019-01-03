import axios from 'axios';
require('promise.prototype.finally').shim();

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_DOMAIN,
	headers: {
		common: {
			//'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
		}
	}
});

export default axiosInstance;

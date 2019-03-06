import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-602c9.firebaseio.com/'
});

export default instance;

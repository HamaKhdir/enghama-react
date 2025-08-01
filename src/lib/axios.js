import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://enghama-55a3c7ea0ac1.herokuapp.com/api', // ناونیشانی بنەڕەتی API
});

// ئەم بەشە زۆر گرنگە: بە شێوەی ئۆتۆماتیکی تۆکنی JWT زیاد دەکات بۆ هەر داواکارییەک
apiClient.interceptors.request.use(config => {
    const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    if (authTokens) {
        config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
});


export default apiClient;
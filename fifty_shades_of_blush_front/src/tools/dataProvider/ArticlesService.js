import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class ArticlesService {

    getLatestArticleEntity() {
        return axios.get(`${API_URL}/articles/latest`)
    }

    getLatestBeautyArticleEntity() {
        return axios.get(`${API_URL}/articles/beauty/latest`)
    }

    getLatestFashionArticleEntity() {
        return axios.get(`${API_URL}/articles/fashion/latest`)
    }

    getLatestTravelArticleEntity() {
        return axios.get(`${API_URL}/articles/travel/latest`)
    }

    getLatestLifestyleArticleEntity() {
        return axios.get(`${API_URL}/articles/lifestyle/latest`)
    }

    getBeautyArticlesEntity() {
        return axios.get(`${API_URL}/articles/beauty`)
    }

    getRecentBeautyArticlesEntity() {
        return axios.get(`${API_URL}/articles/beauty/recent`)
    }

    getFashionArticlesEntity() {
        return axios.get(`${API_URL}/articles/fashion`)
    }

    getRecentFashionArticlesEntity() {
        return axios.get(`${API_URL}/articles/fashion/recent`)
    }

    getTravelArticlesEntity() {
        return axios.get(`${API_URL}/articles/travel`)
    }

    getRecentTravelArticlesEntity() {
        return axios.get(`${API_URL}/articles/travel/recent`)
    }

    getLifestyleArticlesEntity() {
        return axios.get(`${API_URL}/articles/lifestyle`)
    }

    getRecentLifestyleArticlesEntity() {
        return axios.get(`${API_URL}/articles/lifestyle/recent`)
    }
}

export default new ArticlesService()
import axios from 'axios';

const API_URL = '/api';

class ArticlesService {

    getLatestArticleEntity() {
        return axios.get(`${API_URL}/articles/latest`)
    }

    getBFTLArticlesEntity(page) {
        return axios.get(`${API_URL}/articles/${page}`)
    }

    getLatestBFTLArticleEntity(page) {
        return axios.get(`${API_URL}/articles/${page}/latest`)
    }

    getRecentBFTLArticlesEntity(page) {
        return axios.get(`${API_URL}/articles/${page}/recent`)
    }
}

export default new ArticlesService()
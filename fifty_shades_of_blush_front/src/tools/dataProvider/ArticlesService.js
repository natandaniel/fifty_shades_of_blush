import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class ArticlesService {

    getLatestArticleEntity() {
        return axios.get(`${API_URL}/articles/latest`)
    }

    getLatestArticleArray(latestArticleEntity) {
        return latestArticleEntity.data._embedded.articleResources.map(article =>
            axios.get(article._links.self.href)
        )
    }

    getRecentBeautyArticlesEntity() {
        return axios.get(`${API_URL}/articles/beauty/recent`)
    }

    getRecentFashionArticlesEntity() {
        return axios.get(`${API_URL}/articles/fashion/recent`)
    }

    getRecentTravelArticlesEntity() {
        return axios.get(`${API_URL}/articles/travel/recent`)
    }

    getRecentLifestyleArticlesEntity() {
        return axios.get(`${API_URL}/articles/lifestyle/recent`)
    }
}

export default new ArticlesService()
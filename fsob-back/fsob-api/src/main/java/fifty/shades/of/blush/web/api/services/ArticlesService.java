package fifty.shades.of.blush.web.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.domain.Article;

@Service
public class ArticlesService {
	
	@Autowired
	ArticleRepository artRepo;

	public Article createArticle(String title, String subtitle, String category) throws Exception {
		
		try {
			artRepo.findByTitle(title)
					.orElseThrow(() -> new ResourceNotFoundException("Article", "id", title));
		}catch(ResourceNotFoundException e) {
			
			return artRepo.save(new Article(title, subtitle, category));
		}

		throw new Exception("Article with same title already exists");
	}


}

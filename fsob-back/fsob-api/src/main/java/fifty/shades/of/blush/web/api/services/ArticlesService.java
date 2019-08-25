package fifty.shades.of.blush.web.api.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleFilesRepository;
import fifty.shades.of.blush.data.repository.ArticleParagraphsRepository;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.domain.Article;

@Service
public class ArticlesService {

	@Autowired
	ArticleRepository artRepo;

	@Autowired
	ArticleParagraphsRepository artParaRepo;

	@Autowired
	ArticleFilesRepository artFilesRepo;

	@Autowired
	ArticleParagraphsService artParaService;

	@Autowired
	ArticleFilesService artFilesService;

	@Transactional(rollbackOn = Exception.class)
	public Article createArticle(String title, String subtitle, String category,  String body,
			MultipartFile file) throws Exception {

		try {
			artRepo.findByTitle(title).orElseThrow(() -> new ResourceNotFoundException("Article", "id", title));
		} catch (ResourceNotFoundException e) {

			Article newArticle = artRepo.save(new Article(title, subtitle, category));
			
			artParaService.insertArticleBody(body, newArticle.getId());
			
			if(file != null) {
				artFilesService.uploadMainFile(file, newArticle.getId());
			}
			
			return newArticle;
		}

		throw new Exception("Article with same title already exists");
	}

	@Transactional(rollbackOn = Exception.class)
	public Article editArticle(Long articleId, String title, String subtitle, String category, String body,
			MultipartFile file) throws Exception {

		Article article = artRepo.findById(articleId)
				.orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));

		if (!StringUtils.isEmpty(title)) {
			article.setTitle(title);
		}

		if (!StringUtils.isEmpty(subtitle)) {
			article.setSubtitle(subtitle);
		}

		if (!StringUtils.isEmpty(category)) {
			article.setCategory(category);
		}

		if (!StringUtils.isEmpty(body)) {
			artParaRepo.deleteByArticle(article);
			artParaService.insertArticleBody(body, articleId);
		}

		if (file != null) {
			artFilesRepo.deleteByArticleAndFileNameContaining(article, "main");
			artFilesService.uploadMainFile(file, articleId);
		}

		return artRepo.save(article);
	}

	public void deleteArticle(Long articleId) {

		Article article = artRepo.findById(articleId)
				.orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));
		artParaRepo.deleteByArticle(article);
		artRepo.findById(articleId).ifPresent(art -> artRepo.deleteById(art.getId()));
	}

}

package fifty.shades.of.blush.web.api.services;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleParagraphsRepository;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.domain.ArticleParagraph;

@Service
public class ArticleParagraphsService {

	@Autowired
	ArticleRepository artRepo;

	@Autowired
	ArticleParagraphsRepository artParagraphsRepo;

	public List<ArticleParagraph> insertArticleBody(String body, Long articleId) {

		artRepo.findById(articleId).orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));

		String[] paragraphs = body.split("\\R{2,}");

		return Arrays.asList(paragraphs).stream().map(paragraph -> {
			return this.createParagraph(paragraph, articleId);
		}).collect(Collectors.toList());
	}

	public ArticleParagraph createParagraph(String content, Long articleId) {
		
		Article article = artRepo.findById(articleId).orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));
		ArticleParagraph paragraph = new ArticleParagraph(article, content);
		return artParagraphsRepo.save(paragraph);
	}

}

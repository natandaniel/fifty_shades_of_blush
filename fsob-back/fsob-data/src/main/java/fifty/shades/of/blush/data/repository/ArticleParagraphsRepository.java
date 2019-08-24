package fifty.shades.of.blush.data.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.PagingAndSortingRepository;

import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.domain.ArticleParagraph;

public interface ArticleParagraphsRepository extends PagingAndSortingRepository<ArticleParagraph, Long> {
	
	@Transactional
	void deleteByArticle(Article article);
}

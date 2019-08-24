package fifty.shades.of.blush.data.repository;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import fifty.shades.of.blush.domain.Article;

public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {
	
	Optional<Article> findByTitle(String title);

	Iterable<Article> findByCategoryOrderByCreatedAtDesc(String Category);
	
	Iterable<Article> findTop1ByCategoryOrderByCreatedAtDesc(String Category);

	Iterable<Article> findTop2ByCategoryOrderByCreatedAtDesc(String Category);
}
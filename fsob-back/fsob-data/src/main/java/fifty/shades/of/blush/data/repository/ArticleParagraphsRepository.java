package fifty.shades.of.blush.data.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import fifty.shades.of.blush.domain.ArticleParagraph;

public interface ArticleParagraphsRepository extends PagingAndSortingRepository<ArticleParagraph, Long> {

}

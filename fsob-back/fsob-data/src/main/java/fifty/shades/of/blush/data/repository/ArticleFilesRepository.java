package fifty.shades.of.blush.data.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.domain.ArticleFile;

@Repository
public interface ArticleFilesRepository extends JpaRepository<ArticleFile, String> {

	Optional<ArticleFile> findByFileName(String fileName);

	@Transactional
	void deleteByArticle(Article article);

}
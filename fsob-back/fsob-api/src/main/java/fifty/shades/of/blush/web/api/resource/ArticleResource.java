package fifty.shades.of.blush.web.api.resource;

import java.util.Date;

import org.springframework.hateoas.ResourceSupport;

import fifty.shades.of.blush.domain.Article;
import lombok.Getter;

public class ArticleResource extends ResourceSupport {
	
	@Getter
	private final String title;

	@Getter
	private final String subtitle;
	
	@Getter
	private final String category;

	@Getter
	private final Date createdAt;
	
	@Getter
	private final Date updatedAt;

	public ArticleResource(Article article) {
		this.title = article.getTitle();
		this.subtitle = article.getSubtitle();
		this.category = article.getCategory();
		this.createdAt = article.getCreatedAt();
		this.updatedAt = article.getUpdatedAt();
	}
}

package fifty.shades.of.blush.web.api.resource;

import java.util.Date;

import org.springframework.hateoas.ResourceSupport;

import fifty.shades.of.blush.domain.ArticleParagraph;
import lombok.Getter;

public class ArticleParagraphResource extends ResourceSupport {
	
	@Getter
	private final String content;

	@Getter
	private final Date createdAt;
	
	@Getter
	private final Date updatedAt;
	
	public ArticleParagraphResource(ArticleParagraph articleParagraph) {
		this.content = articleParagraph.getContent();
		this.createdAt = articleParagraph.getCreatedAt();
		this.updatedAt = articleParagraph.getUpdatedAt();
	}
}

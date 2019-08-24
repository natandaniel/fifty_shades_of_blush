package fifty.shades.of.blush.web.api.resource;

import org.springframework.hateoas.mvc.ResourceAssemblerSupport;

import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.web.api.controllers.ArticlesController;

public class ArticleResourceAssembler extends ResourceAssemblerSupport<Article, ArticleResource> {

	public ArticleResourceAssembler() {
		super(ArticlesController.class, ArticleResource.class);
	}

	@Override
	protected ArticleResource instantiateResource(Article article) {
		return new ArticleResource(article);
	}

	@Override
	public ArticleResource toResource(Article article) {
		return createResourceWithId(article.getId(), article);
	}

}

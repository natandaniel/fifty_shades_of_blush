package fifty.shades.of.blush.web.api.resource;

import org.springframework.hateoas.mvc.ResourceAssemblerSupport;

import fifty.shades.of.blush.domain.ArticleParagraph;
import fifty.shades.of.blush.web.api.controllers.ArticleParagraphsController;

public class ArticleParagraphResourceAssembler
		extends ResourceAssemblerSupport<ArticleParagraph, ArticleParagraphResource> {

	public ArticleParagraphResourceAssembler() {
		super(ArticleParagraphsController.class, ArticleParagraphResource.class);
	}
	
	@Override
	protected ArticleParagraphResource instantiateResource(ArticleParagraph articleParagraph) {
		return new ArticleParagraphResource(articleParagraph);
	}

	@Override
	public ArticleParagraphResource toResource(ArticleParagraph articleParagraph) {
		return createResourceWithId(articleParagraph.getId(), articleParagraph);
	}
}

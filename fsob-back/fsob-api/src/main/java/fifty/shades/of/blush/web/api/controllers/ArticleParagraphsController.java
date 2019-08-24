package fifty.shades.of.blush.web.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fifty.shades.of.blush.domain.ArticleParagraph;
import fifty.shades.of.blush.web.api.resource.ArticleParagraphResource;
import fifty.shades.of.blush.web.api.resource.ArticleParagraphResourceAssembler;
import fifty.shades.of.blush.web.api.services.ArticleParagraphsService;

@RestController
@RequestMapping(path = "/api/articles")
@CrossOrigin(origins = "*")
public class ArticleParagraphsController {

	@Autowired
	ArticleParagraphsService articleParagraphsService;

	@PostMapping("/createParagraph/{articleId}")
	@ResponseStatus(HttpStatus.CREATED)
	public ArticleParagraphResource createParagraph(@RequestParam("paragraph") String paragraph,
			@PathVariable("articleId") Long articleId) throws Exception {

		ArticleParagraph artcileParagraph = articleParagraphsService.createParagraph(paragraph, articleId);

		ArticleParagraphResourceAssembler artParagraphResourceAssembler = new ArticleParagraphResourceAssembler();
		return artParagraphResourceAssembler.toResource(artcileParagraph);
	}
}

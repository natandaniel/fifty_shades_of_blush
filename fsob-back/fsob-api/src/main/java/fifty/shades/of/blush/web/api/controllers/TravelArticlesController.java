package fifty.shades.of.blush.web.api.controllers;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.web.api.resource.ArticleResource;
import fifty.shades.of.blush.web.api.resource.ArticleResourceAssembler;

@RestController
@RequestMapping(path = "/api/articles", produces = "application/hal+json")
@CrossOrigin(origins = "*")
public class TravelArticlesController {
	
	private final String TRAVEL = "TRAVEL";
	private final String RECENT = "recent";
	private final String LATEST = "latest";
	
	private ArticleRepository articleRepo;

	public TravelArticlesController(ArticleRepository articleRepo) {
		this.articleRepo = articleRepo;
	}
	
	@GetMapping("/travel")
	public Resources<ArticleResource> getTravelArticles() {
		
		Iterable<Article> articles = articleRepo.findByCategoryOrderByCreatedAtDesc(TRAVEL);
		
		List<ArticleResource> articleResources = new ArticleResourceAssembler().toResources(articles);
		Resources<ArticleResource> recentResources = new Resources<ArticleResource>(articleResources);
		
		recentResources.add(linkTo(methodOn(TravelArticlesController.class).getTravelArticles()).withRel(RECENT));
		return recentResources;
	}
	
	@GetMapping("/travel/recent")
	public Resources<ArticleResource> getRecentTravelArticles() {
		
		Iterable<Article> articles = articleRepo.findTop2ByCategoryOrderByCreatedAtDesc(TRAVEL);
		
		List<ArticleResource> articleResources = new ArticleResourceAssembler().toResources(articles);
		Resources<ArticleResource> recentResources = new Resources<ArticleResource>(articleResources);
		
		recentResources.add(linkTo(methodOn(TravelArticlesController.class).getRecentTravelArticles()).withRel(RECENT));
		return recentResources;
	}
	
	@GetMapping("/travel/latest")
	public Resources<ArticleResource> getLatestTravelArticle() {
		
		Iterable<Article> articles = articleRepo.findTop1ByCategoryOrderByCreatedAtDesc(TRAVEL);
		
		List<ArticleResource> articleResources = new ArticleResourceAssembler().toResources(articles);
		Resources<ArticleResource> recentResources = new Resources<ArticleResource>(articleResources);
		
		recentResources.add(linkTo(methodOn(TravelArticlesController.class).getLatestTravelArticle()).withRel(LATEST));
		return recentResources;
	}

}

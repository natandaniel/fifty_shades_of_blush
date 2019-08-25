package fifty.shades.of.blush.web.api.controllers;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.web.api.resource.ArticleResource;
import fifty.shades.of.blush.web.api.resource.ArticleResourceAssembler;
import fifty.shades.of.blush.web.api.services.ArticleFilesService;
import fifty.shades.of.blush.web.api.services.ArticleParagraphsService;
import fifty.shades.of.blush.web.api.services.ArticlesService;

@RestController
@RequestMapping(path = "/api/articles", produces = "application/hal+json")
@CrossOrigin(origins = "*")
public class ArticlesController {

	private static final Logger logger = LoggerFactory.getLogger(ArticleFilesService.class);

	@Autowired
	private ArticleRepository articleRepo;

	@Autowired
	ArticlesService artService;

	@Autowired
	ArticleParagraphsService artParaService;

	@Autowired
	ArticleFilesService artFilesService;

	@Autowired
	EntityLinks entityLinks;

	@GetMapping("/latest")
	public Resources<ArticleResource> getLatestArticles() {

		PageRequest page = PageRequest.of(0, 1, Sort.by("createdAt").descending());
		Iterable<Article> articles = articleRepo.findAll(page).getContent();

		List<ArticleResource> articleResources = new ArticleResourceAssembler().toResources(articles);
		Resources<ArticleResource> recentResources = new Resources<ArticleResource>(articleResources);

		recentResources.add(linkTo(methodOn(ArticlesController.class).getLatestArticles()).withRel("latest"));

		return recentResources;
	}

	@PostMapping(path = "/create", consumes = "multipart/form-data")
	@ResponseStatus(HttpStatus.CREATED)
	public void createArticle(@RequestParam("title") String title, @RequestParam("subtitle") String subtitle,
			@RequestParam("category") String category, @RequestParam("body") String body,
			@RequestParam(value="mainCardImage", required=false) MultipartFile file) throws Exception {

		Article newArticle = artService.createArticle(title, subtitle, category);
		artParaService.insertArticleBody(body, newArticle.getId());
		if(file != null) {
			artFilesService.uploadMainFile(file, newArticle.getId());
		}
		
	}

	@PutMapping(path = "/edit/{articleId}", consumes = "multipart/form-data")
	public Article editArticle(@PathVariable("articleId") String articleId, @RequestParam("title") String title, @RequestParam("subtitle") String subtitle,
			@RequestParam("category") String category, @RequestParam("body") String body,
			@RequestParam(value="mainCardImage", required=false) MultipartFile file) throws Exception {

		return artService.editArticle(Long.valueOf(articleId), title, subtitle, category, body, file);
	}

	@DeleteMapping(path = "/delete/{articleId}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteArticle(@PathVariable("articleId") String articleId) throws Exception {
		logger.debug(articleId);
		artService.deleteArticle(Long.valueOf(articleId));
	}
}

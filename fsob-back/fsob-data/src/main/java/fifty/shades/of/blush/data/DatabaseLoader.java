package fifty.shades.of.blush.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleFilesRepository;
import fifty.shades.of.blush.data.repository.ArticleParagraphsRepository;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.data.repository.UserRepository;
import fifty.shades.of.blush.domain.User;

@Component
public class DatabaseLoader implements CommandLineRunner {

	@Autowired
	private final UserRepository users;

	@Autowired
	private final ArticleRepository articles;

	@Autowired
	private final ArticleFilesRepository articleFiles;

	@Autowired
	private final ArticleParagraphsRepository articleParagraphs;

	public DatabaseLoader(UserRepository users, ArticleRepository articles, ArticleFilesRepository articleFiles,
			ArticleParagraphsRepository articleParagraphs) {
		this.users = users;
		this.articles = articles;
		this.articleFiles = articleFiles;
		this.articleParagraphs = articleParagraphs;
	}

	@Override
	public void run(String... args) throws Exception {

		try {

			articleParagraphs.deleteAll();
			articleFiles.deleteAll();
			articles.deleteAll();

			users.findByUsername("jferAdmin")
					.orElseThrow(() -> new ResourceNotFoundException("User", "username", "jferAdmin"));

		} catch (ResourceNotFoundException e) {

			User user = new User("jferAdmin", "#@n19j1950SOB@#", "ROLE_ADMIN", "ROLE_USER");
			users.save(user);
		}
	}
}

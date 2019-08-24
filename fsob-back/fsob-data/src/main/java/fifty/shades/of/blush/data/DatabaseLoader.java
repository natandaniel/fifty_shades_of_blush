package fifty.shades.of.blush.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.data.repository.UserRepository;
import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.domain.User;

@Component
public class DatabaseLoader implements CommandLineRunner {

	@Autowired
	private final UserRepository users;
	
	@Autowired
	private final ArticleRepository articles;

	public DatabaseLoader(UserRepository users, ArticleRepository articles) {
		this.users = users;
		this.articles = articles;
	}

	@Override
	public void run(String... args) throws Exception {

		try {

			users.findByUsername("natandaniel")
					.orElseThrow(() -> new ResourceNotFoundException("User", "username", "natandaniel"));

		} catch (ResourceNotFoundException e) {

			User user = new User("natandaniel", "natandaniel", "ROLE_ADMIN", "ROLE_USER");
			users.save(user);
		}
		
		try {

			articles.findByTitle("Sephora Wonder Kit")
					.orElseThrow(() -> new ResourceNotFoundException("Article", "title", "Sephora Wonder Kit"));

		} catch (ResourceNotFoundException e) {

			Article article = new Article("Sephora Wonder Kit", "Everything about Sephora's latest make-up kit", "BEAUTY");
			articles.save(article);
		}
	}
}

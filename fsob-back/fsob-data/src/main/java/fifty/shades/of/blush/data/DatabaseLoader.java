package fifty.shades.of.blush.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.data.repository.UserRepository;
import fifty.shades.of.blush.domain.User;

@Component
public class DatabaseLoader implements CommandLineRunner {

	@Autowired
	private final UserRepository users;

	public DatabaseLoader(UserRepository users, ArticleRepository articles) {
		this.users = users;
	}

	@Override
	public void run(String... args) throws Exception {

		try {

			users.findByUsername("jferAdmin")
					.orElseThrow(() -> new ResourceNotFoundException("User", "username", "jferAdmin"));

		} catch (ResourceNotFoundException e) {

			User user = new User("jferAdmin", "#@n19j1950SOB@#", "ROLE_ADMIN", "ROLE_USER");
			users.save(user);
		}
	}
}

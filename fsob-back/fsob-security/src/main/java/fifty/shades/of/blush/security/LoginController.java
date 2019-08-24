package fifty.shades.of.blush.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import fifty.shades.of.blush.data.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
	
	@Autowired
	UserRepository users;
	
    @GetMapping(path = "/api/basicauth")
    public AuthenticationBean authenticate() {
        return new AuthenticationBean("You are authenticated");
    }   
}

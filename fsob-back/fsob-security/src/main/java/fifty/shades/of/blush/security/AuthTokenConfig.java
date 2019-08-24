package fifty.shades.of.blush.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component("authTokenConfig")
public class AuthTokenConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

	@Autowired
	private UserDetailsService userDetailsService;

	public AuthTokenConfig(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		AuthTokenFilter customFilter = new AuthTokenFilter(userDetailsService);
		http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
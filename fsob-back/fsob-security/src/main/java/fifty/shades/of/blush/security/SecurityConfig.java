package fifty.shades.of.blush.security;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
	}

//	@SuppressWarnings("unchecked")
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//
//		http.cors().and().csrf().disable()// csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//				// .ignoringAntMatchers("/api/authenticate","/h2-console/**").and()
//				.authorizeRequests().antMatchers(HttpMethod.GET).permitAll().antMatchers("/api/authenticate")
//				.permitAll().antMatchers("/api/perform-logout").permitAll().anyRequest().authenticated().and()
//				.exceptionHandling().accessDeniedHandler(accessDeniedHandler()).and().logout()
//				.logoutUrl("/api/perform-logout").logoutSuccessHandler(logoutSuccessHandler())
//				.invalidateHttpSession(true).deleteCookies("JSESSIONID");
//
//		@SuppressWarnings("rawtypes")
//		SecurityConfigurer securityConfigurerAdapter = new AuthTokenConfig(userDetailsService);
//		http.apply(securityConfigurerAdapter);
//	}
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
	        .cors()
	        
	        .and()
	        	
	        .csrf().disable()   
	        
	        .authorizeRequests()
	        
	        	.antMatchers("/api/basicauth").authenticated()
	        	
	        	.antMatchers(HttpMethod.GET).permitAll()
	            
	        .and()
	            
	        .httpBasic()
	        
	        .and()
	        
	        .logout()
	        
	        	.logoutUrl("/api/perform-logout")
	        	.invalidateHttpSession(true)
	        	.deleteCookies("JSESSIONID")
	        	.logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)));
    }

	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}

	@Bean
	public AuthenticationFailureHandler customAuthenticationFailureHandler() {
		return new CustomAuthenticationFailureHandler();
	}

	@Bean
	public LogoutSuccessHandler logoutSuccessHandler() {
		return new CustomLogoutSuccessHandler();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Collections.unmodifiableList(Arrays.asList("*")));
		configuration.setAllowedMethods(
				Collections.unmodifiableList(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH")));
		configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(
				Collections.unmodifiableList(Arrays.asList("Authorization", "Cache-Control", "Content-Type",
						"X-XSRF-TOKEN", "x-auth-token", "X-Requested-With", "Access-Control-Allow-Headers", "Accept")));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
		StrictHttpFirewall firewall = new StrictHttpFirewall();
		firewall.setAllowUrlEncodedSlash(true);
		return firewall;
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		super.configure(web);
		web.httpFirewall(allowUrlEncodedSlashHttpFirewall());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
}
package fifty.shades.of.blush.web.api;

import lombok.Data;

@Data
public class AuthenticationBean {

    private String message;

	public AuthenticationBean(String message) {
		super();
		this.message = message;
	}
}
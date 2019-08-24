package fifty.shades.of.blush.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Data;

@Entity
@SuppressWarnings("serial")
@Data
@Table(name = "users")
public class User implements Serializable {

	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String username;
	@NotBlank
	private String password;
	@Size(min=1)
	private String[] roles;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	public void setPassword(String password) {
		this.password = PASSWORD_ENCODER.encode(password);
	}
	
	public User() {};

	public User(String username, String password,String... roles) {
		this.username = username;
		this.setPassword(password);
		this.roles = roles;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

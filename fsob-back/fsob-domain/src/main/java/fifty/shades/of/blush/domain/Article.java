package fifty.shades.of.blush.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Data;

@Data
@Entity
@Table(name = "articles")
public class Article {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String subtitle;
	private String category;
	
	@OneToMany(mappedBy="article", cascade = CascadeType.ALL)
	private List<ArticleParagraph> paragraphs;
	
	@OneToMany(mappedBy="article", cascade = CascadeType.ALL)
	private List<ArticleFile> files;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;
	
	public Article() {}
	
	public Article(String title, String subtitle, String category) {
		this.title = title;
		this.subtitle = subtitle;
		this.category = category;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

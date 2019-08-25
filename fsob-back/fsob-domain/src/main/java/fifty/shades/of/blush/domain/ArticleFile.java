package fifty.shades.of.blush.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@Entity
@Table(name = "article_files")
public class ArticleFile {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	@NotBlank
	private String fileName;
	@NotBlank
	private String fileType;

	@Lob
	private byte[] data;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "article_id")
	private Article article;

	public ArticleFile(String fileName, String fileType, byte[] data, Article article) {
		this.fileName = fileName;
		this.fileType = fileType;
		this.data = data;
		this.article = article;
	}
}
package fifty.shades.of.blush.web.api.services;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fifty.shades.of.blush.data.exception.FileStorageException;
import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.data.service.DBFileStorageService;
import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.domain.ArticleFile;
import fifty.shades.of.blush.web.api.UploadFileResponse;

@Service
public class ArticleFilesDatabaseService {

	private static final Logger logger = LoggerFactory.getLogger(ArticleFilesDatabaseService.class);

	@Autowired
	ArticleRepository articles;

	@Autowired
	private DBFileStorageService DBFileStorageService;

	public UploadFileResponse storeMainFile(MultipartFile file, Long articleId) throws Exception {

		Article article = articles.findById(articleId)
				.orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		if (fileName.contains("..")) {
			throw new FileStorageException("Filename contains invalid path sequence " + fileName);
		}

		String fileExtension = fileName.substring(fileName.lastIndexOf("."));

		ArticleFile articleFile = DBFileStorageService.storeFile("main_" + articleId + fileExtension, file, article);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(articleFile.getId()).toUriString();

		return new UploadFileResponse(articleFile.getFileName(), fileDownloadUri, file.getContentType(),
				file.getSize());
	}

	public UploadFileResponse storeFile(MultipartFile file, Long articleId) throws Exception {

		Article article = articles.findById(articleId)
				.orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		if (fileName.contains("..")) {
			throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
		}

		logger.debug("uploadFile : " + fileName);

		ArticleFile articleFile = DBFileStorageService.storeFile(fileName, file, article);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(articleFile.getId()).toUriString();

		return new UploadFileResponse(articleFile.getFileName(), fileDownloadUri, file.getContentType(),
				file.getSize());
	}

	public void storeMultipleFiles(MultipartFile[] files, Long articleId) throws FileStorageException {

		Arrays.asList(files).stream().map(file -> {

			try {
				return storeFile(file, articleId);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return new Exception("Failed storing file");

		}).collect(Collectors.toList());
	}
}

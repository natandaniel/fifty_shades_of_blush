package fifty.shades.of.blush.web.api.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import fifty.shades.of.blush.data.exception.FileStorageException;
import fifty.shades.of.blush.data.exception.ResourceNotFoundException;
import fifty.shades.of.blush.data.properties.FileStorageProperties;
import fifty.shades.of.blush.data.repository.ArticleRepository;
import fifty.shades.of.blush.data.service.DBFileStorageService;
import fifty.shades.of.blush.data.service.FSFileStorageService;

@Service
public class ArticleFilesFileSystemService {

	private final Path fileStorageLocation;

	@Autowired
	ArticleRepository articles;

	@Autowired
	private FSFileStorageService FSFileStorageService;

	@Autowired
	private DBFileStorageService DBFileStorageService;

	@Autowired
	public ArticleFilesFileSystemService(FileStorageProperties fileStorageProperties) {

		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
					ex);
		}
	}

	public String storeMainFile(MultipartFile file, Long articleId) throws Exception {

		articles.findById(articleId).orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		if (fileName.contains("..")) {
			throw new FileStorageException("Filename contains invalid path sequence " + fileName);
		}

		String fileExtension = fileName.substring(fileName.lastIndexOf("."));

		FSFileStorageService.storeFile("main_" + articleId + fileExtension, file, fileStorageLocation);

		return "main_" + articleId + fileExtension;
	}

	public String storeFile(MultipartFile file, Long articleId) throws Exception {

		articles.findById(articleId).orElseThrow(() -> new ResourceNotFoundException("Article", "id", articleId));

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		if (fileName.contains("..")) {
			throw new FileStorageException("Filename contains invalid path sequence " + fileName);
		}

		FSFileStorageService.storeFile(fileName, file, fileStorageLocation);

		return fileName;
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

	public Resource getFile(String fileName) throws IOException {

		return FSFileStorageService.getFile(fileName, fileStorageLocation);
	}
}
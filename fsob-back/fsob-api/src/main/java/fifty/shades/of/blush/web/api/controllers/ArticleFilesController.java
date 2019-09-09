package fifty.shades.of.blush.web.api.controllers;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fifty.shades.of.blush.data.exception.MyFileNotFoundException;
import fifty.shades.of.blush.web.api.UploadFileResponse;
import fifty.shades.of.blush.web.api.services.ArticleFilesDatabaseService;
import fifty.shades.of.blush.web.api.services.ArticleFilesFileSystemService;

@RestController
@RequestMapping(path = "/api/articles")
@CrossOrigin(origins = "*")
public class ArticleFilesController {

	private static final Logger logger = LoggerFactory.getLogger(ArticleFilesController.class);

	@Autowired
	ArticleFilesDatabaseService articleFilesDBService;

	@Autowired
	ArticleFilesFileSystemService articleFilesFSService;

	@PostMapping("/uploadFile/{articleId}")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file,
			@PathVariable("articleId") Long articleId) throws Exception {

		String fileName = articleFilesFSService.storeFile(file, articleId);
		articleFilesDBService.storeMainFile(file, articleId);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
	}

	@PostMapping("/uploadMultipleFiles/{articleId}")
	public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,
			@PathVariable("articleId") Long articleId) {

		return Arrays.asList(files).stream().map(file -> {
			try {
				return uploadFile(file, articleId);
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
			return new UploadFileResponse("Failes uploading file " + StringUtils.cleanPath(file.getOriginalFilename()),
					"", "", 0l);
		}).collect(Collectors.toList());
	}

	@GetMapping("/downloadFile/{fileName}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request)
			throws MyFileNotFoundException, IOException {

		Resource resource = articleFilesFSService.getFile(fileName);

		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);

	}
}
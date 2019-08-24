package fifty.shades.of.blush.data.service;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fifty.shades.of.blush.data.exception.FileStorageException;
import fifty.shades.of.blush.data.exception.MyFileNotFoundException;
import fifty.shades.of.blush.data.repository.ArticleFilesRepository;
import fifty.shades.of.blush.domain.Article;
import fifty.shades.of.blush.domain.ArticleFile;

@Service
public class DBFileStorageService {

	@Autowired
	private ArticleFilesRepository articleFilesRepo;

	public ArticleFile storeFile(String fileName, MultipartFile articleFile, Article article) throws Exception {
		
		Optional<ArticleFile> optArticleFile = articleFilesRepo.findByFileName(fileName);
		
		try {
			optArticleFile.get();
			
			throw new Exception("Cannot upload same file");
		}catch(NoSuchElementException e){
			
			try {

				ArticleFile dbFile = new ArticleFile(fileName, articleFile.getContentType(), articleFile.getBytes(),
						article);

				return articleFilesRepo.save(dbFile);
			} catch (IOException ex) {
				throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
			}
		}
		


		
	}

	public ArticleFile getFile(String fileId) throws MyFileNotFoundException {
		return articleFilesRepo.findById(fileId)
				.orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
	}
}
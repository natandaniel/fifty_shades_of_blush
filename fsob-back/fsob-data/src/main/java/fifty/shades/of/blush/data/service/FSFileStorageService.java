package fifty.shades.of.blush.data.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fifty.shades.of.blush.data.exception.MyFileNotFoundException;

@Service
public class FSFileStorageService {

	public void storeFile(String fileName, MultipartFile articleFile, Path fileStorageLocation) throws Exception {

		Path targetLocation = fileStorageLocation.resolve(fileName);
		Files.copy(articleFile.getInputStream(), targetLocation);
	}

	public Resource getFile(String fileName, Path fileStorageLocation) throws IOException {
		
		try {
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
	}

}

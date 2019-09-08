package fifty.shades.of.blush.data.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Base64;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FSFileStorageService {

	public void storeFile(String fileName, MultipartFile articleFile, Path fileStorageLocation) throws Exception {

		Path targetLocation = fileStorageLocation.resolve(fileName);
		Files.copy(articleFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
	}

	public ByteArrayResource getFile(String fileName, Path fileStorageLocation) throws IOException {
		
			Path filePath = fileStorageLocation.resolve(fileName).normalize();
			System.out.println(filePath);
			return new ByteArrayResource(Base64.getEncoder().encodeToString(Files.readAllBytes(filePath)));
	}

}

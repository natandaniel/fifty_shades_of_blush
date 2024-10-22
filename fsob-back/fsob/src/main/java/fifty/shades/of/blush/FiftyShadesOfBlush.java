package fifty.shades.of.blush;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import fifty.shades.of.blush.data.properties.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class FiftyShadesOfBlush extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(FiftyShadesOfBlush.class, args);
	}

}

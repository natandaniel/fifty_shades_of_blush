package fifty.shades.of.blush;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SuppressWarnings("deprecation")
@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
      registry.addViewController("/{spring:\\w+}")
            .setViewName("forward:/");
      registry.addViewController("/**/{spring:\\w+}")
            .setViewName("forward:/");
      registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
            .setViewName("forward:/");
  }
}
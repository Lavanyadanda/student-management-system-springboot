// package com.student;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class SmartStudentMsApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(SmartStudentMsApplication.class, args);
// 	}

// }
package com.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SmartStudentMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartStudentMsApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // .allowedOrigins("http://localhost:5173"
                        //      "http://localhost:5174"
                        //      "http://localhost:5175"
                        //      "http://localhost:5176"
                        //      "http://localhost:5177"
                        //      "http://localhost:5178"
                        //      "http://localhost:5179"
                        //      "http://localhost:5180"
                        //      "http://localhost:5181"
                        // )
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
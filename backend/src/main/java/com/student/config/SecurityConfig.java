// // package com.student.config;

// // import com.student.security.JwtFilter;
// // import lombok.RequiredArgsConstructor;
// // import org.springframework.context.annotation.*;
// // import org.springframework.security.authentication.*;
// // import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// // import org.springframework.security.config.http.SessionCreationPolicy;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.security.web.*;
// // import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// // import org.springframework.web.cors.*;

// // import java.util.List;

// // @Configuration
// // @EnableWebSecurity
// // @RequiredArgsConstructor
// // public class SecurityConfig {

// //     private final JwtFilter jwtFilter;

// //     @Bean
// //     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// //         http
// //             .csrf(csrf -> csrf.disable())
// //             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
// //             .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
// //             .authorizeHttpRequests(auth -> auth
// //                 .requestMatchers("/api/auth/**").permitAll()
// //                 .requestMatchers("/api/admin/**").hasRole("ADMIN")
// //                 .requestMatchers("/api/student/**").hasAnyRole("STUDENT", "ADMIN")
// //                 .anyRequest().authenticated()
// //             )
// //             .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

// //         return http.build();
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }

// //     @Bean
// //     public AuthenticationManager authenticationManager(
// //             AuthenticationConfiguration config) throws Exception {
// //         return config.getAuthenticationManager();
// //     }

// //     @Bean
// //     public CorsConfigurationSource corsConfigurationSource() {
// //         CorsConfiguration config = new CorsConfiguration();
// //         config.setAllowedOrigins(List.of("http://localhost:5173"));
// //         config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
// //         config.setAllowedHeaders(List.of("*"));
// //         config.setAllowCredentials(true);

// //         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// //         source.registerCorsConfiguration("/**", config);
// //         return source;
// //     }
// // }

// package com.student.config;

// import com.student.security.JwtFilter;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.*;
// import org.springframework.security.authentication.*;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.*;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.*;

// import java.util.Arrays;
// import java.util.List;

// @Configuration
// @EnableWebSecurity
// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final JwtFilter jwtFilter;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(AbstractHttpConfigurer::disable)
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .sessionManagement(sess -> 
//                 sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/api/auth/**").permitAll()
//                 .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                 .requestMatchers("/api/student/**").hasAnyRole("STUDENT", "ADMIN")
//                 .anyRequest().authenticated()
//             )
//             .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowedOrigins(Arrays.asList(
//             "http://localhost:5173",
//             "http://localhost:3000"
//         ));
//         config.setAllowedMethods(Arrays.asList(
//             "GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"
//         ));
//         config.setAllowedHeaders(List.of("*"));
//         config.setAllowCredentials(true);
//         config.setMaxAge(3600L);

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);
//         return source;
//     }
// }

// package com.student.config;

// import com.student.security.JwtFilter;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.*;
// import org.springframework.security.authentication.*;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.*;

// import java.util.Arrays;
// import java.util.List;

// @Configuration
// @EnableWebSecurity
// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final JwtFilter jwtFilter;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .sessionManagement(sess ->
//                 sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/**").permitAll()
//             )
//             .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowedOriginPatterns(List.of("*"));
//         config.setAllowedMethods(Arrays.asList(
//             "GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"
//         ));
//         config.setAllowedHeaders(List.of("*"));
//         config.setAllowCredentials(true);
//         config.setMaxAge(3600L);

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);
//         return source;
//     }
// }


package com.student.config;

import com.student.security.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(AbstractHttpConfigurer::disable)
            .sessionManagement(sess ->
                sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
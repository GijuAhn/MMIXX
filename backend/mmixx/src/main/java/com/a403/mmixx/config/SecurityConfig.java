package com.a403.mmixx.config;

import com.a403.mmixx.auth.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic()
                .disable()
                .csrf()
                .disable()
                .headers().frameOptions().disable()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/**").permitAll();
//                .antMatchers("/","/css/**","/images/**","/js/**"
//                        ,"/h2-console/**", "/profile").permitAll();
////                .anyRequest().authenticated()
//                .and()
//                .logout()
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/") // 로그아웃 이후 연결 페이지
//                .invalidateHttpSession(true)
//                .and()
//                .oauth2Login() // OAuth2기반의 로그인
//                .loginPage("/loginForm")
//                .defaultSuccessUrl("/") // 로그인 성공
//                .failureUrl("/loginForm") // 로그인 실패
//                .userInfoEndpoint() // 로그인 성공 후 사용자정보를 가져온다
//                .userService(customOAuth2UserService); // 사용자 정보를 customOAuth2UserService로 처리
//        // .and()
//        // Access Token이 만료된 경우 ContextHolder에서 권한을 찾아 해당 요청에 대해서만 접근을 허용해줘야 하기 때문에 Filter를 완전히 제거할 수는 없음 (addFilterBefore 제거하지 말것!)
//        // .addFilterBefore(UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}//SecurityConfig

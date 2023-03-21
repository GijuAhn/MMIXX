package com.a403.mmixx.user.controller;

import com.a403.mmixx.auth.service.CustomOAuth2UserService;
import com.a403.mmixx.user.model.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"회원", "api"})
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final CustomOAuth2UserService customOAuth2UserService;


//    @GetMapping("/login/{socialLoginType}")
//    public void moveLoginUrl(HttpServletRequest request,
//                            @PathVariable(name = "socialLoginType") SocialLoginType socialLoginType) throws Exception {
//        // 구글로그인 창을 띄우고, 로그인 후 리다이렉션
//        oauthService.request(socialLoginType);
//    }//getGoogleAuthUrl

//    @GetMapping(value = "/{socialLoginType}/callback")
//    public ResponseEntity<?> callback(
//            @PathVariable(name = "socialLoginType") SocialLoginType socialLoginType,
//            @RequestParam(name = "code") String code) {
//        log.info(">> 소셜 로그인 API 서버로부터 받은 code :: {}", code);
//
//        User user = oauthService.getuserInfo(socialLoginType, code);
//        System.out.println(user.toString());
//
//        return null;
//    }//callback


}//UserController

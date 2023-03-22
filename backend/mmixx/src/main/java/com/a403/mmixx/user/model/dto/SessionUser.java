package com.a403.mmixx.user.model.dto;

import com.a403.mmixx.user.model.entity.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String userName;
    private String email;
    private String profileImageUrl;

    public SessionUser(User user) {
        this.userName = user.getUserName();
        this.email = user.getEmail();
        this.profileImageUrl = user.getProfileImageUrl();
    }

}//SessionUser

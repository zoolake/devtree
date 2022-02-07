package com.rootnode.devtree.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
public class UserRegisterPostReq {
	@JsonProperty("user_id")
	String user_id;
	String user_password;
	String user_email;
	String user_name;
}

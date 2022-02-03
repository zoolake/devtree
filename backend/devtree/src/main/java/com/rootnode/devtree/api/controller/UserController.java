package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.response.UserRes;
import com.rootnode.devtree.api.service.UserService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.api.response.BaseResponseBody;
import com.rootnode.devtree.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController

//mapping 바꾸자
@RequestMapping("/api/v1/users")
public class UserController {
	
	@Autowired
	UserService userService;

	/**
	 *
	 * @param registerInfo
	 *
	 * 회원가입이 완료되면 로그인 페이지로 redirect 시키는 형식으로 구현해보자..!!!!
	 */
	@PostMapping("/signup")
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		if(userService.getUserByUserId(registerInfo.getUser_id())==null) {
			//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
//		System.out.println("안녕  "+registerInfo.getId());
			User user = userService.createUser(registerInfo);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}
		else{
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Fail"));
		}
	}

	/**
	 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
	 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
	 */
	@GetMapping("/me")
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
//		userdetails를 통해서 user를 가져온다.
		UserDetail userDetails = (UserDetail)authentication.getDetails();

//		userdetail에서는 getusername 이 userid 를 가져오는것
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		
		return ResponseEntity.status(200).body(UserRes.of(user));
	}
}

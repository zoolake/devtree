package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.response.UserRes;
import com.rootnode.devtree.api.service.UserService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.api.response.BaseResponseBody;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.User;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@RestController
@RequiredArgsConstructor

@Slf4j
//mapping 바꾸자
public class UserController {
	private  final UserService userService;

	/**
	 * @param registerInfo
	 */
	@PostMapping("/v1/user/signup")
	public  ResponseEntity<? extends BaseResponseBody> register(@RequestBody UserRegisterPostReq registerInfo) {

		User user1 = userService.getUserByUserId(registerInfo.getUser_id());
		if(user1==null) {
//		if(Objects.isNull(userService.getUserByUserId(registerInfo.getUser_id()))) {
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
	 * 전체 유저 목록 조회
	 */
	@GetMapping("/v1/users")
	public ResponseEntity<List<User>> userList(){
		List<User> users = userService.getUsers();
		if(!users.isEmpty()){
//			return ResponseEntity.ok().body(new Result<List<User>>(users,200,"유저리스트 성공"));
			return ResponseEntity.ok().body(users);
		}
//		return ResponseEntity.status(400).body(new Result<List<User>>(null,200,"유저리스트 성공"));
		return ResponseEntity.status(400).body(users);
	}


	/**
	 * List를 한번 감싸서 보내기 위하여 만든 클래스
	 * Result<>를 사용하다가 수정중에 다시 돌려놓음...
	 * from 준호님
	 */
	@Data
	@AllArgsConstructor
	static class Result<T> {
		private T data;
		int status;
		private String message;
	}

}

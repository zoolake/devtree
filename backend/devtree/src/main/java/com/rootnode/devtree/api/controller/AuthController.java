package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.UserLoginPostReq;
import com.rootnode.devtree.api.request.UserUpdateRequestDto;
import com.rootnode.devtree.api.response.UserDetailResponseDto;
import com.rootnode.devtree.api.response.UserLoginPostRes;
import com.rootnode.devtree.api.service.UserService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.common.util.JwtTokenUtil;
import com.rootnode.devtree.db.entity.User;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    /**
     * @param loginInfo
	 * */
    @PostMapping("/v1/user/login")
    public ResponseEntity<UserLoginPostRes> login(@RequestBody UserLoginPostReq loginInfo) {
        String userId = loginInfo.getUserId();
        String password = loginInfo.getUserPassword();
        User user = userService.getUserByUserId(userId);

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (user != null && passwordEncoder.matches(password, user.getUserPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId,user.getUserSeq(),user.getUserRole().name())));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
    }


    /**
     *
     * Feat : 나의 프로필 조회
     * User객체에 기술 스택 정보가 없으니 기술 스택 객체에서 가져와야한다.
     *
     * 요청해더에
     */
    @GetMapping("/v1/user")
    public ResponseEntity<Result> getUserInfo(@ApiIgnore Authentication authentication) {
//		userdetails를 통해서 user를 가져온다.
        UserDetail userDetails = (UserDetail)authentication.getDetails();
        UserDetailResponseDto user = userService.getUserDetailByUserId(userDetails.getUsername());
        return ResponseEntity.status(200).body(new Result(user,200,"성공"));
    }



    /**
     * 기능 : 아이디 중복조회
     * 필요할까 싶음
     */
    @PostMapping("/v1/user/idcheck")
    public ResponseEntity<Boolean> login(@RequestBody Map<String,String> request) {
        User user = userService.getUserByUserId(request.get("userId"));
        if (user == null) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(409).body(false);
    }

    /**
     * 기능 : 프로필 수정 (기술 스택 추가)
     */
    @PutMapping("v1/user")
    public void userUpdate(Authentication authentication,@RequestBody UserUpdateRequestDto userUpdateRequestDto) {
//		userdetails를 통해서 user를 가져온다.
        UserDetail userDetails = (UserDetail)authentication.getDetails();
//      user_seq 가져오기
        Long userSeq = userDetails.getUser().getUserSeq();
//      프로필을 수정하자!
        userService.updateUser(userSeq,userUpdateRequestDto);
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
        int status;
        private String message;
    }

}

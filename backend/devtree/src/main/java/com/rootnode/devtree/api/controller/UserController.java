package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.api.service.UserService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.TeamState;
import com.rootnode.devtree.db.entity.User;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@RestController
@RequiredArgsConstructor

@Slf4j
//mapping 바꾸자
public class UserController {
	private final UserService userService;

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
	 *  기능 : 유저의 스터디 기록 내역 (기술 당 스터디를 몇 번 했는지) /
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/study/count")
	public ResponseEntity<Result> userStudyCount(Authentication authentication) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();
		List<UserActivitiesTechCntResponseDto> responseDto = userService.findStudyCount(userDetail.getUser().getUserSeq());
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 스터디 기술스택 카운트 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 스터디 전체 활동 내역 /
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/study")
	public ResponseEntity<Result> userStudyListAll(Authentication authentication) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();
		List<UserStudyActivitiesListResponseDto> responseDto = userService.findStudyListAll(userDetail.getUser().getUserSeq());
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 스터디 전체 내역 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 스터디 상태 활동 내역
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/study/{team_state}")
	public ResponseEntity<Result> userStudyListState(Authentication authentication,
													 @PathVariable TeamState team_state) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();
		List<UserStudyActivitiesListResponseDto> responseDto = userService.findStudyListState(userDetail.getUser().getUserSeq(), team_state);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 스터디 상태 내역 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 프로젝트 기록 내역 (포지션 당 프로젝트를 몇 번 했는지)
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/project/count")
	public ResponseEntity<Result> userProjectCount(Authentication authentication) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();
		List<UserActivitiesPositionCntResponseDto> responseDto = userService.findProjectCount(userDetail.getUser().getUserSeq());
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 프로젝트 포지션 카운트 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 프로젝트 전체 활동 내역
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/project")
	public ResponseEntity<Result> userProjectListAll(Authentication authentication) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();
		List<UserProjectActivitiesListResponseDto> responseDto = userService.findProjectListAll(userDetail.getUser().getUserSeq());
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 프로젝트 전체 내역 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 프로젝트 상태 활동 내역
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/project/{team_state}")
	public ResponseEntity<Result> userProjectListState(Authentication authentication,
													   @PathVariable TeamState team_state) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();
		List<UserProjectActivitiesListResponseDto> responseDto = userService.findProjectListState(userDetail.getUser().getUserSeq(), team_state);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 프로젝트 상태 내역 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 멘토링 전체 활동 내역
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/mentor")
	public ResponseEntity<Result> userMentoringListAll(Authentication authentication) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();

		List<UserMentoringActivitiesResponseDto> responseDto = userService.findMentoringListAll(userDetail.getUser().getUserSeq());
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 프로젝트 전체 내역 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 멘토링 상태 활동 내역
	 *  수정 : user_seq - > Authentication
	 */
	@GetMapping("/v1/user/mentor/{mentoring_state}")
	public ResponseEntity<Result> userMentoringListState(Authentication authentication,
														 @PathVariable MentoringState mentoring_state) {
		UserDetail userDetail = (UserDetail) authentication.getDetails();

		List<UserMentoringActivitiesResponseDto> responseDto = userService.findMentoringListState(userDetail.getUser().getUserSeq(), mentoring_state);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 프로젝트 전체 내역 조회 성공")
						.build());
	}


	/**
	 * List를 한번 감싸서 보내기 위하여 만든 클래스
	 * Result<>를 사용하다가 수정중에 다시 돌려놓음...
	 * from 준호님
	 */
	@Data
	@AllArgsConstructor
	@Builder
	static class Result<T> {
		private T data;
		int status;
		private String message;
	}

}

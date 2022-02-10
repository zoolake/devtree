package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.MentorCertificationRequestDto;
import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.api.service.UserService;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.TeamState;
import com.rootnode.devtree.db.entity.User;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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
	 *  기능 : 유저의 스터디 기록 내역 (기술 당 스터디를 몇 번 했는지)
	 */
	@GetMapping("/v1/user/study/{user_seq}/count")
	public ResponseEntity<Result> userStudyCount(@PathVariable Long user_seq) {
		List<UserActivitiesTechCntResponseDto> responseDto = userService.findStudyCount(user_seq);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 스터디 기술스택 카운트 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 스터디 전체 활동 내역
	 */
	@GetMapping("/v1/user/study/{user_seq}")
	public ResponseEntity<Result> userStudyListAll(@PathVariable Long user_seq) {
		List<UserStudyActivitiesListResponseDto> responseDto = userService.findStudyListAll(user_seq);
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
	 */
	@GetMapping("/v1/user/study/{user_seq}/{team_state}")
	public ResponseEntity<Result> userStudyListState(@PathVariable Long user_seq,
													 @PathVariable TeamState team_state) {
		List<UserStudyActivitiesListResponseDto> responseDto = userService.findStudyListState(user_seq, team_state);
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
	 */
	@GetMapping("/v1/user/project/{user_seq}/count")
	public ResponseEntity<Result> userProjectCount(@PathVariable Long user_seq) {
		List<UserActivitiesPositionCntResponseDto> responseDto = userService.findProjectCount(user_seq);
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
	 */
	@GetMapping("/v1/user/project/{user_seq}")
	public ResponseEntity<Result> userProjectListAll(@PathVariable Long user_seq) {
		List<UserProjectActivitiesListResponseDto> responseDto = userService.findProjectListAll(user_seq);
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
	 */
	@GetMapping("/v1/user/project/{user_seq}/{team_state}")
	public ResponseEntity<Result> userProjectListState(@PathVariable Long user_seq,
													   @PathVariable TeamState team_state) {
		List<UserProjectActivitiesListResponseDto> responseDto = userService.findProjectListState(user_seq, team_state);
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
	 */
	@GetMapping("/v1/user/mentoring/{user_seq}")
	public ResponseEntity<Result> userMentoringListAll(@PathVariable Long user_seq) {
		List<UserMentoringActivitiesResponseDto> responseDto = userService.findMentoringListAll(user_seq);
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
	 */
	@GetMapping("/v1/user/mentoring/{user_seq}/{mentoring_state}")
	public ResponseEntity<Result> userMentoringListState(@PathVariable Long user_seq,
														 @PathVariable MentoringState mentoring_state) {
		List<UserMentoringActivitiesResponseDto> responseDto = userService.findMentoringListState(user_seq, mentoring_state);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 프로젝트 전체 내역 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저가 속한 팀 목록
	 */
	@GetMapping("/v1/common/team/{userSeq}")
	public ResponseEntity<Result> findUserTeam(@PathVariable Long userSeq) {
		List<TeamInfoDto> responseDto = userService.findUserTeam(userSeq);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 팀 내역(팀 일련번호, 팀 이름, 팀 타입) 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저가 관리하는 팀 목록
	 */
	@GetMapping("/v1/common/team/manager/{managerSeq}")
	public ResponseEntity<Result> findManagerTeam(@PathVariable Long managerSeq) {
		List<TeamInfoDto> responseDto = userService.findManagerTeam(managerSeq);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("관리자인 팀 내역(팀 일련번호, 팀 이름, 팀 타입) 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 멘토 인증
	 */
	@PostMapping("/v1/user/mentor")
	public CommonResponseDto userCertification(@RequestBody MentorCertificationRequestDto requestDto) {
		return userService.certificationMentor(requestDto);
	}


	/**
	 *  기능 : 유저의 알림 조회
	 */
	@GetMapping("/v1/user/notification/{userSeq}")
	public ResponseEntity<Result> userNotification(@PathVariable Long userSeq) {
		List<NotificationListResponseDto> responseDto = userService.findUserNotification(userSeq);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("알림 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 알림 확인
	 */
	@GetMapping("/v1/user/notification/{userSeq}/{notificationSeq}")
	public CommonResponseDto userNotificationCheck(@PathVariable Long userSeq,
												   @PathVariable Long notificationSeq) {
		return userService.checkUserNotification(notificationSeq);
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

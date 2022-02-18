package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.EmailConfirmRequestDto;
import com.rootnode.devtree.api.request.EmailRequestDto;
import com.rootnode.devtree.api.request.MentorCertificationRequestDto;
import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.api.service.EmailService;
import com.rootnode.devtree.api.service.UserService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.common.util.JwtTokenUtil;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.TeamState;
import com.rootnode.devtree.db.entity.User;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@RestController
@RequiredArgsConstructor

@Slf4j
//mapping 바꾸자
public class UserController {
	private final UserService userService;
	private final EmailService emailService;

	/**
	 * @param registerInfo
	 */
	@PostMapping("/v1/user/signup")
	public  ResponseEntity<? extends BaseResponseBody> register(@RequestBody UserRegisterPostReq registerInfo) {

		User user1 = userService.getUserByUserId(registerInfo.getUserId());
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
	@GetMapping("/v1/user/study/count")
	public ResponseEntity<Result> userStudyCount(Authentication authentication) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserActivitiesTechCntResponseDto> responseDto = userService.findStudyCount(userSeq);
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
	@GetMapping("/v1/user/study")
	public ResponseEntity<Result> userStudyListAll(Authentication authentication) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserStudyActivitiesListResponseDto> responseDto = userService.findStudyListAll(userSeq);
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
	@GetMapping("/v1/user/study/{teamState}")
	public ResponseEntity<Result> userStudyListState(Authentication authentication,
													 @PathVariable TeamState teamState) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserStudyActivitiesListResponseDto> responseDto = userService.findStudyListState(userSeq, teamState);
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
	@GetMapping("/v1/user/project/count")
	public ResponseEntity<Result> userProjectCount(Authentication authentication) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserActivitiesPositionCntResponseDto> responseDto = userService.findProjectCount(userSeq);
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
	@GetMapping("/v1/user/project")
	public ResponseEntity<Result> userProjectListAll(Authentication authentication) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserProjectActivitiesListResponseDto> responseDto = userService.findProjectListAll(userSeq);
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
	@GetMapping("/v1/user/project/{teamState}")
	public ResponseEntity<Result> userProjectListState(Authentication authentication,
													   @PathVariable TeamState teamState) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserProjectActivitiesListResponseDto> responseDto = userService.findProjectListState(userSeq, teamState);
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
	@GetMapping("/v1/user/mentoring")
	public ResponseEntity<Result> userMentoringListAll(Authentication authentication) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserMentoringActivitiesResponseDto> responseDto = userService.findMentoringListAll(userSeq);
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
	@GetMapping("/v1/user/mentoring/{mentoringState}")
	public ResponseEntity<Result> userMentoringListState(Authentication authentication,
														 @PathVariable MentoringState mentoringState) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<UserMentoringActivitiesResponseDto> responseDto = userService.findMentoringListState(userSeq, mentoringState);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 프로젝트 전체 내역 조회 성공")
						.build());
	}

	/**
	 *  기능 : 현재 팀에 속한 멤버인지 확인 (true면 속함, false면 속하지 않음)
	 */
	@GetMapping("/v1/member/check/{teamSeq}")
	public ResponseEntity<Result> userCheckTeamMember(Authentication authentication,
													  @PathVariable Long teamSeq) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();

		boolean responseDto = userService.checkTeamMember(userSeq, teamSeq);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("참여한 팀 내역(팀 일련번호, 팀 이름, 팀 타입) 조회 성공")
						.build());
	}


	/**
	 *  기능 : 유저가 속한 팀 목록
	 */
	@GetMapping("/v1/common/team")
	public ResponseEntity<Result> findUserTeam(Authentication authentication) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
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
	@GetMapping("/v1/common/team/manager")
	public ResponseEntity<Result> findManagerTeam(Authentication authentication){
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<TeamInfoDto> responseDto = userService.findManagerTeam(userSeq);
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
	public CommonResponseDto userVerification(Authentication authentication,
											   @RequestBody MentorCertificationRequestDto requestDto) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		return userService.certificationMentor(userSeq,requestDto);
	}

	/**
	 *  기능 : 유저의 멘토 인증 (이메일 전송)
	 */
	@PostMapping("/v1/user/mentor/verification")
	public CommonResponseDto userSendverificationCode(Authentication authentication,
													  @RequestBody EmailRequestDto userEmail) throws Exception {
		User user = ((UserDetail) authentication.getDetails()).getUser();
		return emailService.sendSimpleMessage(user, userEmail);
	}

	/**
	 *  기능 : 유저의 멘토 인증 확인
	 */
	@PostMapping("/v1/user/mentor/verification/confirm")
	public ResponseEntity<Result> userConfirmVerificationCode(Authentication authentication,
															  @RequestBody EmailConfirmRequestDto requestDto) {
		User user = ((UserDetail) authentication.getDetails()).getUser();
		String accessToken = userService.confirmVerificationCode(user, requestDto);
		if(!accessToken.equals(null)) {
			return ResponseEntity
					.status(200)
					.body(Result.builder()
							.data(accessToken)
							.status(200)
							.message("인증성공")
							.build());
		}
		else return ResponseEntity
				.status(401)
				.body(Result.builder()
						.data(accessToken)
						.status(200)
						.message("인증실패")
						.build());
//		return ;
	}


	/**
	 *  기능 : 유저의 알림 조회
	 */
	@GetMapping("/v1/user/notification")
	public ResponseEntity<Result> userNotification(Authentication authentication) {
		UserDetail userDetails = (UserDetail)authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();
		List<NotificationResponseDto> responseDto = userService.findUserNotification(userSeq);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("알림 조회 성공")
						.build());
	}

	/**
	 *  기능 : 유저의 알림 상세 조회 (읽음 표시)
	 */
	@GetMapping("/v1/user/notification/{notificationSeq}")
	public ResponseEntity<Result> userNotificationCheck(@PathVariable Long notificationSeq) {
		NotificationResponseDto responseDto = userService.findUserDetailNotification(notificationSeq);
		return ResponseEntity
				.status(200)
				.body(Result.builder()
						.data(responseDto)
						.status(200)
						.message("알림 상세 조회 성공")
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

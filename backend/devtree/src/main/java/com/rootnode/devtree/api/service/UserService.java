package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.EmailConfirmRequestDto;
import com.rootnode.devtree.api.request.MentorCertificationRequestDto;
import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.request.UserUpdateRequestDto;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.TeamState;
import com.rootnode.devtree.db.entity.User;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */

public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	List<User> getUsers();
	public void updateUser(Long userSeq, UserUpdateRequestDto userUpdateRequestDto);
	public UserDetailResponseDto getUserDetailByUserId(String userId);

	List<UserActivitiesTechCntResponseDto> findStudyCount(Long userSeq);
	List<UserStudyActivitiesListResponseDto> findStudyListAll(Long userSeq);
	List<UserStudyActivitiesListResponseDto> findStudyListState(Long userSeq, TeamState teamState);

	List<UserActivitiesPositionCntResponseDto> findProjectCount(Long userSeq);
	List<UserProjectActivitiesListResponseDto> findProjectListAll(Long userSeq);
	List<UserProjectActivitiesListResponseDto> findProjectListState(Long userSeq, TeamState teamState);

	List<UserMentoringActivitiesResponseDto> findMentoringListAll(Long userSeq);
	List<UserMentoringActivitiesResponseDto> findMentoringListState(Long userSeq, MentoringState mentoringState);

	boolean checkTeamMember(Long userSeq, Long teamSeq);
	List<TeamInfoDto> findUserTeam(Long userSeq);
	List<TeamInfoDto> findManagerTeam(Long managerSeq);
	CommonResponseDto certificationMentor(Long mentorSeq,MentorCertificationRequestDto requestDto);

	List<NotificationResponseDto> findUserNotification(Long userSeq);
	NotificationResponseDto findUserDetailNotification(Long notificationSeq);
	String confirmVerificationCode(User user, EmailConfirmRequestDto requestDto);
}

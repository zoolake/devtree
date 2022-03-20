package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.EmailConfirmRequestDto;
import com.rootnode.devtree.api.request.MentorCertificationRequestDto;
import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.request.UserUpdateRequestDto;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.common.util.JwtTokenUtil;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.UserTechId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserTechRepository userTechRepository;
    private final TechRepository techRepository;
    private final PasswordEncoder passwordEncoder;

    private final TeamRepository teamRepository;
    private final StudyUserRepository studyUserRepository;
    private final ProjectPositionUserRepository projectPositionUserRepository;
    private final ProjectPositionRepository projectPositionRepository;
    private final MentorRepository mentorRepository;
    private final MentoringRepository mentoringRepository;
    private final NotificationRepository notificationRepository;

//
//    @Autowired
//    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        System.out.println("userRegisterInfo = " + userRegisterInfo.toString());
        User user = User.builder()
                .userId(userRegisterInfo.getUserId())
                // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
                .userPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()))
                .userName(userRegisterInfo.getUserName())
                .userEmail(userRegisterInfo.getUserEmail())
                .userNickname(userRegisterInfo.getUserId())
                .userRole(UserRole.USER)
                .build();
        return userRepository.save(user);
    }



    /**
     * 프로필 수정
     *              "user_seq": 1,
     *             "user_name": "kim",
     *             "user_email": "wjdgur778@gmail.com",
     *             "userId": "wjdgur778",
     *             "user_role": "USER",
     *             "user_desc": null,
     *             "user_nickname": null,
     *
     *             null이면 , 그에 해당하게 front작업 할 것
     */



    @Override
    @Transactional
    public void updateUser(Long userSeq, UserUpdateRequestDto userUpdateRequestDto) {

        User user = userRepository.findByUserSeq(userSeq).get();

        if(StringUtils.hasText(userUpdateRequestDto.getUserName())){
            user.changeUserName(userUpdateRequestDto.getUserName());
        }
        if(StringUtils.hasText(userUpdateRequestDto.getUserEmail())){
            user.changeUserEmail(userUpdateRequestDto.getUserEmail());
        }
        if(StringUtils.hasText(userUpdateRequestDto.getUserDesc())){
            user.changeUserDesc(userUpdateRequestDto.getUserDesc());
        }
        if(StringUtils.hasText(userUpdateRequestDto.getUserNickname())){
            user.changeUserNickName(userUpdateRequestDto.getUserNickname());
        }

        userTechRepository.deleteByUserTechIdUserSeq(user.getUserSeq());
        //기술 스택 관련 정보(사용자 기술스택)먼저  save 해야한다.
        for (Long t : userUpdateRequestDto.getUserTech()){
            userTechRepository.save(new UserTech(new UserTechId(user.getUserSeq(),t),user,techRepository.findByTechSeq(t)));
        }

    }

    /**
     * 기술 스택 정보까지 포함되어있는 UserDetailResposeDto를 반환
     */
    @Override
    @Transactional
    public UserDetailResponseDto getUserDetailByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        Optional<User> user = userRepository.findByUserId(userId);
        // 존재하지 않으면 null
        if (!user.isPresent()) return null;
        //user_seq를 통해서 사용자 기술스택 테이블의 tech_seq의 리스트를 가져온다.

        List<UserTech> userTech = userTechRepository.findByUserTechIdUserSeq(user.get().getUserSeq());

        //tech_seq리스트를 사용하여 기술스택 객체의 리스트를 가져온다.
        List<Tech> tech=new ArrayList<>();
        for(UserTech u : userTech){
            tech.add(techRepository.findByTechSeq(u.getUserTechId().getTechSeq()));
        }

        //UserDetailResponseDto 객체에 user와 tech리스트를 넣어준다.
        UserDetailResponseDto userDetailResponseDto = new UserDetailResponseDto(user.get(),tech);

        return userDetailResponseDto;
    }


    @Override
    @Transactional
    public User getUserByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        Optional<User> user = userRepository.findByUserId(userId);
        // 존재하지 않으면 null
        if (!user.isPresent()) return null;
        return user.get();
    }


    @Override
    @Transactional
    public List<User> getUsers(){
        List<User> users = userRepository.findAll();
        System.out.println(users.size());
        if (users.isEmpty()) return null;
        return users;
    }


    // 유저의 스터디 기록 내역 (기술 당 스터디를 몇 번 했는지)
    @Override
    public List<UserActivitiesTechCntResponseDto> findStudyCount(Long userSeq) {
        // 1. study_user 테이블에서 user_seq로 속한 스터디(teamSeq) 리스트 찾기
        List<Team> teamList = studyUserRepository.findTeamSeqByUserSeq(userSeq).stream()
                .map(teamSeq -> teamRepository.findById(teamSeq).get())
                .collect(Collectors.toList());
        // 2. 각 스터디 별 기술 스택을 확인하고
        Map<String, UserActivitiesTechCntResponseDto> studyTechCntMap = new HashMap<>();
        teamList.forEach(team -> {
            List<TeamTech> teamTechList = team.getTeamTechList();
            teamTechList.forEach(teamTech -> {
                String techName = teamTech.getTech().getTechName();
                String techImage = teamTech.getTech().getTechImage();
                // 3. 유저 스터디 기술 스택 리스트에 없으면 추가하고
                if(studyTechCntMap.get(techName) == null) {
                    studyTechCntMap.put(techName, new UserActivitiesTechCntResponseDto(techName, techImage, 1));
                } else {
                // 4. 있으면 cnt+1
                    studyTechCntMap.get(techName).addTechCount();
                }
            });
        });
        return studyTechCntMap.values().stream().sorted(Comparator.comparing(UserActivitiesTechCntResponseDto::getTechCount).reversed()).collect(Collectors.toList());
    }

    // 유저의 스터디 활동 내역 (전체)
    @Override
    public List<UserStudyActivitiesListResponseDto> findStudyListAll(Long userSeq) {
        // 1. study_user 테이블에서 user_seq로 속한 스터디(teamSeq) 리스트 찾기
        List<Long> userTeamList = studyUserRepository.findTeamSeqByUserSeq(userSeq);
        // 2. teamSeq를 가지고 teamRepository에서 team 정보 찾기
        return userTeamList.stream()
                .map(teamSeq -> {
                    Team team = teamRepository.findById(teamSeq).get();
                    return new UserStudyActivitiesListResponseDto(team);
                })
                .collect(Collectors.toList());
    }

    // 유저의 스터디 활동 내역 (상태)
    @Override
    public List<UserStudyActivitiesListResponseDto> findStudyListState(Long userSeq, TeamState teamState) {
        // 유저의 스터디 전체 활동 내역 -> 스터디 상태가 teamState인 것만
        return findStudyListAll(userSeq).stream()
                .filter(t -> t.getTeamState().equals(teamState.name()))
                .collect(Collectors.toList());
    }

    // 유저의 프로젝트 기록 내역 (포지션 당 프로젝트를 몇 번 했는지)
    @Override
    public List<UserActivitiesPositionCntResponseDto> findProjectCount(Long userSeq) {
        // 1. project_position_user 테이블에서 user_seq로 속한 프로젝트(teamSeq) 리스트 찾기
        List<Team> teamList = projectPositionUserRepository.findTeamSeqByUserSeq(userSeq).stream()
                .map(teamSeq -> teamRepository.findById(teamSeq).get())
                .collect(Collectors.toList());
        // 2. 각 프로젝트 별 포지션을 확인하고
        Map<String, UserActivitiesPositionCntResponseDto> projectPositionCntMap = new HashMap<>();
        teamList.forEach(team -> {
            List<ProjectPosition> projectPositionList = team.getTeamPositionList();
            projectPositionList.forEach(projectPosition -> {
                String detailPositionName = projectPosition.getPosition().getDetailPositionName();
                // 3. 유저 프로젝트 포지션 리스트에 없으면 추가하고
                if(projectPositionCntMap.get(detailPositionName) == null) {
                    projectPositionCntMap.put(detailPositionName, new UserActivitiesPositionCntResponseDto(detailPositionName, 1));
                } else {
                    // 4. 있으면 cnt+1
                    projectPositionCntMap.get(detailPositionName).addPositionCount();
                }
            });
        });
        return projectPositionCntMap.values().stream().sorted(Comparator.comparing(UserActivitiesPositionCntResponseDto::getPositionCount).reversed()).collect(Collectors.toList());
    }

    // 유저의 프로젝트 활동 내역 (전체)
    @Override
    public List<UserProjectActivitiesListResponseDto> findProjectListAll(Long userSeq) {
        // 1. project_position_user 테이블에서 user_seq로 속한 프로젝트(teamSeq) 리스트 찾기
        List<Long> userTeamList = projectPositionUserRepository.findTeamSeqByUserSeq(userSeq);

        return userTeamList.stream()
                .map(teamSeq -> {
                    Team team = teamRepository.findById(teamSeq).get();
                    List<ProjectPosition> projectPosition = projectPositionRepository.findByTeamSeq(teamSeq);
                    return new UserProjectActivitiesListResponseDto(team, projectPosition);
                })
                .collect(Collectors.toList());
    }

    // 유저의 프로젝트 활동 내역 (상태)
    @Override
    public List<UserProjectActivitiesListResponseDto> findProjectListState(Long userSeq, TeamState teamState) {
        return findProjectListAll(userSeq).stream()
                .filter(t -> t.getTeamState().equals((teamState.name())))
                .collect(Collectors.toList());
    }

    // 유저의 멘토링 활동 내역 (전체)
    @Override
    public List<UserMentoringActivitiesResponseDto> findMentoringListAll(Long userSeq) {
        List<TeamInfoDto> teamList = findUserTeam(userSeq);

        List<UserMentoringActivitiesResponseDto> mentoringActivitiesList = new ArrayList<>();
        // 2. mentoring_reservation 테이블에서 team_seq로 속한 멘토링 찾기
        teamList.forEach(team -> {
            List<Mentoring> mentoringList = mentoringRepository.findMentoringByTeamSeq(team.getTeamSeq());
            mentoringList.forEach(mentoring -> {
                mentoringActivitiesList.add(new UserMentoringActivitiesResponseDto(mentoring, team.getTeamType(), team.getTeamName()));
            });
        });

        return mentoringActivitiesList;
    }

    // 유저의 멘토링 활동 내역 (상태)
    @Override
    public List<UserMentoringActivitiesResponseDto> findMentoringListState(Long userSeq, MentoringState mentoringState) {
        return findMentoringListAll(userSeq).stream()
                .filter(m -> m.getMentoringState().equals(mentoringState.name()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean checkTeamMember(Long userSeq, Long teamSeq) {
        boolean isCheck = false;
        Team team = teamRepository.findTeamByTeamSeq(teamSeq);
        List<Long> teamMemberSeq;

        if(team.getTeamType().equals(TeamType.STUDY)) {
            teamMemberSeq = studyUserRepository.findUserSeqByTeamSeq(teamSeq);
            isCheck = teamMemberSeq.stream().anyMatch(memberSeq -> memberSeq.equals(userSeq));
        } else {
            teamMemberSeq = projectPositionUserRepository.findUserSeqByTeamSeq(teamSeq);
            isCheck = teamMemberSeq.stream().anyMatch(memberSeq -> memberSeq.equals(userSeq));
        }
        return isCheck;
    }

    // 사용자가 속한 팀 찾기
    @Override
    public List<TeamInfoDto> findUserTeam(Long userSeq) {
        // 1. study_user 테이블, project_position_user 테이블에서 user_seq로 속한 팀(스터디 + 프로젝트) 리스트 찾기
        List<Long> studyTeamList = studyUserRepository.findTeamSeqByUserSeq(userSeq).stream().sorted().collect(Collectors.toList());
        List<Long> projectTeamList = projectPositionUserRepository.findTeamSeqByUserSeq(userSeq).stream().sorted().collect(Collectors.toList());

        // 2. 팀 리스트에 팀 일련련번호와 팀 타 추가
        List<TeamInfoDto> teamList = new ArrayList<>();
        studyTeamList.forEach(teamSeq -> {
            Team team = teamRepository.findById(teamSeq).get();
            teamList.add(new TeamInfoDto(team));
        });
        projectTeamList.forEach(teamSeq -> {
            Team team = teamRepository.findById(teamSeq).get();
            teamList.add(new TeamInfoDto(team));
        });
        return teamList;
    }

    @Override
    public List<TeamInfoDto> findManagerTeam(Long managerSeq) {
        return teamRepository.findTeamByManagerSeq(managerSeq).stream()
                .map(team -> new TeamInfoDto(team))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CommonResponseDto certificationMentor(Long mentorSeq,MentorCertificationRequestDto requestDto) {
        userRepository.certifyMentor(mentorSeq);
        User user = userRepository.findById(mentorSeq).get();

        mentorRepository.save(requestDto.toEntity(user));
        return new CommonResponseDto(201, "멘토 인증을 완료하였습니다.");
    }

    @Override
    public List<NotificationResponseDto> findUserNotification(Long userSeq) {
        List<Notification> notificationList = notificationRepository.findNotificationByUserSeq(userSeq);
        List<NotificationResponseDto> responseDto = new ArrayList<>();
        notificationList.forEach(notification -> {
            Long sendUserSeq = notification.getNotificationSendUserSeq();
            String sendUserName = userRepository.findByUserSeq(sendUserSeq).get().getUserName();
            responseDto.add(new NotificationResponseDto(notification, sendUserName));
        });
        return responseDto;
    }

    @Override
    @Transactional
    public NotificationResponseDto findUserDetailNotification(Long notificationSeq) {
        Notification notification = notificationRepository.findById(notificationSeq).get();
        notification.changeIsCheck();
        String sendUserName = userRepository.findByUserSeq(notification.getNotificationSendUserSeq()).get().getUserName();
        NotificationResponseDto responseDto = new NotificationResponseDto(notification, sendUserName);
        return responseDto;
    }

    @Override
    public String confirmVerificationCode(User user, EmailConfirmRequestDto requestDto) {
        String enteredCode = requestDto.getEnteredCode();
        String verificationCode = userRepository.findVerificaionCodeByUserSeq(user.getUserSeq());

        if(verificationCode.equals(enteredCode)) {
            user.changeUserRole(UserRole.MENTOR);
            user.changeVerificationCode("");
            mentorRepository.save(Mentor.builder().user(user).mentorExp(new Long(0)).mentorSeq(user.getUserSeq()).verificationDate(LocalDateTime.now()).build());
            String accessToken = JwtTokenUtil.getToken(user.getUserId(),user.getUserSeq(),user.getUserRole().name());
            return accessToken;
        } else {
            return null;
        }
    }
}

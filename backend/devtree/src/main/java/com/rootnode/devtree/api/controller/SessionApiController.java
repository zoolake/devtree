package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.ReviewRequestDto;
import com.rootnode.devtree.api.request.SessionJoinRequestDto;
import com.rootnode.devtree.api.request.SessionQuitRequestDto;
import com.rootnode.devtree.api.response.CommonResponseDto;
import com.rootnode.devtree.api.response.SessionJoinResponseDto;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.MentoringCommentId;
import com.rootnode.devtree.db.repository.MentoringCommentRepository;
import com.rootnode.devtree.db.repository.MentoringRepository;
import com.rootnode.devtree.db.repository.UserRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequestMapping("/v1/session")
@RequiredArgsConstructor
@RestController
public class SessionApiController {

    private MentoringRepository mentoringRepository;
    private MentoringCommentRepository mentoringCommentRepository;
    private UserRepository userRepository;

    private OpenVidu openVidu;

    private String OPENVIDU_URL;
    private String SECRET;

    // Map <세션일련번호, OpenVidu 세션 객체>
    private Map<Long, Session> sessionMap = new ConcurrentHashMap<>();

    // Map <세션일련번호, <토큰, 역할>>
    private Map<Long, Map<String, OpenViduRole>> sessionNamesTokensMap = new ConcurrentHashMap<>();

    @Autowired
    public SessionApiController(@Value("${openvidu.secret}") String secret,
                                @Value("${openvidu.url}") String url,
                                MentoringRepository mentoringRepository,
                                MentoringCommentRepository mentoringCommentRepository,
                                UserRepository userRepository) {
        this.SECRET = secret;
        this.OPENVIDU_URL = url;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        this.mentoringRepository = mentoringRepository;
        this.mentoringCommentRepository = mentoringCommentRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/join/{mentoringSeq}")
    public ResponseEntity<SessionJoinResponseDto> joinSession(@PathVariable Long mentoringSeq, Authentication authentication) throws OpenViduJavaClientException, OpenViduHttpException {
        // 역할 관련 변수 선언
        UserRole userRole = UserRole.MENTOR;
        OpenViduRole openViduRole = OpenViduRole.PUBLISHER;

        // 1. mentoringSeq 를 통해 멘토링 엔티티를 찾아온다.
        Mentoring mentoring = mentoringRepository.findById(mentoringSeq).get();
        Mentor mentor = mentoring.getMentor();

        // 2. mentorSeq == userSeq 면 해당 유저는 멘토임을 확인할 수 있다.
        UserDetail userDetail = (UserDetail) authentication.getDetails();
        Long userSeq = userDetail.getUser().getUserSeq();
        String userId = userDetail.getUser().getUserId();
        System.out.println("userSeq = " + userSeq);
        System.out.println("userId = " + userId);
        if (userDetail.getUser().getUserSeq() == mentor.getMentorSeq()) {
            userRole = UserRole.MENTOR;
            openViduRole = OpenViduRole.MODERATOR;
        } else {
            userRole = UserRole.USER;
            openViduRole = OpenViduRole.PUBLISHER;
        }

        String teamName = mentoring.getTeam().getTeamName();

        String serverData = "{\"serverData\": \"" + userId + "\"}";

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(openViduRole).build();

        // 멘티가 참석하는 경우 = 이미 세션이 존재해야 하는 경우
        if (this.sessionMap.get(mentoringSeq) != null) {
            System.out.println("멘티가 참석하는 경우");
            String token = this.sessionMap.get(mentoringSeq).createConnection(connectionProperties).getToken();
            this.sessionNamesTokensMap.get(mentoringSeq).put(token, openViduRole);
            return ResponseEntity.status(200).body(SessionJoinResponseDto.builder()
                    .userRole(userRole)
                    .openViduRole(openViduRole)
                    .teamName(teamName)
                    .token(token)
                    .userId(userId)
                    .userSeq(userSeq)
                    .build());
        }

        System.out.println("멘토가 개설하는 경우");
        Session session = this.openVidu.createSession();
        String token = session.createConnection(connectionProperties).getToken();

        this.sessionMap.put(mentoringSeq, session);
        this.sessionNamesTokensMap.put(mentoringSeq, new ConcurrentHashMap<>());
        this.sessionNamesTokensMap.get(mentoringSeq).put(token, openViduRole);

        return ResponseEntity.status(200).body(SessionJoinResponseDto.builder()
                .userRole(userRole)
                .openViduRole(openViduRole)
                .teamName(teamName)
                .token(token)
                .userId(mentor.getUser().getUserId())
                .userSeq(mentor.getMentorSeq())
                .build());
    }

    @PostMapping(value = "/quit")
    public ResponseEntity<CommonResponseDto> removeUser(@RequestBody SessionQuitRequestDto requestDto)
            throws Exception {

        System.out.println("removeUser 메소드 호출");
        Long mentoringSeq = requestDto.getMentoringSeq();
        String token = requestDto.getToken();

        // 해당 세션이 존재하는지
        if (this.sessionMap.get(mentoringSeq) != null && this.sessionNamesTokensMap.get(mentoringSeq) != null) {
            // 유저의 토큰이 타당한지
            if (this.sessionNamesTokensMap.get(mentoringSeq).remove(token) != null) {
                // 마지막 유저가 세션을 떠난다면 -> 세션 종료
                if (this.sessionNamesTokensMap.get(mentoringSeq).isEmpty()) {
                    this.sessionMap.remove(mentoringSeq);
                    System.out.println("마지막 유저가 떠났습니다.");
                }
                System.out.println("화상 멘토링을 종료했습니다.");
                return ResponseEntity.status(200).body(new CommonResponseDto(200, "화상 멘토링이 종료되었습니다."));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CommonResponseDto(500, "토큰이 타당하지 않습니다."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CommonResponseDto(500, "세션이 타당하지 않습니다."));
        }
    }

    @PostMapping(value = "/comment")
    public ResponseEntity<CommonResponseDto> mentoringReview(@RequestBody ReviewRequestDto requestDto) {
        System.out.println("mentoringSeq:" + requestDto.getMentoringSeq());
        System.out.println("userSeq:" + requestDto.getUserSeq());
        System.out.println("comment:" + requestDto.getComment());

        Long mentoringSeq = requestDto.getMentoringSeq();
        Long userSeq = requestDto.getUserSeq();
        String comment = requestDto.getComment();
        mentoringCommentRepository.save(new MentoringComment(
                new MentoringCommentId(userSeq, mentoringSeq),
                userRepository.findById(userSeq).get(),
                mentoringRepository.findById(mentoringSeq).get(),
                comment));

        return ResponseEntity.status(200)
                .body(new CommonResponseDto(200, "멘토링 후기 등록에 성공하였습니다."));
    }
}

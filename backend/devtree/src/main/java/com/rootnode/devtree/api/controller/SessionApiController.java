package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.SessionJoinRequestDto;
import com.rootnode.devtree.api.response.SessionJoinResponseDto;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.repository.MentoringRepository;
import com.rootnode.devtree.db.repository.MentoringUserRepository;
import com.rootnode.devtree.db.repository.ProjectPositionUserRepository;
import com.rootnode.devtree.db.repository.StudyUserRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequestMapping("/v1/session")
@RequiredArgsConstructor
@RestController
public class SessionApiController {

    private MentoringRepository mentoringRepository;

    private OpenVidu openVidu;

    private String OPENVIDU_URL;
    private String SECRET;

    // Map <세션일련번호, OpenVidu 세션 객체>
    private Map<Integer, Session> sessionMap = new ConcurrentHashMap<>();

    // Map <세션일련번호, <토큰, 역할>>
    private Map<Integer, Map<String, OpenViduRole>> sessionNamesTokensMap = new ConcurrentHashMap<>();

    @Autowired
    public SessionApiController(@Value("${openvidu.secret}") String secret,
                                @Value("${openvidu.url}") String url,
                                MentoringRepository mentoringRepository) {
        this.SECRET = secret;
        this.OPENVIDU_URL = url;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        System.out.println("HI");
        System.out.println(mentoringRepository);
    }

//    @PostMapping("/create")
//    public ResponseEntity<SessionJoinResponseDto> createConference(@RequestParam Long mentoringSeq) throws OpenViduJavaClientException, OpenViduHttpException {
//        // 1. 멘토링 상태 ACCEPT -> ACTIVATE
//        Mentoring mentoring = mentoringRepository.findById(mentoringSeq).get();
//        mentoring.changeMentoringState(MentoringState.ACTIVATE);
//
//        // 2. 세션 생성
//        OpenViduRole openViduRole = OpenViduRole.PUBLISHER; // 나중에 MODERATOR 로 변경도 해보기
//        String teamName = mentoring.getTeam().getTeamName();
//        Mentor mentor = mentoring.getMentor();
//        String serverData = "{\"serverData\": \"" + mentor.getUser().getUserId() + "\"}";
//
//        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(openViduRole).build();
//
//        Session session = this.openVidu.createSession();
//        String token = session.createConnection(connectionProperties).getToken();
//
//        this.sessionMap.put(mentoringSeq, session);
//        this.sessionNamesTokensMap.put(mentoringSeq, new ConcurrentHashMap<>());
//        this.sessionNamesTokensMap.get(mentoringSeq).put(token, openViduRole);
//
//        return ResponseEntity.status(200).body(SessionJoinResponseDto.builder()
//                .userRole(mentor.getUser().getUserRole())
//                .openViduRole(openViduRole)
//                .teamName(teamName)
//                .token(token)
//                .userId(mentor.getUser().getUserId())
//                .userSeq(mentor.getMentorSeq())
//                .build());
//    }

    @PostMapping("/join")
    public ResponseEntity<SessionJoinResponseDto> joinSession(@RequestBody SessionJoinRequestDto requestDto) throws OpenViduJavaClientException, OpenViduHttpException {
        // 세션 일련번호
        int sessionSeq = requestDto.getSessionSeq();
        // 세션명
        String sessionName = requestDto.getSessionName();
        // 화상회의 참여시 사용자 역할
        OpenViduRole userRole = requestDto.getUserRole().equals(UserRole.MENTOR) ? OpenViduRole.PUBLISHER : OpenViduRole.SUBSCRIBER;
        // 사용자가 video-call 에 연결하면 다른 사용자에게 전달되어지는 선택적인 데이터 : 일단, userId로 지정
        String serverData = "{\"serverData\": \"" + requestDto.getUserId() + "\"}";

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(userRole).build();

        /* case1: 세션이 이미 존재하는 경우 */
        if (this.sessionMap.get(sessionSeq) != null) {
            // 가장 최근에 만들어진 connectionProperties 로 새로운 connection을 만든다.
            String token = this.sessionMap.get(sessionSeq).createConnection(connectionProperties).getToken();
            System.out.println("session already exists token = " + token);

            this.sessionNamesTokensMap.get(sessionSeq).put(token, userRole);

            return ResponseEntity.status(200).body(new SessionJoinResponseDto(token, userRole));
        }

        /* case2: 새로운 세션을 만들어야하는 경우 */
        Session session = this.openVidu.createSession();
        String token = session.createConnection(connectionProperties).getToken();
        System.out.println("new session token = " + token);

        this.sessionMap.put(sessionSeq, session);
        this.sessionNamesTokensMap.put(sessionSeq, new ConcurrentHashMap<>());
        this.sessionNamesTokensMap.get(sessionSeq).put(token, userRole);

        return ResponseEntity.status(200).body(new SessionJoinResponseDto(token, userRole));
    }
}

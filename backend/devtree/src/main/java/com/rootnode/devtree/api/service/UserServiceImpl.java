package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.api.request.UserUpdateRequestDto;
import com.rootnode.devtree.api.response.UserDetailResponseDto;
import com.rootnode.devtree.db.entity.Tech;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.UserRole;
import com.rootnode.devtree.db.entity.UserTech;
import com.rootnode.devtree.db.entity.compositeKey.UserTechId;
import com.rootnode.devtree.db.repository.TechRepository;
import com.rootnode.devtree.db.repository.UserRepository;
import com.rootnode.devtree.db.repository.UserTechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
//
//    @Autowired
//    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = User.builder()
                .userId(userRegisterInfo.getUser_id())
                // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
                .user_password(passwordEncoder.encode(userRegisterInfo.getUser_password()))
                .userName(userRegisterInfo.getUser_name())
                .userEmail(userRegisterInfo.getUser_email())
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
    public void UpdateUser(Long userSeq,UserUpdateRequestDto userUpdateRequestDto) {

        Optional<User>Ouser = userRepository.findByUserSeq(userSeq);
//이름 닉네임 설명 테크
        if(Ouser.isPresent()){
            Tech tech;
            User user= Ouser.get();

            //기존 유저 + 새로운 유저 정보
            //빌더패턴으로 새로운 필드만 변경 가능?
            //setter를 사용하면 ?
            /*
                  private String user_name;
                  private String user_nickname;
                  private String user_desc;
                  private List<Long> user_tech;
             */
            user = User.builder()
                    .userSeq(user.getUserSeq())
                    .userId(user.getUserId())
                    .user_password(user.getUser_password())
                    .userEmail(user.getUserEmail())
                    .userRole(user.getUserRole())
                    .userDesc(userUpdateRequestDto.getUser_desc())
                    .userName(userUpdateRequestDto.getUser_name())
                    .userNickname(userUpdateRequestDto.getUser_nickname())
                    .build();
            userRepository.save(user);

            //기술 스택 관련 정보(사용자 기술스택)먼저  save 해야한다.
            for (Long t : userUpdateRequestDto.getUser_tech()){
                System.out.println(t);
                /**
                 * user와 tech를 먼저 넣어준뒤 UserTech를 넣어주자
                 * 왜 구현을 이렇게 해야했는지 관계가 이렇게 되엇는지 (다대다) 알 수 있는 부분
                 * tech가 null이어도 되는 이유..
                 */
                userTechRepository.save(new UserTech(new UserTechId(user.getUserSeq(),t),null,null));
            }



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


}

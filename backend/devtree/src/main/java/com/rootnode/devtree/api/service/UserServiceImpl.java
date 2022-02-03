package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.UserRegisterPostReq;
import com.rootnode.devtree.common.auth.UserDetailService;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.UserRole;
import com.rootnode.devtree.db.repository.UserRepository;
import com.rootnode.devtree.db.repository.UserRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
//		일반 회원가입을 하면 role user 권한으로 init 해놓음 어찌될지 모르겟음
        User user = User.builder()
                .userId(userRegisterInfo.getUser_id())
                // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
                .user_password(passwordEncoder.encode(userRegisterInfo.getUser_password()))
                .user_name(userRegisterInfo.getUser_name())
                .user_email(userRegisterInfo.getUser_email())
                .user_role(UserRole.USER)
                .build();
        return userRepository.save(user);
    }

    @Override
    public User getUserByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        Optional<User> user = userRepository.findByUserId(userId);
//		존재하지 않으면 null
        if (!user.isPresent()) return null;
        return user.get();
    }
}

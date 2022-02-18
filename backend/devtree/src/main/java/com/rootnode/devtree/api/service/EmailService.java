package com.rootnode.devtree.api.service;
import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.rootnode.devtree.api.request.EmailRequestDto;
import com.rootnode.devtree.api.response.CommonResponseDto;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class EmailService {
    private final UserRepository userRepository;

    @Autowired
    JavaMailSender emailSender;

    public static final String ePw = createKey();

    private MimeMessage createMessage(String userEmail) throws Exception{
        System.out.println("보내는 대상 : " + userEmail);
        System.out.println("인증 번호 : " + ePw);
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, userEmail);//보내는 대상
        message.setSubject("🌳devtree 멘토 인증 코드가 도착했습니다.");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요! devtree입니다!!! </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 멘토 인증 코드 입력 창에 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>멘토 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");
        message.setFrom(new InternetAddress("ssny1219@gmail.com","devtree"));//보내는 사람

        return message;
    }

    // 인증코드
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    @Transactional
    public CommonResponseDto sendSimpleMessage(User user, EmailRequestDto requestDto)throws Exception {
        // 사용자가 입력한 아이디
        String userId = requestDto.getUserEmailId();
        // 사용자가 선택한 도메인
        String userDomain = requestDto.getUserEmailDomain().getAddress();
        // 전체 이메일 만들기
        String userEmail = userId + "@" + userDomain;

        MimeMessage message = createMessage(userEmail);
        try{
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        System.out.println("user.getUserId() = " + user.getUserId());
        System.out.println("ePw = " + ePw);
        userRepository.updateVerificationCodeByUserSeq(user.getUserSeq(), ePw);
//        user.changeVerificationCode(ePw);
        return new CommonResponseDto(200, "멘토 인증 코드를 전송하였습니다.");
    }
}
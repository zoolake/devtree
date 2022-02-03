package com.rootnode.devtree.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

/**
 * 유저 모델 정의.
 */
@Table(name = "tb_user")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_seq;
    @Column(nullable = false)
    private String user_name;
    @Column(nullable = false)
    private String user_email;
    @Column(nullable = false)
    String user_id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole user_role;
    private String user_desc;
    private String user_nickname;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String user_password;
}
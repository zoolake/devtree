package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_mentor_authentication")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorAuthentication {
    @Id
    private Long user_seq;

    private String mentor_company_email;
    private String mentor_documentation;

    @OneToOne
    @MapsId("user_seq")
    @JoinColumn(name = "user_seq", unique = true)
    private User user;
}

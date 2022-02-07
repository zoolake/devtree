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
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "mentor_company_email")
    private String mentorCompanyEmail;

    @Column(name = "mentor_documentation")
    private String mentorDocumentation;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId("userSeq")
    @JoinColumn(name = "user_seq", unique = true)
    private User user;
}

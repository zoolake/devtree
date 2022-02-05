package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.UserTechId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_user_tech")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTech {

    @EmbeddedId
    private UserTechId userTechId;

    @ManyToOne
    @MapsId("user_seq")
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne
    @MapsId("tech_seq")
    @JoinColumn(name = "tech_seq")
    private Tech tech;

}

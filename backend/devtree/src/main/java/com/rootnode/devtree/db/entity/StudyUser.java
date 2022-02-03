package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.StudyUserId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "tb_study_user")
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyUser {
    @EmbeddedId
    private StudyUserId studyUserId;

//    @ManyToOne
}

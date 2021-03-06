package com.rootnode.devtree.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_tech")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tech {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tech_seq")
    private Long techSeq;

    @Column(name = "tech_name")
    private String techName;
    @Column(name = "tech_image")
    private String techImage;
}


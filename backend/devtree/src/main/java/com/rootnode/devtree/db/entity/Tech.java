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
    private Long tech_seq;
    private String tech_name;
    private String tech_image;

}

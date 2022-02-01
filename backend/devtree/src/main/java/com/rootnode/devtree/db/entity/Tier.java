package com.rootnode.devtree.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_tier")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tier_seq;
    private String tier_name;
    private String tier_icon;
    private Long tier_min_exp;
    private Long tier_max_exp;
}

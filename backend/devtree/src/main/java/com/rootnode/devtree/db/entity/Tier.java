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
    @Column(name = "")
    private Long tierSeq;

    @Column(name = "tier_name")
    private String tierName;
    @Column(name = "tier_icon")
    private String tierIcon;
    @Column(name = "tier_min_exp")
    private Long tierMinExp;
    @Column(name = "tier_max_exp")
    private Long tierMaxExp;
}

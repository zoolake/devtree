package com.rootnode.devtree.db.entity;

import lombok.Getter;

@Getter
public enum EmailDomain {
    naver("naver.com"),
    google("gmail.com");

    private String address;

    EmailDomain(String address) {
        this.address = address;
    }
}

package com.rootnode.devtree;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DevtreeApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevtreeApplication.class, args);
	}

}

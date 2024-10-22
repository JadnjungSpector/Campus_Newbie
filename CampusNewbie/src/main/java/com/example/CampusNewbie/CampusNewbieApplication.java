package com.example.CampusNewbie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.CampusNewbie.Repo")
@EntityScan(basePackages = "com.example.CampusNewbie.Model")
public class CampusNewbieApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusNewbieApplication.class, args);
	}

}

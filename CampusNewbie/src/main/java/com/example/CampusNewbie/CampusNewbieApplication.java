package com.example.CampusNewbie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class CampusNewbieApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusNewbieApplication.class, args);
	}
}

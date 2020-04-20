package com.ns;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document

public class Student {

	@Id
	private long id;
	private String firstName;
	private String lastName;
	public Student() {

	}
	public Student(String title, String description) {
		this.firstName = title;
		this.lastName = description;

	}



}

package com.ns;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document

public class Student {

	@Id
	private String id;
	private String firstName;
	private String lastName;
	public Student() {

	}
	public Student(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;

	}



}

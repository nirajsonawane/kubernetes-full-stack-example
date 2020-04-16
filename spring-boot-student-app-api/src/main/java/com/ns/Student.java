package com.ns;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class Student {

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

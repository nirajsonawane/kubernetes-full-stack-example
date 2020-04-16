package com.ns;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Repository
public class StudentRepository {

    private List<Student> studentList = new ArrayList<>();


    public List<Student> findByFirstNameContaining(String title) {
        return studentList.stream()
                .filter(student -> student.getFirstName()
                        .contains(title))
                .collect(Collectors.toList());
    }

    public List<Student> getStudentList() {
        return studentList;
    }

    public Optional<Student> findById(long id) {
        return studentList.stream()
                .filter(student -> student.getId() == id)
                .findFirst();
    }

    public Student save(Student student) {
        student.setId(ThreadLocalRandom.current()
                .nextLong(0, 100));
        studentList.add(student);
        return student;
    }

    public Student update(Student student) {
        studentList.removeIf(student1 -> student.getId() == student1.getId());
        studentList.add(student);
        return student;
    }

    public void deleteAll() {
        studentList.clear();

    }

    public void deleteById(long id) {
        studentList.removeIf(student -> student.getId() == id);
    }
}

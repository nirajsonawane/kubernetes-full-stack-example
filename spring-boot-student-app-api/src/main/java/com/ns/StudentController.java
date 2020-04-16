package com.ns;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class StudentController {


    private final StudentRepository studentRepository;

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllTutorials(@RequestParam(required = false) String firstName) {
        try {
            List<Student> students = new ArrayList<Student>();

            if (firstName == null)
                students.addAll(studentRepository.getStudentList());
            else
                studentRepository.findByFirstNameContaining(firstName)
                        .forEach(students::add);

            if (students.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getTutorialById(@PathVariable("id") long id) {
        Optional<Student> tutorialData = studentRepository.findById(id);

        if (tutorialData.isPresent()) {
            return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/students")
    public ResponseEntity<Student> createTutorial(@RequestBody Student student) {
        try {
            Student _student = studentRepository
                    .save(new Student(student.getFirstName(), student.getLastName()));
            return new ResponseEntity<>(_student, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<Student> updateTutorial(@PathVariable("id") long id, @RequestBody Student student) {
        Optional<Student> tutorialData = studentRepository.findById(id);

        if (tutorialData.isPresent()) {
            Student _student = tutorialData.get();
            _student.setFirstName(student.getFirstName());
            _student.setLastName(student.getLastName());
            return new ResponseEntity<>(studentRepository.update(_student), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
        try {
            studentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping("/students")
    public ResponseEntity<HttpStatus> deleteAllTutorials() {
        try {
            studentRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }

    }

}

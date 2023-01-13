package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/showusers")
    public ModelAndView showAll() {
        return new ModelAndView("admin_main_page");
    }
    @PostMapping("/saveuser")
    public ResponseEntity saveUser(@RequestBody User user) {
        userService.save(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> findById(@PathVariable("id") long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity deleteById(@PathVariable("id") long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }
    @PatchMapping("/users/update")
    public ResponseEntity updateUser(@RequestBody User user) {
        userService.update(user);
        return ResponseEntity.ok().build();
    }
}

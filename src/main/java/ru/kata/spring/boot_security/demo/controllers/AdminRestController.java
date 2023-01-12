package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

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
    public String saveUser(@RequestBody User user) {
        System.out.println(user);
        userService.save(user);
        return "ok";
    }

    @GetMapping("/users")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public User findById(@PathVariable("id") long id) {
        return userService.findById(id);
    }

    @DeleteMapping("/users/{id}")
    public String deleteById(@PathVariable("id") long id) {
        userService.delete(id);
        return "ok";
    }
    @PatchMapping("/users/update")
    public String updateUser(@RequestBody User user) {
        System.out.println(user);
        userService.update(user);
        return "ok";
    }
}

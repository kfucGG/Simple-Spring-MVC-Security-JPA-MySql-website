package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;


    public AdminController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/users")
    public String showAll(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("princ", user);
        return "/admin_main_page";
    }

    @PostMapping("/saveuser")
    public String saveUserInDb(@ModelAttribute User user) {
        userService.save(user);
        return "redirect:/admin/users";
    }

    @DeleteMapping("/delete")
    public String deleteUser(@ModelAttribute User user) {
        userService.delete(user.getId());
        return "redirect:/admin/users";
    }

    @PatchMapping()
    public String updateUserInDb(@ModelAttribute User user) {
        userService.update(user);
        return "redirect:/admin/users";
    }
}

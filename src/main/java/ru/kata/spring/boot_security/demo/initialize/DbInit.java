package ru.kata.spring.boot_security.demo.initialize;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DbInit {

    private final UserService userService;

    @Autowired
    public DbInit(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void saveDefaultUsersInDb() {
        userService.save(createUser("root", "root", "ROLE_ADMIN", 22, "test@email.com"));
        userService.save(createUser("user", "user", "ROLE_USER", 33, "second@gmail.com"));
    }

    private User createUser(String name, String password, String roleName, int age, String email) {
        User user = new User();
        user.setName(name);
        user.setPassword(password);
        user.setUserRoles(Set.of(new Role(roleName)));
        user.setAge(age);
        user.setEmail(email);
        return user;
    }
}

package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface UserService {

    void save(User user);

    void update(User newUser);

    void delete(long id);

    List<User> findAll();

    User findById(long id);

    User findByName(String name);
}

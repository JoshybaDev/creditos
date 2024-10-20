/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service.impl;

import com.joshybadev.apicredmx.creditos.entities.User;
import com.joshybadev.apicredmx.creditos.persistance.IUserDAO;
import com.joshybadev.apicredmx.creditos.service.IUserService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JoshybaDev
 */
@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserDAO userDAO;

    @Override
    public List<User> findAll() {
        return userDAO.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userDAO.findById(id);
    }

    @Override
    public User save(User user) {
        return (User) userDAO.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userDAO.deleteById(id);
    }

    @Override
    public List<User> filter(String name) {
        return userDAO.filter(name);
    }

    @Override
    public long count() {
        return userDAO.count();
    }

    @Override
    public User findByUsername(String username) {
        return userDAO.findByUsername(username);
    }

}

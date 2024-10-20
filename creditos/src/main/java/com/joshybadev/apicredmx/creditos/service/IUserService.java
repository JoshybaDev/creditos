/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service;

import com.joshybadev.apicredmx.creditos.entities.User;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author JoshybaDev
 */
public interface IUserService {

    List<User> findAll();

    Optional<User> findById(Long id);

    User save(User user);

    void deleteById(Long id);

    List<User> filter(String name);

    long count();

    public User findByUsername(String username);
}

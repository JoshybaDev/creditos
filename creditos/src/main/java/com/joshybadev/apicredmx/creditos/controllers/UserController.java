/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.UserDTO;
import com.joshybadev.apicredmx.creditos.service.IUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author JoshybaDev
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private IUserService userService;
    
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<UserDTO> userList = userService.findAll()
                .stream()
                .map(user -> UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .roles(user.getRoles())
                .build()).toList();
        return ResponseEntity.ok(userList);
    }    
}

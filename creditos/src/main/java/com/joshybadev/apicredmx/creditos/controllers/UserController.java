/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.UserDTO;
import com.joshybadev.apicredmx.creditos.entities.User;
import com.joshybadev.apicredmx.creditos.service.IUserService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .username(user.getUsername())
                    .iperfil(user.getIperfil())
                    .createdOn(user.getCreatedOn())
                    .lastUpdatedOn(user.getLastUpdatedOn())
                    .roles(user.getRoles())
                    .build();
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.notFound().build();
    }    
    
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<UserDTO> userList = userService.findAll()
                .stream()
                .map(user -> UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .iperfil(user.getIperfil())
                .roles(user.getRoles())
                .build()).toList();
        return ResponseEntity.ok(userList);
    }  
    
    @GetMapping("/count")
    public ResponseEntity<?> count() {
        Long count = userService.count();
        return ResponseEntity.ok(count);
    }
    
}

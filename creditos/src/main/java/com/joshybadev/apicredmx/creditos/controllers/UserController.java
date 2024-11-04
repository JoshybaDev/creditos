/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.ResponseDTO;
import com.joshybadev.apicredmx.creditos.controllers.dto.UserDTO;
import com.joshybadev.apicredmx.creditos.entities.User;
import com.joshybadev.apicredmx.creditos.service.IUserService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/filter")
    public ResponseEntity<?> filter(@RequestBody UserDTO userDTO) {
        List<UserDTO> userList = userService.filter(userDTO.getName())
                .stream()
                .map(user -> UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .iperfil(user.getIperfil())
                //.password(user.getPassword())
                .createdOn(user.getCreatedOn())
                .lastUpdatedOn(user.getLastUpdatedOn())
                .build()).toList();
        return ResponseEntity.ok(userList);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody UserDTO userDTO) {
        System.out.println("========================> " + "User -> Save");
        System.out.println("========================> " + userDTO);
        if (userDTO.getName().isBlank() || userDTO.getUsername().isBlank() || userDTO.getIperfil().isBlank() || userDTO.getPassword().isBlank() || userDTO.getPassword2().isBlank()) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder()
                                .msg("Parametros incompletos")
                                .code(400)
                                .status("error").build());
        }
        if (!userDTO.getPassword().equals(userDTO.getPassword2())) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder()
                                .msg("Las contraseñas no son iguales")
                                .code(400)
                                .status("error").build());
        }

        BCryptPasswordEncoder bcryp = new BCryptPasswordEncoder();

        User user = User.builder()
                .name(userDTO.getName())
                .username(userDTO.getUsername())
                .iperfil(userDTO.getIperfil())
                .password(bcryp.encode(userDTO.getPassword()))
                .roles(userDTO.getRoles())
                .build();
        User userSaved = userService.save(user);
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(
                ResponseDTO.builder()
                        .msg("Usuario Guardado correctamente")
                        .code(201)
                        .redirect("dashboard/users")
                        .status("ok").build()
        );        
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(userDTO.getName());
            user.setRoles(userDTO.getRoles());
            userService.save(user);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Usuario Actualizado correctamente")
                            .code(200)
                            .status("ok").build());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("photo/{id}")
    public ResponseEntity<?> updateUserPhoto(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setIperfil(userDTO.getIperfil());
            userService.save(user);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Foto de Usuario Actualizado correctamente")
                            .code(200)
                            .status("ok").build());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("pass/{id}")
    public ResponseEntity<?> updateUserPass(@PathVariable Long id, @RequestBody UserDTO userDTO) {

        if (!userDTO.getPassword().equals(userDTO.getPassword2())) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder()
                    .msg("Las contraseñas son diferentes")
                    .code(400)
                    .status("error").build());

        }
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            BCryptPasswordEncoder bcryp = new BCryptPasswordEncoder();
            User user = userOptional.get();

            if (!bcryp.matches(userDTO.getPasswordA(), user.getPassword())) {
                return ResponseEntity.ok(
                        ResponseDTO.builder()
                                .msg("La contraseña es incorrecta")
                                .code(400)
                                .status("error").build());
            }

            user.setPassword(bcryp.encode(userDTO.getPassword()));
            userService.save(user);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Password de Usuario Actualizado correctamente")
                            .code(200)
                            .status("ok").build());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        if (id != null) {
            userService.deleteById(id);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Usuario Eliminado con éxito")
                            .code(200)
                            .status("ok")
                            .redirect("dashboard/users")
                            .build());
        }
        return ResponseEntity.badRequest().build();
    }
}

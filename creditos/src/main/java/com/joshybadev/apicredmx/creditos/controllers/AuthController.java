/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.AuthRequestDTO;
import com.joshybadev.apicredmx.creditos.controllers.dto.JwtResponseDTO;
import com.joshybadev.apicredmx.creditos.controllers.dto.ResponseDTO;
import com.joshybadev.apicredmx.creditos.entities.User;
import com.joshybadev.apicredmx.creditos.security.JwtService;
import com.joshybadev.apicredmx.creditos.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author JoshybaDev
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    JwtService jwtService;
    

    @Autowired
    IUserService userService;    

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
            if (authentication.isAuthenticated()) {

                User user = userService.findByUsername(authRequestDTO.getUsername());

                return ResponseEntity.ok(JwtResponseDTO.builder()
                        .accessToken(jwtService.GenerateToken(authRequestDTO.getUsername()))
                        .msg("Datos correctos")
                        .code(200)
                        .status("ok")
                        .redirect("dashboard/users")
                        .roles(user.getRoles())
                        .name(user.getName())
                        .build());
            } else {
                throw new UsernameNotFoundException("invalid user request..!!");
            }
        } catch (Exception e) {
            System.out.println("error login");
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDTO.builder()
                    .msg("Usuario o contraseña incorrecta")
                    .code(400)
                    .status("error").build());
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/ping")
    public String test() {
        try {
            return "Welcome";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

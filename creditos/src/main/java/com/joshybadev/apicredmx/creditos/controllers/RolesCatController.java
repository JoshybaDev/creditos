/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.RolesCatDTO;
import com.joshybadev.apicredmx.creditos.service.IRolesCatService;
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
@RequestMapping("/api/v1/roles")
public class RolesCatController {

    @Autowired
    private IUserService userService;

    @Autowired
    private IRolesCatService rolService;

    @GetMapping
    public ResponseEntity<?> roles() {
        List<RolesCatDTO> rolList = rolService.findAll()
                .stream()
                .map(rol -> RolesCatDTO.builder()
                .id(rol.getId())
                .name(rol.getName())
                .build()).toList();
        return ResponseEntity.ok(rolList);
    }
}

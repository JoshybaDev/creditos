/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers.dto;

import com.joshybadev.apicredmx.creditos.entities.Rol;
import java.time.Instant;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author JoshybaDev
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String name;
    private String username;
    private String passwordA;
    //@JsonIgnore
    private String password;
    //@JsonIgnore
    private String password2;
    private String iperfil;
    private Instant  createdOn;
    private Instant  lastUpdatedOn;
    private Set<Rol> roles;
}

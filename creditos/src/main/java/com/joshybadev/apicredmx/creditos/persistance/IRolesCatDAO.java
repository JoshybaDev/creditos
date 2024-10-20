/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.persistance;

import com.joshybadev.apicredmx.creditos.entities.RolesCat;
import java.util.List;

/**
 *
 * @author JoshybaDev
 */
public interface IRolesCatDAO {

    List<RolesCat> findAll();

    RolesCat save(RolesCat rolesCat);
}
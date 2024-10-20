/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.persistance.Impl;

import com.joshybadev.apicredmx.creditos.entities.RolesCat;
import com.joshybadev.apicredmx.creditos.persistance.IRolesCatDAO;
import com.joshybadev.apicredmx.creditos.repository.IRolesCatRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author JoshybaDev
 */
@Component
public class RolesCatDAOImpl implements IRolesCatDAO {

    @Autowired
    private IRolesCatRepository rolesCatRepository;

    @Override
    public List<RolesCat> findAll() {
        return (List<RolesCat>) rolesCatRepository.findAll();
    }

    @Override
    public RolesCat save(RolesCat rolesCat) {
        return rolesCatRepository.save(rolesCat);
    }

}

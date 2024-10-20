/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service.impl;

import com.joshybadev.apicredmx.creditos.entities.RolesCat;
import com.joshybadev.apicredmx.creditos.persistance.IRolesCatDAO;
import com.joshybadev.apicredmx.creditos.service.IRolesCatService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JoshybaDev
 */
@Service
public class RolesCatServiceImpl implements IRolesCatService {

    @Autowired
    private IRolesCatDAO rolesCatDAO;

    @Override
    public List<RolesCat> findAll() {
        return rolesCatDAO.findAll();
    }

    @Override
    public RolesCat save(RolesCat rolesCat) {
        return (RolesCat)rolesCatDAO.save(rolesCat);
    }

}

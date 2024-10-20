/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service.impl;

import com.joshybadev.apicredmx.creditos.entities.Rol;
import com.joshybadev.apicredmx.creditos.persistance.IRolDAO;
import com.joshybadev.apicredmx.creditos.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JoshybaDev
 */
@Service
public class RolServiceImpl implements IRolService {

    @Autowired
    private IRolDAO rolDAO;

    @Override
    public Rol save(Rol rol) {
        return (Rol)rolDAO.save(rol);
    }

}

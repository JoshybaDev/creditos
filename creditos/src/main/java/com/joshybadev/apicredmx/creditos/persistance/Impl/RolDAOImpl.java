/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.persistance.Impl;

import com.joshybadev.apicredmx.creditos.entities.Rol;
import com.joshybadev.apicredmx.creditos.persistance.IRolDAO;
import com.joshybadev.apicredmx.creditos.repository.IRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author JoshybaDev
 */
@Component
public class RolDAOImpl implements IRolDAO {

    @Autowired
    private IRolRepository rolRepository;

    @Override
    public Rol save(Rol rol) {
        return rolRepository.save(rol);
    }

}

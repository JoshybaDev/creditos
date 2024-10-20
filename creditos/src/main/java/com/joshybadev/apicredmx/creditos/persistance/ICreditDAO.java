/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.persistance;

import com.joshybadev.apicredmx.creditos.entities.Credit;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author JoshybaDev
 */
public interface ICreditDAO {

    List<Credit> findAll();

    Optional<Credit> findById(Long id);

    Credit save(Credit credit);

    void deleteById(Long id);

    long count();
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service;

import com.joshybadev.apicredmx.creditos.entities.Fee;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author JoshybaDev
 */
public interface IFeeService {

    List<Fee> findAll();

    Optional<Fee> findById(Long id);

    Fee save(Fee fee);

    void deleteById(Long id);

    long count();
    
    List<Fee> findByCredit_id(Long credit_id);
}

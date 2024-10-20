/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.persistance.Impl;

import com.joshybadev.apicredmx.creditos.entities.Credit;
import com.joshybadev.apicredmx.creditos.persistance.ICreditDAO;
import com.joshybadev.apicredmx.creditos.repository.ICreditRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author JoshybaDev
 */
@Component
public class CreditDAOImpl implements ICreditDAO{
    
    @Autowired
    private ICreditRepository creditRepository;

    @Override
    public List<Credit> findAll() {
        return (List<Credit>) creditRepository.findAll();
    }

    @Override
    public Optional<Credit> findById(Long id) {
        return creditRepository.findById(id);
    }

    @Override
    public Credit save(Credit credit) {
        return creditRepository.save(credit);
    }

    @Override
    public void deleteById(Long id) {
        creditRepository.deleteById(id);
    }

    @Override
    public long count() {
        return creditRepository.count();
    }

}

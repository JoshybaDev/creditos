/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service.impl;

import com.joshybadev.apicredmx.creditos.entities.Credit;
import com.joshybadev.apicredmx.creditos.persistance.ICreditDAO;
import com.joshybadev.apicredmx.creditos.service.ICreditService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author JoshybaDev
 */
@Service
public class CreditServiceImpl implements ICreditService {

    @Autowired
    private ICreditDAO creditADO;

    @Override
    @Transactional(readOnly = true)
    public List<Credit> findAll() {
        return creditADO.findAll();
    }

    @Override
    public Optional<Credit> findById(Long id) {
        return creditADO.findById(id);
    }

    @Override
    public Credit save(Credit credit) {
        return (Credit) creditADO.save(credit);
    }

    @Override
    public void deleteById(Long id) {
        creditADO.deleteById(id);
    }

    @Override
    public long count() {
        return creditADO.count();
    }

}

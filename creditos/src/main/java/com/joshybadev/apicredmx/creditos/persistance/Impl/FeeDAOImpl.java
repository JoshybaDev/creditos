/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.persistance.Impl;

import com.joshybadev.apicredmx.creditos.entities.Fee;
import com.joshybadev.apicredmx.creditos.persistance.IFeeDAO;
import com.joshybadev.apicredmx.creditos.repository.IFeeRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author JoshybaDev
 */
@Component
public class FeeDAOImpl implements IFeeDAO {

    @Autowired
    private IFeeRepository feeRepository;

    @Override
    public List<Fee> findAll() {
        return (List<Fee>) feeRepository.findAll();
    }

    @Override
    public Optional<Fee> findById(Long id) {
        return feeRepository.findById(id);
    }

    @Override
    public Fee save(Fee fee) {
        return feeRepository.save(fee);
    }

    @Override
    public void deleteById(Long id) {
        feeRepository.deleteById(id);
    }

    @Override
    public long count() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}

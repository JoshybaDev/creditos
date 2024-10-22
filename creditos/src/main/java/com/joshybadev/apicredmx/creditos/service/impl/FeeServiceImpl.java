/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service.impl;

import com.joshybadev.apicredmx.creditos.entities.Fee;
import com.joshybadev.apicredmx.creditos.persistance.IFeeDAO;
import com.joshybadev.apicredmx.creditos.service.IFeeService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JoshybaDev
 */
@Service
public class FeeServiceImpl implements IFeeService {

    @Autowired
    private IFeeDAO feeDAO;

    @Override
    public List<Fee> findAll() {
        return feeDAO.findAll();
    }

    @Override
    public Optional<Fee> findById(Long id) {
        return feeDAO.findById(id);
    }

    @Override
    public Fee save(Fee fee) {
        return (Fee) feeDAO.save(fee);
    }

    @Override
    public void deleteById(Long id) {
        feeDAO.deleteById(id);
    }

    @Override
    public long count() {
        return feeDAO.count();
    }

    @Override
    public List<Fee> findByCredit_id(Long credit_id) {
        return feeDAO.findByCredit_id(credit_id);
    }

}

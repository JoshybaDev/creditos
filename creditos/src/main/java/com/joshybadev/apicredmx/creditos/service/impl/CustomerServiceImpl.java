/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.service.impl;

import com.joshybadev.apicredmx.creditos.entities.Customer;
import com.joshybadev.apicredmx.creditos.persistance.ICustomerDAO;
import com.joshybadev.apicredmx.creditos.service.ICustomerService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JoshybaDev
 */
@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private ICustomerDAO customerDAO;

    @Override
    public List<Customer> findAll() {
        return customerDAO.findAll();
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return customerDAO.findById(id);
    }

    @Override
    public Customer save(Customer customer) {
        return (Customer) customerDAO.save(customer);
    }

    @Override
    public void deleteById(Long id) {
        customerDAO.deleteById(id);
    }

    @Override
    public long count() {
        return customerDAO.count();
    }

}

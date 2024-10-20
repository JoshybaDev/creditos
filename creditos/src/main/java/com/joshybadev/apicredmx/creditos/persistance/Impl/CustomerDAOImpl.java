/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.persistance.Impl;

import com.joshybadev.apicredmx.creditos.entities.Customer;
import com.joshybadev.apicredmx.creditos.persistance.ICustomerDAO;
import com.joshybadev.apicredmx.creditos.repository.ICustomerRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author JoshybaDev
 */
@Component
public class CustomerDAOImpl implements ICustomerDAO {

    @Autowired
    private ICustomerRepository CustomerRepository;

    @Override
    public List<Customer> findAll() {
        return (List<Customer>) CustomerRepository.findAll();
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return CustomerRepository.findById(id);
    }

    @Override
    public Customer save(Customer customer) {
        return CustomerRepository.save(customer);
    }

    @Override
    public void deleteById(Long id) {
        CustomerRepository.deleteById(id);
    }

    @Override
    public long count() {
        return CustomerRepository.count();
    }

}

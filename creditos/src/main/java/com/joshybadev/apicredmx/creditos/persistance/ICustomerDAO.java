/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.persistance;

import com.joshybadev.apicredmx.creditos.entities.Customer;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author JoshybaDev
 */
public interface ICustomerDAO {

    List<Customer> findAll();

    Optional<Customer> findById(Long id);

    Customer save(Customer customer);

    void deleteById(Long id);

    long count();
}

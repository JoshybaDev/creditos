/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.repository;

import com.joshybadev.apicredmx.creditos.entities.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author JoshybaDev
 */
@Repository
public interface ICustomerRepository extends CrudRepository<Customer, Long> {

}

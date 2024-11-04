/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.CustomerDTO;
import com.joshybadev.apicredmx.creditos.controllers.dto.ResponseDTO;
import com.joshybadev.apicredmx.creditos.entities.Customer;
import com.joshybadev.apicredmx.creditos.service.ICustomerService;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author JoshybaDev
 */
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    
    @Autowired
    private ICustomerService customerService;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Customer> userOptional = customerService.findById(id);
        if (userOptional.isPresent()) {
            Customer customer = userOptional.get();
            CustomerDTO userDTO = CustomerDTO.builder()
                    .id(customer.getId())
                    .name(customer.getName())
                    .lastName(customer.getLastName())
                    .tradeName(customer.getTradeName())
                    .type(customer.getType())
                    .rfc(customer.getRfc())
                    .email(customer.getEmail())
                    .phone(customer.getPhone())
                    .active(customer.getActive())
                    .createdOn(customer.getCreatedOn())
                    .build();
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<CustomerDTO> userList = customerService.findAll()
                .stream()
                .map(customer -> CustomerDTO.builder()
                .id(customer.getId())
                .name(customer.getName())
                .lastName(customer.getLastName())
                .tradeName(customer.getTradeName())
                .createdOn(customer.getCreatedOn())
                .type(customer.getType())
                .rfc(customer.getRfc())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .active(customer.getActive())
                .build()).toList();
        return ResponseEntity.ok(userList);
    }
    
    @GetMapping("/count")
    public ResponseEntity<?> count() {
        Long count = customerService.count();
        return ResponseEntity.ok(count);
    }
    
    @PostMapping
    public ResponseEntity<?> save(@RequestBody CustomerDTO customerDTO) {
        try {
            if (customerDTO.getName().isBlank()
                    || customerDTO.getLastName().isBlank()
                    //|| customerDTO.getTradeName().isBlank() 
                    || customerDTO.getType().isBlank()
                    || customerDTO.getRfc().isBlank()
                    || customerDTO.getEmail().isBlank()
                    || customerDTO.getPhone().isBlank()) {
                return ResponseEntity.badRequest().body("Parametros inválidos");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Parametros inválidos");
        }
        
        Customer customer = Customer.builder()
                .name(customerDTO.getName().toUpperCase())
                .lastName(customerDTO.getLastName().toUpperCase())
                .tradeName(customerDTO.getTradeName().toUpperCase())
                .type(customerDTO.getType())
                .rfc(customerDTO.getRfc().toUpperCase())
                .email(customerDTO.getEmail())
                .phone(customerDTO.getPhone())
                .active(Boolean.TRUE)
                .build();
        
        Customer xCustomer = customerService.save(customer);
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(
                ResponseDTO.builder()
                        .msg("Cliente Guardado correctamente")
                        .code(201)
                        .redirect("dashboard/customers")
                        .status("ok").build()
        );
        //return ResponseEntity.created(URI.create("/customers/" + xCustomer.getId())).build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO) {
        Optional<Customer> customerOptional = customerService.findById(id);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            if (customerDTO.getName() != null) {
                customer.setName(customerDTO.getName());
            }
            if (customerDTO.getLastName() != null) {
                customer.setLastName(customerDTO.getLastName());
            }
            if (customerDTO.getTradeName() != null) {
                customer.setTradeName(customerDTO.getTradeName());
            }
            if (customerDTO.getType() != null) {
                customer.setType(customerDTO.getType());
            }
            if (customerDTO.getRfc() != null) {
                customer.setRfc(customerDTO.getRfc());
            }
            if (customerDTO.getEmail() != null) {
                customer.setEmail(customerDTO.getEmail());
            }
            if (customerDTO.getPhone() != null) {
                customer.setPhone(customerDTO.getPhone());
            }
            customerService.save(customer);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Cliente Actualizado correctamente")
                            .code(200)
                            .status("ok").build());
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        if (id != null) {
            customerService.deleteById(id);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Cliente Eliminado con éxito")
                            .code(200)
                            .status("ok")
                            .redirect("dashboard/users")
                            .build());
        }
        return ResponseEntity.badRequest().build();
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.CreditDTO;
import com.joshybadev.apicredmx.creditos.controllers.dto.CustomerDTO;
import com.joshybadev.apicredmx.creditos.controllers.dto.ResponseDTO;
import com.joshybadev.apicredmx.creditos.entities.Credit;
import com.joshybadev.apicredmx.creditos.entities.Customer;
import com.joshybadev.apicredmx.creditos.service.ICreditService;
import com.joshybadev.apicredmx.creditos.service.ICustomerService;
import java.net.URI;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/v1/credits")
public class CreditController {

    @Autowired
    private ICreditService creditService;

    @Autowired
    private ICustomerService customerService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Credit> userOptional = creditService.findById(id);
        if (userOptional.isPresent()) {
            Credit credit = userOptional.get();
            CreditDTO userDTO = CreditDTO.builder()
                    .createdOn(credit.getCreatedOn())
                    .autorizedOn(credit.getAutorizedOn())
                    .ministratedOn(credit.getMinistratedOn())
                    .cancelledOn(credit.getCancelledOn())
                    .status(credit.getStatus())
                    .mount(credit.getMount())
                    .percentej_inte(credit.getPercentej_inte())
                    .percentej_mora(credit.getPercentej_mora())
                    .periodo(credit.getPeriodo())
                    .numcuotas(credit.getNumcuotas())
                    .plazomensual(credit.getPlazomensual())
                    //.customer(credit.getCustomer())
                    .build();
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<CreditDTO> userList = creditService.findAll()
                .stream()
                .map(credit -> CreditDTO.builder()
                .id(credit.getId())
                .createdOn(credit.getCreatedOn())
                .autorizedOn(credit.getAutorizedOn())
                .ministratedOn(credit.getMinistratedOn())
                .cancelledOn(credit.getCancelledOn())
                .status(credit.getStatus())
                .mount(credit.getMount())
                .percentej_inte(credit.getPercentej_inte())
                .percentej_mora(credit.getPercentej_mora())
                .periodo(credit.getPeriodo())
                .numcuotas(credit.getNumcuotas())
                .plazomensual(credit.getPlazomensual())
                .customer(credit.getCustomer())
                .build()).toList();
        return ResponseEntity.ok(userList);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody CreditDTO creditDTO) {
        try {
            if (creditDTO.getMount() <= 0
                    || creditDTO.getPercentej_inte() < 0
                    || creditDTO.getPercentej_mora() < 0
                    || creditDTO.getPeriodo().isBlank()
                    || creditDTO.getNumcuotas() <= 0
                    || creditDTO.getPlazomensual() <= 0) {
                return ResponseEntity.badRequest().body(ResponseDTO.builder()
                        .msg("Paramatros inválidos")
                        .code(400)
                        .status("error").build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder()
                    .msg("Paramatros inválidos")
                    .code(400)
                    .status("error").build());
        }
        //Revisamos que exista el cliente al que se le otorgara el credito.
        Optional<Customer> userOptional = customerService.findById(creditDTO.getCustomer().getId());
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder()
                    .msg("Cliente Inexistente")
                    .code(400)
                    .status("error").build());
        }

        Credit credit = Credit.builder()
                .mount(creditDTO.getMount())
                .percentej_inte(creditDTO.getPercentej_inte())
                .percentej_mora(creditDTO.getPercentej_inte())
                .periodo(creditDTO.getPeriodo())
                .numcuotas(creditDTO.getNumcuotas())
                .plazomensual(creditDTO.getPlazomensual())
                .calculoTipo("SI")
                .status("Creado")
                .customer(creditDTO.getCustomer())
                .build();

        Credit xCredit = creditService.save(credit);
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(
                ResponseDTO.builder()
                        .msg("Usuario Guardado correctamente")
                        .code(201)
                        .redirect("dashboard/credits")
                        .status("ok").build()
        );    
        //return ResponseEntity.created(URI.create("/credits/" + xCredit.getId())).build();
    }
    
    @GetMapping("/count")
    public ResponseEntity<?> count() {
        Long count = creditService.count();
        return ResponseEntity.ok(count);
    }    

    @PutMapping("/autorizar/{id}")
    public ResponseEntity<?> AutorizationCredit(@PathVariable Long id) {
        Optional<Credit> creditOptional = creditService.findById(id);
        if (creditOptional.isPresent()) {
            Credit credit = creditOptional.get();
            credit.setAutorizedOn(Instant.now());
            credit.setStatus("Autorizado");
            creditService.save(credit);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Credito Autorizado correctamente")
                            .code(200)
                            .status("ok").build());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/cancelar/{id}")
    public ResponseEntity<?> CancellationCredit(@PathVariable Long id) {
        Optional<Credit> creditOptional = creditService.findById(id);
        if (creditOptional.isPresent()) {
            Credit credit = creditOptional.get();
            credit.setCancelledOn(Instant.now());
            credit.setStatus("Cancelado");
            creditService.save(credit);
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Credito Cancelado correctamente")
                            .code(200)
                            .status("ok").build());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/ministrar/{id}")
    public ResponseEntity<?> MinistrationCredit(@PathVariable Long id) {
        Optional<Credit> creditOptional = creditService.findById(id);
        if (creditOptional.isPresent()) {
            Credit credit = creditOptional.get();
            credit.setMinistratedOn(Instant.now());
            credit.setStatus("Ministrado");
            creditService.save(credit);

            //Actualizar las fechas de las cuotas de acuerdo a la fecha de ministracion
            //Logica de actualizacion
            return ResponseEntity.ok(
                    ResponseDTO.builder()
                            .msg("Credito Ministrado correctamente")
                            .code(200)
                            .status("ok").build());
        }
        return ResponseEntity.notFound().build();
    }

}

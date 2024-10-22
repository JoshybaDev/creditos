/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.controllers.dto.FeeDTO;
import com.joshybadev.apicredmx.creditos.service.IFeeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author JoshybaDev
 */
@RestController
@RequestMapping("/api/v1/fees")
public class FeeController {

    @Autowired
    private IFeeService feeService;

    @GetMapping("/credit/{id}")
    public ResponseEntity<?> findByCredit_id(@PathVariable Long id) {
        List<FeeDTO> feeList = feeService.findByCredit_id(id)
                .stream()
                .map(fee -> FeeDTO.builder()
                .id(fee.getId())
                .numfee(fee.getNumfee())
                .datePay(fee.getDatePay())
                .capital(fee.getCapital())
                .interest(fee.getInterest())
                .iva(fee.getIva())
                .total(fee.getTotal())
                .deposited(fee.getDeposited())
                .balance(fee.getBalance())
                .paid(fee.getPaid())
                .build()).toList();
        return ResponseEntity.ok(feeList);
    }
}

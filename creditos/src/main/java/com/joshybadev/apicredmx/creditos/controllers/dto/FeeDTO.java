/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers.dto;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author JoshybaDev
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeeDTO {
    private Long id;
    private Integer numfee;
    private Instant datePay;
    private float capital;
    private float interest;
    private float iva;
    private float total;
    private float deposited;
    private float balance;
    private Boolean paid;
}

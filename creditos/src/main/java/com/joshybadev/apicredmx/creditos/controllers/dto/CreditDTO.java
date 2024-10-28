/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers.dto;

import com.joshybadev.apicredmx.creditos.entities.Customer;
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
public class CreditDTO {
    private Long id;
    private Instant createdOn;
    private Instant autorizedOn;
    private Instant ministratedOn;
    private Instant cancelledOn;
    private String status;
    private Long mount;
    private Long percentej_inte;
    private Long percentej_mora;
    private String periodo;
    private Integer numcuotas;
    private Long plazomensual;
}

package com.joshybadev.apicredmx.creditos.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author JoshybaDev
 */
@Setter
@Getter
@Builder(toBuilder = true)
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "credits")
public class Credit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    private Customer customer_id;
    @CreationTimestamp
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
    private Integer plazomensual;
    
}


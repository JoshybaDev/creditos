package com.joshybadev.apicredmx.creditos.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;
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
@Table(name = "customers")
public class Customer implements Serializable  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //Nombres
    private String name;
    //Apellidos
    private String lastName;
    //Nombre Comercial
    private String tradeName;
    //Fisica o Moral
    @Column(length = 1)
    private String type;
    //RFC
    private String rfc;
    //Correo
    private String email;
    //Telefono
    @Column(length = 10)
    private String phone;
    //Activo o Inactivo
    private Boolean active = true;
    @CreationTimestamp
    private Instant createdOn;    

    @JsonIgnore
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Credit> credits;

}

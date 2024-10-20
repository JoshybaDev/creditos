/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.joshybadev.apicredmx.creditos.repository;

import com.joshybadev.apicredmx.creditos.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author JoshybaDev
 */
@Repository
public interface IUserRepository extends CrudRepository<User, Long> {

    public User findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.name LIKE CONCAT('%',:first,'%')")
    List<User> filter(@Param("first") String name);
}

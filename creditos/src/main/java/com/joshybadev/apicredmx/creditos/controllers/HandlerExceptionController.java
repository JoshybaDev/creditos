/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.joshybadev.apicredmx.creditos.controllers;

import com.joshybadev.apicredmx.creditos.exceptions.CustomerNotFoundException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import com.joshybadev.apicredmx.creditos.models.Error;
import org.springframework.web.servlet.resource.NoResourceFoundException;

/**
 *
 * @author JoshybaDev
 */
@RestControllerAdvice
public class HandlerExceptionController {
    
    @ExceptionHandler({CustomerNotFoundException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> customerNotFoundException(Exception ex){

        Map<String, Object> error = new HashMap<>();
        error.put("date", new Date());
        error.put("error", "el cliente no existe!");
        error.put("message", ex.getMessage());
        error.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        return error;
    }
    
    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> bodyRequestNotFoundException(Exception ex){

        Map<String, Object> error = new HashMap<>();
        error.put("date", new Date());
        error.put("error", "Parametros inválidos!");
        //error.put("message", ex.getMessage());
        error.put("message","El request Body es requerido o está incompleto");
        error.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        return error;
    }   
    
    @ExceptionHandler({NoHandlerFoundException.class,NoResourceFoundException.class})
    public ResponseEntity<?> notFoundEx(Exception e) { 
        Error error = new Error();
        error.setDate(new Date());
        error.setError("EndPoint no encontrado");
        error.setMessage(e.getMessage());
        error.setStatus(HttpStatus.NOT_FOUND.value());
        return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(error);
    }    
}

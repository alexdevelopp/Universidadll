package org.example.controllers;

import org.example.clases.Profesor;
import org.example.dtos.profesor.CreateDtoProfesor;
import org.example.services.ProfesorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {
    private final ProfesorService profesorService;
    public ProfesorController(ProfesorService profesorService){
        super();
        this.profesorService = profesorService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(profesorService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        Profesor profesor = profesorService.find(id);
        if (profesor == null) {
            return new ResponseEntity<>("Profesor no encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(profesor, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateDtoProfesor createDtoProfesor){
        profesorService.add(new Profesor(createDtoProfesor.nombre(),createDtoProfesor.provincia()));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody CreateDtoProfesor createDtoProfesor){
        var profesor = profesorService.find(id);
        if(profesor == null)
            return new ResponseEntity<>("No se encontró el profesor.",HttpStatus.NOT_FOUND);
        profesor.setNombre(createDtoProfesor.nombre());
        profesorService.update(id,profesor);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        var profesor = profesorService.find(id);
        if(profesor == null)
            return new ResponseEntity<>("No se encontró el profesor.",HttpStatus.NOT_FOUND);
        profesorService.delete(profesor);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

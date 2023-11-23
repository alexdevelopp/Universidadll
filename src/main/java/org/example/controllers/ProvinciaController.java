package org.example.controllers;

import org.example.clases.Provincia;
import org.example.dtos.provincias.CreateDto;
import org.example.services.ProvinciaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("api/provincias")
public class ProvinciaController {

    private final ProvinciaService provinciaService;
    public ProvinciaController(ProvinciaService provinciaService){
        super();
        this.provinciaService = provinciaService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(provinciaService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        Provincia provincia = provinciaService.find(id);
        if (provincia == null) {
            return new ResponseEntity<>("Provincia no encontrada", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(provincia, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateDto createDto){
        provinciaService.add(new Provincia(createDto.nombre()));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody CreateDto dto){
        var provincia = provinciaService.find(id);
        if(provincia == null)
            return new ResponseEntity<>("No se encontró la provincia",HttpStatus.NOT_FOUND);
        provincia.setNombre(dto.nombre());
        provinciaService.update(id,provincia);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id){
        var provincia = provinciaService.find(id);
        if(provincia == null)
            return new ResponseEntity<>("No se encontró la provincia",HttpStatus.NOT_FOUND);
        provinciaService.delete(provincia);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

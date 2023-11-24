package org.example.controllers;

import org.example.clases.Departamento;
import org.example.dtos.departamento.CreateDtoDepartamento;
import org.example.services.DepartamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/departamentos")
public class DepartamentoController {

    private final DepartamentoService departamentoService;
    public DepartamentoController(DepartamentoService departamentoService){
        super();
        this.departamentoService = departamentoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(departamentoService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        Departamento departamento = departamentoService.find(id);
        if (departamento == null) {
            return new ResponseEntity<>("Departamento no encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(departamento, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateDtoDepartamento createDtoDepartamento){
        departamentoService.add(new Departamento(createDtoDepartamento.nombre()));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody CreateDtoDepartamento createDtoDepartamento){
        var departamento = departamentoService.find(id);
        if(departamento == null)
            return new ResponseEntity<>("No se encontró el departamento.",HttpStatus.NOT_FOUND);
        departamento.setNombre(createDtoDepartamento.nombre());
        departamentoService.update(id,departamento);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        var departamento = departamentoService.find(id);
        if(departamento == null)
            return new ResponseEntity<>("No se encontró el departamento.",HttpStatus.NOT_FOUND);
        departamentoService.delete(departamento);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

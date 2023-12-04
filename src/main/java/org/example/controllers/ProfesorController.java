package org.example.controllers;

import java.util.ArrayList;
import java.util.List;

import org.example.clases.Profesor;
import org.example.dtos.profesor.ProfesorDto;
import org.example.dtos.profesor.UpdateDtoProfesor;
import org.example.services.ProfesorService;
import org.example.services.ProvinciaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/profesores")
public class ProfesorController {
    private final ProfesorService profesorService;
    private final ProvinciaService provinciaService;
    public ProfesorController(ProfesorService profesorService,ProvinciaService provinciaService){
        super();
        this.profesorService = profesorService;
        this.provinciaService = provinciaService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        var profesores = profesorService.findAll();
        List<ProfesorDto> profesoresDto = new ArrayList<>();
        for (Profesor profesor : profesores) {
            var dto = new ProfesorDto(profesor.getId(),profesor.getNombre(),profesor.getProvincia());
            profesoresDto.add(dto);
        }
        return new ResponseEntity<>(profesoresDto, HttpStatus.OK);
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
    public ResponseEntity<?> create(@RequestBody UpdateDtoProfesor updateDtoProfesor){
        var provincia = provinciaService.find(updateDtoProfesor.provincia_id());
        profesorService.add(new Profesor(updateDtoProfesor.nombre(),provincia));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody UpdateDtoProfesor updateDtoProfesor){
        var profesor = profesorService.find(id);
        if(profesor == null)
            return new ResponseEntity<>("No se encontró el profesor.",HttpStatus.NOT_FOUND);
        profesor.setNombre(updateDtoProfesor.nombre());
        var provincia = provinciaService.find(updateDtoProfesor.provincia_id());
        profesor.setProvincia(provincia);
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

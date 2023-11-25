package org.example.controllers;

import org.example.clases.Asignatura;
import org.example.dtos.asignatura.CreateDtoAsignatura;
import org.example.services.AsignaturaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/asignaturas")
public class AsignaturaController {
    private final AsignaturaService asignaturaService;
    public AsignaturaController(AsignaturaService asignaturaService){
        super();
        this.asignaturaService = asignaturaService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(asignaturaService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        Asignatura asignatura = asignaturaService.find(id);
        if (asignatura == null) {
            return new ResponseEntity<>("Asignatura no encontrada", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(asignatura, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateDtoAsignatura createDtoAsignatura){
        asignaturaService.add(new Asignatura(createDtoAsignatura.nombre()));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody CreateDtoAsignatura createDtoAsignatura){
        var asignatura = asignaturaService.find(id);
        if(asignatura == null)
            return new ResponseEntity<>("No se encontró la asignatura.",HttpStatus.NOT_FOUND);
        asignatura.setNombre(createDtoAsignatura.nombre());
        asignaturaService.update(id,asignatura);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        var asignatura = asignaturaService.find(id);
        if(asignatura == null)
            return new ResponseEntity<>("No se encontró la asignatura.",HttpStatus.NOT_FOUND);
        asignaturaService.delete(asignatura);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

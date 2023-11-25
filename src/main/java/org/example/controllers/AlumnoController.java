package org.example.controllers;

import org.example.clases.Alumno;
import org.example.dtos.alumno.CreateDtoAlumno;
import org.example.services.AlumnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/alumnos")
public class AlumnoController {
    private final AlumnoService alumnoService;
    public AlumnoController(AlumnoService alumnoService){
        super();
        this.alumnoService = alumnoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(alumnoService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        Alumno alumno = alumnoService.find(id);
        if (alumno == null) {
            return new ResponseEntity<>("Alumno no encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(alumno, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateDtoAlumno createDtoAlumno){
        alumnoService.add(new Alumno(createDtoAlumno.nombre(),createDtoAlumno.curso()));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody CreateDtoAlumno createDtoAlumno){
        var alumno = alumnoService.find(id);
        if(alumno == null)
            return new ResponseEntity<>("No se encontró el alumno.",HttpStatus.NOT_FOUND);
        alumno.setNombre(createDtoAlumno.nombre());
        alumnoService.update(id,alumno);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        var alumno = alumnoService.find(id);
        if(alumno == null)
            return new ResponseEntity<>("No se encontró el alumno.",HttpStatus.NOT_FOUND);
        alumnoService.delete(alumno);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

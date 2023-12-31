package org.example.controllers;

import java.util.ArrayList;
import java.util.List;

import org.example.clases.Alumno;
import org.example.dtos.alumno.AlumnoDto;
import org.example.dtos.alumno.UpdateDtoAlumno;
import org.example.services.AlumnoService;
import org.example.services.CursoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/alumnos")
public class AlumnoController {
    private final AlumnoService alumnoService;
    private final CursoService cursoService;
    public AlumnoController(AlumnoService alumnoService,CursoService cursoService){
        super();
        this.cursoService = cursoService;
        this.alumnoService = alumnoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        var alumnos = alumnoService.findAll();
        List<AlumnoDto> alumnosDtoList = new ArrayList<>();
        for (Alumno alumno : alumnos) {
            var dto = new AlumnoDto(alumno.getId(),alumno.getNombre(), alumno.getCurso());
            alumnosDtoList.add(dto);
        }
        return new ResponseEntity<>(alumnosDtoList, HttpStatus.OK);
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
    public ResponseEntity<?> create(@RequestBody UpdateDtoAlumno updateDtoAlumno){
        var curso = cursoService.find(updateDtoAlumno.curso_id());
        alumnoService.add(new Alumno(updateDtoAlumno.nombre(),curso));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody UpdateDtoAlumno updateDtoAlumno){
        var alumno = alumnoService.find(id);
        if(alumno == null)
            return new ResponseEntity<>("No se encontró el alumno.",HttpStatus.NOT_FOUND);
        alumno.setNombre(updateDtoAlumno.nombre());
        var curso = cursoService.find(updateDtoAlumno.curso_id());
        alumno.setCurso(curso);
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

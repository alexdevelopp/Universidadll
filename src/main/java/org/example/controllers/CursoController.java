package org.example.controllers;

import java.util.ArrayList;

import org.example.clases.Curso;
import org.example.dtos.curso.CreateDtoCurso;
import org.example.services.CursoService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/cursos")
public class CursoController {
    private final CursoService cursoService;
    public CursoController(CursoService cursoService){
        super();
        this.cursoService = cursoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        var cursos = cursoService.findAll();
        List<CreateDtoCurso> cursosDtoList = new ArrayList<>();
        for (Curso curso : cursos) {
            var dto = new CreateDtoCurso(curso.getNombre(), curso.getDepartamento());
            cursosDtoList.add(dto);
        }
        return new ResponseEntity<>(cursosDtoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        Curso curso = cursoService.find(id);
        if (curso == null) {
            return new ResponseEntity<>("Curso no encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(curso, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateDtoCurso createDtoCurso){
        cursoService.add(new Curso(createDtoCurso.nombre(),createDtoCurso.departamento()));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody CreateDtoCurso createDtoCurso){
        var curso = cursoService.find(id);
        if(curso == null)
            return new ResponseEntity<>("No se encontró el curso.",HttpStatus.NOT_FOUND);
        curso.setNombre(createDtoCurso.nombre());
        cursoService.update(id,curso);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        var curso = cursoService.find(id);
        if(curso == null)
            return new ResponseEntity<>("No se encontró el curso.",HttpStatus.NOT_FOUND);
        cursoService.delete(curso);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

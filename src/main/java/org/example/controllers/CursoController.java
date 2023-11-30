package org.example.controllers;

import java.util.ArrayList;

import org.example.clases.Curso;
import org.example.dtos.curso.CursoDto;
import org.example.dtos.curso.UpdateDtoCurso;
import org.example.services.CursoService;
import org.example.services.DepartamentoService;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/cursos")
public class CursoController {
    private final CursoService cursoService;
    private final DepartamentoService departamentoService;
    public CursoController(CursoService cursoService,DepartamentoService departamentoService){
        super();
        this.departamentoService = departamentoService;
        this.cursoService = cursoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        var cursos = cursoService.findAll();
        List<CursoDto> cursosDtoList = new ArrayList<>();
        for (Curso curso : cursos) {
            var dto = new CursoDto(curso.getId(),curso.getNombre(), curso.getDepartamento());
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
    public ResponseEntity<?> create(@RequestBody UpdateDtoCurso updateDtoCurso){
        var departamento = departamentoService.find(updateDtoCurso.departamento_id());
        cursoService.add(new Curso(updateDtoCurso.nombre(),departamento));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@RequestBody UpdateDtoCurso updateDtoCurso){
        var curso = cursoService.find(id);
        if(curso == null)
            return new ResponseEntity<>("No se encontró el curso.",HttpStatus.NOT_FOUND);
        curso.setNombre(updateDtoCurso.nombre());
        var departamento = departamentoService.find(updateDtoCurso.departamento_id());
        curso.setDepartamento(departamento);
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

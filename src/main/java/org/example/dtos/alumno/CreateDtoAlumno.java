package org.example.dtos.alumno;

import org.example.clases.Curso;

public record CreateDtoAlumno(Integer id,String nombre,Curso curso) {
    
}

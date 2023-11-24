package org.example.dtos.alumno;
import org.example.clases.Curso;

public record AlumnoDto(Integer id, String nombre, Curso curso) {
}

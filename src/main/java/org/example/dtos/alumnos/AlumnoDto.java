package org.example.dtos.alumnos;
import org.example.clases.Curso;

public record AlumnoDto(Integer id, String nombre, Curso curso) {
}

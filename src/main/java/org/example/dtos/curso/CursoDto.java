package org.example.dtos.curso;

import org.example.clases.Departamento;

public record CursoDto(Integer id, String nombre, Departamento departamento) {
}

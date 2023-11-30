package org.example.dtos.curso;

import org.example.clases.Departamento;

public record CreateDtoCurso(Integer id,String nombre, Departamento departamento) {
}

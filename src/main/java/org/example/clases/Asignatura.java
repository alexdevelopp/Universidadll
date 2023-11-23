package org.example.clases;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@JsonIgnoreProperties(value= {"profesores","cursos"})

public class Asignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asignaturaId;
    private String nombre;
    @ManyToMany(mappedBy = "asignaturas",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Curso> cursos;
    @ManyToMany(mappedBy = "asignaturas",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Profesor>profesores;

    public Asignatura() {
        super();
    }

    public Asignatura(String nombre) {
        this.nombre = nombre;
    }

    public int getId() {
        return asignaturaId;
    }

    public void setId(int id) {
        this.asignaturaId = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}

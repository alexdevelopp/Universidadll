package org.example.clases;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Asignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asignaturaId;
    private String nombre;
    @ManyToMany(mappedBy = "asignaturas",cascade = CascadeType.ALL)
    private List<Curso> cursos;
    @ManyToMany(mappedBy = "asignaturas",cascade = CascadeType.ALL)
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

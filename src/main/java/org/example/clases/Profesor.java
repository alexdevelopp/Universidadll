package org.example.clases;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@JsonIgnoreProperties(value= {"cursos","asignaturas"})
public class Profesor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profesorId;
    private String nombre;
    @ManyToOne
    @JoinColumn(name = "provincia_id")
    private Provincia provincia_id;
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(
            name = "curso_profesor",
            joinColumns = @JoinColumn(name = "profesor_id"),
            inverseJoinColumns = @JoinColumn(name = "curso_id")
    )
    private List<Curso> cursos;
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(
            name = "asignatura_profesor",
            joinColumns = @JoinColumn(name = "profesor_id"),
            inverseJoinColumns = @JoinColumn(name = "asignatura_id")
    )
    private List<Asignatura> asignaturas;

    public Profesor() {
        super();
    }

    public Profesor( String nombre, Provincia provincia_id) {
        this.nombre = nombre;
        this.provincia_id = provincia_id;
    }

    public Provincia getProvincia_id() {
        return provincia_id;
    }

    public void setProvincia_id(Provincia provincia_id) {
        this.provincia_id = provincia_id;
    }

    public int getId() {
        return profesorId;
    }

    public void setId(int id) {
        this.profesorId = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public List<Curso> getCursos() {
        return cursos;
    }

    public void setCursos(List<Curso> cursos) {
        this.cursos = cursos;
    }

    public List<Asignatura> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(List<Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }
}

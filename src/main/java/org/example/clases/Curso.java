package org.example.clases;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cursoId;
    private String nombre;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "departamentoId")
    private Departamento departamento;
    @OneToMany(mappedBy = "cursoId",cascade = CascadeType.ALL)
    private List<Alumno> alumnos;
    @ManyToMany(mappedBy = "cursos",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Profesor> profesores;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "curso_asignatura",
            joinColumns = @JoinColumn(name = "curso_id"),
            inverseJoinColumns = @JoinColumn(name = "asignatura_id")
    )
    private List<Asignatura> asignaturas;

    public Curso() {
        super();
    }

    public Curso(String nombre, Departamento departamento) {
        this.nombre = nombre;
        this.departamento = departamento;
    }

    public int getId() {
        return cursoId;
    }

    public void setId(int id) {
        this.cursoId = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public List<Alumno> getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(List<Alumno> alumnos) {
        this.alumnos = alumnos;
    }

    public List<Profesor> getProfesores() {
        return profesores;
    }

    public void setProfesores(List<Profesor> profesores) {
        this.profesores = profesores;
    }

    public List<Asignatura> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(List<Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }
}

package org.example.clases;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties(value = {"cursoId"})
public class Alumno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int alumnoId;
    private String nombre;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cursoId")
    private Curso cursoId;

    public Alumno() {
        super();
    }

    public Alumno(String nombre, Curso cursoId) {
        this.nombre = nombre;
        this.cursoId = cursoId;
    }

    public int getId() {
        return alumnoId;
    }

    public void setId(int id) {
        this.alumnoId = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Curso getCursoId() {
        return cursoId;
    }

    public void setCursoId(Curso cursoId) {
        this.cursoId = cursoId;
    }
}

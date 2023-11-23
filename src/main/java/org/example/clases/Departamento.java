package org.example.clases;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;
@Entity
@JsonIgnoreProperties(value= {"cursos"})
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int departamentoId;
    private String nombre;
    @OneToMany(mappedBy = "departamento",cascade = CascadeType.ALL)
    private List<Curso> cursos;

    public Departamento() {
        super();
    }

    public Departamento( String nombre) {
        this.nombre = nombre;
    }

    public int getId() {
        return departamentoId;
    }

    public void setId(int id) {
        this.departamentoId = id;
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
}

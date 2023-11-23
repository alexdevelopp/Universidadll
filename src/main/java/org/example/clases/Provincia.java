package org.example.clases;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;


@Entity
@JsonIgnoreProperties(value= {"profesores"})
public class Provincia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int provinciaId;
    private String nombre;
    @OneToMany(mappedBy = "provincia_id",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Profesor> profesores;

    public Provincia() {
        super();
    }

    public Provincia( String nombre) {
        this.nombre = nombre;
    }

    public int getId() {
        return provinciaId;
    }

    public void setId(int id) {
        this.provinciaId = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Profesor> getProfesores() {
        return profesores;
    }

    public void setProfesores(List<Profesor> profesores) {
        this.profesores = profesores;
    }
}

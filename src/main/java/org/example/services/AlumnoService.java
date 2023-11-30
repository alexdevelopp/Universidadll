package org.example.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceException;
import org.example.MyInterfaceBBDD;
import org.example.clases.Alumno;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlumnoService implements MyInterfaceBBDD<Alumno> {

    private EntityManager em;
    private EntityManagerFactory emf;

    public AlumnoService() {
        super();
    }

    public void setUp() {
        emf = Persistence.createEntityManagerFactory("universidad");
        em = emf.createEntityManager();
        em.getTransaction().begin();
    }

    public void close() {
        em.getTransaction().commit();
        emf.close();
        em.close();
    }

    @Override
    public void add(Alumno alumno) {
        setUp();
        try {
            em.persist(alumno);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void delete(Alumno alumno) {
        setUp();
        try {
            if (alumno != null) {
                Alumno alumnoAeliminar = em.merge(alumno);
                em.remove(alumnoAeliminar);
            } else {
                System.out.println("No existe ningún alumno con ese nombre.");
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void update(Integer id, Alumno alumno) {
        try {
            Alumno alumnoAmodificar = find(id);
            if (alumnoAmodificar != null) {
                setUp();
                alumnoAmodificar.setNombre(alumno.getNombre());
                alumnoAmodificar.setCurso(alumno.getCurso());
                em.merge(alumnoAmodificar);
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public Alumno find(Integer id) {
        setUp();
        Alumno alumno = null;
        try {
            alumno = em.find(Alumno.class, id);
            if (alumno == null) {
                return null;
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return alumno;
    }

    @Override
    public List<Alumno> findAll() {
        setUp();
        try {
            List<Alumno> alumnos = em.createQuery("SELECT a FROM Alumno a",Alumno.class).getResultList();
            return alumnos;
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return new ArrayList<>();
    }
}

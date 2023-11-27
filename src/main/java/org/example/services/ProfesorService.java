package org.example.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceException;
import org.example.MyInterfaceBBDD;
import org.example.clases.Profesor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfesorService implements MyInterfaceBBDD<Profesor> {

    private EntityManager em;
    private EntityManagerFactory emf;

    public ProfesorService() {
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
    public void add(Profesor profesor) {
        setUp();
        try {
            em.persist(profesor);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void delete(Profesor profesor) {
        setUp();
        try {
            if (profesor != null) {
                Profesor profesorAeliminar = em.merge(profesor);
                em.remove(profesorAeliminar);
            } else {
                System.out.println("No existe ningún profesor con ese nombre.");
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void update(Integer id, Profesor profesor) {
        try {
            Profesor profesorAmodificar = find(id);
            if (profesorAmodificar != null) {
                setUp();
                profesorAmodificar.setNombre(profesor.getNombre());
                em.merge(profesorAmodificar);
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public Profesor find(Integer id) {
        setUp();
        Profesor profesor = null;
        try {
            profesor = em.find(Profesor.class, id);
            if (profesor == null) {
                return null;
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return profesor;
    }

    @Override
    public List<Profesor> findAll() {
        setUp();
        try {
            List<Profesor> profesores = em.createQuery("SELECT p FROM Profesor p",Profesor.class).getResultList();
            profesores.size();
            return profesores;
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return new ArrayList<>();
    }
}

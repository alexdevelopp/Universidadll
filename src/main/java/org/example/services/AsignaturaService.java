package org.example.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceException;
import org.example.MyInterfaceBBDD;
import org.example.clases.Asignatura;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AsignaturaService implements MyInterfaceBBDD<Asignatura> {

    private EntityManager em;
    private EntityManagerFactory emf;

    public AsignaturaService() {
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
    public void add(Asignatura asignatura) {
        setUp();
        try {
            em.persist(asignatura);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void delete(Asignatura asignatura) {
        setUp();
        try {
            if (asignatura != null) {
                Asignatura asignaturaAeliminar = em.merge(asignatura);
                em.remove(asignaturaAeliminar);
            } else {
                System.out.println("No existe ninguna asignatura con ese nombre.");
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void update(Integer id, Asignatura asignatura) {
        try {
            Asignatura asignaturaAmodificar = find(id);
            if (asignaturaAmodificar != null) {
                setUp();
                asignaturaAmodificar.setNombre(asignatura.getNombre());
                em.merge(asignaturaAmodificar);
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public Asignatura find(Integer id) {
        setUp();
        Asignatura asignatura = null;
        try {
            asignatura = em.find(Asignatura.class, id);
            if (asignatura == null) {
                return null;
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return asignatura;
    }

    @Override
    public List<Asignatura> findAll() {
        setUp();
        try {
            return em.createQuery("SELECT a FROM Asignatura a",Asignatura.class).getResultList();
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return new ArrayList<>();
    }
}

package org.example.services;

import jakarta.persistence.*;
import org.example.MyInterfaceBBDD;
import org.example.clases.Provincia;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProvinciaService implements MyInterfaceBBDD<Provincia> {

    private EntityManager em;
    private EntityManagerFactory emf;

    public ProvinciaService() {
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
    public void add(Provincia provincia) {
        setUp();
        try {
            em.persist(provincia);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void delete(Provincia provincia) {
        setUp();
        try {
            if (provincia != null) {
                Provincia provinciaAeliminar = em.merge(provincia);
                em.remove(provinciaAeliminar);
            } else {
                System.out.println("No existe ninguna provincia con ese nombre.");
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void update(Integer id, Provincia provincia) {
        setUp();
        try {
            em.merge(provincia);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public Provincia find(Integer id) {
        setUp();
        Provincia provincia = null;
        try {
            provincia = em.find(Provincia.class, id);
            if (provincia == null) {
                return null;
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return provincia;
    }

    @Override
    public List<Provincia> findAll() {
        setUp();
        try {
            var provincias = em.createQuery("select p from Provincia p",Provincia.class).getResultList();
            return provincias;
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return new ArrayList<>();
    }


}


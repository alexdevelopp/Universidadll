package org.example.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceException;
import org.example.MyInterfaceBBDD;
import org.example.clases.Departamento;
import org.example.clases.Profesor;
import org.example.clases.Provincia;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DepartamentoService implements MyInterfaceBBDD<Departamento> {

    private EntityManager em;
    private EntityManagerFactory emf;

    public DepartamentoService() {
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
    public void add(Departamento departamento) {
        setUp();
        try {
            em.persist(departamento);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void delete(Departamento departamento) {
        setUp();
        try {
            if (departamento != null) {
                Departamento departamentoAeliminar = em.merge(departamento);
                em.remove(departamentoAeliminar);
            } else {
                System.out.println("No existe ningún departamento con ese nombre.");
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void update(Integer id, Departamento departamento) {
        try {
            Departamento departamentoAmodificar = find(id);
            if (departamentoAmodificar != null) {
                setUp();
                departamentoAmodificar.setNombre(departamento.getNombre());
                em.merge(departamentoAmodificar);
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public Departamento find(Integer id) {
        setUp();
        Departamento departamento = null;
        try {
            departamento = em.find(Departamento.class, id);
            if (departamento == null) {
                return null;
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return departamento;
    }
    @Override
    public List<Departamento> findAll() {
        setUp();
        try {
            return em.createQuery("SELECT * FROM departamento",Departamento.class).getResultList();
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return new ArrayList<>();
    }
}

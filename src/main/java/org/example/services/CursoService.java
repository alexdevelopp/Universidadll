package org.example.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceException;
import org.example.MyInterfaceBBDD;
import org.example.clases.Curso;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CursoService implements MyInterfaceBBDD<Curso> {

    private EntityManager em;
    private EntityManagerFactory emf;
    public CursoService (){
        super();
    }

    public void setUp(){
        emf = Persistence.createEntityManagerFactory("universidad");
        em = emf.createEntityManager();
        em.getTransaction().begin();
    }

    public void close(){
        em.getTransaction().commit();
        emf.close();
        em.close();
    }

    @Override
    public void add(Curso curso) {
        setUp();
        try {
            em.persist(curso);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void delete(Curso curso) {
        setUp();
        try {
            if (curso != null) {
                Curso cursoAeliminar = em.merge(curso);
                em.remove(cursoAeliminar);
            } else {
                System.out.println("No existe ningun curso con ese nombre.");
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }

    @Override
    public void update(Integer id, Curso curso) {
        setUp();
        try {
             em.merge(curso);
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
    }


    @Override
    public Curso find(Integer id) {
        setUp();
        Curso curso = null;
        try {
            curso = em.find(Curso.class, id);
            if (curso == null) {
                return null;
            }
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return curso;
    }

    @Override
    public List<Curso> findAll() {
        setUp();
        try {
            List<Curso>cursos = em.createQuery("SELECT c FROM Curso c",Curso.class).getResultList();
            return cursos;
        } catch (PersistenceException e) {
            e.printStackTrace();
        } finally {
            close();
        }
        return new ArrayList<>();
    }
}

package org.example;

import java.util.List;

public interface MyInterfaceBBDD <T> {
    //Añadir registro
    void add(T entity);
    //Eliminar registro
    void delete (T entity);
    //Modificar registro
    void update(Integer id,T entity);
    //Encontrar registro
    T find(Integer id);
    List<T> findAll();

}

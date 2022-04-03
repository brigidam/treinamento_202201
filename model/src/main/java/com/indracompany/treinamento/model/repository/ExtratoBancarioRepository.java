package com.indracompany.treinamento.model.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.ExtratoBancario;

public interface ExtratoBancarioRepository extends GenericCrudRepository<ExtratoBancario, Long> {
	
	
	List<ExtratoBancario> findByDataBetweenAndContaBancaria(LocalDate dataInicio, LocalDate dataFim, ContaBancaria contaBancaria);
	
}

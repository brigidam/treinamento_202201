package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.indracompany.treinamento.model.entity.enums.TipoTransacao;

import lombok.Data;

@Data
public class ExtratoDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String agencia;
	
	private String numeroConta;
	
	private Double valor;
	
	@JsonFormat(pattern="dd/MM/yyyy")
	private LocalDate data;
	
	private TipoTransacao tipoTransacao;

}

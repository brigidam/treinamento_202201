package com.indracompany.treinamento.controller.rest;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.ExtratoDTO;
import com.indracompany.treinamento.model.entity.ExtratoBancario;
import com.indracompany.treinamento.model.service.ExtratoBancarioService;

@RestController
@RequestMapping("rest/extratos")
public class ExtratoBancarioRest extends GenericCrudRest<ExtratoBancario, Long, ExtratoBancarioService> {

	@Autowired
	ExtratoBancarioService extratoBancarioService;
	
	@GetMapping(value = "/consultar-extrato/{agencia}/{numeroConta}/{dataInicio}/{dataFim}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ExtratoDTO>> consultarExtrato(@PathVariable String agencia, @PathVariable String numeroConta,
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dataInicio,
			 @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dataFim) {

		List<ExtratoDTO> extratos = extratoBancarioService.consultarExtrato(agencia, numeroConta, dataInicio, dataFim);

		if (extratos == null || extratos.isEmpty()) {
			return new ResponseEntity<List<ExtratoDTO>>(extratos, HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<List<ExtratoDTO>>(extratos, HttpStatus.OK);
	}

}

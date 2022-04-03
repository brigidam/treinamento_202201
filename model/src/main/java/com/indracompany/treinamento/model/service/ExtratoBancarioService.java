package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ExtratoDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.ExtratoBancario;
import com.indracompany.treinamento.model.entity.enums.TipoTransacao;
import com.indracompany.treinamento.model.repository.ExtratoBancarioRepository;

@Service
public class ExtratoBancarioService extends GenericCrudService<ExtratoBancario, Long, ExtratoBancarioRepository> {

	@Autowired
	private ContaBancariaService contaBancariaService;

	public void salvarExtrato(Double valor, LocalDate data, TipoTransacao tipo, ContaBancaria conta) {
		ExtratoBancario extrato = new ExtratoBancario();
		extrato.setContaBancaria(conta);
		extrato.setData(data);
		extrato.setValor(valor);
		extrato.setTipo(tipo);
		super.salvar(extrato);

	}

	public List<ExtratoDTO> consultarExtrato(String agencia, String numeroConta, LocalDate dataInicio,
			LocalDate dataFim) {

		ContaBancaria conta = contaBancariaService.consultarConta(agencia, numeroConta);

		List<ExtratoBancario> extratos = repository.findByDataBetweenAndContaBancaria(dataInicio, dataFim.plusDays(1),
				conta);
		
		if (extratos == null || extratos.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
		}

		List<ExtratoDTO> extratosDTO = new ArrayList<>();

		for (ExtratoBancario extrato : extratos) {
			ExtratoDTO extratoDTO = new ExtratoDTO();
			extratoDTO.setValor(extrato.getValor());
			extratoDTO.setData(extrato.getData());
			extratoDTO.setTipoTransacao(extrato.getTipo());
			extratoDTO.setAgencia(extrato.getContaBancaria().getAgencia());
			extratoDTO.setNumeroConta(extrato.getContaBancaria().getNumero());
			extratosDTO.add(extratoDTO);
		}

		return extratosDTO;
	}
}

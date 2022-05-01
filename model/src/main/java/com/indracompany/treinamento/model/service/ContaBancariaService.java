package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ConsultaContaBancariaDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.enums.TipoTransacao;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;

@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository> {

	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private ContaBancariaRepository contaBancariaRepository;

	@Autowired
	private ExtratoBancarioService extratoBancarioService;

	public double consultarSaldo(String agencia, String numero) {
		ContaBancaria c = consultarConta(agencia, numero);
		return c.getSaldo();
	}

	@Transactional(rollbackFor = Exception.class)
	public void depositar(String agencia, String numeroConta, double valor, boolean isTransferencia) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		super.salvar(conta);

		processarTipoExtrato(conta, valor, TipoTransacao.DEPOSITO, isTransferencia);
	}

	@Transactional(rollbackFor = Exception.class)
	public void sacar(String agencia, String numeroConta, double valor, boolean isTransferencia) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);

		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		conta.setSaldo(conta.getSaldo() - valor);
		super.salvar(conta);

		processarTipoExtrato(conta, valor, TipoTransacao.SAQUE, isTransferencia);
	}

	@Transactional(rollbackFor = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor(), true);
		this.depositar(dto.getAgenciaDestino(), dto.getNumeroContaDestino(), dto.getValor(), true);
	}

	public void processarTipoExtrato(ContaBancaria conta, double valor, TipoTransacao tipoTransacao,
			boolean isTransferencia) {

		if (isTransferencia) {
			extratoBancarioService.salvarExtrato(valor, LocalDate.now(), TipoTransacao.TRANFERENCIA, conta);
		} else {
			extratoBancarioService.salvarExtrato(valor, LocalDate.now(), tipoTransacao, conta);
		}
	}
	
	@Override
	public ContaBancaria salvar(ContaBancaria conta) throws AplicacaoException {
		
		ContaBancaria c = repository.findByAgenciaAndNumero(conta.getAgencia(), conta.getNumero());
		 
		if (c == null) {
			conta.setId(null);
			return contaBancariaRepository.saveAndFlush(conta);
		}
		
		if (!c.getId().equals(conta.getId())) {
			super.salvar(conta);
		}
		
		return super.salvar(conta);
	}

	public ContaBancaria consultarConta(String agencia, String numeroConta) {
		ContaBancaria c = repository.findByAgenciaAndNumero(agencia, numeroConta);

		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}

		return c;
	}

	public List<ConsultaContaBancariaDTO> obterContasPorCpf(String cpf) {

		List<ConsultaContaBancariaDTO> listaContasRetorno = new ArrayList<>();
		Cliente cli = clienteService.buscarCliente(cpf);

		List<ContaBancaria> listaContasCliente = repository.findByCliente(cli);
		for (ContaBancaria conta : listaContasCliente) {
			ConsultaContaBancariaDTO dtoConta = new ConsultaContaBancariaDTO();
			BeanUtils.copyProperties(conta, dtoConta);
			dtoConta.setCpf(conta.getCliente().getCpf());
			dtoConta.setNomeTitular(conta.getCliente().getNome());
			listaContasRetorno.add(dtoConta);
		}

		return listaContasRetorno;
	}
}

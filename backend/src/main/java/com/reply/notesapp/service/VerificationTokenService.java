package com.reply.notesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reply.notesapp.converter.VerificationTokenConverter;
import com.reply.notesapp.ui.dto.VerificationToken;
import com.reply.notesapp.entity.VerificationTokenEntity;
import com.reply.notesapp.repository.VerificationTokenRepository;

import javax.transaction.Transactional;

@Service
@Transactional
public class VerificationTokenService {
	
	@Autowired
	private VerificationTokenRepository verificationTokenRepository;

	public VerificationToken findById(Long id) {
		return VerificationTokenConverter.entityToDto(verificationTokenRepository.getOne(id));
	}
	
	public VerificationToken findByUuid(String uuid) {
		return VerificationTokenConverter.entityToDto(verificationTokenRepository.findByUuid(uuid));
	}
	
	public VerificationToken saveVerificationToken(VerificationToken verificationToken) {
		VerificationTokenEntity verificationTokenToSave = VerificationTokenConverter.dtoToEntity(verificationToken);
		return VerificationTokenConverter.entityToDto(verificationTokenRepository.save(verificationTokenToSave));
	}

}

package com.reply.notesapp.converter;

import com.reply.notesapp.dto.VerificationToken;
import com.reply.notesapp.entity.VerificationTokenEntity;

public class VerificationTokenConverter {
	
	public static VerificationToken entityToDto(VerificationTokenEntity entity) {
		VerificationToken dto = new VerificationToken();
		dto.setId(entity.getId());
		dto.setUuid(entity.getUuid());
		dto.setCreatedAt(entity.getCreatedAt());
		dto.setUserId(entity.getUserId());
		return dto;
	}
	
	public static VerificationTokenEntity dtoToEntity(VerificationToken dto) {
		VerificationTokenEntity entity = new VerificationTokenEntity();
		entity.setId(dto.getId());
		entity.setUuid(dto.getUuid());
		entity.setCreatedAt(dto.getCreatedAt());
		entity.setUserId(dto.getUserId());
		return entity;
	}

}

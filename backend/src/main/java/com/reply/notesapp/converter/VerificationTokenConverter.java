package com.reply.notesapp.converter;

import com.reply.notesapp.ui.dto.VerificationToken;
import com.reply.notesapp.entity.VerificationTokenEntity;
import org.modelmapper.ModelMapper;

public class VerificationTokenConverter {
	
	public static VerificationToken entityToDto(VerificationTokenEntity entity) {
		return new ModelMapper().map(entity, VerificationToken.class);
	}
	
	public static VerificationTokenEntity dtoToEntity(VerificationToken dto) {
		return new ModelMapper().map(dto, VerificationTokenEntity.class);
	}

}

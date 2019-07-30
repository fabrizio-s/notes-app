package com.reply.notesapp.converter;

import java.util.ArrayList;
import java.util.Collection;
import com.reply.notesapp.ui.model.SignupUserResponse;
import com.reply.notesapp.ui.dto.User;
import com.reply.notesapp.entity.UserEntity;
import org.modelmapper.ModelMapper;

public class UserConverter {

	public static User entityToDto(UserEntity entity) {
		return new ModelMapper().map(entity, User.class);
	}
	
	public static Collection<User> entitiesToDto(Collection<UserEntity> entities) {
		Collection<User> dtos = new ArrayList<>();
		for (UserEntity entity : entities) {
			dtos.add(entityToDto(entity));
		}
		return dtos;
	}
	
	public static SignupUserResponse entityToSignupResponse(UserEntity entity) {
		return new ModelMapper().map(entity, SignupUserResponse.class);
	}
	
}

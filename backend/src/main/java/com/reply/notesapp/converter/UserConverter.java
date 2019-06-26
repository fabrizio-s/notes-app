package com.reply.notesapp.converter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.reply.notesapp.dto.User;
import com.reply.notesapp.entity.UserEntity;

public class UserConverter {

	public static User entityToDto(UserEntity entity) {
		User dto = new User();
		dto.setId(entity.getId());
		dto.setUsername(entity.getUsername());
		dto.setEmail(entity.getEmail());
		dto.setNotes(NoteConverter.entitiesToDto(entity.getNotes()));
		dto.setRoles(RoleConverter.entitiesToDto(entity.getRoles()));
		return dto;
	}
	
	public static List<User> entitiesToDto(Collection<UserEntity> entities) {
		List<User> dtos = new ArrayList<>();
		for (UserEntity entity : entities) {
			dtos.add(entityToDto(entity));
		}
		return dtos;
	}
	
}

package com.reply.notesapp.converter;

import java.util.ArrayList;
import java.util.Collection;
import com.reply.notesapp.entity.RoleEntity;

public class RoleConverter {
	
	public static String entityToDto(RoleEntity entity) {
		return entity.getName();
	}
	
	public static Collection<String> entitiesToDto(Collection<RoleEntity> collection) {
		Collection<String> dtos = new ArrayList<>();
		for (RoleEntity entity : collection) {
			dtos.add(entityToDto(entity));
		}
		return dtos;
	}

}

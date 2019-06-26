package com.reply.notesapp.converter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.reply.notesapp.entity.RoleEntity;

public class RoleConverter {
	
	public static String entityToDto(RoleEntity entity) {
		return entity.getName();
	}
	
	public static List<String> entitiesToDto(Collection<RoleEntity> collection) {
		List<String> dtos = new ArrayList<>();
		for (RoleEntity entity : collection) {
			dtos.add(entityToDto(entity));
		}
		return dtos;
	}

}

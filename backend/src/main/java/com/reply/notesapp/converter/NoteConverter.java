package com.reply.notesapp.converter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.reply.notesapp.dto.Note;
import com.reply.notesapp.dto.User;
import com.reply.notesapp.entity.NoteEntity;

public class NoteConverter {

	public static Note entityToDto(NoteEntity entity) {
		Note dto = new Note();
		dto.setId(entity.getId());
		dto.setTitle(entity.getTitle());
		User user = new User();
		user.setId(entity.getUser().getId());
		user.setEmail(entity.getUser().getEmail());
		user.setUsername(entity.getUser().getUsername());
		dto.setUser(user);
		dto.setBody(entity.getBody());
		dto.setCreatedAt(entity.getCreatedAt());
		dto.setLastModified(entity.getLastModified());
		return dto;
	}
	
	public static List<Note> entitiesToDto(Collection<NoteEntity> collection) {
		List<Note> dtos = new ArrayList<>();
		for (NoteEntity entity : collection) {
			dtos.add(entityToDto(entity));
		}
		return dtos;
	}
	
}

package com.reply.notesapp.converter;

import java.util.ArrayList;
import java.util.Collection;
import com.reply.notesapp.ui.dto.Note;
import com.reply.notesapp.entity.NoteEntity;
import org.modelmapper.ModelMapper;

public class NoteConverter {

	public static Note entityToDto(NoteEntity entity) {
		return new ModelMapper().map(entity, Note.class);
	}
	
	public static Collection<Note> entitiesToDto(Collection<NoteEntity> collection) {
		Collection<Note> dtos = new ArrayList<>();
		for (NoteEntity entity : collection) {
			dtos.add(entityToDto(entity));
		}
		return dtos;
	}
	
}

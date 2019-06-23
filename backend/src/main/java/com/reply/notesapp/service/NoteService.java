package com.reply.notesapp.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reply.notesapp.dto.Note;
import com.reply.notesapp.entity.NoteEntity;
import com.reply.notesapp.repository.NoteRepository;
import com.reply.notesapp.repository.UserRepository;

@Service
@Transactional
public class NoteService {
	
	@Autowired
	private NoteRepository noteRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<Note> getAllNotes() {
		return entitiesToDto(noteRepository.findAll());
	}
	
	public Note getNote(Long id) {
		return entityToDto(noteRepository.getOne(id));
	}
	
	public Note updateNote(Long id, Note note) {
		NoteEntity noteToUpdate = noteRepository.getOne(id);
		noteToUpdate.setBody(note.getBody());
		noteToUpdate.setTitle(note.getTitle());
		return entityToDto(noteRepository.save(noteToUpdate));
	}
	
	public Note deleteNote(Long id) {
		Note note = entityToDto(noteRepository.getOne(id));
		noteRepository.deleteById(id);
		return note;
	}
	
	public Note saveNote(Note note) {
		NoteEntity noteToSave = new NoteEntity();
		noteToSave.setId(note.getId());
		noteToSave.setTitle(note.getTitle());
		noteToSave.setUser(userRepository.getOne(note.getUserId()));
		noteToSave.setBody(note.getBody());
		return entityToDto(noteRepository.save(noteToSave));
	}
	
	private Note entityToDto(NoteEntity entity) {
		Note dto = new Note();
		dto.setId(entity.getId());
		dto.setTitle(entity.getTitle());
		dto.setUserId(entity.getUser().getId());
		dto.setBody(entity.getBody());
		dto.setCreatedAt(entity.getCreatedAt());
		dto.setLastModified(entity.getLastModified());
		return dto;
	}
	
	private List<Note> entitiesToDto(List<NoteEntity> entities) {
		List<Note> dtos = new ArrayList<>();
		for (NoteEntity entity : entities) {
			dtos.add(entityToDto(entity));
		}
		return dtos;
	}
	
}

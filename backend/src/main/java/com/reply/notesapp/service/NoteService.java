package com.reply.notesapp.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reply.notesapp.converter.NoteConverter;
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
		return NoteConverter.entitiesToDto(noteRepository.findAll());
	}
	
	public Note getNote(Long id) {
		return NoteConverter.entityToDto(noteRepository.getOne(id));
	}
	
	public Note updateNote(Long id, Note note) {
		NoteEntity noteToUpdate = noteRepository.getOne(id);
		noteToUpdate.setBody(note.getBody());
		noteToUpdate.setTitle(note.getTitle());
		return NoteConverter.entityToDto(noteRepository.save(noteToUpdate));
	}
	
	public Note deleteNote(Long id) {
		Note note = NoteConverter.entityToDto(noteRepository.getOne(id));
		noteRepository.deleteById(id);
		return note;
	}
	
	public Note saveNote(Note note) {
		NoteEntity noteToSave = new NoteEntity();
		noteToSave.setId(note.getId());
		noteToSave.setTitle(note.getTitle());
		noteToSave.setUser(userRepository.getOne(note.getUser().getId()));
		noteToSave.setBody(note.getBody());
		return NoteConverter.entityToDto(noteRepository.save(noteToSave));
	}
	
}

package com.reply.notesapp.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reply.notesapp.dto.Note;
import com.reply.notesapp.service.NoteService;

@RestController
@RequestMapping("/rest/note")
public class NoteRestService {
	
	@Autowired
	private NoteService noteService;
	
	@GetMapping
	public List<Note> getAllNotes() {
		return noteService.getAllNotes();
	}
	
	@PostMapping
	public Note saveNote(@RequestBody Note note) {
		return noteService.saveNote(note);
	}
	
	@GetMapping("/{id}")
	public Note getNote(@PathVariable Long id) {
		return noteService.getNote(id);
	}
	
	@PutMapping("/{id}")
	public Note updateNote(@PathVariable Long id, @RequestBody Note note) {
		return noteService.updateNote(id, note);
	}
	
	@DeleteMapping("/{id}")
	public Note deleteNote(@PathVariable Long id) {
		return noteService.deleteNote(id);
	}
	
}

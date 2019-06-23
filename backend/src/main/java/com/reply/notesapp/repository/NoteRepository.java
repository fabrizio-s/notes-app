package com.reply.notesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reply.notesapp.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}

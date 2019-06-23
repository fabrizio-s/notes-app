package com.reply.notesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reply.notesapp.entity.NoteEntity;

public interface NoteRepository extends JpaRepository<NoteEntity, Long> {
}

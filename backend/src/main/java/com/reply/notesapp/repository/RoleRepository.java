package com.reply.notesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reply.notesapp.entity.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
}

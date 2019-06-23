package com.reply.notesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reply.notesapp.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}

package com.reply.notesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reply.notesapp.entity.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
	VerificationToken findByUuid(String uuid);
}

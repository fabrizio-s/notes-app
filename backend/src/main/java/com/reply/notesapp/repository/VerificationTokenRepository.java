package com.reply.notesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reply.notesapp.entity.VerificationTokenEntity;

public interface VerificationTokenRepository extends JpaRepository<VerificationTokenEntity, Long> {
	VerificationTokenEntity findByUuid(String uuid);
}

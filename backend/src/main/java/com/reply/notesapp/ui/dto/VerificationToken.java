package com.reply.notesapp.ui.dto;

import java.util.Date;
import java.util.UUID;

public class VerificationToken {
	
	private Long id;
	
	private String uuid;
	
	private Date createdAt;
	
	private Long userId;
	
	public VerificationToken() {
        this(null);
    }

    public VerificationToken(Long userId) {
        this.userId = userId;
        createdAt = new Date();
        uuid = UUID.randomUUID().toString();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}

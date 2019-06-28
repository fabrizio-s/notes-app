package com.reply.notesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.reply.notesapp.dto.SignupUserResponse;
import com.reply.notesapp.dto.VerificationToken;

@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private VerificationTokenService verificationTokenService;
	
	@Value("${spring.mail.username}")
	private String email;
	
	@Value("${server.servlet.context-path}")
	private String context;
	
	@Value("${server.port}")
	private String port;
	
	@Value("${app.host.name}")
	private String host;
	
	@Async
	public void sendVerificationEmail(SignupUserResponse user) {
		VerificationToken token = new VerificationToken(user.getId());
		verificationTokenService.saveVerificationToken(token);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setFrom(email);
        mailMessage.setText("To confirm your account, please click here : "
                +"http://" + host + ":" + port + ("/".equals(context) ? "" : context) + "/api/verify?token="+token.getUuid());
        javaMailSender.send(mailMessage);
	}

}

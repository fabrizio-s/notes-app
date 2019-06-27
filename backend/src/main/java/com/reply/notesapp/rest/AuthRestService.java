package com.reply.notesapp.rest;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reply.notesapp.dto.SignupUserRequest;
import com.reply.notesapp.dto.SignupUserResponse;
import com.reply.notesapp.dto.User;
import com.reply.notesapp.entity.UserEntity;
import com.reply.notesapp.dto.VerificationToken;
import com.reply.notesapp.security.SecurityConstants;
import com.reply.notesapp.service.EmailService;
import com.reply.notesapp.service.UserService;
import com.reply.notesapp.service.VerificationTokenService;

import io.jsonwebtoken.Jwts;

@RestController
public class AuthRestService {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private VerificationTokenService verificationTokenService;
	
	@GetMapping( SecurityConstants.AUTH_LOGIN_URL )
	public Map<String, Object> authenticate(HttpServletResponse response) {
		String token = response.getHeader(SecurityConstants.TOKEN_HEADER);
		byte[] signingKey = SecurityConstants.JWT_SECRET.getBytes();
		String username = Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody()
                .getSubject();
		User user = userService.findByUsername(username);
		Map<String, Object> json = new HashMap<>();
		json.put("id", user.getId());
		json.put("username", user.getUsername());
		json.put("email", user.getEmail());
		json.put("token", token);
		json.put("roles", user.getRoles());
		return json;
	}
	
	@PostMapping("/api/register")
	public SignupUserResponse register(SignupUserRequest signupUser) {
		// TODO: validate sign up request
		
		SignupUserResponse user = userService.saveUser(signupUser);
        emailService.sendVerificationEmail(user);
		return user;
	}
	
	@GetMapping("/api/verify")
    public String verify(@RequestParam("token") String uuid) {
        VerificationToken token = verificationTokenService.findByUuid(uuid);
        
        // TODO: validate token
        
        UserEntity user = userService.findEntityById(token.getUserId());
        userService.verifyUser(user);
        return "account-verified";
    }

}

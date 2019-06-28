package com.reply.notesapp.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reply.notesapp.converter.UserConverter;
import com.reply.notesapp.converter.VerificationTokenConverter;
import com.reply.notesapp.dto.SignupUserRequest;
import com.reply.notesapp.dto.SignupUserResponse;
import com.reply.notesapp.dto.User;
import com.reply.notesapp.dto.VerificationToken;
import com.reply.notesapp.entity.UserEntity;
import com.reply.notesapp.repository.UserRepository;
import com.reply.notesapp.repository.VerificationTokenRepository;

@Service
@Transactional
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private VerificationTokenRepository verificationTokenRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	public List<User> getAllUsers() {
		return UserConverter.entitiesToDto(userRepository.findAll());
	}
	
	public User findById(Long id) {
		return UserConverter.entityToDto(userRepository.getOne(id));
	}
	
	public UserEntity findEntityById(Long id) {
		return userRepository.getOne(id);
	}
	
	public User findByUsername(String username) {
		return UserConverter.entityToDto(userRepository.findByUsername(username));
	}
	
	public User findByEmail(String email) {
        return UserConverter.entityToDto(userRepository.findByEmail(email));
    }
    
    public SignupUserResponse saveUser(SignupUserRequest request) {
        UserEntity entity = new UserEntity();
        entity.setUsername(request.getUsername());
        entity.setPassword(passwordEncoder.encode(request.getPassword()));
        entity.setEmail(request.getEmail());
        entity.setEnabled(false);
        return UserConverter.entityToSignupResponse(userRepository.save(entity));
    }

    public User deleteUser(Long id) {
    	User user = UserConverter.entityToDto(userRepository.getOne(id));
        userRepository.deleteById(id);
        return user;
    }

    public SignupUserResponse verifyUser(UserEntity user, VerificationToken token) throws RuntimeException {
    	user.setEnabled(true);
    	verificationTokenRepository.delete(VerificationTokenConverter.dtoToEntity(token));
    	return UserConverter.entityToSignupResponse(userRepository.save(user));
    }
	
	@Override
	public UserDetails loadUserByUsername(String username) {
		UserEntity user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(
				user.getUsername(),
				user.getPassword(),
				user.isEnabled(),
				true,
				true,
				true,
				user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList()));
	}
	
}

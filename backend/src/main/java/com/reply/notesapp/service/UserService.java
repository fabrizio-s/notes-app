package com.reply.notesapp.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.reply.notesapp.converter.UserConverter;
import com.reply.notesapp.dto.User;
import com.reply.notesapp.entity.UserEntity;
import com.reply.notesapp.repository.UserRepository;

@Service
@Transactional
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	public List<User> getAllUsers() {
		return UserConverter.entitiesToDto(userRepository.findAll());
	}
	
	public User findByUsername(String username) {
		return UserConverter.entityToDto(userRepository.findByUsername(username));
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

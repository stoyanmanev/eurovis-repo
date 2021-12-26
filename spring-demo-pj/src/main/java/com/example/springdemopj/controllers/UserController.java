package com.example.springdemopj.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.springdemopj.WebSecurityConfig;
import com.example.springdemopj.entities.UserEntity;
import com.example.springdemopj.repositories.UserRepository;

@RestController
public class UserController {
	private UserRepository userRepository;
	private WebSecurityConfig webSecurityConfig;
	
	public UserController(UserRepository userRepo, WebSecurityConfig webSecurityConfig) {
		userRepository = userRepo;
		this.webSecurityConfig = webSecurityConfig;
	}
		
	@GetMapping(path = "/activeUser")
	public ResponseEntity<Boolean> existSession(HttpSession session) {
		
		UserEntity user = (UserEntity) session.getAttribute("user");
		
		if(user != null) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
	}
	
	@GetMapping(path = "/userInfo")
	public ResponseEntity<UserEntity> userInfo(HttpSession session){
		UserEntity user = (UserEntity) session.getAttribute("user");
		
		if(user != null) {
			return new ResponseEntity<UserEntity>(user, HttpStatus.OK);
		}
		
		return null;
	}
	
	@PostMapping(path = "/login")
	public ResponseEntity<String> login(@RequestParam(value = "email")String username,
										@RequestParam(value = "password")String password,
										HttpSession session) throws UsernameNotFoundException, Exception{
		
		UserEntity user = userRepository.findUserByUsernameAndPassword(username, password);
		
		if(user == null) {
			return new ResponseEntity<String>("User_Not_Found", HttpStatus.NOT_FOUND);
		}
		
		UserDetails userDetails = webSecurityConfig.userDetailsServiceBean().loadUserByUsername(username);
		
		Authentication auth = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		
		session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
		
		session.setAttribute("user", user);		
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}
	
	@PostMapping(path = "/logout")
	public ResponseEntity<String> logout(HttpSession session){
		
		UserEntity user = (UserEntity) session.getAttribute("user");
		
		if(user == null) {
			return new ResponseEntity<String>("User_Session_Not_Found", HttpStatus.NOT_FOUND);
		}
		
		session.invalidate();
		return new ResponseEntity<String>("Done", HttpStatus.OK);

	}
	
}

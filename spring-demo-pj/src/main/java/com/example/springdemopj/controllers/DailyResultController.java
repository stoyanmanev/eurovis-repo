package com.example.springdemopj.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springdemopj.WebSecurityConfig;
import com.example.springdemopj.entities.DailyResultEntity;
import com.example.springdemopj.entities.UserEntity;
import com.example.springdemopj.repositories.DailyResultRepository;

@RestController
public class DailyResultController {
	private DailyResultRepository drRepository;
	private WebSecurityConfig webSecurityConfig;
	
	public DailyResultController(DailyResultRepository drRepository, WebSecurityConfig webSecurityConfig) {
		this.drRepository = drRepository;
		this.webSecurityConfig = webSecurityConfig;
	}
	
	@PostMapping(path = "/check-date")
	public ResponseEntity<Boolean> checkDate(@RequestParam(value="date") String date,
											HttpSession session){
		UserEntity user = (UserEntity) session.getAttribute("user");
		
		if(user == null) {
			return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
		}
		
		DailyResultEntity dr = drRepository.findByUserIDAndDate(user.getId(),date);
				
		if(dr != null) {
			return new ResponseEntity<Boolean>(false, HttpStatus.OK);
		}
		
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
	
	@PostMapping(path = "/daily-record")
	public ResponseEntity<String> create(@RequestParam(value = "date")String date,
										@RequestParam(value = "time")String time,
										@RequestParam(value = "ip")String ip,
										HttpSession session){
		UserEntity user = (UserEntity) session.getAttribute("user");
		
		if(user == null) {
			return new ResponseEntity<String>("Not_Found", HttpStatus.NOT_FOUND);
		}
		String hours = "00:00";
		
		DailyResultEntity record = new DailyResultEntity(user.getId(), user.getFullName(), date, time, ip, hours);
		drRepository.saveAndFlush(record);
		
		return new ResponseEntity<String>("Done", HttpStatus.OK);
	}
	
	@GetMapping(path = "/results")
	public ResponseEntity<List<DailyResultEntity>> render(HttpSession session){
		UserEntity user = (UserEntity) session.getAttribute("user");
		
		if(user != null) {
			List<DailyResultEntity> results = drRepository.findByUserID(user.getId());
			
			return new ResponseEntity<List<DailyResultEntity>>(results, HttpStatus.OK);
		}
		
		return new ResponseEntity<List<DailyResultEntity>>(new ArrayList<>(), HttpStatus.NOT_FOUND);
	}
}

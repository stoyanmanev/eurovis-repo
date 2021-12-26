package com.example.springdemopj.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springdemopj.entities.DailyResultEntity;

public interface DailyResultRepository extends JpaRepository<DailyResultEntity, Integer>{

	DailyResultEntity findByUserIDAndDate(int id, String date);

	List<DailyResultEntity> findByUserID(int id);
	
}

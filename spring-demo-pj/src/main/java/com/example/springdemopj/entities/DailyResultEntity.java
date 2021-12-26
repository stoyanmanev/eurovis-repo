package com.example.springdemopj.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "dailyResult")
public class DailyResultEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="userId", nullable = false)
	private int userID;
	
	@Column(name="name", length = 255 ,nullable = false)
	private String name;
	
	@Column(name="date", length = 32, nullable = false)
	private String date;
	
	@Column(name="timeStart", length = 32, nullable = false)
	private String timeStart;
	
	@Column(name="timeEnd", length = 32)
	private String timeEnd;
	
	@Column(name="ipLogin", length = 32, nullable = false)
	private String ipLogin;
	
	@Column(name="ipLogout", length = 32)
	private String ipLogout;
	
	@Column(name="workTime", length = 32, nullable = false)
	private String workTime;
	
	public DailyResultEntity() {};
	
	public DailyResultEntity(int userID, String name, String date, String timeStart,String ipLogin, String workTime) {
		this.userID = userID;
		this.name = name;
		this.date = date;
		this.timeStart = timeStart;
		this.ipLogin = ipLogin;
		this.workTime = workTime;
	}
	
	public DailyResultEntity(String date, String timeEnd, String ipLogout, String workTime) {
		this.date = date;
		this.timeEnd = timeEnd;
		this.ipLogout = ipLogout;
		this.workTime = workTime;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(String timeStart) {
		this.timeStart = timeStart;
	}

	public String getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(String timeEnd) {
		this.timeEnd = timeEnd;
	}

	public String getIpLogin() {
		return ipLogin;
	}

	public void setIpLogin(String ipLogin) {
		this.ipLogin = ipLogin;
	}

	public String getIpLogout() {
		return ipLogout;
	}

	public void setIpLogout(String ipLogout) {
		this.ipLogout = ipLogout;
	}

	public String getWorkTime() {
		return workTime;
	}

	public void setWorkTime(String workTime) {
		this.workTime = workTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}

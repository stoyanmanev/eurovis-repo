package com.example.springdemopj.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="username", length = 255, nullable = false, unique = true)
	private String username;
	
	@Column(name="password", length = 32, nullable = false)
	private String password;
	
	@Column(name="role", length = 32, nullable = false)
	private String role;
	
	@Column(name="name", length = 255, nullable = false)
	private String fullName;
	
	@Column(name="dateAppointment", length = 255, nullable = false)
	private String dateOfAppointment;
	
	@Column(name="salary", length = 255, nullable = false)
	private long salary;

	@ManyToMany
	@JoinTable(name = "account_role",
	joinColumns=@JoinColumn(name="account_id"),
	inverseJoinColumns = @JoinColumn(name="role_id"))
	private Set<RoleEntity> roles;
	
	public UserEntity() {	}
	
	public UserEntity(String username, String password, String role, String fullName, String dateOfAppointment, long salary) {
		this.password = password;
		this.username = username;
		this.role = role;
		this.fullName = fullName;
		this.dateOfAppointment = dateOfAppointment;
		this.salary = salary;
	}
	
	public UserEntity(String username, String password) {
		this.password = password;
		this.username = username;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Set<RoleEntity> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleEntity> roles) {
		this.roles = roles;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getDateOfAppointment() {
		return dateOfAppointment;
	}

	public void setDateOfAppointment(String dateOfAppointment) {
		this.dateOfAppointment = dateOfAppointment;
	}

	public long getSalary() {
		return salary;
	}

	public void setSalary(long salary) {
		this.salary = salary;
	}
	
	
	
}

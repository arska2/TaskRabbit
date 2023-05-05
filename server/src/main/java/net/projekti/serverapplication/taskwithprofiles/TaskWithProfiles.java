package net.projekti.serverapplication.taskwithprofiles;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.projekti.serverapplication.profile.Profile;

@Entity
@Table(name="task")

public class TaskWithProfiles {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String title;
	private String description;
	private String status;
	private String location;
	private Double latitude;
	private Double longitude;
	private Double payment;
	
	@Column(name="created_at", nullable=true, insertable=false, updatable=false)
	private LocalDateTime created; 
	
	@Column(name="available_from")
	private LocalDateTime availableFrom;
	
	@Column(name="available_to")
	private LocalDateTime availableTo;
	
	@Column(name="duration")
	private Integer durationinminutes;
	
	@ManyToOne
	@JoinColumn(name="creator_id")
	private Profile creator;
	
	@ManyToOne
	@JoinColumn(name="performer_id")
	private Profile performer;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getPayment() {
		return payment;
	}

	public void setPayment(Double payment) {
		this.payment = payment;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public LocalDateTime getAvailableFrom() {
		return availableFrom;
	}

	public void setAvailableFrom(LocalDateTime availableFrom) {
		this.availableFrom = availableFrom;
	}

	public LocalDateTime getAvailableTo() {
		return availableTo;
	}

	public void setAvailableTo(LocalDateTime availableTo) {
		this.availableTo = availableTo;
	}

	public Integer getDurationinminutes() {
		return durationinminutes;
	}

	public void setDurationinminutes(Integer durationinminutes) {
		this.durationinminutes = durationinminutes;
	}

	public Profile getCreator() {
		return creator;
	}

	public void setCreator(Profile creator) {
		this.creator = creator;
	}

	public Profile getPerformer() {
		return performer;
	}

	public void setPerformer(Profile performer) {
		this.performer = performer;
	}
	
	
	
}

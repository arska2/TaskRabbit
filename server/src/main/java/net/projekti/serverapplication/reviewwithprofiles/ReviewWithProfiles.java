package net.projekti.serverapplication.reviewwithprofiles;

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
@Table(name="review")
public class ReviewWithProfiles {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	
	
	@ManyToOne
	@JoinColumn(name="targetuser_id")
	private Profile targetUser;
	
	@Column(name="task_id")
	private Integer task_id;
	private int value;
	private String comment;
	@Column(name="created_at", nullable=true, insertable=false, updatable=false)
	private LocalDateTime created;
	
	@ManyToOne
	@JoinColumn(name="performer_id")
	private Profile performerUser;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Profile getTargetUser() {
		return targetUser;
	}

	public void setTargetUser(Profile targetUser) {
		this.targetUser = targetUser;
	}

	public Integer getTask_id() {
		return task_id;
	}

	public void setTask_id(Integer task_id) {
		this.task_id = task_id;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public Profile getPerformerUser() {
		return performerUser;
	}

	public void setPerformerUser(Profile performerUser) {
		this.performerUser = performerUser;
	}
	
	
	
	
}

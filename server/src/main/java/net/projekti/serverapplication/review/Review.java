package net.projekti.serverapplication.review;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Review {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(name="targetuser_id")
	private Integer targetuser_id;
	@Column(name="task_id")
	private Integer task_id;
	private int value;
	private String comment;
	@Column(name="created_at", nullable=true, insertable=false, updatable=false)
	private LocalDateTime created;
	@Column(name="performer_id")
	private Integer performer_id;
	
	
	public Integer getPerformer_id() {
		return performer_id;
	}
	public void setPerformer_id(Integer performer_id) {
		this.performer_id = performer_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getTargetuser_id() {
		return targetuser_id;
	}
	public void setTargetuser_id(Integer targetuser_id) {
		this.targetuser_id = targetuser_id;
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
	
	
	
	
}
package net.projekti.serverapplication.performerswithtasks;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.projekti.serverapplication.taskswithperformer.TasksWithPerformer;

@Entity
@Table(name="profile")

public class PerformersWithTasks {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String username;
	private String password;
	
	@OneToMany(mappedBy="profile")
	private List<TasksWithPerformer>tasks;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	public List<TasksWithPerformer> getTasks() {
		return tasks;
	}

	public void setTasks(List<TasksWithPerformer> tasks) {
		this.tasks = tasks;
	}

}

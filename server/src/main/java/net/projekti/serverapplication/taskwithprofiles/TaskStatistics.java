package net.projekti.serverapplication.taskwithprofiles;

public class TaskStatistics {
	private int completedTaskCount;
	private int inProgressTaskCount;
	private int tasksCreatedCount;
	private int taskRabbitRank;
	
	
	public TaskStatistics(int completedTaskCount, int inProgressTaskCount,int tasksCreatedCount, int taskRabbitRank) {
		setCompletedTaskCount(completedTaskCount);
		setInProgressTaskCount(inProgressTaskCount);
		setTasksCreatedCount(tasksCreatedCount);
		setTaskRabbitRank(taskRabbitRank);
		
	}
	
	public int getCompletedTaskCount() {
		return completedTaskCount;
	}
	public void setCompletedTaskCount(int completedTaskCount) {
		this.completedTaskCount = completedTaskCount;
	}
	public int getInProgressTaskCount() {
		return inProgressTaskCount;
	}
	public void setInProgressTaskCount(int inProgressTaskCount) {
		this.inProgressTaskCount = inProgressTaskCount;
	}
	public int getTaskRabbitRank() {
		return taskRabbitRank;
	}
	public void setTaskRabbitRank(int taskRabbitRank) {
		this.taskRabbitRank = taskRabbitRank;
	}


	public int getTasksCreatedCount() {
		return tasksCreatedCount;
	}

	public void setTasksCreatedCount(int tasksCreatedCount) {
		this.tasksCreatedCount = tasksCreatedCount;
	}
	
	
}

package net.projekti.serverapplication.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review,Integer> {
	
	@Query(value = "SELECT * FROM review WHERE task_id=:taskId", nativeQuery = true)
	List<Review> findByTaskId(@Param("taskId") int taskId);
}
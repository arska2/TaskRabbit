package net.projekti.serverapplication.review;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import net.projekti.serverapplication.task.RequestInfo;
import net.projekti.serverapplication.task.Task;




@RestController
@RequestMapping("review")
public class ReviewController {
	@Autowired
	ReviewRepository repo;
	
	@GetMapping
	public List<Review> getAll(){
		return repo.findAll();
		}
	
	@GetMapping("/{id}")
	Review get(@PathVariable int id) {
		Review r = repo.findById(id).orElse(null);
		if(r==null) throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, "Review not found");
		return r;
	}
	
	@PostMapping
	Review create(@RequestBody Review r) {
		repo.saveAndFlush(r);
		return r;
	}
	@DeleteMapping("/{id}")
	RequestInfo delete(@PathVariable int id) {
		Review r =repo.findById(id).orElse(null);
		if(r==null)throw new ResponseStatusException(
				HttpStatus.NOT_FOUND,"Review not found");
		repo.deleteById(id);
		return new RequestInfo("Delete succesful");
	}
	
	@GetMapping("/task/{taskId}")
	public List<Review> getTaskReviw(@PathVariable int taskId) {
		return repo.findByTaskId(taskId);
		
	}
	
	}
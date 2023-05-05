package net.projekti.serverapplication.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("tasks")
public class TaskController {
	@Autowired
	TaskRepository repo;
	
	
	@GetMapping
	public List<Task> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	Task get(@PathVariable int id) {
		Task t = repo.findById(id).orElse(null);
		if(t==null) throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, "Foo Not Found");
		return t;
	}
	
	@PostMapping
	Task create(@RequestBody Task t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@PutMapping("/{id}")
	Task save(@PathVariable int id, @RequestBody Task t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@DeleteMapping("/{id}")
	RequestInfo delete(@PathVariable int id) {
		Task t =repo.findById(id).orElse(null);
		if(t==null)throw new ResponseStatusException(
				HttpStatus.NOT_FOUND,"Foo Not Found");
		repo.deleteById(id);
		return new RequestInfo("Deleted");
	}
}

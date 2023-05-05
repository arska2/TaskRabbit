package net.projekti.serverapplication.taskswithperformer;

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

import net.projekti.serverapplication.task.RequestInfo;
import net.projekti.serverapplication.taskswithcreator.TasksWithCreator;


@RestController
@RequestMapping("taskswithperformers")

public class TasksWithPerformerController {
	@Autowired
	TasksWithPerformerRepository repo;
	
	@GetMapping
	List<TasksWithPerformer> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	TasksWithPerformer get(@PathVariable int id) {
		TasksWithPerformer t = repo.findById(id).orElse(null);
		if(t==null) throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, "Foo Not Found");
		return t;
	}
	
	/*@PostMapping
	TasksWithPerformer create(@RequestBody TasksWithPerformer t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@PutMapping("/{id}")
	TasksWithPerformer save(@PathVariable int id, @RequestBody TasksWithPerformer t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@DeleteMapping("/{id}")
	RequestInfo delete(@PathVariable int id) {
		TasksWithPerformer t =repo.findById(id).orElse(null);
		if(t==null)throw new ResponseStatusException(
				HttpStatus.NOT_FOUND,"Foo Not Found");
		repo.deleteById(id);
		return new RequestInfo("Deleted");
	}*/
}

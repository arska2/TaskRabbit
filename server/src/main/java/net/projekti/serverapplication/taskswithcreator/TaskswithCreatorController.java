package net.projekti.serverapplication.taskswithcreator;

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
import net.projekti.serverapplication.task.Task;


@RestController
@RequestMapping("tasks/creators")

public class TaskswithCreatorController {
	@Autowired
	TasksWithCreatorRepository repo;
	
	@GetMapping
	List<TasksWithCreator> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	TasksWithCreator get(@PathVariable int id) {
		TasksWithCreator t = repo.findById(id).orElse(null);
		if(t==null) throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, "Foo Not Found");
		return t;
	}
	
	/*@PostMapping
	TasksWithCreator create(@RequestBody TasksWithCreator t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@PutMapping("/{id}")
	TasksWithCreator save(@PathVariable int id, @RequestBody TasksWithCreator t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@DeleteMapping("/{id}")
	RequestInfo delete(@PathVariable int id) {
		TasksWithCreator t =repo.findById(id).orElse(null);
		if(t==null)throw new ResponseStatusException(
				HttpStatus.NOT_FOUND,"Foo Not Found");
		repo.deleteById(id);
		return new RequestInfo("Deleted");
	}*/
}

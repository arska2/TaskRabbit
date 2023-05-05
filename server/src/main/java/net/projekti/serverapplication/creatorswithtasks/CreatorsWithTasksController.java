package net.projekti.serverapplication.creatorswithtasks;

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


@RestController
@RequestMapping("creators/owntasks")

public class CreatorsWithTasksController {
	@Autowired
	CreatorsWithTasksRepository repo;
	
	@GetMapping
	List<CreatorsWithTasks> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	CreatorsWithTasks get(@PathVariable int id) {
		CreatorsWithTasks p = repo.findById(id).orElse(null);
		if(p==null) throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, "Foo Not Found");
		return p;
	}
	
	/*@PostMapping
	CreatorsWithTasks create(@RequestBody CreatorsWithTasks p) {
		repo.saveAndFlush(p);
		return p;
	}
	
	@PutMapping("/{id}")
	CreatorsWithTasks save(@PathVariable int id, @RequestBody CreatorsWithTasks p) {
		repo.saveAndFlush(p);
		return p;
	}
	
	@DeleteMapping("/{id}")
	RequestInfo delete(@PathVariable int id) {
		CreatorsWithTasks p =repo.findById(id).orElse(null);
		if(p==null)throw new ResponseStatusException(
				HttpStatus.NOT_FOUND,"Foo Not Found");
		repo.deleteById(id);
		return new RequestInfo("Deleted");
	}*/
	
}

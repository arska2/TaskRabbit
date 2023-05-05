package net.projekti.serverapplication.profile;

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
@RequestMapping("profiles")
public class ProfileController {
	@Autowired
	ProfileRepository repo;
	
	@GetMapping
	public List<Profile> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	Profile get(@PathVariable int id) {
		Profile p = repo.findById(id).orElse(null);
		if(p==null) throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, "Foo Not Found");
		return p;
	}
	
	@PostMapping
	Profile create(@RequestBody Profile p) {
		repo.saveAndFlush(p);
		return p;
	}
	
	@PutMapping("/{id}")
	Profile save(@PathVariable int id, @RequestBody Profile p) {
		repo.saveAndFlush(p);
		return p;
	}
	
	@DeleteMapping("/{id}")
	RequestInfo delete(@PathVariable int id) {
		Profile p =repo.findById(id).orElse(null);
		if(p==null)throw new ResponseStatusException(
				HttpStatus.NOT_FOUND,"Foo Not Found");
		repo.deleteById(id);
		return new RequestInfo("Deleted");
	}

}

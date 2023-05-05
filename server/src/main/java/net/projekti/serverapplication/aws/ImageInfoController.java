package net.projekti.serverapplication.aws;

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

import net.projekti.serverapplication.profile.Profile;
import net.projekti.serverapplication.task.RequestInfo;

@RestController
@RequestMapping("imageinfo")
public class ImageInfoController {
	@Autowired
	private ImageInfoRepository repo;
	
	
	@GetMapping
	public List<ImageInfo> getAll() {
		return repo.findAll();
	}
	
	@GetMapping("/{profileId}")
	ImageInfo get(@PathVariable int profileId) {
		return repo.findByProfileId(profileId);
		
	}
	
	@PostMapping
	ImageInfo  create(@RequestBody ImageInfo  i) {
		repo.saveAndFlush(i);
		return i;
	}
	
	@PutMapping("/{id}")
	ImageInfo  save(@PathVariable int id, @RequestBody ImageInfo i) {
		repo.saveAndFlush(i);
		return i;
	}
	
	@DeleteMapping("/{id}")
	RequestInfo delete(@PathVariable int id) {
		ImageInfo  i =repo.findById(id).orElse(null);
		if(i==null)throw new ResponseStatusException(
				HttpStatus.NOT_FOUND,"Foo Not Found");
		repo.deleteById(id);
		return new RequestInfo("Deleted");
	}
	
}

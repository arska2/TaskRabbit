package net.projekti.serverapplication.reviewwithprofiles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("reviewapi")
public class ReviewWithProfilesController {
	@Autowired
	private ReviewWithProfilesRepository repo;
	
	@GetMapping
	public List<ReviewWithProfiles> getAll() {
		return repo.findAll();
	}
}

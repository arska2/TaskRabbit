package net.projekti.serverapplication.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/token")
public class TokenController {
	@Autowired
	TokenRepository repo;
	
	@PostMapping
	Token create(@RequestBody Token t) {
		repo.saveAndFlush(t);
		return t;
	}
}

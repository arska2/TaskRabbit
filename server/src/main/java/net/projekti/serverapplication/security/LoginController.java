package net.projekti.serverapplication.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/login")
public class LoginController {
	@Autowired
	UserRepository repo;
	
	@GetMapping
	public User getLoggedInUser(){
		SecurityContext sc = SecurityContextHolder.getContext();
		Authentication a = sc.getAuthentication();
		User user = new User();
		user.setId(0L);
		if (a.getPrincipal().getClass()!=UserPrincipal.class) return user;
		if (a.isAuthenticated()) user=((UserPrincipal)a.getPrincipal()).getUser();
		user.setPassword(""); //Do not show the crypted password
		return user;
	}
	
	@Autowired
	BCryptPasswordEncoder encoder;
	
	@PostMapping
	//@Secured("admin")  // Remove this for first few users....
	public User createUser(@RequestBody User user) {
		System.out.println("Luodaan " + user.getUsername());
		String pw = encoder.encode(user.getPassword());
		user.setPassword(pw);
		String role = "user";
		if (user.getRole()!=null) role = user.getRole();
		//user.setEnabled(true);
		user.setRole(role);
		repo.save(user);
		return user;
	}
	
	
	@Autowired
	private AuthenticationManager authenticationManager;

	
	@PutMapping
	public ResponseEntity<?> login(@RequestBody User user,HttpServletRequest req) throws Exception {
		User userRet = null;
		try {
			Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
			SecurityContext sc = SecurityContextHolder.getContext();
			sc.setAuthentication(auth);
			HttpSession session = req.getSession(true);		
			session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
			UserPrincipal up = (UserPrincipal)auth.getPrincipal();
			userRet = up.getUser();
			userRet.setPassword(""); // Do not show the crypted password
			System.out.println("put "+auth.isAuthenticated()+","+auth.getName()+","+auth.getPrincipal()+","+
					auth.getAuthorities().stream().map(x -> x.getAuthority()).collect(Collectors.joining(":")));
		} catch (BadCredentialsException e) {
			return new ResponseEntity<LoginResponse>(new LoginResponse("Bad credentials"),HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<User>(userRet,HttpStatus.OK);
	}
		
	@DeleteMapping
	public LoginResponse testDelete(HttpServletRequest req) {
		HttpSession session = req.getSession(true);		
		session.removeAttribute(SPRING_SECURITY_CONTEXT_KEY);
		return new LoginResponse("Cleared session");
	}
}

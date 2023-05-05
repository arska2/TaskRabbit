package net.projekti.serverapplication.taskwithprofiles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import net.projekti.serverapplication.profile.Profile;
import net.projekti.serverapplication.profile.ProfileRepository;



@RestController
@RequestMapping("tasksAPI")
public class TaskWithProfilesController {
	@Autowired
	private TaskWithProfilesRepository repo;
	
	@Autowired 
	private ProfileRepository profileRepo;
	
	@GetMapping
	public List<TaskWithProfiles> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{taskId}")
	public TaskWithProfiles get(@PathVariable int taskId) {
		TaskWithProfiles t = repo.findById(taskId).orElse(null);
		if(t==null) throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, "Foo Not Found");
		return t;
	}
	
	@GetMapping("/profile/{id}")
	public List<TaskWithProfiles> getByProfileId(@PathVariable int id) {
		return repo.findAllTasksByProfileId(id);
	}
	
	
	@GetMapping("/profile/{id}/created")
	public List<TaskWithProfiles> getCreatedTasks(@PathVariable int id) {
		return repo.findByCreatorId(id);
	}
	
	@GetMapping("/profile/{id}/performer")
	public List<TaskWithProfiles> getPerfomerTasks(@PathVariable int id) {
		return repo.findByPerformerId(id);
	}
	
	@GetMapping("/profile/{id}/inProgress")
	public List<TaskWithProfiles> getTasksInProgress(@PathVariable int id) {
		return repo.findPerfomedTasksByStatus(id, "unavailable");
	}
	
	@GetMapping("/profile/{id}/done")
	public List<TaskWithProfiles> getTasksDone(@PathVariable int id) {
		return repo.findPerfomedTasksByStatus(id, "done");
	}
	@GetMapping("inArea")
	public List<TaskWithProfiles> getTasksInArea(
	        @RequestParam("minLat") Double minLat,
	        @RequestParam("maxLat") Double maxLat,
	        @RequestParam("minLng") Double minLng,
	        @RequestParam("maxLng") Double maxLng) {
        return repo.findByLatitudeBetweenAndLongitudeBetween(minLat, maxLat, minLng, maxLng);
    }
	
	@GetMapping("/profile/{profileId}/statistics")
	public ResponseEntity<TaskStatistics> getStatistics(@PathVariable int profileId) {
		Profile profile = profileRepo.findById(profileId)
				.orElse(null);
		if (profile == null) return null;
		int completedTasksCount = repo.countByPerformerIdAndStatus(profile.getId(), "done");
	    int inProgressTasksCount = repo.countByPerformerIdAndStatus(profile.getId(), "unavailable");
	    int tasksCreatedCount = repo.countByCreatorId(profile.getId());
	    List<Object[]> rankings = repo.findCompletedTaskRank();
	    
	    int taskRabbitRank = -1;
	    int index = 0;
		for (Object[] row : rankings) {
			index++;
		   if (row[0] == null) continue;
		   if (row[0] == profile.getId()) taskRabbitRank = index;
		}
	    
	    
	    TaskStatistics statistics = new TaskStatistics(completedTasksCount, inProgressTasksCount,tasksCreatedCount, taskRabbitRank);
		
		return ResponseEntity.ok().body(statistics);
	}
	
}

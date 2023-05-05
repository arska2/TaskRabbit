package net.projekti.serverapplication.aws;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageInfoRepository extends JpaRepository<ImageInfo, Integer>{
	
	
	ImageInfo findByProfileId(int profileId);
}

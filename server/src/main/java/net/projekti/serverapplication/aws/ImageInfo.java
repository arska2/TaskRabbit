package net.projekti.serverapplication.aws;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="aws_images")
public class ImageInfo {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(name="profile_id")
	private Integer profileId;
	@Column(name="profile_image_url")
	private String profileImageUrl;
	@Column(name="header_image_url")
	private String headerImageUrl;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getProfileId() {
		return profileId;
	}
	public void setProfileId(Integer profileId) {
		this.profileId = profileId;
	}
	public String getProfileImageUrl() {
		return profileImageUrl;
	}
	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}
	public String getHeaderImageUrl() {
		return headerImageUrl;
	}
	public void setHeaderImageUrl(String headerImageUrl) {
		this.headerImageUrl = headerImageUrl;
	}
	
	
	
}

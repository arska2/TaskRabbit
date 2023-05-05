package net.projekti.serverapplication.security;

public class LoginResponse {
	private String message;
	
	public LoginResponse(String m) {
		message = m;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}

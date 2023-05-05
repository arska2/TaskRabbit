package net.projekti.serverapplication.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Message {

	@Autowired
	WebSocketServer server;

	String msg = "Moikka serveriltä!";
	
	@Scheduled(fixedRate=2000)
	public void koe() {
		server.sendToAll(msg);
	}
}

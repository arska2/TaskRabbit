package net.projekti.serverapplication.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class WebSocketServer extends TextWebSocketHandler{

	//List sessions = new CopyOnWriteArrayList<>(); //Thread-safe, should be used in multi-user environments....
		List<WebSocketSession> sessions=new ArrayList<>(); // Not thread-safe

		public WebSocketServer() {
			System.out.println("Socket server is running");
		}
		
		@Override
		public void handleTextMessage(WebSocketSession session, TextMessage message) throws InterruptedException, IOException {
			System.out.println("Got message:"+message.getPayload());
			String msg = message.getPayload().toString();
			sendToAll(msg);
		}

		@Override
		public void afterConnectionEstablished(WebSocketSession session) throws Exception {
			System.out.println("Connection uri: "+session.getUri());
			sessions.add(session);
		}

		public void sendToAll(String msg) {
			for(WebSocketSession session : sessions) {
				try {
					session.sendMessage(new TextMessage(msg));
				}
				catch(IOException ex) {
					System.out.println("Error sending");
				}
			}		
		}

		@Override
		public void afterConnectionClosed(WebSocketSession session,CloseStatus status) throws Exception{
			sessions.remove(session);
			System.out.println("Sessions remaining:"+sessions.size());
		}
}

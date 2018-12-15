package es.snadker.gamedev.RUNRockPaperScissors;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class GameHandler  extends TextWebSocketHandler{
	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	GameController gameController = new GameController();
	
	// Invoked after WebSocket negotiation has succeeded and the WebSocket
	// connection is opened and ready for use.
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		System.out.println("Conected");
	}
	
	// Invoked after the WebSocket connection has been closed by either side, or
	// after a transport error has occurred. Although the session may technically
	// still be open, depending on the underlying implementation, sending messages
	// at this point is discouraged and most likely will not succeed.
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
	
	// Invoked when a new WebSocket message arrives.
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
			
			case "GET_N_PLAYERS":

				json.put("type", "N_PLAYERS");
				json.put("nPlayers", gameController.getPlayers());

				session.sendMessage(new TextMessage(json.toString()));

				if (debug)
					System.out.println("[DEBUG] " + json.toString());
				break;
			case "CREATE_PLAYER":
				gameController.newPlayer();
				break;
			case "UPDATE_MODE":
				gameController.updateMode(node.get("gameMode").asInt());
				break;
			case "GET_MODE":
				json.put("type", "MODE");
				json.put("gameMode", gameController.getMode());

				session.sendMessage(new TextMessage(json.toString()));
				break;
			case "GET_GAMEMAP":
				json.put("type", "GAMEMAP");
				json.put("gameMap", gameController.getMap().toString());

				session.sendMessage(new TextMessage(json.toString()));
				break;
			case "GET_RANDOM_MAP":
				json.put("type", "RANDOM_MAP");
				json.put("gameMap", gameController.getRandomMap().toString());

				session.sendMessage(new TextMessage(json.toString()));
				break;
			case "READY":
				gameController.ready();
				break;
			case "GET_READY":
				json.put("type", "READY");
				json.put("ready", gameController.getReady());

				session.sendMessage(new TextMessage(json.toString()));
				break;
				
			default:
				break;
			}
		}
	}
}

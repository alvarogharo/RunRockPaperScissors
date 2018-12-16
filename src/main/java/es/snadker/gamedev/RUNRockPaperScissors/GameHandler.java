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
				json.put("gameMap", gameController.getMap());

				session.sendMessage(new TextMessage(json.toString()));
				break;
			case "GET_RANDOM_MAP":
				json.put("type", "RANDOM_MAP");
				json.put("gameMap", gameController.getRandomMap());

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
			case "UPDATE_PLAYER":
				int[] aux = new int[2];
				aux[0] = node.get("position").get(0).asInt();
				aux[1] = node.get("position").get(1).asInt();
				
				gameController.updatePlayer(node.get("id").asInt(), aux);
				
				break;
			case "GET_PLAYER":
				long id = node.get("id").asLong();
				int[] aux2 = new int[2];
				
				aux2[0] = gameController.getPlayerPos(id)[0];
				aux2[1] = gameController.getPlayerPos(id)[1];
				
				String pos = "["+aux2[0]+","+aux2[1]+"]";
				
				json.put("type", "PLAYER");
				json.put("id", node.get("id").asText());
				json.put("position", pos);
				
				session.sendMessage(new TextMessage(json.toString()));
				break;
			case "GET_COUNTDOWN":
				json.put("type", "COUNTDOWN");
				json.put("countdown", gameController.getTimer());
				
				session.sendMessage(new TextMessage(json.toString()));
				break;
			case "START_TIMER":
				gameController.startTimer();
				break;
			case "RESTART_TIMER":
				gameController.restartTimer();
				break;
			case "RESET_READY":
				gameController.reset();
				break;
				
			default:
				break;
			}
		}
	}
}

package es.snadker.gamedev.RUNRockPaperScissors;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

public class GameController {
	
	//Storage Objects
	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	AtomicLong restartCount = new AtomicLong(0);
	
	//State objects
	Timer timer =  new Timer();
	GameMap map  = new GameMap();
	
	//Auxiliar objects
	Random rnd = new Random();
	
	//State variable
	int mode = 0;
	
	
	//Gets mode
	public int getMode() {
		return mode;
	}
	
	//Gets the number of players
	public int getPlayers() {
		return players.values().size();
	}
	
	//Get the map rooms
	public String getMap() {
		return map.getRooms();
	}
	
	//Gets a random map
	public String getRandomMap() {
		return map.getRandomMap();
	}
	
	//Get timer count
	public long getTimer() {
		System.out.println(timer.getCount());
		return timer.getCount();
	}
	
	//Get and restart timer
	public long restartTimer() {
		timer.reset();
		return timer.getCount();
	}
	
	//Gets the number players ready
	public int getReady() {
		return restartCount.intValue();
	}
	
	//Increments players ready by one
	public int ready() {
		return (int)restartCount.getAndIncrement();
	}
	
	//Reset timer count
	public void reset() {
		restartCount.set(0);
	}
	
	//Starts timer
	public Long startTimer() {
		timer.startTimer();
		return timer.getCount();
	}
	
	//Creates a new player
	public Player newPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		player.setX(0);
		player.setY(0);
		players.put(player.getId(), player);
		return player;
	}

	//Gets the player position by id
	public int[] getPlayerPos(long id) {
		Player player = players.get(id);
		int[] pos = new int[2];
		pos[0] = player.getX();
		pos[1] = player.getY();
		
		return pos;
	}
	
	//Updates game mode
	public int updateMode(int mode) {
		this.mode = mode;
		System.out.println(mode);
		return mode;
	}

	//Updates player position by id
	public int[] updatePlayer(long id, int[] pos) {
		Player savedPlayer = players.get(id);

		savedPlayer.setX(pos[0]);
		savedPlayer.setY(pos[1]);
		return pos;
	}
	
	//Errase every palyer in server and restarts it
	public void erraseEverything() {
		players.clear();
		nextId.set(0);
	}
}

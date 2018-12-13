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

@RestController
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
	@GetMapping(value = "/mode")
	public int getMode() {
		return mode;
	}
	
	//Gets the number of players
	@GetMapping(value = "/game")
	public Collection<Player> getPlayers() {
		return players.values();
	}
	
	//Get the map rooms
	@GetMapping(value = "/map")
	public int[][] getMap() {
		return map.getRooms();
	}
	
	//Gets a random map
	@GetMapping(value = "/randomMap")
	public int[][] getRandomMap() {
		return map.getRandomMap();
	}
	
	//Get timer count
	@GetMapping(value = "/cd")
	public long getTimer() {
		System.out.println(timer.getCount());
		return timer.getCount();
	}
	
	//Get and restart timer
	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/cdRestart")
	public long restartTimer() {
		timer.reset();
		return timer.getCount();
	}
	
	//Gets the number players ready
	@GetMapping(value = "/ready")
	public int getReady() {
		System.out.println("Ready: "+ restartCount.intValue());
		return restartCount.intValue();
	}
	
	//Increments players ready by one
	@PostMapping(value = "/ready")
	@ResponseStatus(HttpStatus.CREATED)
	public void ready() {
		restartCount.getAndIncrement();
	}
	
	//Reset timer count
	@PostMapping(value = "/reset")
	@ResponseStatus(HttpStatus.CREATED)
	public void reset() {
		restartCount.set(0);
	}
	
	//Starts timer
	@PostMapping(value = "/cd")
	@ResponseStatus(HttpStatus.CREATED)
	public Long startTimer() {
		timer.startTimer();
		return timer.getCount();
	}
	
	//Creates a new player
	@PostMapping(value = "/game")
	@ResponseStatus(HttpStatus.CREATED)
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
	@GetMapping(value = "/game/{id}")
	public ResponseEntity<int[]> getPlayerPos(@PathVariable long id) {
		Player player = players.get(id);
		int[] pos = new int[2];
		if (player != null) {
			pos[0] = player.getX();
			pos[1] = player.getY();
			return new ResponseEntity<>(pos, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//Updates game mode
	@PutMapping(value = "/game")
	public ResponseEntity<Integer> updateMode(@RequestBody int mode) {
		if (mode != 0) {
			this.mode = mode;
			System.out.println(mode);
			return new ResponseEntity<>(mode, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	//Updates player position by id
	@PutMapping(value = "/game/{id}")
	public ResponseEntity<int[]> updatePlayer(@PathVariable long id, @RequestBody int[] pos) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.get(id).setX(pos[0]);
			players.get(id).setY(pos[1]);
			return new ResponseEntity<>(pos, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//Errase every palyer in server and restarts it
	@DeleteMapping(value = "/game/")
	public void erraseEverything() {
		players.clear();
		nextId.set(0);
	}
}

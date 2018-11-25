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

	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	Timer timer =  new Timer();
	int mode = 0;
	GameMap map  = new GameMap();
	
	Random rnd = new Random();
	Cat cat = new Cat();
	

	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/game")
	public Collection<Player> getPlayers() {
		return players.values();
	}
	
	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/map")
	public int[][] getMap() {
		return map.getRooms();
	}
	
	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/cd")
	public long getTimer() {
		System.out.println(timer.getCount());
		return timer.getCount();
	}
	
	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/cdRestart")
	public long restartTimer() {
		timer.reset();
		return timer.getCount();
	}
	
	// Con POST creamos un nuevo jugador
	@PostMapping(value = "/cd")
	@ResponseStatus(HttpStatus.CREATED)
	public Long startTimer() {
		timer.startTimer();
		return timer.getCount();
	}
	
	// Con POST creamos un nuevo jugador
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

	// Con este GET, podemos recuperar la información particular de cada uno de los
	// jugadores
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
	
	// Con este PUT actualizamos la información del modo de juego de la partida
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

	// Con este PUT actualizamos la información del jugador con ID = id
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

	// Con este DELETE borramos el jugador con ID = id
	@DeleteMapping(value = "/game/{id}")
	public ResponseEntity<Player> borraJugador(@PathVariable long id) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}

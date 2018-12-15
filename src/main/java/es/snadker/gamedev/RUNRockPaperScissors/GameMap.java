package es.snadker.gamedev.RUNRockPaperScissors;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class GameMap {

	private int[][] level0 = { { -1, -1, -1, -1, -1, -1 }, { -1, -1, -1, -1, -1, -1 }, { 1, 0, 5, 4, 0, 2 },
			{ 0, 0, 4, 3, 0, 0 }, { -1, -1, -1, -1, -1, -1 }, { -1, -1, -1, -1, -1, -1 } };

	private int[][] level1 = { { -1, -1, -1, -1, 1, 2 }, { -1, -1, -1, -1, 0, 0 }, { -1, -1, -1, -1, 0, 0 },
			{ 3, 0, -1, -1, 0, 0 }, { 0, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0, 0, 0 } };

	private int[][] level2 = { { -1, -1, 4, 0, 0, 2 }, { -1, -1, -1, 0, 0, 0 }, { 5, -1, -1, -1, 0, 0 },
			{ 0, 0, -1, -1, -1, 3 }, { 0, 0, 0, -1, -1, -1 }, { 1, 0, 0, 4, -1, -1 } };

	private int[][] level3 = { { 5, 0, -1, -1, 0, 5 }, { -1, 0, 0, 0, 0, -1 }, { -1, -1, 0, 0, -1, -1 },
			{ -1, -1, 0, 0, -1, -1 }, { 4, -1, 0, 0, -1, 4 }, { 1, 0, 0, 0, 0, 2 } };

	private int[][] level4 = { { -1, -1, 0, 5, -1, -1 }, { -1, -1, 0, 0, -1, -1 }, { 0, 0, 1, 0, 0, 4 },
			{ 4, 0, 0, 2, 0, 0 }, { -1, -1, 0, 0, -1, -1 }, { -1, -1, 3, 0, -1, -1 } };

    List<int[][]> levels = new ArrayList<int[][]>();

	private int[][] rooms = new int[0][0];
	
	public GameMap(){
		levels.add(level0);
		levels.add(level1);
		levels.add(level2);
		levels.add(level3);
		levels.add(level4);
		
		Random rand = new Random();
		int aux = rand.nextInt(levels.size());
		
		rooms = levels.get(aux);
	}
	
	public int[][] getRandomMap(){
		Random rand = new Random();
		int aux = rand.nextInt(levels.size());
		
		rooms = levels.get(aux);
		
		return rooms;
	}
	
	@Override
	public String toString() {
		String rms;
		rms = "[";
		for (int i = 0; i < rooms[0].length; i++) {
			rms += "[";
			for (int j = 0; j < rooms.length; j++) {
				if(j != rooms.length-1){
					rms += ""+rooms[j][i]+",";
				}else{
					rms += ""+rooms[j][i];
				}
			}
			rms += "]";
		}
		rms += "]";
		
		return rms;
	}

	public int[][] getRooms() {
		return rooms;
	}

	public void setRooms(int[][] rooms) {
		this.rooms = rooms;
	}
}

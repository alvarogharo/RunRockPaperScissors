package es.snadker.gamedev.RUNRockPaperScissors;

import java.util.ArrayList;
import java.util.List;

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

	private int[] p1Pos = { 0, 0 };
	private int[] p2Pos = { 0, 0 };

	// Fill the map withempty rooms
	public void fullMap() {
		for (int i = 0; i < rooms[0].length; i++) {
			for (int j = 0; j < rooms.length; j++) {
				rooms[i][j] = new Room(i, j, "nothing");
			}
		}
	}

	public void createLevel(int[][] level) {
		for (int i = 0; i < rooms[0].length; i++) {
			for (int j = 0; j < rooms.length; j++) {
				switch (level[i][j]) {
				case -1:
					rooms[j][i] = null;
					break;
				case 0:
					rooms[j][i] = new Room(i, j, "nothing");
					break;
				case 1:
					rooms[j][i] = new Room(i, j, "nothing");
					rooms[j][i].setPlayer("p1");
					p1Pos[0] = j;
					p1Pos[1] = i;
					break;
				case 2:
					rooms[j][i] = new Room(i, j, "nothing");
					rooms[j][i].setPlayer("p2");
					p2Pos[0] = j;
					p2Pos[1] = i;
					break;
				case 3:
					rooms[j][i] = new Room(i, j, "rock");
					break;
				case 4:
					rooms[j][i] = new Room(i, j, "paper");
					break;
				case 5:
					rooms[j][i] = new Room(i, j, "scissors");
					break;
				}
			}
		}
	}
	
	@Override
	public String toString() {
		String rms;
		rms = "Rooms: [";
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
}

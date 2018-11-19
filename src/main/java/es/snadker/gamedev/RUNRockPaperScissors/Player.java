package es.snadker.gamedev.RUNRockPaperScissors;

public class Player {

	private long id;
	private int x, y;
	private int lastX, lastY;
	private int score;
	
	Player() {
		this.score = 0;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getLastX() {
		return lastX;
	}

	public void setLastX(int lastX) {
		this.lastX = lastX;
	}

	public int getLastY() {
		return lastY;
	}

	public void setLastY(int lastY) {
		this.lastY = lastY;
	}
	
	@Override
	public String toString() {
		return "Player [id=" + id + ", x=" + x + ", y=" + y + ", lastX=" + lastX + ", lastY=" + lastY + ", score=" + score + "]";
	}

}

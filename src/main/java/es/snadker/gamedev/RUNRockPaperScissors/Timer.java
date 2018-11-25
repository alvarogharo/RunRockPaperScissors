package es.snadker.gamedev.RUNRockPaperScissors;

public class Timer {
	private long count;
	private long startTime;
	private long currentTime;
	
	public void startTimer(){
		count = 0;
		currentTime = 0;
		startTime = System.currentTimeMillis();
	}
	
	public void reset(){
		count = 0;
		currentTime = 0;
		startTime = 0;
	}
	
	public long getCount() {
		currentTime = System.currentTimeMillis();
		count = currentTime - startTime;
		count = count /1000;
		if (count > 100){
			count = 0;
		}
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	public long getStartTime() {
		return startTime;
	}
	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}
	public long getCurrentTime() {
		return currentTime;
	}
	public void setCurrentTime(long currentTime) {
		this.currentTime = currentTime;
	}
	
	
}

package com.weather.model;

public class Measurement {
	private String date, temperature, precipitation;
	private int hour;
	
	public Measurement(){};
	
	public Measurement(String date, int hour, String temperature, String precipitation) {
		this.date = date;
		this.hour = hour;
		this.temperature = temperature;
		this.precipitation = precipitation;
	}
	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getPrecipitation() {
		return precipitation;
	}

	public void setPrecipitation(String precipitation) {
		this.precipitation = precipitation;
	}
	
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}	
}

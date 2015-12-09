package com.weather.model;

public class Response {
	private String session;
	private Measurement[] measurements;
	public String getSession() {
		return session;
	}
	public void setSession(String session) {
		this.session = session;
	}
	public Measurement[] getMeasurements() {
		return measurements;
	}
	public void setMeasurements(Measurement[] measurements) {
		this.measurements = measurements;
	}
}

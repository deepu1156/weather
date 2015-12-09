package com.weather.service;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.weather.model.Measurement;
import com.weather.model.SelectionCriteria;
/*
 * Service class that will be called from controller. Generates random weather measurements based on given selection criteria
 */
@Service
public class WeatherService {
	public Measurement[] getMeasurement(SelectionCriteria criteria) {
		Measurement[] measurements = null;		
		LocalDate start = LocalDate.parse(criteria.getFromValue()),
				  end = LocalDate.parse(criteria.getToValue());		
		long days = ChronoUnit.DAYS.between(start, end);		
		if (days == 0) {
			measurements = generateEventsForDate(start);
		} 
		else if (days > 31) {
			measurements = generateEventsForYear(start,end);
		}
		else {
			measurements = generateEventsForRange(start,end);
		}				
		return measurements;
	}
	private Measurement[] generateEventsForDate(LocalDate date) {		
		List<Measurement> list = new ArrayList<Measurement>();
		Measurement measurement = null;		
		for (int i=0; i<24; i++) {
			measurement =  new Measurement(date.toString(),i,getRandomNumbers(20,100),getRandomNumbers(1,100));			
			list.add(measurement);			
		}				
		return list.toArray(new Measurement[list.size()]);
	}
	private Measurement[] generateEventsForYear(LocalDate start, LocalDate end) {		
		List<Measurement> list = new ArrayList<Measurement>();
		Measurement measurement = null;
		for (int i=0; i<12; i++) {
			measurement =  new Measurement(start.plusMonths(i).toString(),1,getRandomNumbers(20,100),getRandomNumbers(1,100));		
			list.add(measurement);
		}				
		return list.toArray(new Measurement[list.size()]);
	}
	private Measurement[] generateEventsForRange(LocalDate start, LocalDate end) {	
		List<Measurement> list = new ArrayList<Measurement>();
		Measurement measurement = null;
		LocalDate next = start;
		while(next.isBefore(end.plusDays(1))){
			measurement =  new Measurement(next.toString(),1,getRandomNumbers(20,100),getRandomNumbers(1,100));			
			list.add(measurement);
			next = next.plusDays(1);
		}						
		return list.toArray(new Measurement[list.size()]);
	}
	/*
	 * Generates random numbers between given lower bound and upper bound
	 */
	private String getRandomNumbers(int lb, int ub) {
		int temp = ub - lb;
		DecimalFormat df = new DecimalFormat("#.##");
		df.setRoundingMode(RoundingMode.CEILING);
		return df.format((Math.random()*temp)+lb);				
	}
}

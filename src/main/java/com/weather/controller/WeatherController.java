package com.weather.controller;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.weather.model.Measurement;
import com.weather.model.Response;
import com.weather.model.SelectionCriteria;
import com.weather.service.WeatherService;
/*
 * Handles the URL and Stomp Messaging requests
 */
@Controller
public class WeatherController {
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@Autowired
	private WeatherService service;
	
	@Autowired
	private ConcurrentHashMap<String,SelectionCriteria> userSessionMap;
	
	@Value("${push.interval}")
    private long interval;
	
	/*
	 * Client will be sending requests to this Stomp end point during initial load.
	 * After serving the data, thread will sleep for user defined time period
	 * Messages are sent to the subscription /topic/weather
	 */
    @MessageMapping("/weather")
    public void weather(SelectionCriteria criteria, StompHeaderAccessor sha) {
    	try {
    		if (userSessionMap.containsKey(sha.getSessionId())) {
    			userSessionMap.put(sha.getSessionId(), criteria);
    		}
    		while(userSessionMap.containsKey(sha.getSessionId())) {
    			criteria = userSessionMap.get(sha.getSessionId());
    			if (criteria != null) {
    				System.out.println("Selection Criteria -" + criteria.getFromValue() + " " + criteria.getToValue());
        			Response response = new Response();
        			response.setSession(sha.getSessionId());
        			response.setMeasurements(service.getMeasurement(criteria));
    				this.template.convertAndSend("/topic/weather",response);
    			}    			
    			Thread.sleep(interval);
    		}    		        	
    	}
    	catch(Exception e) {
    		System.out.println("Exception occured in Weather Method");
    		e.printStackTrace();
    	}    	
    }   
    /*
     * Method to handle requests for weather measurements for a given start and end dates
     */
    @RequestMapping(value = { "/getWeather" }, method = RequestMethod.GET)
    @ResponseBody
    public Measurement[] getWeather(@RequestParam("start") String start, @RequestParam("end") String end, @RequestParam("session") String session) {
    	try {    		
    		System.out.println("In GetWeather Method. Start: " + start + " end: " + end + " sessionid: " + session);
    		SelectionCriteria criteria = new SelectionCriteria();
    		criteria.setFromValue(start);
    		criteria.setToValue(end);
    		if(userSessionMap.containsKey(session)) {
    			System.out.println("Selection Criteria changed. From: " + criteria.getFromValue() + " To: " + criteria.getToValue());
    			userSessionMap.put(session, criteria);
    		} else {
    			System.out.println("Invalid session requested from Client");
    		}
    		return service.getMeasurement(criteria);
    	}
    	catch(Exception e) {
    		System.out.println("Exception occured in getWeather Method");
    		e.printStackTrace();
    		return new Measurement[1];
    	}		
    }
    @RequestMapping(value = { "/updateInterval" }, method = RequestMethod.GET)
    @ResponseBody
    public String updateInterval(@RequestParam("poll") int poll) {
    	this.interval = poll*1000;
    	System.out.println("Updated interval to " + poll + " Seconds");
    	return "1";
    }
}
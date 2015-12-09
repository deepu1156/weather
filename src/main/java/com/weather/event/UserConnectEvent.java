package com.weather.event;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import com.weather.model.SelectionCriteria;
/*
 * This event is called when User Stomp session is connected
 */
@Component
public class UserConnectEvent implements ApplicationListener<SessionConnectedEvent> {
	
	@Autowired
	private ConcurrentHashMap<String,SelectionCriteria> userSessionMap;
	
	@Override
    public void onApplicationEvent(SessionConnectedEvent event) {    	  
		StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
		if (!userSessionMap.containsKey(sha.getSessionId())){
			System.out.println("Adding Session Id - " + sha.getSessionId());
			userSessionMap.put(sha.getSessionId(), new SelectionCriteria());
		}		
    }
}
package com.weather.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.weather.model.SelectionCriteria;

import java.util.concurrent.ConcurrentHashMap;
/*
 * Concurrent HashMap is created as a singleton bean. This will be referenced by multiple beans in the application
 */
@Configuration
public class BeanConfig {
	@Bean
	public ConcurrentHashMap<String,SelectionCriteria> userSessionMap(){		
		ConcurrentHashMap<String,SelectionCriteria>  map = new ConcurrentHashMap<String,SelectionCriteria>();						
		return map;
	}
}

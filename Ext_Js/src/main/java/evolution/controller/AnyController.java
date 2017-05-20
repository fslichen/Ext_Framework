package evolution.controller;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import evolution.controller.dto.AnyDto;

@RestController
public class AnyController {
	@PostMapping("/post")
	public List<AnyDto> post() {
		System.out.println("Hello World");
		List<AnyDto> anyDtos = new LinkedList<>();
		for (int i = 0; i < 10; i++) {
			anyDtos.addAll(Arrays.asList(new AnyDto(i * 10 + "0", "Chen", "CS", "Architect"), 
					new AnyDto(i * 10 + "1", "Ling", "MD", "Ph.D"),
					new AnyDto(i * 10 + "2", "Elsa", "CS", "Programmer"),
					new AnyDto(i * 10 + "3", "Anna", "CS", "Manager")));
		}
		return anyDtos;
	}
}

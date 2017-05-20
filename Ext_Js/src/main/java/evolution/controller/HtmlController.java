package evolution.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HtmlController {
	@GetMapping("/html")
	public String html(@RequestParam("q") String html) {
		return "/" + html + ".html";
	}
}

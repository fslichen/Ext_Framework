package evolution;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnyController {
	@PostMapping("/post")
	public String post() {
		return "Hello World";
	}
}

package evolution.controller.dto;

public class AnyDto {
	private String id;
	private String name;
	private String position;
	private String ambition;
	public AnyDto() {

	}
	public AnyDto(String id, String name, String position, String ambition) {
		this.id = id;
		this.name = name;
		this.position = position;
		this.ambition = ambition;
	}
	public String getAmbition() {
		return ambition;
	}
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getPosition() {
		return position;
	}
	public void setAmbition(String ambition) {
		this.ambition = ambition;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	@Override
	public String toString() {
		return "AnyDto [id=" + id + ", name=" + name + ", position=" + position + ", ambition=" + ambition + "]";
	}
}

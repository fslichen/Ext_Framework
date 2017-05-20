function columns(columnNames) {
	// Create Columns
	var columns = new Array();
	for (var i = 0; i < columnNames.length; i++) {
		columns.push({header : columnNames[i], width: 250, dataIndex: columnNames[i]});
	}
	return columns;
}
function rows(columnNames, responseJson) {
	// Create Rows
	var rows = new Array();
	for (var i = 0; i < responseJson.length; i++) {
		var row = new Array();
		for (var j = 0; j < columnNames.length; j++) {
			row.push(responseJson[i][columnNames[j]]);
		}
		rows.push(row);
	}
	return rows;
}
function fields(columnNames) {
	var fields = new Array();
	for (var i = 0; i < columnNames.length; i++) {
		fields.push({name : columnNames[i]});
	}
	return fields;
}
function defaultHeight(height) {
	return height == null ? 1500 : height;
}
function defaultWidth(width) {
	return width == null ? 1500 : width;
}
function defaultTitle(title) {
	return title == null ? 'Ext-Framework' : title;
}
function print(columnNames, responseJson, target, height, width, title) {
	// Data
	fields = fields(columnNames);
	var store = new Ext.data.SimpleStore({
	    fields : fields
	});
	store.loadData(rows(columnNames, responseJson));
	// Grid
	var anyGrid = new Ext.grid.GridPanel({
	    store : store,
	    columns : columns(columnNames),
	    stripeRows : true,
	    height : defaultHeight(height),
	    width : defaultWidth(width),
	    title : defaultTitle(title)
	});
	// Render
	anyGrid.render(target);        
}
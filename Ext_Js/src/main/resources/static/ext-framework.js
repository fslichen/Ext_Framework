function fields(columnNames) {
	var fields = new Array();
	fields.push({name : 'id', type : 'int'});
	for (var i = 0; i < columnNames.length; i++) {
		fields.push({name : columnNames[i]});
	}
	return fields;
}

function rows(columnNames, responseJson) {
	var rows = new Array();
	responseJson = JSON.parse(responseJson);
	for (var i = 0; i < responseJson.length; i++) {
		var row = new Array();
		row.push(i);
		for (var j = 0; j < columnNames.length; j++) {
			row.push(responseJson[i][columnNames[j]]);
		}
		rows.push(row);
	}
	return rows;
}

function columns(columnNames, columnAliases) {
	columnAliases = columnAliases == null ? columnNames : columnAliases;
	var columns = new Array();
	columns.push({id : 'id', dataIndex: 'id', header : 'ID', width: 64});
	for (var i = 0; i < columnNames.length; i++) {
		columns.push({dataIndex: columnNames[i], header : columnAliases[i], width: 128});
	}
	return columns;
}

function defaultTitle(title) {
	return title == null ? 'Ext-Framework' : title;
}

function print(columnNames, responseJson, columnAliases, target, title) {
	// Data
	fields = fields(columnNames);
	var store = new Ext.data.SimpleStore({
	    fields : fields
	});
	store.loadData(rows(columnNames, responseJson));
	// Grid
	var viewSize = Ext.getBody().getViewSize();
	var grid = new Ext.grid.GridPanel({
	    store : store,
	    columns : columns(columnNames, columnAliases),
	    stripeRows : true,
	    title : defaultTitle(title),
	    width : viewSize.width,
	    height : viewSize.height,
	});
	// Render
	grid.render(target);        
}
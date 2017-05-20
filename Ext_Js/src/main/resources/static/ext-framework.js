var panel;
var grid;

function getFields(columnNames) {
	var fields = new Array();
	fields.push({name : 'id', type : 'int'});
	for (var i = 0; i < columnNames.length; i++) {
		fields.push({name : columnNames[i]});
	}
	return fields;
}

// Extract columnNames from responseJson.
function getRows(columnNames, responseJson) {
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

function getColumns(columnNames, columnAliases) {
	columnAliases = columnAliases == null ? columnNames : columnAliases;
	var columns = new Array();
	columns.push({id : 'id', dataIndex: 'id', header : 'ID', width: 64});
	for (var i = 0; i < columnNames.length; i++) {
		columns.push({dataIndex: columnNames[i], header : columnAliases[i], width: 128});
	}
	return columns;
}

// Collect columnNames within responseJson and print columnAliases under target.
function setGrid(columnNames, responseJson, columnAliases, title) {
	// Data
	fields = getFields(columnNames);
	var store = new Ext.data.SimpleStore({
	    fields : fields
	});
	store.loadData(getRows(columnNames, responseJson));
	// Grid
	if (grid == null) {
		grid = new Ext.grid.GridPanel({
			store : store,
			columns : getColumns(columnNames, columnAliases),
			stripeRows : true,
			title : title == null ? 'Ext-Framework' : title,
			width : fullWidth(),
			height : fullHeight(),
		});
	}
}

function add2Container(item) {
	container.add(item);
}

function removeFromContainer(item) {
	container.remove(item);
}

// Send requestJson to url, print columnNames or columnAliases under target.
function post(requestJson, url, columnNames, columnAliases, title) {
	Ext.Ajax.request({
		url : url,// Example : /post
		jsonData: requestJson,// Example : {name : 'Chen'}
		success: function(responseJson) {
			var responseJson = responseJson.responseText;
			setGrid(columnNames, responseJson, columnAliases, title);
			add2Container(grid);
		},
		failure: function() {
			alert('Failure');
		}
	});
}

function fullWidth() {
	var viewSize = Ext.getBody().getViewSize();
	return viewSize.width;
}

function fullHeight() {
	var viewSize = Ext.getBody().getViewSize();
	return viewSize.height;
}

function addPanel() {
	var panel = Ext.create('Ext.panel.Panel', {
	    width: fullWidth(),
	    height: 100,
	    title: 'Hello'
	});
	add2Container(panel);
	return panel;
}

function addButton(buttonName, panel) {
	var button = Ext.create('Ext.Button', {
	    text : buttonName,
	    handler : function() {
	        alert('Did you just click the button?');
	    }
	});
	panel.add(button);
}

function addTextField(textFieldName, textFieldAlias, panel) {
	var textField = Ext.create('Ext.form.field.Text', {
        fieldLabel: textFieldAlias,
        name: textFieldName,
        itemId: textFieldName,
        autofocus: true,
        enableKeyEvents: true,
        labelAlign: 'right',
        labelWidth: 64,
        labelStyle: 'font-size: 16px;',
        width: 256
    });
	panel.add(textField);
}

var container;

function run(title) {
	container = Ext.create('Ext.panel.Panel', {
	    renderTo: Ext.getBody(),
	    width: fullWidth(),
	    height: fullHeight(),
	    title: title
	});
}
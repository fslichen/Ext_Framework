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
function setGrid(columnNames, responseJson, columnAliases) {
	// Data
	fields = getFields(columnNames);
	var store = new Ext.data.SimpleStore({
	    fields : fields
	});
	store.loadData(getRows(columnNames, responseJson));
	// Grid
	if (grid != null) {
		removeFromContainer(grid);
	}
	grid = new Ext.grid.GridPanel({
		store : store,
		columns : getColumns(columnNames, columnAliases),
		stripeRows : true,
		title : gridTitle == null ? 'Ext-Framework' : gridTitle,
		width : fullWidth(),
		height : fullHeight(),
	});
	add2Container(grid);
}

function add2Container(item) {
	container.add(item);
}

function removeFromContainer(item) {
	container.remove(item);
}

// Send requestJson to url, print columnNames or columnAliases under target.
function post() {
	Ext.Ajax.request({
		url : url,// Example : /post
		jsonData : requestData,// Example : {name : 'Chen'}. jsonData is not a json string.
		success : function(responseJson) {
			var responseJson = responseJson.responseText;
			setGrid(columnNames, responseJson, columnAliases);
		},
		failure : function() {
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

function addSubmitButton(buttonName, panel) {
	var button = Ext.create('Ext.Button', {
	    text : buttonName,
	    handler : function() {
	        post();
	    }
	});
	panel.add(button);
}

function addTextField(textFieldId, textFieldAlias, panel) {
	var textField = Ext.create('Ext.form.field.Text', {
        fieldLabel: textFieldAlias,
        name: textFieldId,
        itemId: textFieldId,
        autofocus: true,
        enableKeyEvents: true,
        labelAlign: 'right',
        labelWidth: 64,
        labelStyle: 'font-size: 16px;',
        width: 256,
        listeners: {
        	blur: function() {
        		requestData[this.itemId] = this.value;
        	}
        }
    });
	panel.add(textField);
}

var url;
var grid;
var container;
var gridTitle;
var columnNames;
var requestData;
var columnAliases;

function run(containerTitle, urlInput, columnNamesInput, columnAliasesInput, gridTitleInput) {
	container = Ext.create('Ext.panel.Panel', {
	    renderTo: Ext.getBody(),
	    width: fullWidth(),
	    height: fullHeight(),
	    title: containerTitle
	});
	requestData = {};
	url = urlInput;
	columnNames = columnNamesInput;
	columnAliases = columnAliasesInput;
	gridTitle = gridTitleInput;
}
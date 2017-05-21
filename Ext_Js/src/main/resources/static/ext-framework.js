function getFields() {
	var fields = new Array();
	fields.push({name : 'id', type : 'int'});
	for (var i = 0; i < columnNames.length; i++) {
		fields.push({name : columnNames[i]});
	}
	return fields;
}

// Extract columnNames from responseJson.
function getRows(responseJson) {
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

function getColumns() {
	columnLabels = columnLabels == null ? columnNames : columnLabels;
	var columns = new Array();
	columns.push({id : 'id', dataIndex: 'id', header : 'ID', width: 64});
	for (var i = 0; i < columnNames.length; i++) {
		columns.push({dataIndex: columnNames[i], header : columnLabels[i], width: 128});
	}
	return columns;
}

// Collect columnNames within responseJson and print columnLabels under target.
function setGrid(responseJson) {
	// Data
	fields = getFields();
	var store = new Ext.data.SimpleStore({
	    fields : fields
	});
	store.loadData(getRows(responseJson));
	// Grid
	if (grid != null) {
		removeFromContainer(grid);
	}
	grid = new Ext.grid.GridPanel({
		store : store,
		columns : getColumns(),
		stripeRows : true,
		title : gridTitle == null ? 'Ext-Framework' : gridTitle
	});
	add2Container(grid);
}

function add2Container(item) {
	container.add(item);
}

function removeFromContainer(item) {
	container.remove(item);
}

// Send requestJson to url, print columnNames or columnLabels under target.
function loadData() {
	Ext.Ajax.request({
		url : url,// Example : /post
		jsonData : requestData,// Example : {name : 'Chen'}. jsonData is not a json string.
		success : function(responseJson) {
			var responseJson = responseJson.responseText;
			setGrid(responseJson);
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

function addPanel(title, horizontal) {
	var panel = Ext.create('Ext.panel.Panel', {
	    title : title,
	    layout: horizontal == true ? 'hbox' : 'vbox'
	});
	add2Container(panel);
	return panel;
}

function addSubmitButton(label, panel) {
	var button = Ext.create('Ext.Button', {
	    text : label,
	    handler : function() {
	    	loadData();
	    }
	});
	panel.add(button);
}

function addDatePicker(id, label, panel) {
	var dateButton = Ext.create('Ext.Button', {
		text : label,
		handler : function() {
			var datePicker = Ext.create('Ext.menu.DatePicker', {
				floating : false,// Make it false otherwise the data picker won't show up.
				handler: function(configuration, date) {
					var date = Ext.Date.format(date, 'Y-m-d');// Year Month and Day
					alert(date);
					requestData[id] = date;
					panel.remove(datePicker);
				}
			});
			panel.add(datePicker);
		}
	});
	panel.add(dateButton);
}

function addTextField(id, label, panel) {
	var textField = Ext.create('Ext.form.field.Text', {
        fieldLabel : label,
        name : id,
        itemId : id,
        autofocus : true,
        enableKeyEvents : true,
        labelAlign : 'right',
        labelWidth : 64,
        labelStyle : 'font-size: 16px;',
        width : 256,
        listeners: {
        	blur: function() {
        		requestData[id] = this.value;
        	}
        }
    });
	panel.add(textField);
}

function find() {
	Ext.ComponentQuery.query('textfield[name=firstName]');
}

var url;
var grid;
var container;
var gridTitle;
var columnNames;
var requestData;
var columnLabels;

function run(containerTitle, urlInput, columnNamesInput, columnLabelsInput, gridTitleInput) {
	container = Ext.create('Ext.panel.Panel', {
	    renderTo: Ext.getBody(),
	    title: containerTitle
	});
	requestData = {};
	url = urlInput;
	columnNames = columnNamesInput;
	columnLabels = columnLabelsInput;
	gridTitle = gridTitleInput;
}
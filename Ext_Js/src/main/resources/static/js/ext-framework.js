var LABEL_WIDTH = 64;
var LABEL_STYLE = 'font-size: 16px;';
var LABEL_ALIGN = 'right';
var COMPONENT_WIDTH = 256;
	
function addDateField(id, label, panel) {
	var dateField = new Ext.form.DateField({
		xtype : 'datefield',
		itemId : id,
		fieldLabel : label,
		format : 'Y/m/d',
		labelWidth : LABEL_WIDTH,
		labelStyle : LABEL_STYLE,
		labelAlign : LABEL_ALIGN,
		width : COMPONENT_WIDTH,
		listeners : {
			'change' : function(currentObject) {
				requestData[id] = currentObject.getValue();
			}
		}
	});
	panel.add(dateField);
}

function addBox(id, label, keyValuePairs, panel) {
	complexKeyValuePairs = new Array();
	for (i in keyValuePairs) {
		var complexKeyValuePairs;
		var keyValuePair = keyValuePairs[i];
		for (var j in keyValuePair) {
			var complexKeyValuePair = {};
			complexKeyValuePair['key'] = j;
			complexKeyValuePair['value'] = keyValuePair[j];
		}
		complexKeyValuePairs.push(complexKeyValuePair);
	}
	var options = Ext.create('Ext.data.Store', {
	    fields: ['key', 'value'],
	    data : complexKeyValuePairs
	});
	var box = Ext.create('Ext.form.ComboBox', {
		itemId : id,
		labelWidth : LABEL_WIDTH,
		width : COMPONENT_WIDTH,
        labelAlign : LABEL_ALIGN,
        labelStyle : LABEL_STYLE,
		fieldLabel : label,
		store : options,
		queryMode : 'local',
		valueField : 'key',
		displayField : 'value',
		listeners: {
			select: function(combo, record, index) {
				requestData[id] = getValue(id);
			}
		}
	});
	panel.add(box);
}

function print(object) {
	var attributes = new Array();
	for (i in object) {
		attributes.push(i);
	}
	alert(attributes);
}

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
	var pageIndexes = getPageIndexes(responseJson.length);
	for (var i = pageIndexes[0]; i < pageIndexes[1]; i++) {
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

function addPanel(title) {
	var panel = Ext.create('Ext.panel.Panel', {
	    title : title,
	    layout: 'column'
	});
	add2Container(panel);
	return panel;
}

function addSubmitButton(label, panel) {
	addButton(label, panel, function() {
		set('pageIndex', 1);
    	loadData();
    });
}

function addDatePicker(id, label, controlPanel, toolPanel) {	
	addButton(label, controlPanel, function() {
		var existingDatePicker = find(id + 'DatePicker');
		if (existingDatePicker == null) {
			var datePicker = Ext.create('Ext.menu.DatePicker', {
				itemId : id + 'DatePicker',
				floating : false,// Make it false otherwise the data picker won't show up.
				handler: function(configuration, date) {
					var date = Ext.Date.format(date, 'Y-m-d');// Year Month and Day
					set(id, date);
					requestData[id] = date;
					toolPanel.remove(datePicker); 
				}
			});
			toolPanel.add(datePicker);
		} else {
			toolPanel.remove(existingDatePicker);
		}
	});
}

function addTextField(id, label, panel, method) {
	var textField = Ext.create('Ext.form.field.Text', {
        fieldLabel : label,
        name : id,
        itemId : id,
        autofocus : true,
        enableKeyEvents : true,
        labelAlign : LABEL_ALIGN,
        labelWidth : LABEL_WIDTH,
        labelStyle : LABEL_STYLE,
        width : COMPONENT_WIDTH,
        listeners : {
        		change : method
        }
    });
	panel.add(textField);
}

function addForm(id, label, panel) {
	addTextField(id, label, panel, function() {
		requestData[id] = this.value;
	});
}

function find(id) {
	return Ext.ComponentQuery.query('[itemId=' + id + ']')[0];
}

function getValue(id) {
	return find(id).getValue();
}

function set(id, value) {
	find(id).setValue(value);
}

function addButton(label, panel, method) {
	var button = Ext.create('Ext.Button', {
	    text : label,
	    handler : method
	});
	panel.add(button);
}

function addResetButton(label, panel) {
	addButton(label, panel, function() {
    	var components = Ext.ComponentQuery.query('textfield');
    	for (var i in components) {
    		components[i].setValue('');
    	}
    });
}

function getPageIndexes(rowCount) {
	var pageSize = pagination.pageSize;
	var pageIndex = pagination.pageIndex;
	pageIndex = Math.max(1, pageIndex);
	pageIndex = Math.min(Math.ceil(rowCount / pageSize), pageIndex);
	pagination.pageIndex = pageIndex;
	set('pageIndex', pageIndex);
	return [(pageIndex - 1) * pageSize, Math.min(pageIndex * pageSize, rowCount)];
}

function addPagination(panel) {
	addButton('Previous', panel, function() {
    	pagination.pageIndex = Math.max(1, parseInt(pagination.pageIndex) - 1);
    	loadData();
    });
	addButton('Next', panel, function() {
    	pagination.pageIndex = parseInt(pagination.pageIndex) + 1;
    	loadData();
    });
	addButton('Go', panel, function() {
    	loadData();
    });
	addTextField('pageIndex', 'Page', panel, function() {
		pagination.pageIndex = parseInt(getValue('pageIndex'));
	});
}

var url;
var grid;
var container;
var gridTitle;
var pagination;
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
	pagination = {
		pageIndex : 1,
		pageSize : 20
	};
}
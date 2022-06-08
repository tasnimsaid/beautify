$(document).ready(function(e) {
	function setTheme() {
		theme = $.trim($("#themes").val());
		font_size = $.trim($("#font_size").val());
		
		editorAce1.setTheme("ace/theme/" + theme);
		$("#code1").css({"font-size" : (font_size + "px")});
		editorAce1.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
	}
	
	function show_msg(msg, type)
	{
		if(type == "info")
		{
			$("#msg").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-danger")
			.addClass("text-info");
			$("#msg_modal").modal({backdrop : false});
		}else if(type == "error")
		{
			$("#msg").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-info")
			.addClass("text-danger");
			$("#msg_modal").modal({backdrop : false});
		}
	}
	
	ace.require("ace/ext/language_tools");
	var editorAce1 = ace.edit("code1");
	editorAce1.focus();
	editorAce1.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce1.setTheme("ace/theme/chrome");
    editorAce1.getSession().setMode("ace/mode/sql");
	
	$("#clear").click(function(e) {
    	e.preventDefault();
		editorAce1.setValue("");
    });
	
	$("#code1").resizable({
		handles: 's',
    	resize: function(event, ui) {
    		editorAce1.resize();
    	}
	});
	
	$(window).resize(function(e) {
        $("#code1").css({"width" : "100%"});
    });
	
	$("#browse").click(function(e) {
        e.preventDefault();
		$("#file").click();
    });
	
	$("#download").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data == "")
		{
			show_msg("The editor is empty!", "error");
			return false;
		}
		blob = new Blob(["" + data + ""], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "data.txt");
    });
	
	themelist = ace.require("ace/ext/themelist");
	theme = "";
	$(themelist.themes).each(function(key, value) {
		theme += '<option value="' + value.name + '">' + value.caption + '</option>';
    });
	$("#themes").append(theme);
	
	$("#themes").val("chrome");
	$("#font_size").val("14");
	
	$("#themes,#font_size").change(function(e) {
        setTheme();
		editorAce1.focus();
    });
	
	function to_csv(workbook) {
		var result = [];
		workbook.SheetNames.forEach(function(sheetName) {
			var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
			if(csv.length > 0){
				result.push(csv);
			}
		});
		return result.join("\n");
	}
	
	var csv_data = "";
	var name = "";
	
	function handleFile(e) {
		var files = e.target.files;
		var i, f;
		for (i = 0, f = files[i]; i != files.length; ++i) {
			var reader = new FileReader();
			name = f.name;
			ext = name.split('.').pop();
			reader.onload = function(e) {
				try {
					var data = e.target.result;
					if(ext == "csv")
					{
						csv_data = data;
					}else
					{
						var workbook = XLSX.read(data, {
						type: 'binary'
						});
						csv_data = to_csv(workbook);
					}
					$("#sql_insert").click();
				} catch (e) {
					editorAce1.setValue("Please select an excel file.");
				}
			};
			if(ext == "csv")
			{
				reader.readAsText(f);
			}else
			{
				reader.readAsBinaryString(f);
			}
		}
	}
	
	$("#file").change(function(e) {
        e.preventDefault();
		editorAce1.setValue("Please wait while loading your file.");
		handleFile(e);
    });
	
	$("#sql_insert").click(function(e) {
        e.preventDefault();
		if(csv_data == "")
		{
			editorAce1.setValue("Please select an excel file first.");
			return false;
		}
		editorAce1.setValue("Please wait while parsing data.");
		try{
			tb_name = (($.trim($("#table_name").val()) == "") ? "table_name" : $.trim($("#table_name").val()));
			tb_name = tb_name.replace(/[^a-z0-9_$ ]/gi,"");
			tb_name = tb_name.replace(/ /g,"_");
			csv_data_insert = csv_data.replace(/'/g,"\\'");
			csvArr = csv_data_insert.split(/\r\n|\n\r|\n|\r/g);
			cols = csvArr[0].split(",");
			cols_length = cols.length;
			col_type_arr = new Array();
			
			for(i = 0; i < cols_length; i++)
			{
				cols[i] = cols[i].replace(/[^a-z0-9_$ ]/gi,"");
				cols[i] = cols[i].replace(/ /g,"_");
				cols[i] = (($.trim(cols[i]) == "") ? ("column_" + i) : $.trim(cols[i]));
			}
			
			csvArr = csvArr.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});
			if(csvArr[1] != undefined)
			{
				col_type_arr = csvArr[1].split(",");
			}else
			{
				col_type_arr = csvArr[0].split(",");
			}
			
			is_col_number = new Array();
			
			for(i = 0; i < cols_length; i++)
			{
				is_col_number[i] = $.isNumeric(col_type_arr[i]);
			}
			
			table = "/* Showing results for " + name + " */\n\n/* CREATE TABLE */\nCREATE TABLE " + tb_name + "(\n";
			for(i = 0; i < cols_length; i++)
			{
				if(is_col_number[i])
				{
					if(i == (cols_length - 1))
					{
						table += cols[i] + " " + "DOUBLE\n";
					}else
					{
						table += cols[i] + " " + "DOUBLE,\n";
					}
				}else
				{
					if(i == (cols_length - 1))
					{
						table += cols[i] + " " + "VARCHAR(100)\n";
					}else
					{
						table += cols[i] + " " + "VARCHAR(100),\n";
					}
				}
			}
			table += ");\n\n";
			
			insert = table;
			col_names = cols.join(", ");
			
			for(i = 1; i < csvArr.length; i++)
			{
				rowValueArr = new Array();
				valueArr = csvArr[i].split(",");
				row = "";
				
				for(j = 0; j < cols_length; j++)
				{
					if(is_col_number[j] == $.isNumeric(valueArr[j]))
					{
						if(is_col_number[j])
						{
							rowValueArr[j] = valueArr[j];
						}
						else
						{
							rowValueArr[j] = "'" + ((valueArr[j] != undefined) ? valueArr[j] : "") + "'";
						}
					}else
					{
						if(is_col_number[j])
						{
							rowValueArr[j] = 0;
						}
						else
						{
							rowValueArr[j] = "'" + ((valueArr[j] != undefined) ? valueArr[j] : "") + "'";
						}
					}
				}
				row = rowValueArr.join(", ");
				
				insert += "/* INSERT QUERY NO: " + i + " */\nINSERT INTO " + tb_name + "(" + col_names + ")\nVALUES\n(\n" + row + "\n);\n\n";
			}
			editorAce1.setValue(insert);
		}catch(e)
		{
			editorAce1.setValue("Error parsing data!");
		}
    });
	
	$("#sql_update").click(function(e) {
        e.preventDefault();
		if(csv_data == "")
		{
			editorAce1.setValue("Please select an excel file first.");
			return false;
		}
		editorAce1.setValue("Please wait while parsing data.");
		try{
			tb_name = (($.trim($("#table_name").val()) == "") ? "table_name" : $.trim($("#table_name").val()));
			tb_name = tb_name.replace(/[^a-z0-9_$ ]/gi,"");
			tb_name = tb_name.replace(/ /g,"_");
			csv_data_update = csv_data.replace(/'/g,"\\'");
			csvArr = csv_data_update.split(/\r\n|\n\r|\n|\r/g);
			cols = csvArr[0].split(",");
			cols_length = cols.length;
			col_type_arr = new Array();
			
			for(i = 0; i < cols_length; i++)
			{
				cols[i] = cols[i].replace(/[^a-z0-9_$ ]/gi,"");
				cols[i] = cols[i].replace(/ /g,"_");
				cols[i] = (($.trim(cols[i]) == "") ? ("column_" + i) : $.trim(cols[i]));
			}
			
			csvArr = csvArr.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});
			
			if(csvArr[1] != undefined)
			{
				col_type_arr = csvArr[1].split(",");
			}else
			{
				col_type_arr = csvArr[0].split(",");
			}
			
			is_col_number = new Array();
			
			for(i = 0; i < cols_length; i++)
			{
				is_col_number[i] = $.isNumeric(col_type_arr[i]);
			}
			
			table = "/* Showing results for " + name + " */\n\n/* CREATE TABLE */\nCREATE TABLE " + tb_name + "(\n";
			for(i = 0; i < cols_length; i++)
			{
				if(is_col_number[i])
				{
					if(i == (cols_length - 1))
					{
						table += cols[i] + " " + "DOUBLE\n";
					}else
					{
						table += cols[i] + " " + "DOUBLE,\n";
					}
				}else
				{
					if(i == (cols_length - 1))
					{
						table += cols[i] + " " + "VARCHAR(100)\n";
					}else
					{
						table += cols[i] + " " + "VARCHAR(100),\n";
					}
				}
			}
			table += ");\n\n";
			
			update = table;
			
			for(i = 1; i < csvArr.length; i++)
			{
				rowValueArr = new Array();
				valueArr = csvArr[i].split(",");
				row = new Array();
				
				for(j = 0; j < cols_length; j++)
				{
					if(is_col_number[j] == $.isNumeric(valueArr[j]))
					{
						if(is_col_number[j])
						{
							rowValueArr[j] = valueArr[j];
						}
						else
						{
							rowValueArr[j] = "'" + ((valueArr[j] != undefined) ? valueArr[j] : "") + "'";
						}
					}else
					{
						if(is_col_number[j])
						{
							rowValueArr[j] = 0;
						}
						else
						{
							rowValueArr[j] = "'" + ((valueArr[j] != undefined) ? valueArr[j] : "") + "'";
						}
					}
				}
				
				for(k = 0; k < cols_length; k++)
				{
					row[k] = cols[k] + " = " + rowValueArr[k];
				}
				
				update += "/* UPDATE QUERY NO: " + i + " */\nUPDATE\n" + tb_name + "\nSET\n" + row.join(",\n") + "\nWHERE\n" + cols[0] + " = " + rowValueArr[0] + ";\n\n";
			}
			editorAce1.setValue(update);
		}catch(e)
		{
			editorAce1.setValue("Error parsing data!");
		}
    });
	
	$("#sql_delete").click(function(e) {
		e.preventDefault();
		if(csv_data == "")
		{
			editorAce1.setValue("Please select an excel file first.");
			return false;
		}
		editorAce1.setValue("Please wait while parsing data.");
		try{
			tb_name = (($.trim($("#table_name").val()) == "") ? "table_name" : $.trim($("#table_name").val()));
			tb_name = tb_name.replace(/[^a-z0-9_$ ]/gi,"");
			tb_name = tb_name.replace(/ /g,"_");
			csv_data_delete = csv_data.replace(/'/g,"\\'");
			csvArr = csv_data_delete.split(/\r\n|\n\r|\n|\r/g);
			cols = csvArr[0].split(",");
			cols_length = cols.length;
			col_type_arr = new Array();
			
			for(i = 0; i < cols_length; i++)
			{
				cols[i] = cols[i].replace(/[^a-z0-9_$ ]/gi,"");
				cols[i] = cols[i].replace(/ /g,"_");
				cols[i] = (($.trim(cols[i]) == "") ? ("column_" + i) : $.trim(cols[i]));
			}
			
			csvArr = csvArr.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});
			
			if(csvArr[1] != undefined)
			{
				col_type_arr = csvArr[1].split(",");
			}else
			{
				col_type_arr = csvArr[0].split(",");
			}
			
			is_col_number = new Array();
			
			for(i = 0; i < cols_length; i++)
			{
				is_col_number[i] = $.isNumeric(col_type_arr[i]);
			}
			
			table = "/* Showing results for " + name + " */\n\n/* CREATE TABLE */\nCREATE TABLE " + tb_name + "(\n";
			for(i = 0; i < cols_length; i++)
			{
				if(is_col_number[i])
				{
					if(i == (cols_length - 1))
					{
						table += cols[i] + " " + "DOUBLE\n";
					}else
					{
						table += cols[i] + " " + "DOUBLE,\n";
					}
				}else
				{
					if(i == (cols_length - 1))
					{
						table += cols[i] + " " + "VARCHAR(100)\n";
					}else
					{
						table += cols[i] + " " + "VARCHAR(100),\n";
					}
				}
			}
			table += ");\n\n";
			
			delete_sql = table;
			
			for(i = 1; i < csvArr.length; i++)
			{
				rowValueArr = new Array();
				valueArr = csvArr[i].split(",");
				
				if(is_col_number[0] == $.isNumeric(valueArr[0]))
				{
					if(is_col_number[0])
					{
						rowValueArr[0] = valueArr[0];
					}
					else
					{
						rowValueArr[0] = "'" + ((valueArr[0] != undefined) ? valueArr[0] : "") + "'";
					}
				}else
				{
					if(is_col_number[0])
					{
						rowValueArr[0] = 0;
					}
					else
					{
						rowValueArr[0] = "'" + ((valueArr[0] != undefined) ? valueArr[0] : "") + "'";
					}
				}
				
				delete_sql += "/* DELETE QUERY NO: " + i + " */\nDELETE FROM\n" + tb_name + "\nWHERE\n" + cols[0] + " = " + rowValueArr[0] + ";\n\n";
			}
			editorAce1.setValue(delete_sql);
		}catch(e)
		{
			editorAce1.setValue("Error parsing data!");
		}
	});
});
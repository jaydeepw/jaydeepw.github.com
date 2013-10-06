function localStorageiInit(){
      
    }
	
	function updateLocalStorageStatus(operation){
		
                var keyElem = document.getElementById("key");
                var valueElem = document.getElementById("value");
                var readButton= document.getElementById("read");
                var writeButton= document.getElementById("write");
                
		if(operation=='Write' && document.getElementById('key').value!='' && document.getElementById('value').value!='')
		{
			document.getElementById('status').innerHTML='Write Complete';
                        var key = keyElem.value;
                       var value = valueElem.value;
                       localStorage.setItem(key,value);
                       console.log("writing done");
			}
		
		else
		document.getElementById('status').innerHTML='Either Key or Value is blank';

		if(operation=='Read' && document.getElementById('key').value!='')
		{
                    var key = keyElem.value;
                       valueElem.value=localStorage.getItem(key);
			document.getElementById('status').innerHTML='Read Complete';
			}
		
		else
		if(document.getElementById('key').value=='' && document.getElementById('value').value=='')
		document.getElementById('status').innerHTML='Key & Value both are blank';
	}
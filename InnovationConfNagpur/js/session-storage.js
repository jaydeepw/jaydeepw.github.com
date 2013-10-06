function localStorageiInit(){
      
    }
	
	function updateSessionStorageStatus(operation){
		
                var keyElem = document.getElementById("key1");
                var valueElem = document.getElementById("value1");
                var readButton= document.getElementById("read1");
                var writeButton= document.getElementById("write1");
	       
	       console.log(operation);
	       console.log(operation=='Write');
                
		if(operation=='Write' && document.getElementById('key1').value!='' && document.getElementById('value1').value!='')
		{
		    var key = keyElem.value;
                       var value = valueElem.value;
                       sessionStorage.setItem(key,value);
		       
		       console.log("writing done");
			document.getElementById('status1').innerHTML='Write Complete';
			}
		
		else
		document.getElementById('status1').innerHTML='Either Key or Value is blank';

		if(operation=='Read' && document.getElementById('key1').value!='')
		{
			var key = keyElem.value;
                       valueElem.value=sessionStorage.getItem(key);
			document.getElementById('status1').innerHTML='Read Complete';
			}
		
		else
		if(document.getElementById('key1').value=='' && document.getElementById('value1').value=='')
		document.getElementById('status1').innerHTML='Key & Value both are blank';
	}
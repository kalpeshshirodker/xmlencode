if (!String.prototype.encodeXml) {
	Object.defineProperty(String.prototype, 'encodeXml', {
		configurable : true,
		writable : true,
		value : function() {
			return this.replace(/[<>&'"]/g, function (c) {
				switch (c) {
					case '<': return '&lt;';
					case '>': return '&gt;';
					case '&': return '&amp;';
					case '\'': return '&apos;';
					case '"': return '&quot;';
				}
			});
		}
	});			
}

if (!String.prototype.decodeXml) {
	(function(){
		//use cached div element to perform xmldecode using the DOM
		var element = document.createElement('div');
		var fnDecodeXml = function(){
			var str = this.valueOf();
			if(str && typeof str === 'string') {
				// strip script/html tags
				str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
				str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
				element.innerHTML = str;
				str = element.textContent;
				element.textContent = '';
			}
			return str;
		}
		
		Object.defineProperty(String.prototype, 'decodeXml', {
			configurable : true,
			writable : true,
			value : fnDecodeXml
		});
	})();
}
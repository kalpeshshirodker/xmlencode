if (!String.prototype.encodeXml) {
	(function(){
		var xmlEntitiesMap = {
			'<': '&lt;',
			'>': '&gt;',
			'&': '&amp;',
			'\'': '&apos;',
			'"': '&quot;',
		};

		var xmlEntities = Object.keys(xmlEntitiesMap).join('');
		var xeRegEx = new RegExp('[' + xmlEntities + ']', 'gm');
		var fnEncodeXml = function(){
			return this.replace(xeRegEx, function (c) {
				return xmlEntitiesMap[c] || '';
			});
		};

		Object.defineProperty(String.prototype, 'encodeXml', {
			configurable : true,
			writable : true,
			value : fnEncodeXml
		});

	})();
}

var str = 'a string with < and > and an ampersand for &, further & is also used to denote <- or ->';
console.log(str);
console.log(str.encodeXml());

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

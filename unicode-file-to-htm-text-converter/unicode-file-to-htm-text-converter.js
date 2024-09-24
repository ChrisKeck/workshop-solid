function fileReaderInstance(){
return {onload:({target: {result: text}})=>{return text},readAsText(text){return this.onload({target:{result:text}})}}}

UnicodeFileToHtmTextConverter = function(fileBlob,fileReader=fileReaderInstance()) {
	this._fileBlob = fileBlob;
	this._fileReader = fileReader;
};

UnicodeFileToHtmTextConverter.prototype = {

	convertToHtml: function (callback) {

		var self = this;
		var fileReader = this._fileReader;
		var text=fileReader.readAsText(this._fileBlob);
		const result= self._basicHtmlEncode(text);
		if (callback){
			callback(result)
		}
	},
	
	_basicHtmlEncode: function (source) {

		var stashNextCharacterAndAdvanceThePointer = function () {
			var c = source.charAt(i);
			i += 1;
			return c;

		};

		var addANewLine = function () {
			convertedLine = convertedLine.join('');
			result.push(convertedLine);
			convertedLine = [];
		};

		var pushACharacterToTheOutput = function () {
			convertedLine.push(characterToConvert);
		};

		var i = 0;
		var result = [];
		var convertedLine = [];
		var characterToConvert = stashNextCharacterAndAdvanceThePointer();
		while (i <= source.length) {

			switch (characterToConvert) {
				case '<':
					convertedLine.push('&lt;');
					break;
				case '>':
					convertedLine.push('&gt;');
					break;
				case '&':
					convertedLine.push('&amp;');
					break;
				case '\n':
					addANewLine();
					break;
				default:
					pushACharacterToTheOutput();
			}

			characterToConvert = stashNextCharacterAndAdvanceThePointer();
		}

		addANewLine();
		result = result.join('<br />');
		return result;
	}
};

module.exports=UnicodeFileToHtmTextConverter
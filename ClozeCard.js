
exports.ClozeCard = function(text, cloze) {
	// Establishes the questions and cloze statements as lowercase so any answer works regadless of capitalization
	var textToLower = text.toLowerCase();
	var clozeToLower = cloze.toLowerCase();
	this.full = text;
	this.cloze = cloze;
	// Establishes dashes for show how many characters there are in the answer
	blank = "";
	for (var i = 0; i < cloze.length; i++) {
            blank += "_ " + "";
	};
	this.partial = text.replace(cloze, " " + blank);
}
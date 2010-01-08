var options = {
	name: 'chess',
	setObject: function(a,b) {
		if (!localStorage[this.name]) localStorage[this.name] = '{}';
		var key=a,val=b;
		var j = JSON.parse(localStorage.getItem(this.name));
		j[a] = b;
		key = this.name;
		val = j;
		localStorage.setItem(key, JSON.stringify(val));
	},
	getObject: function(a) {
		if (!localStorage[this.name]) localStorage[this.name] = '{}';
		var j = JSON.parse(localStorage.getItem(this.name));
		return j[a];
	},
	set: function(aX, aZ) {
		this.setObject(aX, aZ) 
	},
	get: function(aX) {
		return this.getObject(aX);
	}
}
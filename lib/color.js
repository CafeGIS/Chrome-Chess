var color = {
	  opacity: 255,
	  rgb: {
			aqua:[0,255,255],
			azure:[240,255,255],
			beige:[245,245,220],
			black:[0,0,0],
			blue:[0,0,255],
			brown:[165,42,42],
			cyan:[0,255,255],
			darkblue:[0,0,139],
			darkcyan:[0,139,139],
			darkgrey:[169,169,169],
			darkgreen:[0,100,0],
			darkkhaki:[189,183,107],
			darkmagenta:[139,0,139],
			darkolivegreen:[85,107,47],
			darkorange:[255,140,0],
			darkorchid:[153,50,204],
			darkred:[139,0,0],
			darksalmon:[233,150,122],
			darkviolet:[148,0,211],
			fuchsia:[255,0,255],
			gold:[255,215,0],
			green:[0,128,0],
			indigo:[75,0,130],
			khaki:[240,230,140],
			lightblue:[173,216,230],
			lightcyan:[224,255,255],
			lightgreen:[144,238,144],
			lightgrey:[211,211,211],
			lightpink:[255,182,193],
			lightyellow:[255,255,224],
			lime:[0,255,0],
			magenta:[255,0,255],
			maroon:[128,0,0],
			navy:[0,0,128],
			olive:[128,128,0],
			orange:[255,165,0],
			pink:[255,192,203],
			purple:[128,0,128],
			violet:[128,0,128],
			red:[255,0,0],
			silver:[192,192,192],
			white:[255,255,255],
			yellow:[255,255,0]
			},
	  get: function(aName) {
		var a;
		if (typeof aName == 'string') {
			if (aName.charAt(0)=="#") a = this.toRGB(aName);
			if (aName.charAt(0)!="#") a = eval('this.rgb.'+aName);
		}
		if (this.isRGB(a)) 
			a[a.length] = this.opacity;
		if (this.isArr(aName)) 
			return aName;
		return a;
	  },
	  isRGB: function(aX) {
		if ((typeof aX == 'object' || typeof aX == 'array') && aX.length == 3) return true;
		else return false;
	  },
	  isArr: function(aX) {
		if ((typeof aX == 'object' || typeof aX == 'array') && aX.length == 4) return true;
		else return false;
	  },
	  toRGB: function(aHex) {
		if (aHex.charAt(0)=="#") aHex = aHex.substring(1,7);
		var R = parseInt(aHex.substring(0,2),16),
			G = parseInt(aHex.substring(2,4),16),
			B = parseInt(aHex.substring(4,6),16);
		var RGB = [R, G, B];
		return RGB;
	  },
	  R:0,
	  G:0,
	  B:0,
	  O:0,
	  RGBO:0,
	  current_color: [0,0,0,0],
	  shift: function(to,from) {
		  var z = this.get(to);
		  if (!from) var y = this.current_color;
		  else var y = this.get(from);
		  for (var n = 0;n!=z.length;n++) {
			switch(n) {
			case 0: 
				this.R = new whtb_custom(y[0], z[0], "", 'px');
				this.R.count(this.R);
				break;
			case 1:
				this.G = new whtb_custom(y[1], z[1], "", 'px');
				this.G.count(this.G);
				break;
			case 2:
				this.B = new whtb_custom(y[2], z[2], "", 'px');
				this.B.count(this.B);
				break;
			case 3:
				this.O = new whtb_custom(y[3], z[3], "", 'px');
				this.O.count(this.O);
				break;
				}
			}
		  this.RGBO = new whtb_custom(0, 300, "chrome.browserAction.setBadgeBackgroundColor({color:[color.R.now,color.G.now,color.B.now,color.O.now]})", 'px');
		  this.RGBO.count(this.RGBO);
		  this.current_color = z;
	  }
  }
  
  function whtb_custom(a,b,c,d) {
	this.params = [a,b,c,d];
	this.startTime = 0;
	this.start = this.params[0];
	this.end = this.params[1];
	this.unit = this.params[3];
	this.now = this.start;
	this.pos = 0;
	this.state = 0;
	this.action = this.params[2];
	this.timerId;
	this.add;
	this.count;
	this.incr;
	this.stop;
	if (this.start < this.end) this.add = '+';
	else if (this.start > this.end) this.add = '-';
}

function whtb_custom(a,b,c,d) {
	this.params = [a,b,c,d];
	this.startTime = 0;
	this.start = this.params[0];
	this.end = this.params[1];
	this.unit = this.params[3];
	this.now = this.start;
	this.pos = 0;
	this.state = 0;
	this.action = this.params[2];
	this.timerId;
	this.add;
	this.count;
	this.incr;
	this.stop;
	if (this.start < this.end) this.add = '+';
	else if (this.start > this.end) this.add = '-';
}

whtb_custom.prototype.count = function(a) {
      this.timerId = setInterval(function(){a.incr()},13);
	  return this.timerId;
  }
  
whtb_custom.prototype.incr = function() {
      if (this.now != this.end) {
		if (this.add == '+')
			this.now = this.now + 1;
		else if (this.add == '-')
			this.now = this.now - 1;
	  }
	  else this.timerId = clearInterval(this.timerId);
	  eval(this.action);
  }
  
whtb_custom.prototype.stop = function() {
	this.timerId = window.clearInterval(this.timerId);
	return 'OK';
  }

  
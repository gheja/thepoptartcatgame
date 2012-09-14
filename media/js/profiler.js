/*
  Gabor Heja (gheja/kao/kakaopor), 2011.
  Feel free to use for anything.
  Except for deploying or creating nuclear weapons. ;)
*/

var Profiler = {
	last_time: 0,
	start_time: 0,
	times: [],
	time_count: 0,
	
	Start: function(){
		this.times = new Array();
		this.start_time = (new Date()).getTime();
		this.last_time = this.start_time;
		this.time_count = 0;
	},
	
	EndOf: function(name){
		var now = (new Date()).getTime();
		this.times[name] = now - this.last_time;
		this.last_time = now;
		this.time_count++;
	},
	
	GetText: function(){
		var i;
		var keys = _keys(this.times);
		var result = "";
		
		for (i=0; i<this.time_count; i++)
		{
			result += keys[i] + ": " + this.times[keys[i]] + " ms<br/>";
		}
		
		return result;
	},
	
	GetTotalTime: function()
	{
		return (new Date()).getTime() - this.start_time;
	}
};
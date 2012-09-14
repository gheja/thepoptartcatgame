/*
  Gabor Heja (gheja/kao/kakaopor), 2011.
  Feel free to use for anything.
  Except for deploying or creating nuclear weapons. ;)
*/

var Preloader = {
	total: 0,
	loaded: 0,
	callbacks: [],
	dom_loader: null,
	dom_progressbar: null,
	onfinish: null,
	current_id: 0,
	class_statuses: [],
	classes: [],
	class_preload_properties: [],
	
	preload_start_time: 0,
	
	images: Array(),
	
	ScheduleNext: function()
	{
		// BUG: using prototype.js's bindAsEventListener() raises a "stack overflow" exception on IE...
		window.setTimeout("Preloader.Next()", 1);
	},
	
	Next: function()
	{
		var i, result;
		
		for (i=0; i<this.classes.size(); i++)
		{
			if (this.class_statuses[i] == false)
			{
				result = this.classes[i].PreloadNext(this, this.ScheduleNext, this.Failed);
				switch (result)
				{
					// have more
					case 1:
						this.loaded += this.class_preload_properties[i].step_weight;
					break;
					
					// finished
					case 2:	
						this.loaded += this.class_preload_properties[i].step_weight;
						this.class_statuses[i] = true;
					break
					
					// try again later
					case 3:
						// wait a second and try again...
						window.setTimeout("Preloader.Next();", 1000);
					break;
					
					// failed, skip this class
					case 98:
						// this will mess up loader bar...
						this.loaded = this.total;
						this.class_statuses[i] = true;
						this.ScheduleNext();
					break;
					
					// failed, fatal
					case 99:
						this.Failed();
					break;
				}

				this.dom_progressbar.style.width = Math.floor((this.loaded / this.total) * 100) + "%";

				return;
			}
		}
		
		var site = _dl_base_url.split("/")[2]; // hackish :P
		_stat("preload_completed", "site=" + site + "&duration=" + ((new Date).getTime() - this.preload_start_time));
		this.dom_loader.parentNode.removeChild(this.dom_loader);
		this.onfinish_callback();
	},
	
	Failed: function()
	{
		this.dom_loader.parentNode.removeChild(this.dom_loader);
		this.dom_failed.style.display = "block";
	},
	
	Init: function(params)
	{
		var i;

		Object.extend(this, params || {});
		this.onfinish_callback = this.onfinish[1].bindAsEventListener(this.onfinish[0]);
		for (i=0; i<this.classes.size(); i++)
		{
			this.class_statuses[i] = false;
			this.class_preload_properties[i] = this.classes[i].PreloadProperties();
		}
		this.total = 0;
		for (i=0; i<this.classes.size(); i++)
		{
			this.total += this.class_preload_properties[i].step_weight * this.class_preload_properties[i].total_steps;
		}
	},
	
	GetPercent: function()
	{
		return (this.loaded / this.total) * 100;
	},

	Start: function()
	{
		_stat("preload_started", "");
		this.preload_start_time = (new Date()).getTime();
		this.Next();
	}
};
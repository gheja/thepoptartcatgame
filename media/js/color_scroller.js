/*
  Gabor Heja (gheja/kao/kakaopor), 2011.
  Feel free to use for anything.
  Except for deploying or creating nuclear weapons. ;)
*/
var ColorScroller =  {
	hue: { current: 0, target: 0, speed: 5, repeat: 0 },
	saturation: { current: 0, target: 0, speed: 5 },
	value: { current: 0, target: 0, speed: 3 },
	timeout: null, // the timeout object
	tick_interval: 50,
	enabled: 1,
	
	dom_object: null,
	
	GetRgb: function()
	{
		var gray_value, result;
		var h = this.hue.current % 360;
		var s = this.saturation.current % 101;
		var v = this.value.current % 101;
		
		result = {
			r: Math.floor(255 *
					(h < 60 ? 1 : 
					(h < 120 ? 1-(h-60)/60 : 
					(h < 240 ? 0 : 
					(h < 300 ? (h-240)/60 : (
					1))))) * v/100
				),
			g: Math.floor(255 *
					(h < 60 ? h / 60 : 
					(h < 180 ? 1 : 
					(h < 240 ? 1-(h-180)/60 : 
					0))) * v/100
				),
			b: Math.floor(255 *
					(h < 120 ? 0 : 
					(h < 180 ? (h-120)/60 : 
					(h < 300 ? 1 : 
					1-(h-300)/60))) * v/100
				)
		};
		
		gray_value = (result.r + result.g + result.b) / 3;
		result.r = Math.floor(result.r * (s / 100) + gray_value * (1 - s / 100));
		result.g = Math.floor(result.g * (s / 100) + gray_value * (1 - s / 100));
		result.b = Math.floor(result.b * (s / 100) + gray_value * (1 - s / 100));
		
		return result;
	},
	
	SetCurrentValues: function(hue, saturation, value)
	{
		this.hue.current = hue;
		this.saturation.current = saturation;
		this.value.current = value;
	},
	
	Init: function(hue, saturation, value)
	{
		this.hue.current = this.hue.target = hue;
		this.saturation.current = this.saturation.target = saturation;
		this.value.current = this.value.target = value;
	},
	
	SetEnabled: function(new_value)
	{
		this.enabled = new_value;
	},
	
	SetTargetHue: function(hue)
	{
		// TODO: 10 == 370, 10 -> 350: 10-11-12...349-350, helyett 10-9-8...-352-351-350
		this.hue.value = (this.hue.value % 360);
		this.hue.target = hue;
		if (Math.abs(this.hue.target + 360 - this.hue.value) < Math.abs(this.hue.target - this.hue.value))
		{
			this.hue.target += 360;
		}
	},
	
	SetTargetSaturation: function(saturation)
	{
		this.saturation.target = saturation;
	},
	
	SetTargetValue: function(value)
	{
		this.value.target = value;
	},
	
	SetRepeatedHue: function(enabled)
	{
		this.hue.repeat = enabled;
		if (enabled)
		{
			this.hue.target = 1000;
		}
	},

	GetRgbString: function()
	{
		var rgb = this.GetRgb();
		return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
	},
	
	Tick: function()
	{
		var changed = false;
		
		window.clearTimeout(this.timeout);
		this.timeout = window.setTimeout("ColorScroller.Tick();", this.tick_interval);
	
		if (!this.enabled)
		{
			return false;
		}
	
		if (this.hue.current != this.hue.target)
		{
			if (Math.abs(this.hue.current - this.hue.target) <= this.hue.speed)
			{
				this.hue.current = this.hue.target;
			}
			else
			{
				this.hue.current += (this.hue.target > this.hue.current ? 1 : -1) * this.hue.speed;
			}
			changed = true;
		}
		
		if (this.hue.repeat && this.hue.current > 360)
		{
			this.hue.current -= 360;
		}
		
		if (this.saturation.current != this.saturation.target)
		{
			if (Math.abs(this.saturation.current - this.saturation.target) <= this.saturation.speed)
			{
				this.saturation.current = this.saturation.target;
			}
			else
			{
				this.saturation.current += (this.saturation.target > this.saturation.current ? 1 : -1) * this.saturation.speed;
			}
			changed = true;
		}

		if (this.value.current != this.value.target)
		{
			if (Math.abs(this.value.current - this.value.target) <= this.value.speed)
			{
				this.value.current = this.value.target;
			}
			else
			{
				this.value.current += (this.value.target > this.value.current ? 1 : -1) * this.value.speed;
			}
			changed = true;
		}

		if (changed)
		{
			$('body').style.backgroundColor = this.GetRgbString();
		}
	}
};

/*
  Gabor Heja (gheja/kao/kakaopor), 2011.
  Feel free to use for anything.
  Except for deploying or creating nuclear weapons. ;)
*/

var Nyan = {
	titles: [
		"Everybody likes rainbows!",
		"The supercute rainbow creator!",
		"Rainbows? I has them!",
		"I can has rainbow?",
		"Nyannyannyannyannyannyannyannyan!",
		"Warning: Eating and digesting colored stars will result in rainbow.",
		"The cutest starcollector in outer space!"
	],
	
	/* the playground */
	cat: [], // the cat
	floaters: [], // scrolling stars, objects, rainbow, etc
	colors: [], // which colors have been gathered
	score: [], // score object
	dom_object: null, // the container object
	tip_dom: null,
	tip_timeout: null,

	timeout: null, // timeout object (tick scheduler)
	frame_tick_interval: 66, // frame rate = 1000/tick_interval (~15)
	tick_interval: 66, //
	frameskip: 1, // skip every nth frame
	
	up_pressed: 0, // the key
	down_pressed: 0, // the key
	pointer_x: 0,
	pointer_y: 0,
	
	ticks: 0, // total ticks
	level_ticks: 0, // ticks on the current level
	frames: 0,
	last_tick_time: 0,
	last_frame_time: 0,
	scale: 1, // scale of the images
	level: 0,
	progress: 0, // progress of the level (=colors collected)
	paused: true,
	muted: false,
	// TODO: grey_star_creation_tick_interval: 1000,
	
	powerup_drops: { // level, level_ticks, type
//		1: { 100: 60, 150: 61, 200: 72, 250: 70, 300: 71 },
		1: { 200: 60, 300: 70 },
		2: { 300: 60, 500: 72 },
		3: { 300: 61, 500: 71 },
		4: { 300: 72, 500: 72 },
		5: { 300: 60, 500: 70 },
		6: { 300: 60, 500: 70 },
		7: { 300: 60, 500: 72 },
		8: { 300: 61, 500: 71 },
		9: { 250: 61, 400: 70, 700: 71 },
		10: { 250: 61, 400: 70, 700: 71 },
		11: { 250: 61, 400: 71, 700: 72 },
		12: { 250: 61, 400: 72, 700: 71 },
		13: { 250: 61, 400: 70, 700: 72 },
		14: { 250: 61, 400: 70, 700: 70 },

		/* repeat from here */
		15: { 250: 61, 400: 71, 700: 70 },
		16: { 250: 61, 400: 71, 700: 72 },
		17: { 250: 61, 400: 70, 700: 72 },
		18: { 250: 61, 400: 70, 700: 71 },
		19: { 250: 61, 400: 71, 700: 72 },
		20: { 250: 61, 400: 70, 700: 71 },
		21: { 250: 61, 400: 71, 700: 72 },
		22: { 250: 61, 400: 72, 700: 71 },
		23: { 250: 61, 400: 70, 700: 72 },
		24: { 250: 61, 400: 70, 700: 70 }
	},
	
	loader_tips: [ "Tip: Save your powerups, they might come handy later!", "Don't worry, Nyan Cat brings you luck even in level 13!" ],
	
	level_end_tips: {
		1: [ "That was easy, wasn't it? Try the next one!" ],
		2: [ "I see more grey stars ahead. Be careful little one!" ],
		3: [ "The next one will be harder, I promise." ],
		4: [ "Okay, enough of warm up, let's start the real thing!" ],
		5: [ "Tip: Save your Powerups, they might come handy in the next levels!" ],
		6: [ "... in the midnight hour she nyan'd: \"moar, moar moar!\"" ],
		7: [ "Still there? Great!", "Nyan-nyan-nyan!" ],
		8: [ "9th level is coming up next!" ],
		9: [ "I see you're such a tough cat." ],
		10: [ "Level 11? Building it, just a moment..." ],
		11: [ "Nicely done!", "Great job!" ],
		12: [ "I bet you're getting tired. You shouldn't!" ],
		13: [ "Now you have 13 rainbows in your bag! Congratulations!" ],
		14: [ "Is it a bird? Is it a plane? No, it's Nyan Cat!" ],
		
		/* repeat from here */
		99: [
			"Hmm... Maybe if I put these in your way...",
			"It seems I am not hardening your way enough...",
			"How long can you keep it up?",
			"The next one will be much harder, I promise.",
			"Really? You want more?",
			"Are you serious?",
			"Nyan-nyan-nyan!",
			"Want some more? Sure!",
			"Let me put some more greys here.",
			"One more here, and another one there...",
			"Are you okay?",
			"Moar, moar, moar!",
			"Yes, you can (have more rainbows)!",
			"Time for a break, don't you think?",
			"The universe is yours!",
			"Don't give up, you're almost there! (Almost.)",
			"This little cat can fill the universe. But only if you play more!"
		]
	},
	
	powerups: {
		70: {
			ticks_left: 0,
			ticks_max: 200,
			count: 0,
			dom_icon: null,
			dom_bar: null,
			dom_label: null,
			drop_type_id: 70,
			icon_type_id: 105,
			icon_disabled_type_id: 102,
			bar_type_id: 108,
			tip_shown: false,
			tip: "Shield protects you from grey stars. Press 2 to use it!"
		},
		71: {
			ticks_left: 0,
			ticks_max: -1,
			count: 0,
			dom_icon: null,
			dom_bar: null,
			dom_label: null,
			drop_type_id: 71,
			icon_type_id: 106,
			icon_disabled_type_id: 103,
			bar_type_id: null,
			tip_shown: false,
			tip: "Nuke destroys grey stars on the screen. Press 3 to use it!"
		},
		72: {
			ticks_left: 0,
			ticks_max: 500,
			count: 0,
			dom_icon: null,
			dom_bar: null,
			dom_label: null,
			drop_type_id: 72,
			icon_type_id: 107,
			icon_disabled_type_id: 104,
			bar_type_id: 109,
			tip_shown: false,
			tip: "Booster allows you to move faster up and down. Press 1 to use it!"
		}
	},
	
	powerup_order: [ 72, 70, 71 ],

	stat: { // some stats
		last_ticks: 0,
		tps: 0,
		last_frames: 0,
		fps: 0,
		last_time: 0
	},
	
	optimizations: { // optimizations for slow/buggy browsers
		min_tick_interval: 30,
		max_tick_interval: 72,
		min_fps: 10,
		max_fps: 16,
		max_frameskip: 1,
		color_scroller_disabled: 0,
		slow_warning_shown: false,
		slow_warning_tip: "Your browser seems to be very slow..."
	},
	
	floater_dimensions: {
		/* colored stars */
		0: [7,7], 1: [7,7], 2: [7,7], 3: [7,7], 4: [7,7], 5: [7,7],
		/* normal star */
		10: [7,7],
		/* exploding stars */
		11: [7,7], 12: [7,7], 13: [7,7], 14: [7,7], 15: [7,7], 16: [7,7], 
		/* next level */
		20: [18,11],
		/* rainbow colors (red, orange, yellow, green, bule, purple, full rainbow!)*/
		30: [5,3], 31: [5,3], 32: [5,3], 33: [5,3], 34: [5,3], 35: [5,3], 36: [5,18],
		/* grey star */
		40: [7,7],
		/* numbers */
		50: [10,14], 51: [10,14], 52: [10,14], 53: [10,14], 54: [10,14], 55: [10,14], 56: [10,14], 57: [10,14], 58: [10,14], 59: [10,14],
		/* get-and-use powerups (coin250, coin500)*/
		60: [13,13], 61: [13,13],
		/* stackable powerups (shield, nuke, booster)*/
		70: [13,13], 71: [13,13], 72: [13,13],
		/* etc... (shield on cat, booster on cat) */
		80: [9,26], 81: [34, 27],
		/* misc non-floater images (cat, play button) */
		100: [34,21], 101: [71,48],
			/* ... shield icon disabled, nuke icon disabled, booster icon disabled */
			102: [13,13], 103: [13,13], 104: [13,13],
			/* ... shield icon, nuke icon, booster icon */
			105: [13,13], 106: [13,13], 107: [13,13],
			/* ... shield bar, booster bar */
			108: [30,4], 109: [30,4]
	},

/* the preloader */
	preload_images: [],
	preload_index_index: 0,
	PreloadProperties: function()
	{
		return { step_weight : 10, total_steps: _keys(this.floater_dimensions).size() };
	},
	PreloadNext: function(callback_object, callback_on_load, callback_on_fail)
	{
		var tmp = _keys(this.floater_dimensions);
		
		this.preload_images[this.preload_index_index] = new Image();
		this.preload_images[this.preload_index_index].onload = callback_on_load.bindAsEventListener(callback_object);
		this.preload_images[this.preload_index_index].onfail = callback_on_fail.bindAsEventListener(callback_object);
		this.preload_images[this.preload_index_index].onerror = callback_on_fail.bindAsEventListener(callback_object);
		this.preload_images[this.preload_index_index].src = _dl_base_url + "media/images/x4/floater" + tmp[this.preload_index_index] + ".gif";
		this.preload_images[this.preload_index_index].className = "preload";

		this.preload_index_index++;
		
		if (this.preload_index_index == tmp.size())
		{
			// finished
			return 2;
		}
		
		// have more
		return 1;
	},
	
/* initialization functions */
	StartCat: function()
	{
		this.cat.left = _is_iframed ? 20 : 40;
		this.cat.top = 40;

		/* DOM object */
		this.cat.dom = document.createElement("img");
		this.cat.dom.src = _dl_base_url + "media/images/x4/floater100.gif";
		this.cat.dom.style.position = "absolute";
		this.cat.dom.width = 34 * this.scale;
		this.cat.dom.height = 21 * this.scale;
		this.cat.dom.style.zIndex = 300;
		this.dom_object.appendChild(this.cat.dom);
	},
	
	StartPowerups: function()
	{
		var i, j, tmp, top;
		
		top = 3;
		for (i=0; i<this.powerup_order.size(); i++ )
		{
			j = this.powerup_order[i];
			
			tmp = this.StartFloater({ type: this.powerups[j].icon_disabled_type_id, speed: 0, min_left: 3, max_left: 3, min_top: top, max_top: top, collision_possible: 0, z_index: 600 });
			this.powerups[j].dom_icon = this.floaters[tmp].dom;
			
			if (this.powerups[j].bar_type_id != null)
			{
				tmp = this.StartFloater({ type: this.powerups[j].bar_type_id, speed: 0, min_left: 17, max_left: 17, min_top: top + 9, max_top: top + 9, collision_possible: 0, z_index: 590 });
				this.floaters[tmp].dom.style.width = "0px";
				this.powerups[j].dom_bar = this.floaters[tmp].dom;
			}
			
			this.powerups[j].dom_label = document.createElement("div");
			this.powerups[j].dom_label.innerHTML = "";
			this.powerups[j].dom_label.className = "nyan_powerup_count";
			this.powerups[j].dom_label.style.zIndex = 580;
			this.powerups[j].dom_label.style.top = (top * this.scale) + "px";
			this.powerups[j].dom_label.style.left = (17 * this.scale) + "px";
			this.dom_object.appendChild(this.powerups[j].dom_label);
			
			top += 16;
		}
	},
	
	StartTip: function()
	{
		this.tip_dom = document.createElement("div");
		this.tip_dom.className = "nyan_tip";
		this.dom_object.appendChild(this.tip_dom);
	},

	StartFloater: function(param, id, keep_params)
	{
		var i, top, left, ok, reused, tmp;

		if (id == undefined)
		{
			for (i=0; i<this.floaters.size(); i++)
			{
				if (this.floaters[i].destroyed && this.floaters[i].reusable)
				{
					id = i;
					break;
				}
			}
			
			/* if we found no destroyed floater */
			if (id == undefined)
			{
				id = this.floaters.size();
				this.floaters[id] = {
					dom: document.createElement("img")
				};
				this.floaters[id].dom.style.position = "absolute";
				this.floaters[id].dom.style.zIndex = 100;
				this.dom_object.appendChild(this.floaters[id].dom);
			}

		}
		
		if (!keep_params)
		{
			Object.extend(this.floaters[id], {
				tagname: "img",
				min_left: 0,
				max_left: 1000,
				min_top: 0,
				max_top: 100,
				min_distance: 0,
				left: 0,
				top: 0,
				speed: -10,
				collision_possible: 0,
				auto_restart: 0,
				reusable: 1,
				z_index: 100
// NOT YET NEEDED
//				expiration: -1 // will destroy _exactly_ on that tick (not greater than)
			});
		}
		
		this.floaters[id] = Object.extend(this.floaters[id], param || {});
		
		/* we would not like to have floaters in the same class (10 element block (0-9, 10-19, ...)) near each other */
		ok = false;
		var tries = 0;
		while (!ok && tries++ < 100)
		{
			ok = true;
			left = this.floaters[id].min_left + Math.floor(Math.random() * (this.floaters[id].max_left - this.floaters[id].min_left));
			top = this.floaters[id].min_top + Math.floor(Math.random() * (this.floaters[id].max_top - this.floaters[id].min_top));
			for (i=0; i<this.floaters.size(); i++)
			{
				if (Math.floor(this.floaters[i].type / 10) != Math.floor(this.floaters[id].type / 10))
				{
					continue;
				}
				
				if (Math.abs(this.floaters[i].top - top) < 16 && Math.abs(this.floaters[i].left - left) < this.floaters[id].min_distance)
				{
					ok = false;
					break;
				}
			}
		}
		
		Object.extend(this.floaters[id], {
			destroyed: false,
			left: left,
			top: top
		});
		
		/* dom.style.width/height does not work in XHTML? hmm... */
		this.floaters[id].dom.src = _dl_base_url + "media/images/x4/floater" + this.floaters[id].type + ".gif";
		this.floaters[id].dom.style.left = "-100px";
		this.floaters[id].dom.style.top = "-100px";
		this.floaters[id].dom.width = this.floater_dimensions[this.floaters[id].type][0] * this.scale;
		this.floaters[id].dom.height = this.floater_dimensions[this.floaters[id].type][1] * this.scale;
		this.floaters[id].dom.style.display = "block";
		this.floaters[id].dom.style.zIndex = this.floaters[id].z_index;

		
		return id;
	},
	
	UpdateFloaterType: function(id, type_id)
	{
		this.floaters[id].type = type_id;
		this.floaters[id].dom.src = _dl_base_url + "media/images/x4/floater" + this.floaters[id].type + ".gif";
	},
	
	DestroyFloater: function(id)
	{
		this.floaters[id].destroyed = true;
		this.floaters[id].dom.style.display = "none";
	},

	DestroyFloatersByType: function(type_id)
	{
		var i;
		
		for (i=0; i<this.floaters.size(); i++)
		{
			if (this.floaters[i].type == type_id)
			{
				this.DestroyFloater(i);
			}
		}
	},
	
	InitScore: function()
	{
		this.score.value = 0;
		this.score.highest_value = 0;
		
		this.score.dom1 = document.createElement("div");
		this.score.dom1.id = "nyan_score";
		this.score.dom1.zIndex = 400;
		this.dom_object.appendChild(this.score.dom1);

		this.score.dom2 = document.createElement("div");
		this.score.dom2.id = "nyan_highest_score";
		this.score.dom2.zIndex = 400;
		this.dom_object.appendChild(this.score.dom2);
	},
	
	InitEvents: function()
	{
		document.observe('keypress', this.EventKeyDown.bindAsEventListener(this));
		document.observe('keydown', this.EventKeyDown.bindAsEventListener(this));
		document.observe('keyup', this.EventKeyUp.bindAsEventListener(this));
		document.observe('mousemove', this.EventMouseMove.bindAsEventListener(this));
		document.observe('scroll', this.EventScroll.bindAsEventListener(this));
		Event.observe(window, "scroll", this.EventScroll.bindAsEventListener(this));

		/* gyroscope handling, woohooo */
		if (window.DeviceOrientationEvent)
		{
			document.observe("deviceorientation", this.EventTilt.bindAsEventListener(this));
		}
		else if (window.DeviceMotionEvent)
		{
			document.observe("devicemotion", this.EventTilt.bindAsEventListener(this));
		}
		else
		{
			document.observe("MozOrientation", this.EventTilt.bindAsEventListener(this));
		}
	},

/* event handlers */	
	EventKeyDown: function(e)
	{
		this.up_pressed = this.up_pressed || (e.keyCode == Event.KEY_UP);
		this.down_pressed = this.down_pressed || (e.keyCode == Event.KEY_DOWN);
		switch (e.keyCode)
		{
			case 77: // = "m"
				this.muted = !this.muted;
				SoundController.SetMasterVolume(this.muted ? 0 : 100);
			break;
			
			case 80: // = "p"
				if (this.level == 0)
				{
					return;
				}
				if (this.paused)
				{
					this.Unpause();
				}
				else
				{
					this.Pause();
				}
			break;
			
			case 68: // = "d"
			{
				$('debug').style.display = $('debug').style.display != "block" ? "block" : "none";
			}
			
			case 49: // = "1"
				if (this.progress != 6 && !this.paused)
				{
					this.UsePowerup(72);
				}
			break;
			
			case 50: // = "2"
				if (this.progress != 6 && !this.paused)
				{
					this.UsePowerup(70);
				}
			break;
			
			case 51: // = "3"
				if (this.progress != 6 && !this.paused)
				{
					this.UsePowerup(71);
				}
			break;
			
			default:
				return;
			break;
		}

		if (e.preventDefault)
		{ 
			e.preventDefault()
		}
		e.returnValue = false;

		return false;
	},
	
	EventKeyUp: function(e)
	{
		this.up_pressed = this.up_pressed && (e.keyCode != Event.KEY_UP);
		this.down_pressed = this.down_pressed && (e.keyCode != Event.KEY_DOWN);
		return false;
	},
	
	EventMouseMove: function(e)
	{
		this.pointer_x = Math.min(Math.max(Math.round(Event.pointerX(e) / this.scale), 1), 500);
		this.pointer_y = Math.min(Math.max(Math.round(Event.pointerY(e) / this.scale), 1), 90);
	},
	
	EventScroll: function(e)
	{
		if (this.paused)
		{
			return;
		}
		window.scrollTop = 0;
		window.scrollLeft = 0;
		window.scroll(-1000, -1000);
		return;
	},

	EventTilt: function()
	{
		var x, y;
		
		if (event && event.beta && event.gamma)
		{
			x = event.beta;
			y = event.gamma;
		}
		else if (event && event.acceleration)
		{
			x = event.acceleration.x * 2;
			y = event.acceleration.y * 2;
		}
		else if (orientation)
		{
			x = orientation.x * 50
			y = orientation.y * 50
		}
		
		if (y > 5)
		{
			this.up_pressed = true;
		}
		else if (y < -5)
		{
			this.down_pressed = true;
		}
	},
	
/* hardworker functions */
	Pause: function()
	{
		this.paused = true;

		SoundController.SetChannelVolume(this.progress + 1, 0);
		SoundController.SetChannelVolume(0, 100);

		try
		{
			if ($('amungus') != null)
			{
				$('amungus').style.display = "block";
			}
			if (!_is_iframed)
			{
//				$('body').style.overflowY = "auto";
// 				$('header').style.display = "block";
				$('quickhelp').style.display = "block";
				$('sharing_stuffs').style.display = "block";
			}
		}
		catch (e) {}

		Tabber.GamePaused();
	},
	
	Unpause: function()
	{
		var height = document.viewport.getDimensions().height;
		
		this.paused = false;

		SoundController.SetChannelVolume(this.progress + 1, 100);
		SoundController.SetChannelVolume(0, 0);

		try
		{
			if ($('amungus') != null)
			{
				$('amungus').style.display = "none";
			}
			if (!_is_iframed)
			{
//				$('body').style.overflowY = "hidden";
//				$('header').style.display = (height < 470) ? "none" : "block";
				$('quickhelp').style.display = (height < 530) ? "none" : "block"
				$('sharing_stuffs').style.display = (height < 590) ? "none" : "block"
			}
		}
		catch (e) {}

		Tabber.GameUnpaused();
	},
	
	DoLevelGeneration: function()
	{
		var i, j, tmp, a;
		
		ColorScroller.SetTargetHue(204);
		ColorScroller.SetTargetSaturation(100);
		ColorScroller.SetTargetValue(30);
		ColorScroller.SetRepeatedHue(0);
		this.level++;
		this.progress = 0;
		this.level_ticks = 0;
		
		for (i=0; i<6; i++)
		{
			this.colors[i] = 0;
		}
		
		/* create the colored stars */
		a = Math.max(100, 600 - this.level * 20);
		tmp = new Array();
		for (i=0; i<6; i++)
		{
			while (1)
			{
				j = Math.floor(Math.random() * 6);
				if (tmp[j] != 1)
				{
					tmp[j] = 1
					break;
				}
			}
			this.StartFloater({type: i, min_left: 550 + j * a, max_left: 550 + j * a, speed: -5, auto_restart: 1, collision_possible: 1});
		}
		
		/* star a grey star */
		for (i=0; i<=Math.floor(this.level / 2); i++)
		{
			this.StartFloater({type: 40, min_left: 600, max_left: 1100, speed: -5, auto_restart: 1, collision_possible: 1});
		}
		
		tmp = 500;
		a = this.level;
		while (a > 0)
		{
			tmp -= 12;
			this.StartFloater({min_left: tmp, max_left: tmp, min_top: 50, max_top:50, min_distance: 0, type: 50 + (a % 10), speed: -5, collision_possible: 0});
			a = Math.floor(a / 10);
		}

		for (i=0; i<=7; i++)
		{
			SoundController.SetChannelVolume(i, 0);
		}
		SoundController.SetChannelVolume(1, 100);
	},

	StackPowerup: function(id)
	{
		this.powerups[id].count++;
	},
	
	UsePowerup: function(id, extra)
	{
		var i;
		
		
		if (extra != true)
		{
			if (this.powerups[id].count < 1 || this.powerups[id].ticks_left > 0)
			{
				return;
			}
			
			this.powerups[id].count--;
			
			if (this.powerups[id].count == 0)
			{
				this.powerups[id].dom_icon.src = _dl_base_url + "media/images/x4/floater" + this.powerups[id].icon_disabled_type_id + ".gif";
			}
			this.powerups[id].dom_label.innerHTML = (this.powerups[id].count == 0) ? "" : "x" + this.powerups[id].count;
		}
		
		switch (id)
		{
			case 60: // coin 250
				this.score.value += 250;
			break;
			
			case 61: // coin 500
				this.score.value += 500;
			break;
			
			case 70: // shield
				this.StartFloater({type: 80, left_min: this.cat.left + 34, left_max: this.cat.left + 34, top_min: this.cat.top - 3, top_max: this.cat.top - 3});
				this.powerups[70].ticks_left = this.powerups[70].ticks_max;
				ColorScroller.SetCurrentValues(200, 100, 80);
				SoundController.Play(15);
				
				/* draw bar here! (will be drawn in next tick anyways...) */
				this.powerups[70].dom_bar.style.width = (20 * this.scale) + "px"
			break;
			
			case 71: // nuke
				for (i=0; i<this.floaters.size(); i++)
				{
					/* find all grey stars _inside_the_screen_ */
					if (this.floaters[i].type == 40 && this.floaters[i].left < 500)
					{
						this.StartFloater({min_left: 500, max_left: 2000}, i, true);
					}
				}
				ColorScroller.SetCurrentValues(60, 30, 80);
				SoundController.Play(16);
				/* nuke has NO bar */
			break;
			
			case 72: // booster
				this.StartFloater({type: 81, left_min: this.cat.left + 34, left_max: this.cat.left + 34, top_min: this.cat.top - 3, top_max: this.cat.top - 3});
				this.powerups[72].ticks_left = this.powerups[72].ticks_max;
				ColorScroller.SetCurrentValues(126, 100, 80);
				SoundController.Play(17);
				
				/* draw bar here! (will be drawn in next tick anyways...) */
				this.powerups[72].dom_bar.style.width = (20 * this.scale) + "px"
			break;
		}
	},
	
	DoMoveCat: function()
	{
		/* update the position of the cat */
		if (this.up_pressed && this.cat.top > 2)
		{
			this.cat.top -= (this.powerups[72].ticks_left > 0) ? 4 : 2;
		}
		if (this.down_pressed && this.cat.top < 84)
		{
			this.cat.top += (this.powerups[72].ticks_left > 0) ? 4 : 2;
		}
	},

	DoMoveFloaters: function()
	{
		var i;
		
		/* move the floaters*/
		for (i=0; i<this.floaters.size(); i++)
		{
			if (this.floaters[i].destroyed)
			{
				continue;
			}
			
			/* if the floater reached the left edge of screen... */
			if (this.floaters[i].left < - this.floater_dimensions[this.floaters[i].type][0])
			{
				/* if we should restart it then do it */
				if (this.floaters[i].auto_restart)
				{
					this.StartFloater({min_left: 500, max_left: 1000}, i, true);
				}
				/* if not, mark it as destroyed */
				else
				{
					this.DestroyFloater(i);
					continue;
				}
			}
			
// NOT YET NEEDED
// 			/* kill the expired floater */
// 			if (this.floaters[i].expiration == this.ticks)
// 			{
// 				this.DestroyFloater(i);
// 				continue;
// 			}
			
			/* move the floater */
			this.floaters[i].left += this.floaters[i].speed;
			
			/* special floaters! */
			if (this.floaters[i].type == 80)
			{
				this.floaters[i].top = this.cat.top - 3;
				// will never move horizontally... but... who knows ;)
				this.floaters[i].left = this.cat.left + 32;
			}
			else if (this.floaters[i].type == 81)
			{
				this.floaters[i].top = this.cat.top - 3;
				// will never move horizontally... but... who knows ;)
				this.floaters[i].left = this.cat.left;
			}
			
			/* if it is a normal star... */
			if (this.floaters[i].type == 10)
			{
				/*  and final level reached, and we have a bit of luck... */
				if (this.progress == 6 && Math.random() < 0.05)
				{
					/* ... convert it to exploding star */
					this.UpdateFloaterType(i, 11 + Math.floor(Math.random() * 6));
//					this.floaters[i].type = ;
//					this.floaters[i].dom.src = "media/images/x4/floater" + this.floaters[i].type + ".gif";
				}
			}

			/* if it is an exploding star... */
			if (this.floaters[i].type > 10 && this.floaters[i].type < 20)
			{
				/* and final level not reached (new level), and we have a bit of luck... */
				if (this.progress < 6 && Math.random() < 0.15)
				{
					/* ...convert it a normal star */
					this.UpdateFloaterType(i, 10);
//					this.floaters[i].type = 10;
//					this.floaters[i].dom.src = "media/images/x4/floater" + this.floaters[i].type + ".gif";
				}
			}
		}
	},
		
	DoFloaterCollisionDetection: function()
	{
		var i, tmp;
		
		for (i=0; i<this.floaters.size(); i++)
		{
			if (this.floaters[i].destroyed || this.floaters[i].collision_possible != 1)
			{
				continue;
			}

			/* the cat has active shield */
			if (this.powerups[70].ticks_left > 0)
			{
				/* collision detection with shield AND cat */
				if (this.floaters[i].left >= this.cat.left &&
						this.floaters[i].left <= this.cat.left + 34 &&
						this.floaters[i].top >= this.cat.top -4 &&
						this.floaters[i].top <= this.cat.top + 19)
				{
					switch (this.floaters[i].type)
					{
						case 40: /* if it is a grey one */
							/* at the end of the level we do not want anything */
							if (this.progress == 6)
							{
								continue;
							}
				
							/* restart the star */
							this.StartFloater({}, i, true);
						break;
					}
				}
			}
						
			/* collision detection with cat */
			/* TODO: rewrite these parameters to have actual hitbox check */
			if (!(this.floaters[i].left >= this.cat.left &&
				this.floaters[i].left <= this.cat.left + 28 &&
				this.floaters[i].top >= this.cat.top -4 &&
				this.floaters[i].top <= this.cat.top + 19))
			{
				continue;
			}

			/* if it is a colored star */
			// (this.floaters[i].type >= 0 && this.floaters[i].type < 9)
			switch (this.floaters[i].type)
			{
				case 0: /* color stars */
				case 1: /* FALLTHROUGH */
				case 2: /* FALLTHROUGH */
				case 3: /* FALLTHROUGH */
				case 4: /* FALLTHROUGH */
				case 5: /* FALLTHROUGH */
					ColorScroller.SetTargetHue(Math.floor(Math.random() * 360));
					ColorScroller.SetTargetValue(30);
					ColorScroller.SetTargetSaturation(100);
					SoundController.SetChannelVolume(this.progress + 1, 0);
					this.progress++;
					SoundController.SetChannelVolume(this.progress + 1, 100);
					this.colors[this.floaters[i].type] = 1;
					this.DestroyFloater(i);
					SoundController.Play(10);
					if (this.progress == 6)
					{
						ColorScroller.SetTargetValue(60);
						ColorScroller.SetRepeatedHue(1);
						this.StartFloater({min_left: 500, max_left: 1000, min_top: 0, max_top: 80, type: 20, speed: -5, auto_restart: 1, collision_possible: 1});

						/* repeat the tips from level 15 */
						tmp = (this.level <= 14) ? this.level : 99;
						
						this.ShowTip(this.level_end_tips[tmp][Math.floor(Math.random() * this.level_end_tips[tmp].length)]);
						_stat("level_completed", "level=" + this.level + "&score=" + this.score.highest_value);
					}
				break;
				
				case 20: /* if it is a "next level" one */
					SoundController.Play(12);
					this.DoLevelGeneration();
					this.DestroyFloater(i);
				break;
				
				case 40: /* if it is a grey one */
					/* at the end of the level we do not want anything */
					if (this.progress == 6)
					{
						continue;
					}
					
					/* restart the star */
					this.StartFloater({}, i, true);
						
					/* make the screen grey */
					ColorScroller.SetTargetSaturation(0);
					ColorScroller.SetTargetValue(30);
					SoundController.Play(11);
					
					/* if the cat has collected any colors */
					if (this.progress > 0)
					{
						/* pick a random color to remove */
						while (1)
						{
							j = Math.floor(Math.random() * 6);
							if (this.colors[j] == 1)
							{
								break;
							}
						}
						this.score.value = Math.max(this.score.value - 250, 0);
						SoundController.SetChannelVolume(this.progress + 1, 0);
						this.progress--;
						SoundController.SetChannelVolume(this.progress + 1, 100);
						
						/* restart the star of picked color*/
						this.StartFloater({type: j, min_left: 500, max_left: 1000, min_distance: 200, speed: -5, auto_restart: 1, collision_possible: 1});
						
						/* remove the picked color */
						this.colors[j] = 0;
					}
				break;

				case 60: /* grab-and-use powerups */
				case 61: /* FALLTHROUGH */
					this.DestroyFloater(i);
					this.UsePowerup(this.floaters[i].type, true);
					SoundController.Play(14);
				break;
				
				case 70: /* stackable powerups  */
				case 71: /* FALLTHROUGH */
				case 72: /* FALLTHROUGH */
					if (!this.powerups[this.floaters[i].type].tip_shown)
					{
						this.ShowTip(this.powerups[this.floaters[i].type].tip);
						this.powerups[this.floaters[i].type].tip_shown = true;
					}
					this.DestroyFloater(i);
					this.StackPowerup(this.floaters[i].type);
					SoundController.Play(13);
					
					/* show the icon as enabled */
					this.powerups[this.floaters[i].type].dom_icon.src = _dl_base_url + "media/images/x4/floater" + this.powerups[this.floaters[i].type].icon_type_id + ".gif";
					this.powerups[this.floaters[i].type].dom_label.innerHTML = "x" + this.powerups[this.floaters[i].type].count;
				break;
				
				default:
					alert("Hmmm... What did the cat just collide? (Unhandled collision.)");
				break;
			}
		}
	},
	
	DoPowerupDecrease: function()
	{
		var i;
		var tmp = "";
		var keys = _keys(this.powerups);
		for (i=0; i<keys.size(); i++ )
		{
			tmp += keys[i] + " x" + this.powerups[keys[i]].count + " (" + this.powerups[keys[i]].ticks_left + " ticks left)<br/>";

			if (this.powerups[keys[i]].ticks_left < 0)
			{
				continue;
			}
			
			if (this.powerups[keys[i]].dom_bar != null)
			{
				this.powerups[keys[i]].dom_bar.style.width = (Math.ceil((this.powerups[keys[i]].ticks_left / this.powerups[keys[i]].ticks_max) * 20) * this.scale) + "px";
			}

			if (this.powerups[keys[i]].ticks_left == 0)
			{
				if (keys[i] == 70)
				{
					this.DestroyFloatersByType(80);
				}
				else if (keys[i] == 72)
				{
					this.DestroyFloatersByType(81);
				}
			}

			this.powerups[keys[i]].ticks_left--;
		}
	},
	
	DoRainbowSliceCreation: function()
	{
		var i;
		
		/* create a new rainbow slice */
		if (this.progress < 6)
		{
			for (i=0; i<6; i++)
			{
				if (this.colors[i] == 1)
				{
					this.StartFloater({
						type: i+30,
						min_left: this.cat.left + 3,
						max_left: this.cat.left + 3,
						min_top: this.cat.top + 2 + i * 3 - (this.ticks % 6 < 3 ? 1 : 0),
						max_top: this.cat.top + 2 + i * 3 - (this.ticks % 6 < 3 ? 1 : 0),
						speed: -5
					});
				}
			}
		}
		else
		{
			this.StartFloater({
				type: 36,
				min_left: this.cat.left + 3,
				max_left: this.cat.left + 3,
				min_top: this.cat.top + 2 - (this.ticks % 6 < 3 ? 1 : 0),
				max_top: this.cat.top + 2 - (this.ticks % 6 < 3 ? 1 : 0),
				speed: -5
			});
		}
	},
	
	DoScoreUpdate: function()
	{
		/* update score */
		if (this.ticks % 10 == 0 && this.progress < 6)
		{
			this.score.value += this.progress * this.level;
		}
		this.score.highest_value = Math.max(this.score.value, this.score.highest_value);
	},
	
	UpdateStats: function()
	{
		var now, tmp;
		
		now = (new Date()).getTime() / 1000;

		tmp = (this.stat.last_time == 0) ? 0 : (this.ticks - this.stat.last_ticks) / (now - this.stat.last_time);
		this.stat.tps = Math.floor(tmp) + "." + Math.floor(tmp * 10 % 10);
		this.stat.last_ticks = this.ticks;

		tmp = (this.stat.last_time == 0) ? 0 : (this.frames - this.stat.last_frames) / (now - this.stat.last_time);
		this.stat.fps = Math.floor(tmp) + "." + Math.floor(tmp * 10 % 10);
		this.stat.last_frames = this.frames;

		this.stat.last_time = now;
	},
	
	DoOptimizations: function()
	{
		/* if we're running very slow... */
		if (this.stat.fps < this.optimizations.min_fps)
		{
			/* check if we can decrease the tick interval... */
			if (this.frame_interval > this.optimizations.min_frame_interval + 4)
			{
				this.frame_interval -= 4;
			}
			/* or start skipping frames :/ */
			else if (this.frameskip < this.optimizations.max_frameskip)
			{
				this.frameskip++;
			}
			/* or disable the color scroller... ;( */
			else if (!this.optimizations.color_scroller_disabled)
			{
				this.optimizations.color_scroller_disabled = 1;
				ColorScroller.SetEnabled(false);
				$('body').style.backgroundColor = "#003366";
			}
			else
			{
				if (!this.optimizations.slow_warning_shown)
				{
					this.ShowTip(this.optimizations.slow_warning_tip);
					this.optimizations.slow_warning_shown = true;
				}
			}
		}
		/* if we're running too fast... */
		else if (this.stat.fps > this.optimizations.max_fps)
		{
			/* slow down a bit :) */
			if (this.frame_interval < this.optimizations.max_frame_interval - 3)
			{
				this.frame_interval += 3;
			}
		}
	},
		
	DoRenderFrame: function()
	{
		var i, pos;
		
		/* update DOM objects */
		pos = { top: this.dom_object.style.top, left: this.dom_object.style.left, width: Math.min(this.dom_object.getWidth(), 500 * this.scale) };
		
//		if (!this.optimizations.color_scroller_disabled)
//		{
//			$('body').style.backgroundColor = ColorScroller.GetRgbString();
//		}
		
		this.cat.dom.style.top = (this.cat.top * this.scale + pos.top) + "px";
		this.cat.dom.style.left = (this.cat.left * this.scale + pos.left) + "px";

		for (i=0; i<this.floaters.size(); i++)
		{
			if (this.floaters[i].left * this.scale > pos.width || this.floaters[i].destroyed)
			{
				if (this.floaters[i].dom.style.display != "none")
				{
					this.floaters[i].dom.style.display = "none";
				}
				continue;
			}
			else
			{
				if (this.floaters[i].dom.style.display != "block")
				{
					this.floaters[i].dom.style.display = "block";
				}
				this.floaters[i].dom.style.top = (this.floaters[i].top * this.scale + pos.top) + "px";
				this.floaters[i].dom.style.left = (this.floaters[i].left * this.scale + pos.left) + "px";
			}
		}
		this.score.dom1.style.top = (pos.top + 4) + "px";
		this.score.dom2.style.top = (pos.top + 20) + "px";

		this.score.dom1.innerHTML = "L" + this.level.toPaddedString(2) + " " + this.score.value.toPaddedString(6);
		this.score.dom2.innerHTML = this.score.highest_value != this.score.value ? this.score.highest_value.toPaddedString(6) : "";
	},
	
	DoPowerupDrop: function()
	{
		var tmp;
		
		/* repeat the powerups from level 15 */
		tmp = (this.level <= 14) ? this.level : 15 + this.level % 10;
		
		if (!this.powerup_drops[tmp] || !this.powerup_drops[tmp][this.level_ticks])
		{
			return false;
		}
		
		this.StartFloater({min_left: 500, max_left: 500, min_top: 0, max_top: 80, type: this.powerup_drops[tmp][this.level_ticks], speed: -5, auto_restart: 0, collision_possible: 1});
		return true;
	},
	
	HideTip: function()
	{
		this.tip_dom.style.display = "none";
	},
	
	ShowTip: function(text)
	{
		if (this.tip_timeout)
		{
			window.clearTimeout(this.tip_timeout);
		}
		this.tip_dom.innerHTML = text;
		this.tip_dom.style.display = "block";
		this.tip_dom.style.left = (($('body').getDimensions().width - 700) / 2) + "px";
		this.tip_timeout = window.setTimeout("Nyan.HideTip();", 10000);
	},
	
/* main/interface functions */	
	Init: function(dom_name, scale)
	{
		var i;
		
		this.frame = 0;
		this.scale = scale;
		this.score.value = 0;

		this.dom_object = $(dom_name);

		document.title += " =(^.^)= " + this.titles[Math.floor(Math.random() * this.titles.size())];

//		ColorScroller = ColorScroller;
		ColorScroller.Init(204, 0, 20);

//		SoundController = SoundController;
		SoundController.Init();

		this.InitEvents();
		$('ingame_help').style.left = (($('body').getDimensions().width - 500) / 2) + "px";
		$('ingame_help').style.display = "block";
	},
	
	ReadyToPlay: function()
	{
		var tmp;
		
		for (i=0; i<=7; i++)
		{
			SoundController.Play(i);
		}
		SoundController.SetChannelVolume(0, 100);

		ColorScroller.SetTargetSaturation(100);
		ColorScroller.SetTargetValue(30);
		
		// big_play_button
		tmp = document.createElement("img");
		tmp.src = _dl_base_url + "media/images/x4/floater101.gif";
		tmp.id = "big_play_button";
		tmp.width = 71 * this.scale;
		tmp.height = 48 * this.scale;
		tmp.style.cursor = "pointer";
		tmp.style.position = "absolute";
//		center:
//		tmp.style.top = "100px";
//		tmp.style.left = (($('body').getDimensions().width - 71 * this.scale) / 2) + "px";
		tmp.style.top = "100px";
		tmp.style.left = (($('body').getDimensions().width + 700) / 2 - 71 * this.scale) + "px";
		tmp.onclick = this.Start.bindAsEventListener(this);
		this.dom_object.appendChild(tmp);
		
		// this.Tick(); // automatically rescheduled
		this.FrameTick(); // automatically rescheduled
		SoundController.Tick(); // automatically rescheduled
		ColorScroller.Tick(); // automatically rescheduled
		
		this.StartTip();
		this.ShowTip(this.loader_tips[Math.floor(Math.random() * this.loader_tips.length)]);
		
		$('ingame_help').style.top = "130px";
		$('ingame_help').style.left = (($('body').getDimensions().width - 750) / 2) + "px";
	},
	
	Start: function()
	{
		$('ingame_help').style.display = "none";
		this.StartCat();

		/* create normal stars (they will never be destroyed) */
		for (i=0; i<50; i++)
		{
			this.StartFloater({type: 10, min_distance: 15, auto_restart: 1, speed: -5});
		}
		
		/* initial grey stars */
		for (i=0; i<5; i++)
		{
			this.StartFloater({type: 40, min_left: 600, max_left: 1100, speed: -5, auto_restart: 1, collision_possible: 1});
		}
	
		$('big_play_button').style.display = "none";
		
		this.StartPowerups();
		this.UpdateStats();
		this.InitScore();
		this.DoLevelGeneration();

		this.HideTip();
		
		/* let the nyan-nyan-nyan begin! */
		this.Unpause();
	},
	
	/* this function does the real things */
	Tick: function()
	{
		var i, j, pos;
		
		this.ticks++;
		this.level_ticks++;
		
		this.DoMoveCat();
		this.DoMoveFloaters();
		this.DoFloaterCollisionDetection();
		this.DoRainbowSliceCreation();
		if (this.progress != 6)
		{
			this.DoPowerupDecrease();
		}
		this.DoScoreUpdate();
		this.DoPowerupDrop();

		/* save the stats */
		if (this.ticks % 500 == 0)
		{
			_stat("game_tick", "ticks=" + this.ticks + "&level=" + this.level + "&progress=" + this.progress + "&score=" + this.score.highest_value + "&fps=" + this.stat.fps + "&tick_interval=" + this.tick_interval, true);
		}
		
		/* keep the session and whos.amung.us updated */
		if (this.ticks % 1000 == 750)
		{
			_keepalive();
		}
		
		if (this.ticks % 100 == 0)
		{
			// TODO: resync the tracks...
			// SoundController.Sync(0, [1, 2, 3, 4, 5, 6]);
		}

		if (this.ticks % 20 == 0)
		{
			/* collect stats and do neccesary optimizations */
			this.UpdateStats();
			this.DoOptimizations();
			
		}
	},
	
	/* this is the renderer */
	FrameTick: function()
	{
		var i, ticks_needed, current_time;
		
		Profiler.Start();
		
		this.frames++;
		current_time = (new Date()).getTime();
		
		if (!this.paused)
		{
//			ticks_needed = Math.ceil((current_time - this.last_frame_time) / this.tick_interval);
//			ticks_needed = Math.max(ticks_needed, 1);

			/* do all the deferred ticks (if any) from the last trender time till the target time (now) */
			while (this.last_tick_time < current_time)
			{
				this.Tick();
				this.last_tick_time += this.tick_interval;
			}
		
			Profiler.EndOf("tick stuffs");
			
			this.DoRenderFrame();
			Profiler.EndOf("DoRenderFrame()");
		}
		else
		{
			/* if we not need to tick, we think we are up to date */
			this.last_tick_time = current_time;
		}


		/* victory! */
/*
		if (this.progress == 6)
		{
			tmp = Math.max(Math.abs(this.last_pointer_x - this.pointer_x), Math.abs(this.last_pointer_y - this.pointer_y)) / 4;
			for (i=0; i<tmp + 1; i++)
			{
				this.StartFloater({
					type: 36,
					min_left: Math.floor(this.last_pointer_x + (this.pointer_x - this.last_pointer_x) * i / tmp) - 6,
					max_left: Math.floor(this.last_pointer_x + (this.pointer_x - this.last_pointer_x) * i / tmp) - 6,
					min_top: Math.floor(this.last_pointer_y + (this.pointer_y - this.last_pointer_y) * i / tmp) - 12,
					max_top: Math.floor(this.last_pointer_y + (this.pointer_y - this.last_pointer_y) * i / tmp) - 12,
					speed: -4
				});
			}
		}

		this.last_pointer_x = this.pointer_x;
		this.last_pointer_y = this.pointer_y;
*/

		/* display some debug message... */
		$('a').innerHTML =
			"ticks: " + this.ticks + " (tps: " + this.stat.tps + ", tick_interval: " + this.tick_interval + "), frames: " + this.frames + " (fps: " + this.stat.fps + ", frame_tick_interval: " + this.frame_tick_interval + ") <br/>" +
			"floaters: " + this.floaters.size() + ", dom children: " + this.dom_object.childNodes.length + "<br/>" + 
			"level: " + this.level + ", progress: " + this.progress + "<br/>" +
			Profiler.GetText();
			
		/* reschedule Tick() */
		// dragons? seems that way...
		window.clearTimeout(this.timeout);
		this.timeout = window.setTimeout("Nyan.FrameTick();", this.frame_tick_interval);

		this.last_frame_time = current_time;
	}
};

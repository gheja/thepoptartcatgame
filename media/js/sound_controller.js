/*
  Gabor Heja (gheja/kao/kakaopor), 2011.
  Feel free to use for anything.
  Except for deploying or creating nuclear weapons. ;)
*/

var SoundController = {
	sound_manager_loaded: false,
	sound_objects: [],
	master_properties: {
		current_volume: 80,
		target_volume: 80
	},
	channel_properties: [],
	volume_speed: 20,
	files: {
		// name, initial volume, repeat
		0: [ "music/00_pause_short.mp3", 0, 1 ],
		1: [ "music/01_layer01_short.mp3", 0, 1 ],
		2: [ "music/02_layer02_short.mp3", 0, 1 ],
		3: [ "music/03_layer03_short.mp3", 0, 1 ],
		4: [ "music/04_layer04_short.mp3", 0, 1 ],
		5: [ "music/05_layer05_short.mp3", 0, 1 ],
		6: [ "music/06_layer06_short.mp3", 0, 1 ],
		7: [ "music/07_layer07_short.mp3", 0, 1 ],
		10: [ "sounds/_coloured_star.mp3", 80, 0 ],
		11: [ "sounds/_grey_star.mp3", 80, 0 ],
		12: [ "sounds/_next_level.mp3", 80, 0 ],
		13: [ "sounds/_pickup_powerup.mp3", 80, 0 ],
		14: [ "sounds/_pickup_coin.mp3", 80, 0 ],
		15: [ "sounds/_use_force_field_short.mp3", 80, 0 ],
		16: [ "sounds/_use_nuke.mp3", 80, 0 ],
		17: [ "sounds/_use_speed.mp3", 80, 0 ]
	},
	timeout: null, // the timeout object
	tick_interval: 50,
	ticks: 0,
	
	
/* the preloader */
	preload_index: 0,
	preload_tries: 0,

	PreloadProperties: function()
	{
		return { step_weight : 100, total_steps: _keys(this.files).size() };
	},

	PreloadNext: function(callback_object, callback_on_load, callback_on_fail)
	{
		var tmp = _keys(this.files);
		var j = tmp[this.preload_index];
		
		if (!this.sound_manager_loaded)
		{
			this.preload_tries++;
			if (this.preload_tries == 3)
			{
				$('flashblock_warning').style.display = "block";
				try
				{
					$('sm2-container').className = "swf_timedout";
					$('sm2-container').childNodes[0].style.width = "100%";
					$('sm2-container').childNodes[0].style.height = "100%";
				}
				catch (e) {}

				_stat("possible_flashblock", "");
			}
			else 
			if (this.preload_tries == 13)
			{
				try
				{
					$('flashblock_warning').style.display = "none";
					$('sm2-container').style.display = "none";
				}
				catch (e) {}

				_stat("nosound", "");
				
				// failed, skip this class
				return 98;
			}
			
			// try again later
			return 3;
		}
		
		this.channel_properties[j] = {
			filename: this.files[j][0],
			current_volume: this.files[j][1],
			target_volume: this.files[j][1]
		};
		
		this.sound_objects[j] = soundManager.createSound({
			id: "sound" + j,
			url: _dl_base_url + "media/" +this.files[j][0],
			volume: this.files[j][1],
			loops: this.files[j][2] ? 100000 : 1, /* hackish, i know */
			autoLoad: true,
			stream: false,
			onload: callback_on_load.bindAsEventListener(callback_object),
			onerror: callback_on_fail.bindAsEventListener(callback_object)
		});

		this.preload_index++;
		
		if (this.preload_index == tmp.size())
		{
			// finished
			return 2;
		}
		
		// have more!
		return 1;
	},

/* ... */
	Play: function(index)
	{
		if (!this.sound_manager_loaded)
		{
			return;
		}
//		$('debug').innerHTML += "start: " + index + "<br/>";
		try
		{
			soundManager.play("sound" + index);
			soundManager.setVolume("sound" + index, this.master_properties.current_volume * this.channel_properties[index].current_volume / 100);
		}
		catch (e) {
		}
	},
	
	Stop: function(index)
	{
		if (!this.sound_manager_loaded)
		{
			return;
		}
//		$('debug').innerHTML += "stop: " + index + "<br/>";
		try
		{
			soundManager.stop("sound" + index);
		}
		catch (e) {}
	},
	
	SetMasterVolume: function(volume)
	{
		if (!this.sound_manager_loaded)
		{
			return;
		}
		this.master_properties.target_volume = volume;
	},
	
	SetChannelVolume: function(index, volume)
	{
		if (!this.sound_manager_loaded)
		{
			return;
		}
		this.channel_properties[index].target_volume = volume;
	},
	
	SoundManagerLoaded: function()
	{
		this.sound_manager_loaded = true;
		$('flashblock_warning').style.display = "none";
		$('sm2-container').className = "sm2_loaded";
	},
	
	Init: function()
	{
//		$('debug').innerHTML += "sound_init<br/>";
//		soundManager.url = _dl_base_url + "media/3rdparty/soundmanager2";
		soundManager.url = "soundmanager2_flash";
		soundManager.flashPollingInterval = 1000;
		soundManager.allowScriptAccess = 'always';
		soundManager.flashLoadTimeout = 60000; // one minute
		soundManager.useFlashBlock = true;
		soundManager.useHTML5Audio = true;
		soundManager.onload = this.SoundManagerLoaded.bindAsEventListener(this);
	},
	
	Sync: function(source_id, target_ids)
	{
		if (!this.sound_manager_loaded)
		{
			return;
		}
		return;
		
		var i;
		
//		$('debug').innerHTML += "sound_sync<br/>";
		for (i=0; i<target_ids.size(); i++)
		{
			this.sound_objects[target_ids[i]].stop();
			this.sound_objects[target_ids[i]].setPosition(this.sound_objects[source_id].position);
			this.sound_objects[target_ids[i]].play();
		}
	},
	
	Tick: function()
	{
		var i, keys, channel_changed, master_changed;
		
		this.ticks++;
		
		if (!this.sound_manager_loaded)
		{
			return;
		}
		
		master_changed = false;
		if (this.master_properties.current_volume != this.master_properties.target_volume)
		{
			if (Math.abs(this.master_properties.current_volume - this.master_properties.target_volume) < this.volume_speed)
			{
				this.master_properties.current_volume = this.master_properties.target_volume;
			}
			else
			{
				this.master_properties.current_volume += (this.master_properties.current_volume < this.master_properties.target_volume ? 1 : -1) * this.volume_speed;
			}
			master_changed = true;
		}
		
		keys = _keys(this.files);

		for (i=0; i<keys.size(); i++)
		{
			try
			{
				$("sound" + i + "_time").innerHTML = (this.sound_objects[keys[i]].position - this.sound_objects[keys[0]].position) + ":" + this.channel_properties[keys[i]].current_volume + "%";
			}
			catch (e)
			{
			}
			
			channel_changed = false;
			if (this.channel_properties[keys[i]].current_volume != this.channel_properties[keys[i]].target_volume)
			{
				if (Math.abs(this.channel_properties[keys[i]].current_volume - this.channel_properties[keys[i]].target_volume) < this.volume_speed)
				{
					this.channel_properties[keys[i]].current_volume = this.channel_properties[keys[i]].target_volume;
				}
				else
				{
					this.channel_properties[keys[i]].current_volume += (this.channel_properties[keys[i]].current_volume < this.channel_properties[keys[i]].target_volume ? 1 : -1) * this.volume_speed;
				}
				channel_changed = true;
			}
			
			if (channel_changed || master_changed)
			{
				try
				{
//					$('debug').innerHTML += "sound" + keys[i] + " / " + (this.master_properties.current_volume * this.channel_properties[keys[i]].current_volume / 100) + "%<br/>";
					soundManager.setVolume("sound" + keys[i], this.master_properties.current_volume * this.channel_properties[keys[i]].current_volume / 100);
				}
				catch (e) {}
			}
		}
		
		if (master_changed)
		{
			try
			{
				soundManager.defaultOptions.volume = this.master_properties.current_volume;
			}
			catch (e) {}
		}
		
		window.clearTimeout(this.timeout);
		this.timeout = window.setTimeout("SoundController.Tick();", this.tick_interval);
	}
};

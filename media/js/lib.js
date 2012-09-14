function amungus_fix()
{
	var divs = document.getElementsByTagName("div");
	var i;
	
	for (i=0; i<_keys(divs).size(); i++)
	{
		if (divs[i] != null && divs[i].title.indexOf('oqy9gwlcbefu') != -1)
		{
			divs[i].id = "amungus";
			return true;
		}
	}
	
	window.setTimeout("amungus_fix();", 500);
	return false;
}

function link_fix()
{
	var links = document.getElementsByTagName("a");
	var i;
	
	for (i=0; i<_keys(links).size(); i++)
	{
		if (links[i] != null && (links[i].href.indexOf('http://') != -1 || links[i].href.indexOf('https://') != -1))
		{
			links[i].onclick = function() { window.open("out.php?" + this.href); return false; };
		}
	}
	
	return true;
}

function init()
{
	amungus_fix();
	link_fix();
	
	Tabber.Init("tabs");
	Nyan.Init('nyan', 4);
	// SoundController.Init();
			
	Preloader.Init({
		classes: [ Nyan, SoundController ],
		class_weights: [ 10, 200 ],
		onfinish: [ Nyan, Nyan.ReadyToPlay ],
		dom_loader: $('loader'),
		dom_progressbar: $('progressbar'),
		dom_failed: $('preload_failed')
	});
			
	Preloader.Start();
}

function _keys(obj)
{
	var result = [];
	var key;
	
	for (key in obj)
	{
		result.push(key);
	}
	
	return result;
}

var _stat_id = null;

function _keepalive()
{
/* disabled the iframe as it can slow down the game */
//	try
//	{
//		$('keepalive_iframe').src = "keepalive.html";
//	}
//	catch (e) {}
}

function _stat(stat_type, parameters)
{
	if (_stat_id == null)
	{
		_stat_id = Math.floor(Math.random() * 100000000).toPaddedString(8);
	}
	try
	{
/* disabled the iframe as it can slow down the game */
//		$('keepalive_iframe').src = "keepalive_stat.html?type=" + stat_type + "&" + parameters + "&id=" + _stat_id;
		new Ajax.Request("poptartstat?type=" + stat_type + "&" + parameters + "&id=" + _stat_id, {method: "get"});
	}
	catch (e) {}
}

function _twitter(query, title)
{
	return new TWTR.Widget({
	  version: 2,
	  type: 'search',
	  search: query,
	  interval: 6000,
	  title: title,
	  subject: '',
	  width: 'auto',
	  height: 320,
	  theme: {
	    shell: {
	      background: '#282828',
	      color: '#808080'
	    },
	    tweets: {
	      background: '#101010',
	      color: '#d0d0d0',
	      links: '#0080f0'
	    }
	  },
	  features: {
	    scrollbar: false,
	    loop: true,
	    live: true,
	    hashtags: true,
	    timestamp: true,
	    avatars: true,
	    toptweets: true,
	    behavior: 'default'
	  }
	}).render().start();
}

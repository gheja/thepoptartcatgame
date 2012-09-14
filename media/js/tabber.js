/*
  Gabor Heja (gheja/kao/kakaopor), 2011.
  Feel free to use for anything.
  Except for deploying or creating nuclear weapons. ;)
*/

var Tabber = {
	has_tab_open: false,
	last_tab_id: -1,
	pages: [],
	tabs: [],
	
	A: function(obj)
	{
		var id;
		try
		{
			id = obj.id.split('_')[1];
			this.OpenTab(id);
			Nyan.Pause();
		}
		catch (e) {}
	},
	
	GamePaused: function()
	{
		this.OpenTab(this.last_tab_id);
	},
	
	GameUnpaused: function()
	{
		this.OpenTab(-1);
	},
	
	OpenTab: function(id)
	{
		var i;

		if (id != -1)
		{
			this.has_tab_open = true;
			this.last_tab_id = id;
		}
		else
		{
			this.has_tab_open = false;
		}

		for (i=0; i<this.pages.size(); i++)
		{
			if (i == id)
			{
				this.pages[i].style.display = "block";
				this.tabs[i].className = "tab active";
			}
			else
			{
				this.pages[i].style.display = "none";
				this.tabs[i].className = "tab";
			}
		}
	},
	
	Init: function(dom_id)
	{
		var i, j, tmp2, obj, ul_obj;
		var divs = document.getElementsByTagName("div");
		var tabs_dom = $(dom_id);

		ul_obj = document.createElement("ul");
		
		j = 0;
		
		for (i=0; i<_keys(divs).size(); i++)
		{
			if (divs[i] == null || divs[i].className != "page")
			{
				continue;
			}
			
			/* get the heading */
			tmp2 = divs[i].getElementsByTagName("h2")[0];
			
			/* create the list item (the tab itself) */
			this.tabs[j] = document.createElement("li");
			this.tabs[j].id = "tab_" + j;
			this.tabs[j].innerHTML = tmp2.innerHTML;
			this.tabs[j].onclick = function() { Tabber.A(this); };
			ul_obj.appendChild(this.tabs[j]);
			
			/* remove the original heading */
			tmp2.parentNode.removeChild(tmp2);

			this.pages[j] = divs[i];
			
			j++;
		}
		
		tabs_dom.appendChild(ul_obj);
		this.OpenTab(0);
	}
};
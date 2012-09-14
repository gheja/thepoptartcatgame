<?php
	$dl_base_url = "./";
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>The Pop Tart Cat Game</title>
		<link rel="stylesheet" href="<?php echo $dl_base_url; ?>media/css/reset.css" type="text/css" />
		<link rel="stylesheet" href="<?php echo $dl_base_url; ?>media/css/style.css" type="text/css" />
		<!--[if IE]>
		<link rel="stylesheet" href="<?php echo $dl_base_url; ?>media/css/style_ie.css" type="text/css" />
		<![endif]-->
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/3rdparty/prototypejs/prototype.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/3rdparty/soundmanager2/soundmanager2-nodebug-jsmin.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/resources_x4.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/lib.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/preloader.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/tabber.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/profiler.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/color_scroller.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/sound_controller.js"></script>
		<script type="text/javascript" src="<?php echo $dl_base_url; ?>media/js/nyan.js"></script>
		<script type="text/javascript" src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script>
		<script type="text/javascript" src="http://widgets.twimg.com/j/2/widget.js"></script>
		<meta property="og:title" content="The Pop Tart Cat Game"/>
		<meta property="og:type" content="game"/>
		<meta property="og:url" content="http://thepoptartcatgame.com/"/>
		<meta property="og:image" content="<?php echo $dl_base_url; ?>media/images/facebook_image_180x180.png"/>
		<meta property="og:site_name" content="thepoptartcatgame.com"/>
		<meta property="fb:admins" content="gabor.heja"/>
		<meta name="keywords" content="nyan, cat, game, play, free, pop, tart, pop-tart"/>
		<meta name="description" content="Help Pop Tart Cat (Nyan Cat) to have a rainbow! All you have to do is to collect all the colored stars but not the grey ones. Fortunately you will find powerups on your way. Can you keep up for the 13th level?"/>
	</head>
	<body id="body">
		<div id="fb-root"></div>

		<div id="header">
			<h1>thepoptartcatgame.com</h1>
		</div>

		<div id="loader">
			<div id="progressbar">
			</div>
		</div>
		
		<div id="ingame_help">
			<table>
				<tr>
					<td class="td0">
						<img src="<?php echo $dl_base_url; ?>media/images/x4/floater0.gif" alt="Colored star">
						<img src="<?php echo $dl_base_url; ?>media/images/x4/floater1.gif" alt="Colored star">
						<img src="<?php echo $dl_base_url; ?>media/images/x4/floater2.gif" alt="Colored star"><br/>
						<img src="<?php echo $dl_base_url; ?>media/images/x4/floater3.gif" alt="Colored star">
						<img src="<?php echo $dl_base_url; ?>media/images/x4/floater4.gif" alt="Colored star">
						<img src="<?php echo $dl_base_url; ?>media/images/x4/floater5.gif" alt="Colored star">
					</td>
					<td>
						Collect these stars to complete your rainbow!<br/>
					</td>
				</tr>
				<tr>
					<td class="td0"><img src="<?php echo $dl_base_url; ?>media/images/x4/floater40.gif" alt="Grey star"></td>
					<td>Avoid the grey stars</td>
				</tr>
				<tr>
					<td class="td0"><img src="<?php echo $dl_base_url; ?>media/images/x4/floater72.gif" alt="Booster" /></td>
					<td>Booster powerup - press 1 to use</td>
				</tr>
				<tr>
					<td class="td0"><img src="<?php echo $dl_base_url; ?>media/images/x4/floater70.gif" alt="Shield" /></td>
					<td>Shield powerup - press 2 to use</td>
				</tr>
				<tr>
					<td class="td0"><img src="<?php echo $dl_base_url; ?>media/images/x4/floater71.gif" alt="Nuke" /></td>
					<td>Nuke powerup - press 3 to use</td>
				</tr>
			</table>
		</div>
		
		<div id="preload_failed">
			Ooops... Appearently something went wrong. We are very sorry.<br/>
			<br/>
			This site needs CSS,  JavaScript and Flash to  music and sounds, if you have FlashBlock, please whitelist this domain.<br/>
			<br/>
			You can try to <a href="?reload">reload the page</a>, if that does not help please see the Contact page.
		</div>
		
		<div id="flashblock_warning">
			Hmm... Do you use Flashblock?<br/>
			<br/>
			If so, please enable the player above to have sounds.<br/>
			<br/>
			Will continue without sounds and music in 10 seconds...<br/>
		</div>

		<div id="nyan"></div>

		<div id="clearer"></div>
<?php
	if (!array_key_exists("iframe", $_GET)) { 
?>
		<div id="footer">
			<p id="quickhelp">
				Controls: up/down: move cat, P: pause, M: mute, 1-3: powerups (more controls on Help tab)
			</p>
			
			<p id="sharing_stuffs">
				<fb:like href="http://thepoptartcatgame.com/" show_faces="false" width="150" send="true" layout="button_count"></fb:like>
				<iframe src="sharing.html" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width: 590px; height: 30px;" allowTransparency="true"></iframe>
			</p>
			
			<div id="tabs"></div>
			
			<div class="page">
				<h2>Help and controls</h2>
				<h3>How to play</h3>
				<p>
					Hello little cat and welcome to the space!
				</p>
				<p>
					We know how much you like colors, so you must love
					rainbows. Great news! Your dream of having one can
					become true today - you can have a rainbow for
					yourself! And that's not all, you can have as many
					as you want! Everything depends on your skills of
					collecting and avoiding stars. 
				</p>
				<p>
					All you have to do is to collect all the <b>colored
					stars</b>. But beware: collecting a <b>grey one</b>
					will remove a color of your rainbow, so be careful
					and try to dodge them.
				</p>
				<p>
					After each completed rainbow you will meet more and
					more grey stars on your way, making your goal to
					have your next one harder. But fear not! We have
					created <b>super powerups</b> to help you! 
				</p>
				<p>
					Now go little cat, find your rainbows and become the
					real Pop Tart Cat!
				</p>
				<h3>Controls</h3>
				<p class="controls">
					<b>up</b> / <b>down</b> Move the cat up or down<br/>
					<b>P</b> Pause the game<br/>
					<b>M</b> Mute sounds and music (but why would you do that? :])<br/>
					<b>1</b> Use a <img src="<?php echo $dl_base_url; ?>media/images/x1/floater72.gif" alt="Booster" /> Booster powerup<br/>
					<b>2</b> Use a <img src="<?php echo $dl_base_url; ?>media/images/x1/floater70.gif" alt="Booster" /> Shield powerup<br/>
					<b>3</b> Use a <img src="<?php echo $dl_base_url; ?>media/images/x1/floater71.gif" alt="Booster" /> Nuke powerup<br/>
				</p>
			</div>

			<div class="page" style="height: auto">
				<h2>Post a comment</h2>
				<h3>Facebook comment</h3>
				<fb:comments href="thepoptartcatgame.com" num_posts="5" width="700" colorscheme="dark"></fb:comments>
				<br class="clearer"/>
				<p>
					Please note: if you intend to reach the creators not the players please see the Contact page for details.
				</p>
			</div>
			
			<div class="page">
				<h2>Credits and contact</h2>
				<h3>Credits</h3>
				<div class="credits">
					<ul>
						<li>
							<b>Gábor Héja "kao"</b> (<a href="http://www.facebook.com/gabor.heja">facebook</a>)<br/>
							Code, additional graphics
						</li>
						<li>
							<b>Lászlo Vincze "Vincenzo"</b> (<a href="http://www.strayboom.com/">webpage</a>)<br/>
							Music, sound effects
						</li>
						<li>
							<b>László Eszik "Coyote"</b><br/>
							Graphics
						</li>
						<li>
							<b>Viktória Molnár "Bambi"</b> (<a href="http://www.facebook.com/profile.php?id=1802825082">facebook</a>)<br/>
							Ideas, lot of beta testing
						</li>
						<li>
							<b>Chris Torres "PRguitarman"</b> (<a href="http://www.prguitarman.com/index.php?id=348">webpage</a>)<br/>
							The original Pop Tart Cat animated GIF
						</li>
					</ul>

					<h3>Libraries used</h3>
					<ul>
						<li>
							<b>Prototype JavaScript framework</b> (<a href="http://www.prototypejs.org/">webpage</a>)
						</li>
						<li>
							<b>SoundManager 2</b> (<a href="http://www.schillmania.com/projects/soundmanager2/">webpage</a>)
						</li>
					</ul>

					<h3>Contact</h3>
					<p>
						Please send your comments to the <b>contact(^.^)thepoptartcatgame.com</b> e-mail address.
					</p>
				</div>
			</div>

			<div class="page">
				<h2>Links</h2>
				<h3>The Cat in the wild</h3>
				<ul>
					<li><a href="https://market.android.com/details?id=hu.butcher.nyanCat">NyanCat Game for Android</a>
				</ul>
				
				<h3>Moar links</h3>
				<ul>
					<li><a href="http://www.youtube.com/watch?v=QH2-TGUlwu4">"Nyan Cat [original]" video on YouTube</a> - where the whole started... :)</li>
					<li><a href="http://www.prguitarman.com/index.php?id=348">The original Pop Tart Cat</a></li>
					<li><a href="http://www.levelupstudios.com/pop-tart-cat">Pop Tart Cat T-Shirt</a> - get your own today! ;)</li>
					<li><a href="http://www.youtube.com/watch?v=AfewnErdRhs">Nyan Cat Violin Cover on YouTube</a>
				</ul>
			</div>
		</div>
<?php } else { ?>
		<div id="footer">
			<p id="quickhelp" style="padding: 0; margin: 0">
				Controls: up/down: move cat, P: pause, M: mute, 1-3: powerups | <a href="http://thepoptartcatgame.com/">See the full version, help and credits</a>
			</p>
			<p id="sharing_stuffs" style="padding: 0; margin: 0">
				<fb:like href="http://thepoptartcatgame.com/" show_faces="false" width="150" send="true" layout="button_count"></fb:like>
				<iframe src="sharing.html" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width: 590px; height: 30px;" allowTransparency="true"></iframe>
			</p>
			
			<div style="display: none">
				<div id="tabs"></div>
			</div>
		</div>
		
<?php } ?>
		
		<!-- uhm, eh, just ignore this... -->
		<div id="debug">
			<span id="sound0_time">...</span>|
			<span id="sound1_time">...</span>|
			<span id="sound2_time">...</span>|
			<span id="sound3_time">...</span>|
			<span id="sound4_time">...</span>|
			<span id="sound5_time">...</span>|
			<span id="sound6_time">...</span>|
			<span id="sound7_time">...</span>|
			<div id="a"></div>
		</div>
<!--		
		<iframe src="keepalive.html?id=0&type=just_loaded" style="width: 1px; height: 1px; background: transparent;" id="keepalive_iframe"></iframe>
-->
		<script type="text/javascript">
			var _dl_base_url = <?php echo "\"". $dl_base_url . "\""; ?>;
			var _is_iframed = <?php echo (int) array_key_exists("iframe", $_GET); ?>;
			<?php if (array_key_exists("tinycat", $_GET)) { ?>
			init(1);
			<?php } else { ?>
			init(4);
			<?php } ?>
		</script>
	</body>
</html>

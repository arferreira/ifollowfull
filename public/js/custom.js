//INITIALIZES FLEXSLIDER
jQuery(document).ready(function() {

	jQuery('.flexslider').flexslider({
		animation: "slide",
		directionNav: true,
		controlNav: false, 
		easing: "swing", 
		direction: "horizontal",
		controlsContainer: ".flex-container",
	});

		// Accordion
	jQuery("ul.ts-accordion li").each(function(){
		if(jQuery(this).index() > 0){
			jQuery(this).children(".accordion-content").css('display','none');
		}else{
			jQuery(this).find(".accordion-title").addClass('active');
		}
		
				
		jQuery(this).children(".accordion-title").bind("click", function(){
			jQuery(this).addClass(function(){
				if(jQuery(this).hasClass("active")) return "";
				return "active";
			});
			jQuery(this).siblings(".accordion-content").slideDown();
			jQuery(this).parent().siblings("li").children(".accordion-content").slideUp();
			jQuery(this).parent().siblings("li").find(".active").removeClass("active");
		});
	});
});
//================= End =============//

//INITIALIZES SCROLLING NAVIGATION
jQuery(document).ready(function(){
 	jQuery('#sidemenu').visualNav({
    	//target the .menu class in the menu
    	link : 'a.menu'
	});
});

//================= End =============//

// CHART
jQuery(document).ready(function(){
 //create instance
});
//================= End =============//
	jQuery('.callbacks_nav').click(function(){
	
		jQuery("#slider3 li").each(function(){
			if(jQuery(this).css('display') == 'none')
			{
				var charts = jQuery(this).find('.chart');
				charts.each(function() {
				  jQuery(this).data('easyPieChart').update(charts.attr("data-percent"));
				});
			}
		});
		
	});
	jQuery(window).scroll(function() { 
		// Intro Wrap
		jQuery('.has-animation:in-viewport').each(function() {
			da = jQuery(this).attr('data-animation');
			jQuery(this).addClass(da);
		});
		jQuery('.intro-wrap:in-viewport').each(function() {
			jQuery(this).addClass("shake a1");
		});
		jQuery('.chart:in-viewport').easyPieChart({
        animate: 4000,
        barColor: "#ffcc33",
        trackColor: false,
        scaleColor: false,
        lineWidth: 80,
        lineCap: "square",
        size: 390,
    });

		
	});
	
/* --------------- Scroll bar -----------------*/
		if(jQuery().horizontalScroll){
		jQuery('#scroll-bar_outer').horizontalScroll();
	}


//INITIALIZW SLIDERS
jQuery("#slider3").responsiveSlides({
        auto: false,
        pager: false,
        nav: true,
  		navContainer:".services_arrow_container3",
        speed: 1000,
        namespace: "callbacks",        
 });
 jQuery("#slider4").responsiveSlides({
        auto: false,
        pager: false,
        nav: true,
  		navContainer:".services_arrow_container4",
        speed: 1000,
        namespace: "callbacks",        
 });
  jQuery("#slider5").responsiveSlides({
        auto: true,
        pager: false,
        nav: false,
  		speed: 2000,
        namespace: "callbacks",        
 });
//================= End =============//


	/*Team Carousel*/
	if(jQuery(".team-carousel").length){
		jQuery('ul.team-carousel').jcarousel({ scroll: 1 });
	}
	

//INITIALIZES PORTFOLIO/CONTACT BUTTON SCROLLING
jQuery(document).ready(function(){
	jQuery(".scrolltoanchor").click(function() {
		jQuery.scrollTo(jQuery(jQuery(this).attr("href")),{
			duration: 750
		});
		return false;
	});
});
//================= End =============//

//INITIALIZES LIGHTBOX PLUGIN
jQuery(document).ready(function(){
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
		theme:'light_square', 
		autoplay_slideshow: false, 
		overlay_gallery: false, 
		show_title: false,
	});
});
//================= End =============//

//INITIALIZES TWITTER FEED PLUGIN
jQuery(document).ready(function() { 
	jQuery(".tweet").tweet({
		username: "seaofclouds",//Change with your own twitter id
		//join_text: "auto",
		//avatar_size: 32,
		count: 4,
		//auto_join_text_default: "we said,",
		//auto_join_text_ed: "we",
		//auto_join_text_ing: "we were",
		//auto_join_text_reply: "we replied to",
		//auto_join_text_url: "we were checking out",
		loading_text: "loading tweets..."
	});		
});
//================= End =============//

// FOR SMART DEVICE BUTTON
jQuery(document).ready(function(jQuery){
	//prepend menu icon 
	jQuery('#sidemenu').prepend('<div id="menu-icon">Menu</div>');
	
	//toggle nav 
	jQuery("#menu-icon").on("click", function(){
		jQuery("#nav").slideToggle();
		jQuery(this).toggleClass("active");
	});
});
//================= End =============//

// FOR SKILLS GRAPH
jQuery(document).ready(function(jQuery){
								
	function isScrolledIntoView(id)
	{
		var elem = "#" + id;
		var docViewTop = jQuery(window).scrollTop();
		var docViewBottom = docViewTop + jQuery(window).height();
	
		if (jQuery(elem).length > 0){
			var elemTop = jQuery(elem).offset().top;
			var elemBottom = elemTop + jQuery(elem).height();
		}

		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
		  && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
	}

	
	
	function sliding_horizontal_graph(id, speed){
		//alert(id);
		jQuery("#" + id + " li span").each(function(i){
			var j = i + 1; 										  
			var cur_li = jQuery("#" + id + " li:nth-child(" + j + ") span");
			var w = cur_li.attr("title");
			cur_li.animate({width: w + "%"}, speed);
		})
	}
	
	function graph_init(id, speed){
		jQuery(window).scroll(function(){
			if (isScrolledIntoView(id)){
				sliding_horizontal_graph(id, speed);
			}
			else{
				//jQuery("#" + id + " li span").css("width", "0");
			}
		})
		
		if (isScrolledIntoView(id)){
			sliding_horizontal_graph(id, speed);
		}
	}
	
	graph_init("services-graph", 1000);
});

//INITIALIZES CONTACT FORM
jQuery(document).ready(function(){
	jQuery("#contact_form").validate({
		meta: "validate",
		submitHandler: function (form) {
			
			var s_name=jQuery("#name").val();
			var s_lastname=jQuery("#lastname").val();
			var s_email=jQuery("#email").val();
			var s_phone=jQuery("#phone").val();
			var s_comment=jQuery("#comment").val();
			jQuery.post("contact.php",{name:s_name,lastname:s_lastname,email:s_email,phone:s_phone,comment:s_comment},
			function(result){
			  jQuery('#sucessmessage').append(result);
			});
			jQuery('#contact_form').hide();
			return false;
		},
		/* */
		rules: {
			name: "required",
			
			lastname: "required",
			// simple rule, converted to {required:true}
			email: { // compound rule
				required: true,
				email: true
			},
			phone: {
				required: true,
			},
			comment: {
				required: true
			}
		},
		messages: {
			name: "Please enter your name.",
			lastname: "Please enter your last name.",
			email: {
				required: "Please enter email.",
				email: "Please enter valid email"
			},
			phone: "Please enter a phone.",
			comment: "Please enter a comment."
		},
	}); /*========================================*/
});
// FLASH EMBED PART
			var flashvars = {};
			var params = {};
			var attributes = {};
			attributes.id = "flashPreview";
			params.quality = "high";
			params.scale = "noscale";
			params.salign = "tl";
			params.wmode = "transparent";
			params.bgcolor = "#111";
			params.devicefont = "false";
			params.allowfullscreen = "true";
			params.allowscriptaccess = "always";
			swfobject.embedSWF("preview.swf", "flashPreview", "100%", "100%", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
			
			//functions called from flash
			var jsReady = false;//for flash/js communication
			function flashVideoEnd() {jQuery.fn.videoGallery.flashVideoEnd();}
			function flashVideoStart() {jQuery.fn.videoGallery.flashVideoStart();}
			function dataUpdateFlash(bl,bt,t,d) {jQuery.fn.videoGallery.dataUpdateFlash(bl,bt,t,d);}
			function flashVideoPause() {jQuery.fn.videoGallery.flashVideoPause();}
			function flashVideoResume() {jQuery.fn.videoGallery.flashVideoResume();}
			function flashMainPreviewOff() {jQuery.fn.videoGallery.flashMainPreviewOff();}
			function flashResizeControls() {jQuery.fn.videoGallery.flashResizeControls();}
			function isReady() {return jsReady;}
			
			jQuery(document).ready(function(jQuery) {
				jsReady = true;
			    //init component
			    jQuery('#componentWrapper').videoGallery({	
					
					/* REQUIRED */
					
					/* DEEPLINKING SETTINGS */
				    /* useDeeplink: true, false */
					useDeeplink:false,
					/* startUrl: deeplink start url, enter 'ul' data-address/'li' data-address (two levels). Or just 'ul' data-address (single level). */
					startUrl: 'local_playlist1',
					
					/* NO DEEPLINKING SETTINGS */
					/*activePlaylist: enter element 'id' attributte */
					activePlaylist:'local_playlist1',
					/*activeItem: video number to start with (-1 = none, 0 = first, 1 = second, 2 = third ...etc) */
					activeItem:0,
					
					/* GENERAL */
					/*thumbOrientation: horizontal, vertical (for scrolling) */
					thumbOrientation: 'horizontal',
					/*playlistPosition: bottom / right */
					playlistPosition: 'bottom',
					/*fullSize: true/false (dont forget to edit the css as well) */
					fullSize: false,
					/*flashHolder: id of the flash movie */
					flashHolder:'#flashPreview',
					
					/* DEFAULTS */
					
					/*defaultVolume: 0-1 */
					defaultVolume:0.5,
					/*autoPlay: true/false */
					autoPlay:false,
					/* loopingOn: loop playlist on end (last item in playlist), true/false */
					loopingOn:true,
					/* randomPlay: random play in playlist, true/false */
					randomPlay:false,
					/*autoAdvanceToNextVideo: true/false */
					autoAdvanceToNextVideo:true,
					/*autoMakePlaylistThumb: true/false (valid only for youtube and vimeo, auto make thumb for each video) */
					autoMakePlaylistThumb:true,
					/*autoMakePlaylistInfo: true/false (valid only for youtube and vimeo, auto make title and description for each video) */
					autoMakePlaylistInfo:true,
					/* outputPlaylistData: console.log out playlist data */
					outputPlaylistData:false,
					
					videoGallerySetupDone:function() {
						//console.log('videoGallerySetupDone');
					}
				});		
    	    });
			
			/* REV SLIDER*/
			/*
			var api;
			jQuery(document).ready(function() {
			
				 api =  jQuery('.fullwidthbanner').revolution(
								{
									delay:5000,
									startheight:500,
									startwidth:1170,

									hideThumbs:300,

									thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
									thumbHeight:50,
									thumbAmount:5,

									navigationType:"both",					//bullet, thumb, none, both		(No Thumbs In FullWidth Version !)
									navigationArrows:"verticalcentered",		//nexttobullets, verticalcentered, none
									navigationStyle:"round",				//round,square,navbar

									touchenabled:"on",						// Enable Swipe Function : on/off
									onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

									navOffsetHorizontal:0,
									navOffsetVertical:20,

									stopAtSlide:-1,
									stopAfterLoops:-1,

									shadow:1,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
									fullWidth:"on"							// Turns On or Off the Fullwidth Image Centering in FullWidth Modus
								});
			});
			function loadVideo(){
				jQuery("#video_link").html('<iframe id="video_frame" width="960" height="540" src="http://www.youtube.com/embed/t9N36YbFS4c?autoplay=1&fmt=22" frameborder="0" allowfullscreen style="max-width:100%;"></iframe>');
			}
			*/

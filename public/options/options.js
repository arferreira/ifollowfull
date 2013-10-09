//STYLE SWITICHING SCRIPT
	jQuery(document).ready(function () {
		jQuery(".color-scheme a").click(function () {
			jQuery('link.alt').attr('href', jQuery(this).attr('rel'));
			return false;
		});
		imgPathStart = "images/pattern/";
		imgPathEnd = new Array("pattern0.png","pattern1.png","pattern2.png","pattern3.png","pattern4.png","pattern5.png","pattern6.png","pattern7.png","pattern8.png","pattern9.png");
	
		jQuery(".background-selector li img").click(function() {
			backgroundNumber = jQuery(this).attr("data-nr");
			jQuery("body").css({background:"url('"+imgPathStart+imgPathEnd[backgroundNumber]+"')"});
		});
	});
	
	jQuery(document).ready(function () {		
		jQuery('.switch-button').click(function () {	
			if (jQuery(this).is('.open')) {
				jQuery(this).addClass('closed');
				jQuery(this).removeClass('open');
				jQuery('.styleswitcher').animate({
					'left': '-222px'
				});
			} else {
				jQuery(this).addClass('open');
				jQuery(this).removeClass('closed');
				jQuery('.styleswitcher').animate({
					'left': '0px'
				});
			}	
		});
	});
jQuery('select#layout_style').bind('change',function(){

document.cookie = 'layout_style='+jQuery(this).val() ; 
					setTimeout(function(){
										    window.location.hash = "#wpwrap";
								 			window.location.reload(true);
										
		    }, 1000);
});
jQuery('select#theme_skin').bind('change',function(){
document.cookie = 'theme_skin='+jQuery(this).val() ; 
					setTimeout(function(){
										    window.location.hash = "#wpwrap";
								 			window.location.reload(true);
										
		    }, 1000);

});


jQuery('.skin_selector li img').bind('click',function(){
document.cookie = 'skin_selector='+jQuery(this).attr('data-src'); 
					setTimeout(function(){
										    window.location.hash = "#wpwrap";
								 			window.location.reload(true);
										
		    }, 1000);
});

jQuery("ul.colorselector li img").bind('click',function(){
jQuery("body").attr('style', 'background: ' + jQuery(this).attr("data-src") + '  !important');
});

jQuery("ul.ng-selector li img").bind('click',function(){
jQuery("body").attr('style', 'background: url(" ' + jQuery(this).attr("data-src") + ' ") !important');
});

jQuery("ul.ng-selector1 li img").bind('click',function(){
jQuery("body").attr('style', 'background: url(" ' + jQuery(this).attr("data-src") + ' ")  no-repeat center center fixed !important;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;');
});




function getCookie(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==c_name)
		    {
		    return unescape(y);
		    }
		  }
	}

	function checkCookie()
	{
		
		var layout=getCookie("themeple_layout");
		
		  if (layout!=null && layout=="boxed")
		  {
			  $("#layout option").each(function(){
		        if($(this).val()==layout){ // EDITED THIS LINE
		            $(this).attr("selected","selected");    
		        }
	    	   });
		  }
		var pattern= getCookie("themeple_pattern");
			if(pattern!= null && pattern != ""){
				
				$('#page-bg img').remove();
				$("body").addClass(pattern);
			}
		var bg_img= getCookie("themeple_bg_img");
			if(bg_img!= null && bg_img != ""){

				$('#page-bg img').remove();
				var img = $('<img >'); //Equivalent: $(document.createElement('img'))
				img.attr('src', bg_img);
				img.appendTo('#page-bg');
			}
		var greyscale= getCookie("themeple_greyscale");
			if(greyscale!= null && greyscale != ""){
				if(greyscale == 'image-none'){
					$('.recent_portfolio').removeClass('image-desaturate');
				}else
					$('.recent_portfolio').addClass('image-desaturate');

				 $("#image-processing option").each(function(){
			        if($(this).val()==greyscale){ // EDITED THIS LINE
			            $(this).attr("selected","selected");    
			        }
		    	 });
			}
		var bg= getCookie("themeple_bg");
			if(bg!= null && bg != ""){

				$('#page-bg img').remove();
				$("body").addClass(bg);
			}

		var position=getCookie("themeple_position");
		
		  if ( position=="left")
		  {
			  
		  	 $("#menu-position option").each(function(){
		        	if($(this).val()==position){ 
		            		$(this).attr("selected","selected");    
		        	}
	    	   	 });
		  }else if ( position=="top")
		  {
			  
		  	 $("#menu-position option").each(function(){
		        	if($(this).val()==position){ 
		            		$(this).attr("selected","selected");    
		        	}
	    	   	 });
		  }



	}

	function del_cookie(name)
	{
	    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
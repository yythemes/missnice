/**
 * Xenice
 *
 * @package YYThemes
 */

var xenice = (function(){
    var x = {
		scrollTop:function(){
		    return document.body.scrollTop + document.documentElement.scrollTop;
		},
        // collapse menu
        collapse: function(toggle, left, right, shade, overflow){
            var $ = jQuery;
            $(toggle).on('click',function(){
                $(left).animate({
                    left:'0'
                });
                $(right).animate({
                    left: '65%'
                });
                $(overflow).css('overflow','hidden');
                $(shade).fadeIn();
            });
            $(shade).on('click',function(){
                $(left).animate({
                    left:'-65%'
                });
                $(right).animate({
                    left: '0'
                });
                $(overflow).css('overflow','');
                $(shade).fadeOut();
            });
            
            $(window).resize(function(){
                if($(window).width()>=768){
                    $(left).css('left','');
                    $(right).css('left','');
                    $(overflow).css('overflow','');
                    $(shade).hide();
                }
            });
        }
    };

	
    return x;
})();


jQuery(function($){
    
    // The bottom absorbs the bottom when the inner space is insufficient.
    var screenHeight = jQuery(window).height();
    var divHeight = jQuery('.yy-site').height();
    if(divHeight+80 < screenHeight){
        jQuery('.yy-footer').attr('style', 'position:fixed;bottom: 0;left: 0;right: 0;display:block;');
    }
    else{
        jQuery('.yy-footer').attr('style', 'display:block;');
    }
    
    // mobile scroll
    var scrollTop = xenice.scrollTop();
    var scroll = function() {
        
        if($(window).width()<768){
            $(window).off('scroll');
            var pos = xenice.scrollTop();
            if(pos>scrollTop && pos>50){
                $('.yy-header').fadeOut();
            }
            else{
                $('.yy-header').fadeIn();
            }
            scrollTop = pos;
            setTimeout(function() {
                $(window).on('scroll', scroll);
                var pos = xenice.scrollTop();
                if(pos<=50){
                    $('.yy-header').fadeIn();
                }
            }, 400);
        }
    };
    $(window).on('scroll', scroll);

	// moblie menu slide
    xenice.collapse('.menu-toggle','.menu-collapse','body,.yy-header','.shade','body');
    
    // show sub-menu
    $(".navbar-nav > .menu-item").mouseenter(function(){
        $(this).children(".sub-menu").show();
    })
    
    $(".navbar-nav > .menu-item").mouseleave(function() {
        $(this).children(".sub-menu").hide();
    })
    
    $(".sub-item").mouseenter(function(){
        $(this).show();
    })
    $(".sub-menu").mouseleave(function() {
        $(this).hide();
    })
    
    
    // moblie search form
    $(".search-toggle").on('click',function(){
        var e = $('.search-form')
        var d = e.css('display');
        if(d === 'none'){
            e.fadeIn();
            $(".search-toggle").html('<i class="fa fa-times"></i>')
            $('.keywords').focus();
        }
        else{
            e.fadeOut();
            $(".search-toggle").html('<i class="fa fa-search"></i>')
            $('.keywords').blur();
        }
        
        
    });
    $(".menu-toggle").on('click',function(){
        $('.search-form').hide();
        $(".search-toggle").html('<i class="fa fa-search"></i>')
    })
    
    $(window).resize(function(){
        if($(window).width()<768){
            $('.sub-menu').show();

        }
        else{
            $('.yy-header').show();
        }
    });
});


/* get a like */
jQuery(function($){
    if($('.post-like-a').length<1) return;
    $('.post-like-a').on('click', function(){
        var pid = $(this).attr('data-pid');
        $.post(
			admin_ajax + '?action=like',
			{
				pid: pid,
			},
			function (data) {
			    var data = JSON.parse(data)
			    if(data.key == 'success'){
                  $('.post-like-a').html(data.value);
                }
				else if(data.key == 'liked'){
				    alert(data.value);
				}
				else{
				    console.log(data);
				}
			}
		);
    })
});

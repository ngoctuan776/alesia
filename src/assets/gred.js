window.gred = window.gred || {};
gred.init = function () {  
  gred.initAddToCart();
  gred.dropdown();
  gred.hideDropdown();
  gred.quantity();
  gred.updatePricing(); 
  gred.popup();
  gred.uPopup();
  gred.tabs();  
  gred.hideFpu();
  gred.hidePopup();  
  gred.checkItemsInMiniCart();
  gred.removeItemsInMiniCart();
  gred.quickView();
  gred.btnAddtocart();
  gred.productsTabs();
  gred.swiperslider();
  gred.wishlist();
  gred.updateWishlistButtons();
  gred.WishlistButtons();
  gred.acceptCookiePopup();
};


jQuery(document).ready(function(){
  "use strict";
   //goToTop
   $("#back-to-top").addClass("hidden-top");
  $(window).scroll(function () {
    if ($(this).scrollTop() === 0) {
      $("#back-to-top").addClass("hidden-top")
    } else {
      $("#back-to-top").removeClass("hidden-top")
    }
  });

  $('#back-to-top').click(function () {
    $('body,html').animate({scrollTop:0}, 1200);
    return false;
  });
  //FOOTER MOBILE
  $(".fwidget .fwidget_mobile").click(function (e) {
    var collapse_content_selector = $(this).parent().next();
    var expander = $(this).parent();

    if (!$(collapse_content_selector).hasClass("open")) {
      expander.addClass("open") ;
    }
    else expander.removeClass("open");

    if (!$(collapse_content_selector).hasClass("open")) $(collapse_content_selector).addClass("open").slideDown("normal");
    else $(collapse_content_selector).removeClass("open").slideUp("normal");
    e.preventDefault()
  });
  gred.hideFpu();
  //TOGGLE MENU

  $('.toggle-menu .caret').on('click', function(e) {     
    e.preventDefault(); 
    $(this).parent().next().slideToggle("fast");
    return false;      
  });

  //CURRENCY
  $('.currency-Picker .grt-dropdown--content a').on('click', function(e) { 
    $("select.currency-picker").val($(this).data('value')).change();
    $(this).closest('.grt-dropdown--content').removeClass('active');     
    e.preventDefault();
  });

  //COLLECTION SORTBY
  $('.collection-sortBy .grt-dropdown--content a').on('click', function(e) {     
    var label = $(this).html();    
    $('.collection-sortBy .dropdown-label').html(label);
    $(this).closest('.grt-dropdown--content').removeClass('active');     
  });

  //OFFCANVAS MENU
  $('.mob-menu').click(function(e){
    e.preventDefault();
    $('.mob-content').toggleClass("active");
    $('.mob-screen').addClass("active");
  });

  $('.mob-screen').click(function(e){
    e.preventDefault();
    $(this).toggleClass("active");
    $('.mob-content').removeClass("active");
  });

  $('.mob-close').click(function(e){
    e.preventDefault();
    $('.mob-screen').removeClass("active");
    $('.mob-content').removeClass("active");
  });
  
  
  //COLOR SWATCH
  $('.variant-option__list li label').click(function(e){
    var link = $(this).data('image');
    var $product = $(this).parents('.product-grid-item');
    //$product.addClass('loading-image');

    $(this).closest('.product-grid-item').find('.product-item-photo img.as').attr("src",link).one('load', function() {
    //$product.removeClass('loading-image');
    });
    $('.variant-option__list li label').removeClass('active');
    $(this).addClass('active');
  });
    

  /* CUSTOMER PAGE */
  $('#RecoverPassword').on('click', function(evt) {
    evt.preventDefault();   
    $('.login-form').fadeOut(0);
    $('#RecoverPasswordForm').fadeIn('300');  
  });

  $('#HideRecoverPasswordLink').on('click', function(evt) {
    evt.preventDefault();   
    $('.login-form').fadeIn('300');
    $('#RecoverPasswordForm').fadeOut(0);      
  });

  if (window.location.hash == '#recover') {
    $('.login-form').fadeOut(0);
    $('#RecoverPasswordForm').fadeIn('300');  
  };

  $('.address-new-toggle').on('click', function() {
    $('#AddressNewForm').toggleClass('hide');
  });

  $('.address-edit-toggle').on('click', function() {
    var formId = $(this).data('form-id');
    $('#EditAddress_' + formId).toggleClass('hide');
  });

  $('.address-delete').on('click', function() {
    var $el = $(this);
    var formId = $el.data('form-id');
    var confirmMessage = $el.data('confirm-message');

    // eslint-disable-next-line no-alert
    if (
      confirm(
        confirmMessage || 'Are you sure you wish to delete this address?'
      )
    ) {
      Shopify.postLink('/account/addresses/' + formId, {
        parameters: { _method: 'delete' }
      });
    }
  });

  //SIDEBAR ON MOBILE
  $(".open-sidebar").click(function(e){
    e.preventDefault();
    $("body").toggleClass("open-sboff");
    $(".sidebar-overlay").toggleClass("show");
    $(".sidebar-offcanvas").toggleClass("active");
  });
  $(".sidebar-overlay").click(function(e){
    e.preventDefault();
    $("body").toggleClass("open-sboff");
    $(".sidebar-overlay").toggleClass("show");
    $(".sidebar-offcanvas").toggleClass("active");
  });

  $(".more-views .mv-item").click(function(e){
    var attr = $(this).attr('data-val');
    if (typeof attr !== typeof undefined && attr !== '') {		
    } else{
      var smallImage = $(this).attr('data-image');
      var largeImage = $(this).attr('data-zoom-image');

      $(".cloud-zoom").attr("href", largeImage)
      $("#single-photos").attr("src", smallImage)

      $(".mousetrap").remove();
      $(".cloud-zoom").CloudZoom(); 
    }

    e.preventDefault();
  });  

  //MAILCHIMP newsletter
  var $form = $('#mc-embedded-subscribe-form')
  if ($form.length > 0) {
    $('form #subscribe').bind('click', function (event) {
      if (event) event.preventDefault()
      register($form)
    })
  }


  var $formx = $('#mc-embedded-subscribe-form1')
  if ($form.length > 0) {
    $('form .subscribe').bind('click', function (event) {
      if (event) event.preventDefault()
      register($formx)
    })
  }

  //HEADER STICKY
  var hH = $('.header--fixed').outerHeight(true);  
  $('.header-vsb').css( "height", hH );

});

//MAILCHIMP newsletter - form
function register($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { 
      $('.subscribe-result').html('Could not connect to the registration server. Please try again later.')
    },
    success: function (data) {
      if (data.result === 'success') {       
        $('.subscribe-success').addClass('active');       
        $('.subscribe-result p').remove();
        $('#mail').val('');
        $('.email').val('');
        jQuery.cookie('newletter-popupx', 'closed', {expires: 100, path:'/'});
      } else {
        $('.subscribe-result').css('color', '#ff8282')
        $('.subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
      }
    }
  })
};
gred.acceptCookiePopup = function() {
  if ($.cookie('msg-cookie') != 'closed') {
    $('#cookies-accept').fadeIn();
  }


  $('#cookies-accept .btn').bind('click',function(){
    $('#cookies-accept').fadeOut();
    $.cookie('msg-cookie', 'closed', {expires:1, path:'/'});
  });

  $('#cookies-accept .close').bind('click',function(){
    $('#cookies-accept').fadeOut();
  });
},
gred.wishlist = function() {
  gred.updateWishlistButtons();
  gred.WishlistButtons();
},
gred.WishlistButtons = function() {
  if($(".add-in-wishlist-js").length == 0) {
          return false;
        }
        $(".add-in-wishlist-js").each(function(){
          $(this).unbind();
          $(this).click(function(event){
              
            event.preventDefault();
            try
            {
              var cookieName = "wishlistList";
             
              var id = $(this).attr('href');
             
              if($.cookie(cookieName) == null) {
                var str = id;
              } else {
                if($.cookie(cookieName).indexOf(id) == -1) {
                  var str = $.cookie(cookieName) + '__' + id;
                }
              }
             
              
              $.cookie(cookieName, str, {expires:14, path:'/'});
              jQuery('.loadding-wishbutton-'+id).show();
              jQuery('.default-wishbutton-'+id).remove();
              setTimeout(function(){ jQuery('.loadding-wishbutton-'+id).remove(); jQuery('.added-wishbutton-'+id).show(); }, 2000);
              $(this).unbind();
            }
            catch (err) {} // ignore errors reading cookies
          })
        });
},
gred.updateWishlistButtons = function() {
  try
  {
    var cookieName = "wishlistList";
    if($.cookie(cookieName) != null && $.cookie(cookieName) != '__' && $.cookie(cookieName) != '') {
      var str = String($.cookie(cookieName)).split("__");
      for (var i=0; i<str.length; i++) {
        if (str[i] != '') {
          jQuery('.added-wishbutton-'+str[i]).show();
          jQuery('.default-wishbutton-'+str[i]).remove();
          jQuery('.loadding-wishbutton-'+str[i]).remove();

        }
      }
    }
  }
  catch (err) {}
},
gred.productsTabs = function() {
  $('.widget-productTabs').each(function() {
    var $this = $(this),
        $inner = $this.find('.tabs-content'),
        cache = [];

    $this.find('.tabs-title li').on('click', function(e) {
      e.preventDefault();

      var $this = $(this),
          ajaxurl = $this.data('atts'),
          index = $this.index();

      loadTab(ajaxurl, index, $inner, $this, cache,  function(data) {
        $inner.html(data);

      });

    });

  });

  var loadTab = function(ajaxurl, index, holder, btn, cache, callback) {
    btn.parent().find('.current').removeClass('current');
    btn.addClass('current')
    holder.addClass('loading').parent().addClass('element-loading');
    btn.addClass('loading');

    $.ajax({
      dataType: "html",
      type: 'GET',
      url: ajaxurl,
      success: function(data) {
        //cache[index] = data;
        callback( data );
      },
      error: function(data) {
        //console.log('ajax error');
      },
      complete: function() {

        gred.swiperslider();
          gred.quickView();
		$('.product-swatch__item').click(function(e){
          var link = $(this).data('image');
          var $product = $(this).parents('.product-grid-item');
          $product.addClass('loading-image');
          $(this).addClass('swatch-active').siblings().removeClass('swatch-active');

          $(this).closest('.product-grid-item').find('.product-item-photo img.as').attr("src",link).one('load', function() {
            $product.removeClass('loading-image');
          });

        });
        $('.product-photo-overlay .photo-overlay-item').on("mouseover touchstart", function (e) {

    var thumb_src = $(this).attr("data-src");
	var $product = $(this).parents('.product-grid-item');
    $product.addClass('loading-image');
    $(this).addClass('photo-overlay-item-active').siblings().removeClass('photo-overlay-item-active');
    $(this).closest('.product-grid-item').find('.product-item-photo img').attr("src",thumb_src).one('load', function() {
      $product.removeClass('loading-image');
    });
  });
        //product review
        if( $(".spr-badge").length > 0 ) {
          $.getScript(window.location.protocol + "//productreviews.shopifycdn.com/assets/v4/spr.js");
        }
        holder.removeClass('loading').parent().removeClass('element-loading');
        btn.removeClass('loading');

      },
    });
  };
},


/*============================================================================
#ADDITIONS
==============================================================================*/
//QUANTITY
gred.quantity = function () {  
  $('.qtyplus').on('click', function(e){ 
    e.preventDefault();   
    fieldName = $(this).attr('data-field'); 
    var currentVal = parseInt($('input[data-field='+fieldName+']').val());
    if (!isNaN(currentVal)) { 
      $('input[data-field='+fieldName+']').val(currentVal + 1);
    } else {
      $('input[data-field='+fieldName+']').val(0);
    }
    gred.updatePricing();
  })

  $(".qtyminus").on('click', function(e) { 

    e.preventDefault(); 
    fieldName = $(this).attr('data-field');
    var currentVal = parseInt($('input[data-field='+fieldName+']').val());
    if (!isNaN(currentVal) && currentVal > 1) {          
      $('input[data-field='+fieldName+']').val(currentVal - 1);
    } else {
      $('input[data-field='+fieldName+']').val(1);
    }
    gred.updatePricing();
  })  
}

//DROPDOWN
gred.dropdown = function () {  
  $('.grt-dropdown > a').click(function() {
    if($(this).closest('.grt-dropdown').find('.grt-dropdown--content').hasClass('active')){
      $('.grt-dropdown--content').removeClass('active');
      $(this).removeClass('active');
    }else{
      $('.grt-dropdown > a').removeClass('active');
      $('.grt-dropdown--content').removeClass('active');
      $(this).closest('.grt-dropdown').find('.grt-dropdown--content').addClass('active'); 
      $(this).addClass('active');
    }     
    return false;    
  });
};

gred.hideDropdown = function () {  
  $(document).on('click touch', function(e) { 
    var dropdown = $(".grt-dropdown--content");
    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
      dropdown.removeClass('active');     
      $('.grt-dropdown > a').removeClass('active');
    }
  });
};

//TABS
gred.tabs = function () {  
  $(".e-tabs").each( function(){
    $(this).find('.tabs-title li:first-child').addClass('current');
    $(this).find('.tab-content').first().addClass('current');

    $(this).find('.tabs-title li').click(function(e){
      var tab_id = $(this).attr('data-tab');
      var url = $(this).attr('data-url');
      $(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);

      $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
      $(this).closest('.e-tabs').find('.tab-content').removeClass('current');

      $(this).addClass('current');
      $(this).closest('.e-tabs').find("#"+tab_id).addClass('current');
      e.preventDefault();
    });    
  });
  
  
};

//Popup
gred.popup = function () {  
  $('.link-popup').click(function(e) {     
    var data = '.'+$(this).attr('data-content');
    $('.gred-popup').toggleClass('active');
    setTimeout(function () {
      $(data).addClass('active');
    }, 200);

    return false; 
  });
};

gred.uPopup = function () {  
  $(document).on('click touch', function(e) {     
    var dropdown = $(".p-size-guide.active");    
    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
      $('.gred-popup .item').removeClass('active');
      setTimeout(function () {
        $('.gred-popup').removeClass('active');
      }, 200);      
    }
  });

  $('.close-popup').click(function(e) { 
    $('.gred-popup .item').removeClass('active');
    setTimeout(function () {
      $('.gred-popup').removeClass('active');
    }, 200); 
    return false; 
  });

};

/********************************************************
# SWIPER CAROUSEL
********************************************************/
gred.swiperslider = function (selector) {
  $(".swiper-container").each( function(){
    var xs_item = $(this).attr('data-xs');
    var sm_item = $(this).attr('data-sm');
    var md_item = $(this).attr('data-md');
    var datarow = $(this).attr('data-row');   
    var direction = $(this).attr('data-direction');   


    if (typeof xs_item !== typeof undefined && xs_item !== false) {    
    } else{
      xs_item = 1;
    }

    if (typeof sm_item !== typeof undefined && sm_item !== false) {    
    } else{
      sm_item = 2;
    }

    if (typeof md_item !== typeof undefined && md_item !== false) {    
    } else{
      md_item = 3;
    }

    if (typeof datarow !== typeof undefined && datarow !== false) {    
    } else{
      datarow = 1;
    }


    if (typeof direction !== typeof undefined && direction !== false) {    
    } else{
      direction = 'horizontal';
    }

    var config = {
      spaceBetween: $(this).data('margin'),
      slidesPerView: $(this).data('items'),
      direction: direction,
      slidesPerColumn: datarow,
      paginationClickable: true,


      pagination: {
        el: $(this).find('.swiper-pagination'),
        clickable: true,
      },

      navigation: {
        nextEl: $(this).find('.swiper-button-next'),
        prevEl: $(this).find('.swiper-button-prev'),
      },

      scrollbar: {
        el: $(this).find('.swiper-scrollbar'),
      },

      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 5
        },

        480: {
          slidesPerView: xs_item,
          spaceBetween: 12
        },

        640: {
          slidesPerView: sm_item,
          spaceBetween: 14
        },

        980: {
          slidesPerView: md_item,
          spaceBetween: 16
        }
      }
    };		
    var swiper = new Swiper(this, config);
  });
};

/********************************************************
# SHOW POPUP
********************************************************/
gred.showPopup = function (selector) {
  $('.fpu-bg').addClass('active');
  $('.fpu-bg').addClass(selector);
  setTimeout(function () {
    $(selector).addClass('active');
    $(selector + ' .fpu-inner').addClass('active');
  }, 200);
};

/********************************************************
# HIDE POPUP
********************************************************/
gred.hidePopup = function (selector) {
  $(selector + ' .fpu-inner').removeClass('active');
  setTimeout(function () {
    $(selector).removeClass('active');
    $('.fpu-bg').removeClass().addClass('fpu-bg');    
  }, 200); 
}  

gred.hideContentPopup = function (selector) {
  $(selector + ' .fpu-inner').removeClass('active');
}

gred.hideFpu = function () {   
  $(document).on('click touchstart', function(e) {
    var dropdown = $('.fpu-inner');
    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0 && dropdown.hasClass('active'))  {       	
      $('.fpu-inner').removeClass('active');
      setTimeout(function () { 
        $('.fpu-bg').removeClass().addClass('fpu-bg');   
        $('.fpu').removeClass('active');      
      }, 200);
    }
  });

  $('.l-fpu-close').click(function() {
    $('.fpu-inner').removeClass('active');
    setTimeout(function () {
      $('.fpu-bg').removeClass().addClass('fpu-bg');   
      $('.fpu').removeClass('active');       
    }, 200);
    return false;              
  }); 
}

/********************************************************
# COLLECTION PAGE
********************************************************/
//pagination
gred.pagination = function () {  
  ajaxify({
    parentContainer: '#collection-wrap',
    endlessOffset: 50,
    fade: "slow",
    textChange: "LOADING ..."
  });

}


/********************************************************
# PRODUCT PAGE
********************************************************/
gred.btnAddtocart = function () {
  $(window.btn_addToCart).click(function(event) { 
    event.preventDefault();
    if ($(this).attr('disabled') != 'disabled') {
      var variant_id = $(window.product_detail_form +' select[name=id]').val();
      if (!variant_id) {
        variant_id = $(window.product_detail_form +' input[name=id]').val();
      }
      var quantity = $(window.product_detail_form +' input[name=quantity]').val();
      if (!quantity) {
        quantity = 1;
      }
      var title = $(window.product_detail_name).html();
      var image = $(window.product_detail_mainImg).attr('src');
      gred.doAjaxAddToCart(variant_id, quantity, title, image);
    }
    return false;
  });
}

//PRODUCT ACTION
gred.productPage = function (options) {
  var moneyFormat = options.money_format,
      variant = options.variant,
      selector = options.selector,
      translations = options.translations;

  // Selectors
  var $addToCart = $('#btnAddtocart'), 
      $productImage = $('.product-single-photos #single-photos'),
      $productPrice = $('#ProductPrice'),
      $totalPrice = $('.total-price'), 
      $comparePrice = $('#ComparePrice'),
      $quantityElements = $('.product-single-quantity'),
      $addToCartText = $('#btnAddtocart');

  if (variant) {     
    var title= variant.title;
    $('.more-views .mv-item').each( function(){
      var val = $(this).attr('data-val');
      if(title.includes(val)){         

        $('.more-views .mv-item').removeClass('active');
        $(this).addClass('active');

        var smallImage = $(this).attr('data-image');
        var largeImage = $(this).attr('data-zoom-image');

        $(".cloud-zoom").attr("href", largeImage)
        $("#single-photos").attr("src", smallImage)

        $(".mousetrap").remove();
        $(".cloud-zoom").CloudZoom(); 

        return false;
      }
    })

    //Update variant price
    $productPrice.html( Shopify.formatMoney(variant.price, moneyFormat) );
    var quantity = parseInt(jQuery('#Quantity').val());
    var variant_price = quantity * variant.price;
    var var_price = Shopify.formatMoney(variant.price, moneyFormat);
    $('.product-single .product-single-prices .money').html( Shopify.formatMoney(variant_price, moneyFormat) );
    $('.pruduct-Price').html(var_price);

    //Update compare price
    if (variant.compare_at_price > variant.price) {
      var quantity = parseInt(jQuery('#Quantity').val());
      var variant_price = quantity * variant.compare_at_price;
      var default_compare_price = Shopify.formatMoney(variant.compare_at_price, moneyFormat);      
      variant_price = Shopify.formatMoney(variant_price, moneyFormat);
      $comparePrice.html(variant_price);

      $('.product-Price-compare').html(default_compare_price);
      $comparePrice.fadeIn(0);
    } else {
      $comparePrice.fadeOut(0);
    }      
  }
}


$(document).ready(function() {
  //THUMBNAI CLICK   
  thumbnails = $('.more-views img[src*="/products/"]');
  if (thumbnails.length) {
    thumbnails.bind('click', function() {    
      var arrImage = $(this).attr('src').split('?')[0].split('.');
      var strExtention = arrImage.pop();
      var strRemaining = arrImage.pop().replace(/_[a-zA-Z0-9@]+$/,'');
      var strNewImage = arrImage.join('.')+"."+strRemaining+"."+strExtention;

      if (typeof variantImages[strNewImage] !== 'undefined') {         
        productOptions.forEach(function (value, i) {
          optionValue = variantImages[strNewImage]['option-'+i];          
          if (optionValue !== null && $('.single-option-selector:eq('+i+') option').filter(function() { return $(this).text() === optionValue }).length) {
            $('.single-option-selector:eq('+i+')').val(optionValue).trigger('change');              
            $('.swatch-element input[value='+optionValue+']').prop("checked", true);      
          }
        });
      }      
    });
  }; 


  //VARIANTS CLICK
  $('.more-views img[src*="/products/"]').each( function(){
    var arrImage = $(this).attr('src').split('?')[0].split('.');
    var strExtention = arrImage.pop();
    var strRemaining = arrImage.pop().replace(/_[a-zA-Z0-9@]+$/,'');
    var strNewImage = arrImage.join('.')+"."+strRemaining+"."+strExtention;
    var val = '';

    if (typeof variantImages[strNewImage] !== 'undefined') {   
      productOptions.forEach(function (value, j) {
        optionValue = variantImages[strNewImage]['option-'+j];     
        if (optionValue !== null ) {   
          if (typeof optionValue !== 'undefined' ) {
            val = optionValue;
          }
        }
      });
    }      
    if(val != ''){
      $(this).parent().attr('data-val', val);
    }

  });

}); 


//UPDATEPRICING
gred.updatePricing = function(){

  var regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;
  var unitPriceTextMatch = jQuery('.pruduct-Price .money').text().match(regex);
  var unitComparePriceTextMatch = jQuery('.pruduct-Price-compare .money').text().match(regex);

  if (!unitPriceTextMatch) {
    regex = /([0-9]+[.|,][0-9]+)/g;
    unitPriceTextMatch = jQuery('.pruduct-Price .money').text().match(regex);     
  }

  if (!unitComparePriceTextMatch) {
    regex = /([0-9]+[.|,][0-9]+)/g;
    unitComparePriceTextMatch = jQuery('.pruduct-Price-compare .money').text().match(regex);    
  }

  if (unitPriceTextMatch) {
    var unitPriceText = unitPriceTextMatch[0];     
    var unitPrice = unitPriceText.replace(/[.|,]/g,'');
    var quantity = parseInt(jQuery('#Quantity').val());
    var totalPrice = unitPrice * quantity;  

    var totalPriceText = Shopify.formatMoney(totalPrice, window.money_format);
    regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;     
    if (!totalPriceText.match(regex)) {
      regex = /([0-9]+[.|,][0-9]+)/g;
    } 
    totalPriceText = totalPriceText.match(regex)[0];

    var regInput = new RegExp(unitPriceText, "g"); 
    var totalPriceHtml = jQuery('.pruduct-Price .money').html().replace(regInput ,totalPriceText);
    $('.product-single .product-single-prices #ProductPrice .money').html(totalPriceHtml); 
  }  

  if (unitComparePriceTextMatch) {
    var unitPriceText = unitComparePriceTextMatch[0];     
    var unitPrice = unitPriceText.replace(/[.|,]/g,'');
    var quantity = parseInt(jQuery('#Quantity').val());
    var totalPrice = unitPrice * quantity;   

    var totalPriceText = Shopify.formatMoney(totalPrice, window.money_format);
    regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;     
    if (!totalPriceText.match(regex)) {
      regex = /([0-9]+[.|,][0-9]+)/g;
    } 
    totalPriceText = totalPriceText.match(regex)[0];

    var regInput = new RegExp(unitPriceText, "g"); 
    var totalPriceHtml = jQuery('.pruduct-Price-compare .money').html().replace(regInput ,totalPriceText);
    $('.product-single .product-single-prices #ComparePrice .money').html(totalPriceHtml);     

  }   

}

//Video
jQuery(document).ready(function() {
  $('.product-single-photos .product-video').click(function(e) {
    $(this).toggleClass('active');
    $('.product-single-photos .product-video--content').toggleClass('active');
    $('.product-single-photos .product-pause-close').toggleClass('active');
    var iframe = $('.product-video--content iframe')[0];
    var player = $f(iframe);
    player.api('play');
    e.preventDefault();
  });


  $('.product-single-photos .product-pause-close').click(function(e) {
    $(this).toggleClass('active');
    $('.product-single-photos .product-video--content').toggleClass('active');
    $('.product-single-photos .product-video').toggleClass('active');

    var iframe = $('.product-video--content iframe')[0]; 
    var player = $f(iframe);
    player.api('pause');
    e.preventDefault();
  });
});


/********************************************************
# AJAX
********************************************************/
//AJAX CART
gred.initAddToCart = function () {  
  $('.product-item .btn-addToCart').click(function(event) {    
    event.preventDefault();
    if ($(this).attr('disabled') != 'disabled') {      
      var productItem = $(this).closest('.product-item');
      var productId = $(this).closest('.product-item').attr('data-id');      
      productId = productId.match(/\d+/g);

      var variant_id = $('#AddToCartForm-' + productId + ' select[name=id]').val();
      if (!variant_id) {
        variant_id = $('#AddToCartForm-' + productId + ' input[name=id]').val();
      }

      var quantity = $('#AddToCartForm-' + productId + ' input[name=quantity]').val();
      if (!quantity) {
        quantity = 1;
      }

      var title = $(productItem).find('.product-item-name').html();
      var image = $(productItem).find('.product-item-photo img').attr('src');


      gred.doAjaxAddToCart(variant_id, quantity, title, image); 
    }
    return false;
  });
}

//UPDATE MINICART
gred.updateMiniCart = function() {
  Shopify.getCart(function(cart) {        
    gred.doUpdateMiniCart(cart);
  });
}

gred.updateMiniCart2 = function() {
  Shopify.getCart(function(cart) {        
    gred.doUpdateMiniCart2(cart);
  });
}

/* DO UPDATE MINICART */ 
gred.doUpdateMiniCart = function(cart) {   
  var template = '<li class="item clearfix" id="cart-item-{id}"><a href="{url}" title="{title}" class="product-image"><img src="{img}" alt="{title}"></a><div class="product-details"><a class="product-name" href="{url}">{title}</a><div class="product-meta"><span>{meta}</span></div><span class="money">{price}</span><span class="qty">'+window.quantity+'<span>{quantity}</span></span> <a href="javascript:void(0)" title="Remove This Item" class="btn-remove"><i class="fa fa-trash-o"></i></a></div></li>';

  $('.empty').removeClass('empty');
  $(window.cart_count).text(cart.item_count);     
  $(window.cart_total).html(Shopify.formatMoney(cart.total_price, window.money_format)); 
  $('.noitice .count').text(cart.item_count); 
  $('.miniCart-list').html('');
  if (cart.item_count > 0) {

    $('.miniCart-content .summary').removeClass('hidden');
    $('.miniCart-content .actions').removeClass('hidden');
    $('.miniCart-content .miniCart-list').removeClass('hidden');
    $('.mnl-products .scroll-wrapper').removeClass('hidden');
    $('.miniCart-content .scroll-content').removeClass('hidden');


    for (var i = 0; i < cart.items.length; i++) {           
      var item = template;
      item = item.replace(/\{id\}/g, cart.items[i].id);
      item = item.replace(/\{url\}/g, cart.items[i].url);
      item = item.replace(/\{title\}/g, cart.items[i].product_title);

      if($.trim(cart.items[i].variant_title) != ''){        
        item = item.replace(/\{meta\}/g, cart.items[i].variant_title);

      } else{
        item = item.replace(/\{meta\}/g, ' ');

      }
      item = item.replace(/\{quantity\}/g, cart.items[i].quantity);
      item = item.replace(/\{product_id\}/g, cart.items[i].product_id);
      item = item.replace(/\{img\}/g, Shopify.resizeImage(cart.items[i].image, 'compact'));
      item = item.replace(/\{price\}/g, Shopify.formatMoney(cart.items[i].price, window.money_format));
      $('.miniCart-list').append(item);
    }
    gred.removeItemsInMiniCart();   
    gred.ConvertCurrency();
    gred.checkItemsInMiniCart();
  } else{
    $('.empty').addClass('empty');
    $('.miniCart-content .summary').addClass('hidden');
    $('.miniCart-content .actions').addClass('hidden');
    $('.miniCart-content .miniCart-list').addClass('hidden');
    $('.mnl-products .scroll-wrapper').addClass('hidden');
  }
}

/* DO UPDATE MINICART2 */ 
gred.doUpdateMiniCart2 = function(cart) {     
  $(window.cart_count).text(cart.item_count); 
  $(window.cart_total).html(Shopify.formatMoney(cart.total_price, window.money_format)); 
  $('.noitice .count').text(cart.item_count); 
  if (cart.item_count > 0) {    
    $('.miniCart-content .summary').removeClass('hidden');
    $('.miniCart-content .actions').removeClass('hidden');
    $('.miniCart-content .miniCart-list').removeClass('hidden');
    $('.mnl-products .scroll-wrapper').removeClass('hidden');

    gred.removeItemsInMiniCart();   
    gred.ConvertCurrency();
    gred.checkItemsInMiniCart(); 
  } else{
    $('.miniCart-content .summary').addClass('hidden');
    $('.miniCart-content .actions').addClass('hidden');
    $('.miniCart-content .miniCart-list').addClass('hidden');
    $('.mnl-products .scroll-wrapper').addClass('hidden');

  }
}

/* REMOVE ITEM CART */
gred.removeItemsInMiniCart = function() { 
  $('.btn-remove').click(function(event) {     
    event.preventDefault();       
    var productId = $(this).parents('.item').attr('id');
    var item = $(this).closest('.item');
    $(this).closest('.item').fadeOut("slow");

    productId = productId.match(/\d+/g);
    Shopify.removeItem(productId, function(cart) {
      gred.updateMiniCart2(cart);
    }); 

  }); 
};

/* CHECK ITEM MINI CART */
gred.checkItemsInMiniCart = function() {  
  if($('.miniCart-list').children().length > 0) {
    $('.miniCart-content').removeClass('empty-cart');           
  } else{
    $('.miniCart-content').addClass('empty-cart'); 
  }
}

//DO AJAX ADDTOCART
gred.doAjaxAddToCart = function (variant_id, quantity, title, image) { 
  $.ajax({
    type: "post",
    url: "/cart/add.js",
    data: 'quantity=' + quantity + '&id=' + variant_id, 
    dataType: 'json', 
    beforeSend: function() {  
      if(window.theme_load == "icon"){
        gred.showLoading('.btn-addToCart');
      } else{
        gred.showPopup('.fpu-loading'); 
      }
    },
    success: function(msg) {  
      gred.hideContentPopup('.fpu-quickview');       

      if(window.theme_load == "icon"){
        gred.hideLoading('.btn-addToCart');
      } else{
        // $('.loading').addClass('loaded-content');         
      }

      switch (window.addcart_susscess) {
        case ('popup'):     
          $('.fpu-addtocart').find('.product-name').html(title);         
          $('.fpu-addtocart').find('.product-image img').attr('src', image);     
          gred.showPopup('.fpu-addtocart');
          break;
        case ('text'):
          gred.hidePopup('.fpu-loading'); 
          gred.hideLoading('.btn-addToCart');

          break;
        case ('noitice'):          
          gred.hidePopup('.fpu-loading'); 
          gred.hideLoading('.btn-addToCart');
          $('.product-noitice.susscess').find('.product-name').html(title);
          $('.product-noitice.susscess').find('.product-image img').attr('src', image);
          gred.showNoitice('.product-noitice.susscess');

          break;
        default: gred.showPopup('.fpu-addtocart');

      }
      gred.updateMiniCart();

    },
    error: function(xhr, text) {
      $('.error-message').text($.parseJSON(xhr.responseText).description);
      gred.showPopup('.fpu-error');
    }
  });
}

/********************************************************
# QUiCKVIEW
********************************************************/
gred.quickView = function() {
  $('.btn-quickview').click(function() {
    gred.showPopup('.fpu-loading');
    var id = $(this).attr('id');
    var rating = (($(this).closest('.product-item-info').find('[id*="spr_badge"]').attr('data-rating')) * 20)+"%";
    var ratingCaption = $(this).closest('.product-item-info').find('.spr-badge-caption').text();
    var available = $(this).closest('.product-item-info').attr('data-available');
    var sdes = $(this).closest('.product-item-info').find('.product-sdes').html();
    var color_swatch = window.color_swatch;

    Shopify.getProduct(id, function(product) {
      var template = $('#quickview-template').html();
      $('.quickview-product').html(template);
      var quickview = $('.quickview-product');
      quickview.find('.product-name a').html(product.title).attr('href', product.url).attr('title', product.title);

      if(product.available){
        quickview.find('.instock').addClass('active');
      } else{
        quickview.find('.outofstock').addClass('active');
      }

      if (quickview.find('.spr-badge').length > 0) {
        quickview.find('.spr-badge .spr-active').css({"width": rating});
        quickview.find('.spr-badge-caption').text(ratingCaption);
      }

      if (quickview.find('.vendor').length > 0) {
        quickview.find('.vendor span').text(product.vendor);
      }

      quickview.find('.price').html(Shopify.formatMoney(product.price, window.money_format));

      if (typeof sdes !== typeof undefined) {         
        quickview.find('.des').html(sdes);
      } else { 
        quickview.find('.des').remove(); 
      }


      quickview.find('.products-item').attr('id', 'product-' + product.id);
      quickview.find('.variants').attr('id', 'product-actions-' + product.id);
      quickview.find('.variants select').attr('id', 'product-select-' + product.id);

      if (product.compare_at_price > product.price) {
        quickview.find('#ComparePrice').html(Shopify.formatMoney(product.compare_at_price_max, window.money_format)).show();
        quickview.find('.price').addClass('on-sale');
      } else {
        quickview.find('#ComparePrice').html('');
        quickview.find('.price').removeClass('on-sale');
      }

      //out of stock 
      if (!product.available) {
        quickview.find("select, input, .total-price, .dec, .inc, .variants label, .product-options, .product-single-quantity").remove();
        quickview.find(".btn-addToCart").text('unavailable').addClass('disabled').attr("disabled", "disabled");
      } else {
        quickview.find('.total-price span').html(Shopify.formatMoney(product.price, window.money_format));

        if(color_swatch == 'true') {
          gred.createQuickViewVariantsSwatch(product, quickview);  
        }else {            
          gred.createQuickViewVariants(product, quickview);   
        }
      }

      gred.quantity();
      gred.ConvertCurrency();
      gred.quickviewAddToCart();   
      gred.loadQuickViewSlider(product, quickview);
      setTimeout(function () {
        gred.showPopup('.fpu-quickview');      
      }, 800);  


    });
    return false; 
  })
};


/********************************************************
# QUICKVIEW - VariantsSwatch
********************************************************/
gred.createQuickViewVariantsSwatch = function(product, quickviewTemplate) {

  if (product.variants.length > 1) { 
    for (var i = 0; i < product.variants.length; i++) {
      var variant = product.variants[i];
      var option = '<option value="' + variant.id + '">' + variant.title + '</option>';
      quickviewTemplate.find('form.variants .product-options > select').append(option);
    }

    new Shopify.OptionSelectors("product-select-" + product.id, {
      product: product,
      onVariantSelected: selectCallbackQuickview
    });

    var filePath = window.file_url.substring(0, window.file_url.lastIndexOf('?'));
    var assetUrl = window.asset_url.substring(0, window.asset_url.lastIndexOf('xxxxx')); 

    var options = "";

    for (var i = 0; i < product.options.length; i++) {
      options += '<div class="swatch clearfix" data-option-index="' + i + '">';
      options += '<div class="header">' + product.options[i].name + '</div>';
      var is_color = false;
      if (/Color|Colour/i.test(product.options[i].name)) {
        is_color = true;
      }
      var optionValues = new Array();
      for (var j = 0; j < product.variants.length; j++) {
        var variant = product.variants[j];
        var value = variant.options[i];
        var valueHandle = gred.convertToSlug(value);
        var forText = 'swatch-' + i + '-' + valueHandle;
        if (optionValues.indexOf(value) < 0) {
          //not yet inserted
          options += '<div data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : "") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';

          if (is_color) {
            options += '<div class="tooltip hidden">' + value + '</div>';
          }
          options += '<input id="' + forText + '" type="radio" name="option-' + i + '" value="' + value + '" ' + (j == 0 ? ' checked ' : '') + (variant.available ? '' : ' disabled') + ' />';

          if (is_color) {
            options += '<label for="' + forText + '" style="background-color: ' + valueHandle + '; background-image: url(' + assetUrl + valueHandle + '.png)"></label>';
          } else {
            options += '<label for="' + forText + '">' + value + '</label>';
          }
          options += '</div>';
          if (variant.available) {
            $('.quickview-product .swatch[data-option-index="' + i + '"] .' + valueHandle).removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
          }
          optionValues.push(value);
        }
      }
      options += '</div>';
    }
    quickviewTemplate.find('form.variants .product-options > select').after(options);
    quickviewTemplate.find('.swatch :radio').change(function() {
      var optionIndex = $(this).closest('.swatch').attr('data-option-index');
      var optionValue = $(this).val();
      $(this)
      .closest('form')
      .find('.single-option-selector')
      .eq(optionIndex)
      .val(optionValue)
      .trigger('change');
    });

    if (product.available && product.options.size > 1) {
      Shopify.optionsMap = {};
      Shopify.linkOptionSelectors(product);
    }

  } else {
    quickviewTemplate.find('.product-options').remove();    
    quickviewTemplate.find('form.variants .product-options > select').remove();
    var variant_field = '<input type="hidden" name="id" value="' + product.variants[0].id + '">';
    quickviewTemplate.find('form.variants .product-options').append(variant_field);
  }

  quickviewTemplate.find('.selector-wrapper').addClass('hidden');   
  if (product.variants.length < 2) { 
    quickviewTemplate.find('form.variants .selector-wrapper').addClass('hidden');
  }

};

/********************************************************
# QUICKVIEW - Variants
********************************************************/
gred.createQuickViewVariants = function(product, quickviewTemplate) {  

  if (product.variants.length < 1) { 
    quickviewTemplate.find('form.variants .product-options').addClass('hidden');
  }
  if (product.variants.length > 1) {
    for (var i = 0; i < product.variants.length; i++) {
      var variant = product.variants[i];
      var option = '<option value="' + variant.id + '">' + variant.title + '</option>';
      quickviewTemplate.find('form.variants .product-options > select').append(option);
    }

    new Shopify.OptionSelectors("product-select-" + product.id, {
      product: product,
      onVariantSelected: selectCallbackQuickview
    });

    quickviewTemplate.find('form.variants .selector-wrapper').each(function(i, v) {
      $(this).prepend('<div class="header">' + product.options[i].name + '</div>');      
    });

    quickviewTemplate.find('form.variants .selector-wrapper label').each(function(i, v) {
      $(this).remove();
    });

  } else {
    quickviewTemplate.find('.product-options').remove();  
    quickviewTemplate.find('form.variants .product-options > select').remove();
    var variant_field = '<input type="hidden" name="id" value="' + product.variants[0].id + '">';
    quickviewTemplate.find('form.variants .product-options').append(variant_field);
  }   
}

/********************************************************
# QUICKVIEW - VIEWMORE
********************************************************/
gred.loadQuickViewSlider = function(product, quickviewTemplate) {
  var featuredImage = Shopify.resizeImage(product.featured_image, '1024x1024');
  quickviewTemplate.find('.featured-image').append('<a title="'+ product.title +'" class="product-photo" href="' + product.url + '"><img src="' + featuredImage + '" alt="' + product.title + '"/><span class="loading" style="height: 30px; line-height: 30px; padding: 0 40px; color: #fff; background: #000; opacity: 0.4; bottom: 100px; left: 50%; z-index: 999; position: absolute; display: none;">'+ window.loading_url +'</span></a>');
  if (product.images.length > 1) { 
    var quickViewCarousel = quickviewTemplate.find('.more-views .swiper-wrapper');

    for (i in product.images) {
      var original = Shopify.resizeImage(product.images[i], 'original');
      var compact = Shopify.resizeImage(product.images[i], 'compact');
      var item = '<div class="swiper-slide"><a class="mv-item" href="javascript:void(0)" data-image="' + original + '"><img src="' + compact + '"  /></a></div>';
      quickViewCarousel.append(item); 
    }

    quickViewCarousel.find('a').click(function() {
      var featureImage = quickviewTemplate.find('.featured-image img');
      var moreviewLoad = quickviewTemplate.find('.featured-image .loading');
      if (featureImage.attr('src') != $(this).attr('data-image')) {
        featureImage.attr('src', $(this).attr('data-image'));
        /* moreviewLoad.show(); */
        featureImage.load(function(e) {
          moreviewLoad.hide();
          $(this).unbind('load');
          moreviewLoad.hide();
        });
      }
    });

    var swiper = quickviewTemplate.find('.more-views');
    var mySwiper = new Swiper (swiper, {
      direction: window.product_media_layout,
      slidesPerView: 4,
      spaceBetween: 10,
      paginationClickable: true,
      preventClicks: false,
      preventClicksPropagation: false,
      grabCursor: true , 
      navigation: { 
        nextEl: $(swiper).find('.swiper-button-next'),
        prevEl: $(swiper).find('.swiper-button-prev'),
      }
    })

    } else {
      quickviewTemplate.find('.more-views').remove();
    }
}

/********************************************************
# QUICKVIEW - ADDTOCART
********************************************************/
gred.quickviewAddToCart = function () {
  if ($('.quickview-product .btn-addToCart').length > 0) {
    $('.quickview-product .btn-addToCart').click(function() {
      var variant_id = $('.quickview-product select[name=id]').val();
      if (!variant_id) {
        variant_id = $('.quickview-product input[name=id]').val();
      }
      var quantity = $('.quickview-product input[name=quantity]').val();
      if (!quantity) {
        quantity = 1;
      }

      var title = $('.quickview-product .product-name a').html();
      var image = $('.quickview-product .featured-image img').attr('src');

      gred.doAjaxAddToCart(variant_id, quantity, title, image);               
    });
  }
}

/********************************************************
# REVIEW
********************************************************/
gred.review = function () {
  if (window.review){
    if ($(".spr-badge").length > 0) {
      return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
    };
  }
}

/********************************************************
# CONVERTTOSLUG
********************************************************/
gred.convertToSlug = function (text) {
  return text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

/********************************************************
# CURRENCY
********************************************************/

/* reConvertCurrency */
gred.reConvertCurrency = function() {       
  return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency;  
};


gred.ConvertCurrency = function() {
  if (gred.reConvertCurrency() && window.show_multiple_currencies ) {
    Currency.convertAll(window.shop_currency, jQuery('.currency-picker').val(), 'span.money', 'money_format' ); 
                        }
                        }

                        $(gred.init)

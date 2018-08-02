$(window).scroll(function() {

    var clientWidth = window.innerWidth;
    /*993 till when we have nav bar visible*/

    if(clientWidth >=993)
    {
        var scroll = $(window).scrollTop();
        scroll += 50;
    }
    else {
        var scroll = $(window).scrollTop();        
    }

    if (scroll >= 300)
    {
         $("#topmenu").addClass("SiteChromeHeader__detached");
    }

    else
    {
        $("#topmenu").removeClass("SiteChromeHeader__detached");
    }

    /* attach sidebar and filter bar on desktop when scrolled enough after intro area */


    if(document.querySelectorAll('.CarBrowser__container').length > 0)
    {

        var filterScrollEntryPointDistance = $('.CarBrowser__container').offset().top;
         if(scroll >= filterScrollEntryPointDistance)
        {

            if(!$('body').hasClass('Modal__is-open'))
            {
               $('.CarBrowser__sidebar-wrapper').removeClass('CarBrowser__sidebar-wrapper-top');
               $('.CarBrowser__sidebar-wrapper').addClass('CarBrowser__sidebar-wrapper-fixed');         
            }
        
            $('.CarBrowser__title-for-matches').addClass('CarBrowser__list-title-fixed');
        }
    else {
        /* detach sidebar and filter on desktop when back to intro area */

            if(!$('body').hasClass('Modal__is-open'))
            {

                $('.CarBrowser__sidebar-wrapper').addClass('CarBrowser__sidebar-wrapper-top');
                $('.CarBrowser__sidebar-wrapper').removeClass('CarBrowser__sidebar-wrapper-fixed');
            }

            $('.CarBrowser__title-for-matches').removeClass('CarBrowser__list-title-fixed');
        }
    }

});

$(function(){
    /* open menu on mobile device*/
    $('a#mobile-nav-toggle').on('click', function(e) {
        if($(this).hasClass('active'))
        {
            // remove classes to close
            $(this).removeClass('active');
            $("#topmenu").removeClass('open');
            $("body").removeClass('modal-open');
        }
        else
        {
            // add classes to open
            $(this).addClass('active');
            $("#topmenu").addClass('open');
            $("body").addClass('modal-open');
        }
        e.preventDefault();
    });

    /* close mobile menu */

    /* open header more link drop down */
    $("#more-nav-link").click(function(e){
      $(".SiteChromeHeader__more-nav").removeClass('SiteChromeHeader__hidden');
      e.preventDefault();
   });
  
    
    $(".select-with-search").chosen({

    });

    $(".select-no-search").chosen({
        disable_search: true
    });


    

    $("#filter-select-1").chosen({
        disable_search: true
    });


    $("#filter-select-2").chosen({
        disable_search: true
    });
    

    $("#filter-fixed3").chosen({
        disable_search: true
    });

    



    

    resizeContent();
    $(window).resize(function() {
        resizeContent();
    });

});

/* close more nav link on header if clicked outside */
$(document).mouseup(function (e)
{
    var moreNavContainer = $(".SiteChromeHeader__more-li");

    if (!moreNavContainer.is(e.target) // if the target of the click isn't the container...
        && moreNavContainer.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".SiteChromeHeader__more-nav").addClass("SiteChromeHeader__hidden");

    }
});

function resizeContent() {

    $height = $(window).height();
    $wd = window.innerWidth;

    $('#leader').height($height);

    if($wd <= 768)
    {
        $('.CarBrowser__sidebar-wrapper').addClass('Modal__layout-feature Modal__root');
        $('.CarBrowser__root').removeClass('CarBrowser__has-sidebar').addClass('CarBrowser__has-modal-sidebar');

        if (!$(".Modal__content")[0]){
            console.log('if not already then wrap');
            $('.CarBrowser__sidebar-inner-wrapper').wrap('<div class="Modal__content" />');            
            } 
        
        
    }
    else {

        $('.CarBrowser__sidebar-wrapper').removeClass('Modal__layout-feature Modal__root');
        $('.CarBrowser__root').addClass('CarBrowser__has-sidebar').removeClass('CarBrowser__has-modal-sidebar');

        if ($(".Modal__content")[0]){
            console.log('unwrap if had it');
            $('.CarBrowser__sidebar-inner-wrapper').unwrap('<div class="Modal__content" />');
        } 
        
    }

}


// sidebar filter option dropdown
$(document).on('click', '.CarBrowser__filters-section-header', function(e) {
    $(this).siblings('.CarBrowser__filters-list').toggleClass('CarBrowser__filters-list-open');

    if($(this).siblings('.CarBrowser__filters-list').hasClass('CarBrowser__filters-list-open'))
    {
        $(this).addClass('open');
    }
    else {
     $(this).removeClass('open');   
    }

    e.preventDefault();
});


// sub item sidbear filter dropdown
$(document).on('click', '.CarBrowser__filters-list-open .CarBrowser__filters-list-item', function(e) {
    $(this).toggleClass('CarBrowser__filters-list-item-selected');
    e.preventDefault();
});



$(document).on('click', '.CarBrowserCarCard__favorite-heart', function(e) {
    
    $(this).toggleClass('CarFavoriteHeart__is-favorite');
    e.preventDefault();

});


$('a.static-link').click(function(e) {


    console.log('got some');

    e.preventDefault();




});






/* mobile nav toggle */

$(document).on('click', '.SiteChromeHeader__mobile-nav-toggle', function(e) {
    $('body').toggleClass('modal-open');
    $('.SiteChromeHeader__mobile-nav-toggle').toggleClass('SiteChromeHeader__nav-toggle-active');
    $('header.SiteChromeHeader__background').toggleClass('SiteChromeHeader__open');  
    e.preventDefault();
});



$(document).on('click', '.CarProfileDetails__tab', function(e) {
    
    $('.CarProfileDetails__tab').removeClass('CarProfileDetails__tab--active');

    $(this).addClass('CarProfileDetails__tab--active');

    var indexTab = $('.CarProfileDetails__tab').index(this);
    
    e.preventDefault();

    

    $('.CarProfileDetails__section').removeClass('CarProfileDetails__section--active');


    $('.CarProfileDetails__section').eq(indexTab).addClass('CarProfileDetails__section--active');

    
});








$(document).ready(function() {
    var owl =  $('.owl-carousel');


    var slideNav = $('Carousel__arrow-icon owl-prev');



    owl.owlCarousel({
    loop:true,
    items: 1,
    singleItem: true,
    lazyLoad: true,
    nav:true,
    
    
      

    navText: [
            '<div class="Carousel__arrow-icon owl-prev"></div>',
            '<div class="Carousel__arrow-icon owl-next"></div>'
        ],
        navSpeed: false,
        navElement: 'div',
        navContainer: false,
        navContainerClass: 'owl-nav',
        navClass: [
            'Carousel__arrow Carousel__arrow-left Carousel__arrow-visible',
            'Carousel__arrow Carousel__arrow-right Carousel__arrow-visible'
        ],

        dots: true,
        dotClass: '',
        dotsClass: 'Carousel__pager inline Carousel__pager-visible',
        dotsEach: true,
        dotsData: false,
        dotsContainer: false,

       
        
        onInitialized : myOwlCallback,
        onChanged :  myOwlCallback,
        onResized: myOwlCallback

    });


    function myOwlCallback(event) {
          
           $('.owl-dots').removeClass('disabled');
           $('.Carousel__pager').removeClass('disabled');

           $('ul.Carousel__pager li').removeClass('active');


        //   console.log(event);

        }
  

    $('ul.Carousel__pager li').click(function(item) {
        var tsi = $(this).index();
        owl.trigger('to.owl.carousel', [tsi]);
    });



/*

 $('.owl-carousel').on('changed.owl.carousel', function(event) {
            $(this).find('.owl-nav').removeClass('disabled');
});


    $('.owl-prev').click(function() {
        owl.trigger('prev.owl.carousel');

        console.log('pre triggered');
    })

    $('.owl-next').click(function() {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
        owl.trigger('next.owl.carousel', [300]);

        console.log('next triggered');
    })

    */

    


});


var modalScrollPos;


function openSidebarModal(e)
{
    modalScrollPos = $(window).scrollTop();
    $('body').addClass('Modal__is-open');
    $('.CarBrowser__root').addClass('CarBrowser__modal-sidebar-open');
    
    
    $('.Modal__root').addClass('Modal__is-open');
    $('.Modal__content').addClass('Modal__content-full-page');

    $('.CarBrowser__sidebar-wrapper').removeClass('CarBrowser__sidebar-wrapper-top');
    

    console.log('modal open and scroll was' + modalScrollPos);
    e.preventDefault();
}

function closeSidebarModal(e)
{
    $('body').removeClass('Modal__is-open');
    $('.CarBrowser__root').removeClass('CarBrowser__modal-sidebar-open');   


    $('.Modal__root').removeClass('Modal__is-open')
    $('.Modal__content').removeClass('Modal__content-full-page');

    $(window).scrollTop(modalScrollPos);

    console.log('modal closed and scroll is' + modalScrollPos);
    e.preventDefault();
}


$('.CarBrowser__show-filters-btn').click(openSidebarModal);



$('.closeModelBtn').click(closeSidebarModal);






app = angular.module('haladrive');

app.directive("scroll", function ($window) {

    return function(scope, element, attrs) {
      
         

            scrollManager = function() {

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

            if (this.pageYOffset >= 300) {

                $("#topmenu").addClass("SiteChromeHeader__detached");
                
             } else {

                $("#topmenu").removeClass("SiteChromeHeader__detached");
                 
             }

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


            scope.$apply();


        };

                    resizeManager = function() 
                    {

                        console.log('working from resize content');

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

                    };

        angular.element($window).bind("scroll", scrollManager);            
        angular.element($window).bind("resize", resizeManager);
        angular.element($window).bind("load", resizeManager);


    }
});
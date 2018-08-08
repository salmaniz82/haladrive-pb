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
                // on desktop we need to attach the carbrowser just below the header so we are adding a +50 to the scroll position
                // so we can be sure that this is the point where we need to fix the car browser
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
                // if are on car browsing page
                var filterScrollEntryPointDistance = $('.CarBrowser__container').offset().top;
                // calculate distance from top to the 
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

                    resizeManager = function($window) 
                    {

                        console.log('working from resize content');

                        

                        console.log($window);
                        $height = $(window).height();
                        // $wd = window.innerWidth;

                        $wd = document.documentElement.clientWidth;


                        console.log('$height' + $height);

                        console.log('$wd' + $wd);

                        $('#leader').height($height);

                        if($wd <= 768)
                        {
                            console.log('do mobile adjustments');

                            
                            var ngSidebar = document.querySelector('.CarBrowser__sidebar-wrapper');
                            var CarBrowser__root = document.querySelector('.CarBrowser__root');

                            if(ngSidebar == null)
                            {
                                console.log('ngSidebar.length not foud yet on dom');
                            }
                            else {
                                console.log('ngSidebar found on page');
                            }

                            

                            ngSidebar.classList.add('Modal__layout-feature');
                            ngSidebar.classList.add('Modal__root');
                             

                            CarBrowser__root.classList.remove('CarBrowser__has-sidebar');
                            CarBrowser__root.classList.add('CarBrowser__has-modal-sidebar');

                            if (!$(".Modal__content")[0])
                            {
                                console.log('if not already then wrap');
                                $('.CarBrowser__sidebar-inner-wrapper').wrap('<div class="Modal__content" />');
                            }           
                            
                        }
                        else {

                            $('.CarBrowser__sidebar-wrapper').removeClass('Modal__layout-feature Modal__root');
                            $('.CarBrowser__root').addClass('CarBrowser__has-sidebar');
                            $('.CarBrowser__root').removeClass('CarBrowser__has-modal-sidebar');

                            if ($(".Modal__content")[0]){
                                console.log('unwrap if had it');
                                $('.CarBrowser__sidebar-inner-wrapper').unwrap('<div class="Modal__content" />');
                            }
 
                            
                        }

                    };

        angular.element($window).bind("load", resizeManager);
        angular.element($window).bind("scroll", scrollManager);            
        angular.element($window).bind("resize", resizeManager);
        


    }
});
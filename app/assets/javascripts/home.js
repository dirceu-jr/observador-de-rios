/*!

 =========================================================
 * Material Dashboard - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

(function () {
    var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

        $('html').addClass('perfect-scrollbar-on');
    } else {
        $('html').addClass('perfect-scrollbar-off');
    }
})();


var breakCards = true;

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var mobile_menu_visible = 0,
    mobile_menu_initialized = false,
    toggle_initialized = false,
    bootstrap_nav_initialized = false;

var
    seq = 0,
    delays = 80,
    durations = 500;
var
    seq2 = 0,
    delays2 = 80,
    durations2 = 500;

$(document).on('turbolinks:load', function () {

    $('body').bootstrapMaterialDesign();

    $sidebar = $('.sidebar');

    md.initSidebarsCheck();

    window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    md.checkSidebarImage();

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // remove class has-error for checkbox validation
    $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', function () {
        if ($(this).hasClass('error')) {
            $(this).closest('div').removeClass('has-error');
        }
    });

});

$(document).on('click', '.navbar-toggler', function () {
    $toggle = $(this);

    if (mobile_menu_visible == 1) {
        $('html').removeClass('nav-open');

        $('.close-layer').remove();
        setTimeout(function () {
            $toggle.removeClass('toggled');
        }, 400);

        mobile_menu_visible = 0;
    } else {
        setTimeout(function () {
            $toggle.addClass('toggled');
        }, 430);

        var $layer = $('<div class="close-layer"></div>');

        if ($('body').find('.main-panel').length != 0) {
            $layer.appendTo(".main-panel");

        } else if (($('body').hasClass('off-canvas-sidebar'))) {
            $layer.appendTo(".wrapper-full-page");
        }

        setTimeout(function () {
            $layer.addClass('visible');
        }, 100);

        $layer.click(function () {
            $('html').removeClass('nav-open');
            mobile_menu_visible = 0;

            $layer.removeClass('visible');

            setTimeout(function () {
                $layer.remove();
                $toggle.removeClass('toggled');

            }, 400);
        });

        $('html').addClass('nav-open');
        mobile_menu_visible = 1;

    }

});

// activate collapse right menu when the windows is resized
$(window).resize(function () {
    md.initSidebarsCheck();

    // reset the seq for charts drawing animations
    seq = seq2 = 0;

    setTimeout(function () {
        md.initDashboardPageCharts();
    }, 500);
});

var md = {
    misc: {
        navbar_menu_visible: 0,
        active_collapse: true,
        disabled_collapse_init: 0,
    },

    checkSidebarImage: function () {
        $sidebar = $('.sidebar');
        image_src = $sidebar.data('image');

        if (image_src !== undefined) {
            sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>';
            $sidebar.append(sidebar_container);
        }
    },

    showNotification: function (from, align) {
        type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

        color = Math.floor((Math.random() * 6) + 1);

        $.notify({
            icon: "add_alert",
            message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 3000,
            placement: {
                from: from,
                align: align
            }
        });
    },

    initSidebarsCheck: function () {
        if ($(window).width() <= 991) {
            if ($sidebar.length != 0) {
                md.initRightMenu();
            }
        }
    },

    initDashboardPageCharts: function () {

        if (
            ($('#pHChart').length != 0 ||
                $('#ORPChart').length != 0 ||
                $('#DOChart').length != 0 ||
                $('#conductivityChart').length != 0 ||
                $('#temperatureChart').length != 0 ||
                $('#co2Chart').length != 0) && statuses
        ) {
            /* ----------==========     pH     ==========---------- */

            var past_time_labels = ['-35m', '-30m', '-25m', '-20m', '-15m', '-10m', '-5m'];

            var
                ph_labels = [],
                ph_series = [];

            for (status in statuses) {
                ph_labels.push(past_time_labels[status]);
                ph_series.push(statuses[status].ph);
            }

            datapHChart = {
                labels: ph_labels,
                series: [
                    ph_series
                ]
            };

            optionspHChart = {
                //   lineSmooth: Chartist.Interpolation.cardinal({
                //     tension: 0
                //   }),
                low: 0,
                high: 14, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }

            var pHChart = new Chartist.Line('#pHChart', datapHChart, optionspHChart);

            md.startAnimationForLineChart(pHChart);


            /* ----------==========     ORP    ==========---------- */

            var
                orp_labels = [],
                orp_series = [];

            for (status in statuses) {
                orp_labels.push(past_time_labels[status]);
                orp_series.push(statuses[status].orp);
            }

            dataORPChart = {
                labels: orp_labels,
                series: [
                    orp_series
                ]
            };

            optionsORPChart = {
                //   lineSmooth: Chartist.Interpolation.cardinal({
                //     tension: 0
                //   }),
                low: 0,
                high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }

            var ORPChart = new Chartist.Line('#ORPChart', dataORPChart, optionsORPChart);

            // start animation for the Completed Tasks Chart - Line Chart
            md.startAnimationForLineChart(ORPChart);


            /* ----------==========    Dissolved Oxygen    ==========---------- */

            var
                do_labels = [],
                do_series = [];

            for (status in statuses) {
                do_labels.push(past_time_labels[status]);
                do_series.push(statuses[status].od);
            }

            var dataDOChart = {
                labels: do_labels,
                series: [
                    do_series
                ]
            }

            var optionsDOChart = {
                low: 0,
                high: 50,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0
                }
            };
            var DOChart = new Chartist.Line('#DOChart', dataDOChart, optionsDOChart);

            //start animation for the Emails Subscription Chart
            md.startAnimationForLineChart(DOChart);

            /* ----------==========    Dissolved Oxygen    ==========---------- */

            var
                conductivity_labels = [],
                conductivity_series = [];

            for (status in statuses) {
                conductivity_labels.push(past_time_labels[status]);
                conductivity_series.push(statuses[status].conductivity);
            }

            var dataconductivityChart = {
                labels: conductivity_labels,
                series: [
                    conductivity_series
                ]
            };
            var optionsconductivityChart = {
                low: 0,
                high: 50,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0
                }
            };
            var conductivityChart = new Chartist.Line('#conductivityChart', dataconductivityChart, optionsconductivityChart);

            //start animation for the Emails Subscription Chart
            md.startAnimationForLineChart(conductivityChart);

            /* ----------==========    Temperature    ==========---------- */

            var
                temperature_labels = [],
                temperature_series = [];

            for (status in statuses) {
                temperature_labels.push(past_time_labels[status]);
                temperature_series.push(statuses[status].temperature);
            }

            var dataTemperatureChart = {
                labels: temperature_labels,
                series: [
                    temperature_series
                ]
            };
            var optionsTemperatureChart = {
                low: 0,
                high: 50,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0
                }
            };
            var temperatureChart = new Chartist.Line('#temperatureChart', dataTemperatureChart, optionsTemperatureChart);

            //start animation for the Emails Subscription Chart
            md.startAnimationForLineChart(temperatureChart);

            /* ----------==========    CO2    ==========---------- */

            var
                co2_labels = [],
                co2_series = [];

            for (status in statuses) {
                co2_labels.push(past_time_labels[status]);
                co2_series.push(statuses[status].co2);
            }

            var dataCo2Chart = {
                labels: co2_labels,
                series: [
                    co2_series
                ]
            };
            var optionsCo2Chart = {
                low: 0,
                high: 50,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0
                }
            };
            var Co2Chart = new Chartist.Line('#co2Chart', dataCo2Chart, optionsCo2Chart);

            //start animation for the Emails Subscription Chart
            md.startAnimationForLineChart(Co2Chart);

        }
    },

    initMinimizeSidebar: function () {

        $('#minimizeSidebar').click(function () {
            var $btn = $(this);

            if (md.misc.sidebar_mini_active == true) {
                $('body').removeClass('sidebar-mini');
                md.misc.sidebar_mini_active = false;
            } else {
                $('body').addClass('sidebar-mini');
                md.misc.sidebar_mini_active = true;
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            var simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
    },

    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > 260) {
            if (transparent) {
                transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
            }
        }
    }, 17),


    initRightMenu: debounce(function () {
        $sidebar_wrapper = $('.sidebar-wrapper');

        if (!mobile_menu_initialized) {
            $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');

            mobile_menu_content = '';

            nav_content = $navbar.html();

            nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';

            navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

            $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            // insert the navbar form before the sidebar list
            $nav_content = $(nav_content);
            $navbar_form = $(navbar_form);
            $nav_content.insertBefore($sidebar_nav);
            $navbar_form.insertBefore($nav_content);

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (event) {
                event.stopPropagation();

            });

            // simulate resize so all the charts/maps will be redrawn
            window.dispatchEvent(new Event('resize'));

            mobile_menu_initialized = true;
        } else {
            if ($(window).width() > 991) {
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }
    }, 200),

    startAnimationForLineChart: function (chart) {

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    },
    
    openModal: function(el) {
        var full_size = $(el).data('full_size');
        $('#modal-body').html('<img width="766" src="' + full_size + '" />');
        $('#modal').modal({});
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    }
}
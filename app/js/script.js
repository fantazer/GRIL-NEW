$(document).ready(function () {
	var body = $('body')
	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	var scrollWidth= window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%',
				paddingRight:scrollWidth
			});

		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight:0
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function(){
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('modal__show');
		},500);
		modalState.isModalShow = false;
	};
	var initModal = function (el) {
		openModal();

		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
				if($(window).width() > 1280) {
					var currentModal = $(this)
					setTimeout(function () {
						currentModal.find('.input:first').focus();
						console.log(currentModal.find('.input:first').val());
					}, 200)
				}
				if($(this).find('.js-modal-countdoun-wrap')){
					var currentEl = $(this);
					countDownInit(currentEl);
				}
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-close, .modal-hide').click(function () {
		closeModal();
		countTimer ? clearInterval(countTimer) : ''
	});

	$('.modal-wrap').click(function(e){
		e.target.className === 'modal-wrap' ? closeModal() : false
	});
	//modals===end

	// countDown
	var countTimer;

	$('.js-modal-countdown-type').click(function(){
		var el = $(this).closest('.modal-content')
		countDownInit(el);
	});

	var countDownInit = function(el){
		var startTime = $('.js-modal-countdown-wrap').data("time");
		startTime = startTime || 60
		//console.log('start timer');
		el.find('.js-modal-countdown-type').addClass('type--disable')
		el.find('.js-modal-countdown-val').html(startTime)
		
		countTimer ? clearInterval(countTimer) : ''

		countTimer = setInterval(function(){
			if(startTime>0){
				--startTime;
				el.find('.js-modal-countdown-val').html(startTime)
			}else{
				el.find('.js-modal-countdown-type').removeClass('type--disable')
				clearInterval(countTimer)
			}
		},1000)
	}
	// countDown === end




	// fix top-menu
	var shrinkHeader = 20;
	var head = $('.header');
	var heightHeader = head.height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				$('body').css('paddingTop',heightHeader);
				head.addClass('shrink');
			}
			else {
					$('body').css('paddingTop',0);
					head.removeClass('shrink');
			}
	});
	// fix top-menu === end


// toggle single
	$('.js-toggle').click(function(){
		$(this).toggleClass("active")
	})
	// toggle single === end

	// toggle class one from list
	$('body').on('click','.js-tick',function(){
		var parent = $(this).closest('.js-tick-cont');
		parent.find('.js-tick').removeClass('active');
		$(this).addClass('active')
	});
	// toggle class one from list === end


	//toggle class + neighbor
	$('.js-commutator-el').click(function(){
		var thisItem = $(this).data("item");
		var thisGroup = $(this).data("group") || false;
		var isEach = $(this).data("each") || false;
		var selector;
		$(this).toggleClass("active")
		if($('.js-commutator-cont').data('group')) {
			selector = $(".js-commutator-cont[data-group=" + thisGroup + "");
		}else{
			selector = $(".js-commutator-cont");
		}
		selector.each(function(){
			if($(this).data("item")=== thisItem){
				$(this).toggleClass('active');
			}else{
				isEach ? $(this).removeClass("active") : false
			}
		})
	})
	//toggle class + neighbor === end

	//toggle class + parent
	$('.js-slide').click(function(){
		var thisItem = $(this).data("item");
		var isEach = $(this).data("each") || false;
		var parrent = $(this).closest(".js-slide-parrent");
		$(this).toggleClass("active")
		var selector;
		selector = $(".js-slide[data-item=" + thisItem + "]")
		if(isEach){
			selector.not(this).removeClass('active')
			selector.not(this).closest(".js-slide-parrent").find(".js-slide-cont").removeClass('active')
		}
		parrent.find(".js-slide-cont[data-item=" + thisItem + "]").toggleClass('active')
	})
	//toggle class + parent === end

	// switch
	$('.js-switch').click(function (e) {
		if (e.target.className != 'style-input') {
			var typeItem = $(this).data("item");
			var groupItem = $(this).data("group");
			var size = 0;
			$('.js-switch').each(function () {
				if ($(this).data("item") === typeItem) {
					$(this).removeClass("active");
					size = $(this).size();
				}
				return size;
			});
			$('.js-switch-cont').each(function () {
				if ($(this).data("group") === groupItem) {
					if ($(this).data("item") === typeItem) {
						if (size === 1) {
							$(this).toggleClass("hidden")
						} else {
							$(this).removeClass("hidden")
						}
					} else {
						$(this).addClass("hidden");
					}
				}
			});
			$(this).addClass("active");
		}
	});
	// switch === end


	// Переключение с кнопки на инкремент
	// increment btn
	$('.incr-btn__el').click(function(){
		$(this).closest(".incr-btn").addClass('incr-btn--active');
	});
	$('.incr-btn .incr__minus').click(function () {
		incrEl.value === 1 ? $(this).closest(".incr-btn").removeClass("incr-btn--active") : ''
	})
	// increment btn === end





	var incrEl= {}
	$('.incr__nav').click(function(){
		incrEl.parent = $(this).closest(".incr");
		incrEl.value = parseInt($(this).closest(".incr").find('.incr__val span').html());
		incrEl.state = $(this).closest(".incr").find('.incr__val span')
	});

	$('.incr__minus').click(function () {
		--incrEl.value;
		if(incrEl.parent.hasClass("incr--one")){
				incrEl.value = incrEl.value < 1 ? 1 : incrEl.value
		}
		incrEl.value = incrEl.value < 1 ? 0 : incrEl.value
		incrEl.state.html(incrEl.value);
	});

	$('.incr__plus').click(function () {
		++incrEl.value;
		incrEl.value = incrEl.value > 100 ? 100 : incrEl.value;
		incrEl.state.html(incrEl.value);
	});

	$('.incr--single .incr__nav').click(function(){
		var parrent = $(this).closest(".incr--single")
		if(!parrent.hasClass('incr--one')){
			if(incrEl.value){
				parrent.addClass('incr--single-active');
			}else{
				parrent.removeClass('incr--single-active');
			}
		}else{
			if(incrEl.value>1){
				parrent.addClass('incr--single-active');
			}else{
				parrent.removeClass('incr--single-active');
			}
		}
	});

	// incr === end

	// dropdown
	$('.dropdown').click(function () {
		//$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(200);
	});
	$('.dropdown').focusout(function () {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(200);
	});
	$('.dropdown .dropdown-menu__el').click(function () {
		var parent = $(this).parents('.dropdown')
		parent.find('.dropdown-current__val').html($(this).html());
		parent.find('input').attr('value', $(this).data('value'));
	});
	$(document).mouseup(function (e) {
		var parrent = $(".dropdown");
		if (!parrent.is(e.target) && parrent.has(e.target).length === 0) {
			parrent.removeClass('active');
			parrent.find('.dropdown-menu').slideUp(200);
		}
	});
	// dropdown === end

	// toggle slideDown
	var slideDown = function(target,container,size){
		size = size ? size : 0
		if($(window).width()>size){
			$(document).mouseup(function (e) {
				if (!$(target).is(e.target) && !$(container).is(e.target) && $(container).has(e.target).length === 0) {
						 $(container).slideUp();
				 }
				 if($(target).is(e.target)){
						$(container).slideToggle()
				 }
			});
		}
	}

	slideDown('.js-toggle-search',".header-menu-search input")
	slideDown('.header-nav__more span',".header-nav-sub",769)
	// toggle slideDown === end

	// Toggle search

	// Toggle search === end


	//main slider
	$('.main-slider').slick({
		slidesToShow: 3,
		speed: 500,
		dots:true,
		arrows:false,
		centerMode: true,
    centerPadding: 0,
    variableWidth: true,
		//autoplay: true,
		//fade: true
		//autoplaySpeed: 8000, time between
		responsive: [
			{
				breakpoint: 1560,
				settings: {
					centerPadding: '5%',
				}
			},
			{
				breakpoint: 1025,
				settings: {
					centerPadding: '8%',
					centerMode: true,
					variableWidth: false,
					slidesToShow: 1,
				}
			},
			{
				breakpoint: 640,
				settings: {
					centerMode: false,
					slidesToShow: 1,
					variableWidth: false,
				}
			}
		],
		customPaging : function(slider, i) {
			return '<span class="dot"></span>';
		}
	});
	//main slider === end

	// sale slider
	$('.sale-slider').slick({
		slidesToShow: 1,
		speed: 500,
		//autoplay: true,
		arrows:false,
		dots:true,
		//fade: true
		//autoplaySpeed: 8000, time between
		customPaging : function(slider, i) {
							return '<span class="dot"></span>';
			}
	});

	// gallery
		$('.gallery-main-slider').each(function(key, item) {

		var sliderIdName = 'slider' + key;
		var sliderNavIdName = 'sliderNav' + key;

		this.id = sliderIdName;
		$('.slider-nav')[key].id = sliderNavIdName;

		var sliderId = '#' + sliderIdName;
		var sliderNavId = '#' + sliderNavIdName;

		$(sliderId).slick({
			slidesToShow: 1,
			speed: 500,
			dots:false,
			arrows:false,
			asNavFor: sliderNavId
		});
		// gallery === end

		// gallery nav
		$(sliderNavId).slick({
				slidesToShow: 5,
				speed: 500,
				dots:false,
				arrows:false,
				asNavFor: sliderId,
				focusOnSelect: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 4
						}
					}
				]
			});
		});
		// gallery nav === end

		// === custom arrow el ===
	$('.slider-control--right').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
	});
	// custom arrow el === end

	// sale slider === end


	// toggle size items
	$('.size__el').click(function () {
		$(this).closest('.size').find('.size__el').removeClass('size__el--active');
		$(this).addClass('size__el--active');
	});
	// toggle size items === end

	// STICK
	var isMobile = function () {
		if ($(window).width() > 1023) {
			$(".stick").stick_in_parent({
				'offset_top': 100
			});
		}

		if ($(window).width() < 769) {
			$(".stick").trigger("sticky_kit:detach");
		}
	};
	$(window).resize(function () {
		isMobile();
		/*if($(window).width() > 769){
			initSlider();
		}*/
	});
	isMobile();
	// STICK === end

	//tab delivery
	$('.order-form__tab-el').click(function(){
		var currentTab = $(this).data('tab');
		if(currentTab=='self'){
			$('.order-form__border-el').addClass('order-form__border-el--right')
		} else {
			$('.order-form__border-el').removeClass('order-form__border-el--right')
		}
		$('.order-form__tab-el').removeClass('order-form__tab-el--active');
		$(this).addClass('order-form__tab-el--active');

		$('.order-form__tab-container').each(function(){
			if($(this).data('tab')==currentTab){
				$(this).addClass('order-form__tab-container-active')
			}else{
				$(this).removeClass('order-form__tab-container-active')
			}
		})
	});
	//tab delivery end

	// range
  $(".range").ionRangeSlider({
 		//prefix: "Списать ",
 		//postfix: " баллов"
 	})
	// range === end

	//history accord
	$('.history-card__wrap').click(function () {
		var current = $(this).closest('.history-card');
		var currentInner = current.find('.history-info')
		current.toggleClass('active');
		if(currentInner.hasClass('active')){
			currentInner.slideUp()
			setTimeout(function(){
				currentInner.removeClass('active')
			},400)
		}else{
			currentInner.slideToggle(600)
		}
	});
	//history accord===end

	// template scroll
	var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
	if(!isMac && $(document).width() > 640) {
		$(".scroll").niceScroll({
			autohidemode: false,
			cursorcolor: "#dcdcdc",
			scrollspeed: 160, // scrolling speed
			mousescrollstep: 10,
		});
	}
	// template scroll === end

	// rating
	$('.star--edit .star-el').hover(function () {
		if (!$(this).parent().hasClass('star--fix')) {
			$('.star .star-el').removeClass('star-el--active');
			$(this).addClass('star-el--active');
			$(this).prevAll('.star-el').addClass('star-el--active')
		}
	});
	$('.star--edit .star-el').click(function () {
		$(this).parent().toggleClass('star--fix');
		$(this).addClass('star-el--active');
		$(this).prevAll('.star-el').addClass('star-el--active')
	});
	// rating === end

	// slide menu
	$('.head-toggle').click(function(event){
		event.stopPropagation();
		$(this).toggleClass('head-toggle--open');
		$('.slide-menu').toggleClass('slide-menu--open');
		//$('body').toggleClass('body-fix')
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
			$('.head-wrap').removeClass('head--up');
			$('.head-toggle').removeClass('head-toggle--open');
			$('.slide-menu').removeClass('slide-menu--open');
			//console.log(modalState.isModalShow);
			if(modalState.isModalShow == false){
				$('body').removeClass('body-fix')
		}
	});
	// slide menu === end

	//bubble
	var limit = 2400 * 3600 * 1000; // 24 часа
	var localStorageInitTime = localStorage.getItem('localStorageInitTime');
	//console.log(localStorageInitTime);
	//console.log(+new Date() - localStorageInitTime);
	if (localStorageInitTime === null) {
			localStorage.setItem('localStorageInitTime', +new Date());
	} else if(+new Date() - localStorageInitTime > limit){
			localStorage.setItem('localStorageInitTime', +new Date());
			localStorage.setItem('bubble', '1');
	};

	if(localStorage.getItem('bubble')!='0'){
		setTimeout(function(){
			$('.cookie').addClass('cookie--active');
			//console.log('111');
		},3000);
	}

	$('.cookie .icon-close').click(function(){
		$(this).closest('.cookie').removeClass('cookie--active');
		localStorage.setItem('bubble', '0');
	});
	//bubble===end

	//upload-btn
	$(".upload-btn").change(function () { //Если выбрал файл
		//console.log('img');
		if (this.files && this.files[0]) {
			$(this).closest('.upload-wrap').find('.upload-list').append('<div class="upload-list__el" onclick="this.parentNode.removeChild(this);"><svg class="icon"><use xlink:href="#close"></use></svg><span></span></div>');
			var currentUpload = $('.upload-list .upload-list__el:last').find('span'); //выбираем куда
			currentUpload.text(this.files[0].name);
			/*var reader = new FileReader();
			reader.onload = function(){
				currentUpload.attr('style', " background-image:url( "+reader.result+ ") ");
			}
			reader.readAsDataURL(this.files[0]);*/
		}
		console.log(this.files[0].name);
	});
	$('.upload-img__el').click(function(){
		//console.log('remove');
		$(this).remove();
	});
	//upload-btn

	// calc adds


	//console.log("Минимум:",minAdds);
	//console.log("Максимум:",maxAdds);
	var isLimitVal = 0;
	$('.js-ingr-wrap').each(function() {
		isLimitVal += $(this).data("min");
	})
	isLimitVal === 0 ? $(".item-total").removeClass("item-total--disable") : false

	$('.js-ingr-wrap .incr__nav').click(function(){
		var isAllCheck = 0
		$('.js-ingr-wrap').each(function(){
			var currentSizeAdds = 0;
			var minAdds = $(this).data("min");
			var maxAdds = $(this).data("max");
			$(this).find('.incr__val').each(function(){
				currentSizeAdds = currentSizeAdds + $(this).text()*1;
			})
			if(currentSizeAdds>=maxAdds && currentSizeAdds != 0){
				$(this).find('.js-ingr-row').each(function(){
					if($(this).find(".incr__val").text()*1===0){
						$(this).addClass("ingr-row--disable");
					}else{
						$(this).addClass("ingr-row--unPlus");
					}
				})
			}else{
				$(this).find('.js-ingr-row').removeClass("ingr-row--disable")
				$(this).find('.js-ingr-row').removeClass("ingr-row--unPlus")
			}
			//console.log(maxAdds);
			if(currentSizeAdds <= maxAdds && currentSizeAdds >= minAdds){

			}else{
				--isAllCheck;
			}
		})
		//console.log(window.isAllCheck.state);
		if(isAllCheck===0){
			$(".item-total").removeClass("item-total--disable");
		}else{
			$(".item-total").addClass("item-total--disable");
		}
	});
	// calc adds === end
	var resetItemIngr = function(){
		$('.ingr-row').removeClass('ingr-row--disable ingr-row--unPlus');
		$(".item-total").removeClass("item-total--disable");
		$('.ingr-row .incr__val span').text(0)
		$('.ingr-row .incr').removeClass('incr--single-active');
		$('.item-total').addClass('item-total--disable');
	}

	window.resetItemMethods = resetItemIngr;
	//window.condition = {};
	//window.condition.info = info;

	// toggle tags
	$('.js-tag').click(function(){
		$(this).closest('.js-tag-cont').find('.js-tag').not(this).removeClass('active')
		$(this).toggleClass("active");
	});
	// toggle tags === end

	// toggle items type
	$('.tag-el').click(function(){
		var filterType = [];
		var parent = $(this).closest(".product-wrap");
		var emptyItem = parent.find(".filter-false");
		parent.find('.tag-el.active').each(function(){
			filterType.push($(this).data("condition").toString());
		});
		var strfilterType = filterType.sort().join(' ');
		var filterItem = [];
		var delaySize = 200
    parent.find(".product-el").animate(
    	{
    		opacity:0
    	},
    	{
				duration:100,
				 complete: function(){
				}
			})
		setTimeout(function(){
			parent.find(".product-el").addClass('fly')
			parent.find(".product-el").each(function(i){
				var current = $(this);
				filterItem = current.data("condition").toString().split(' ').sort().join(' ');
				if(filterItem.indexOf(strfilterType)!=-1){
					 $(this).removeClass('fly')
					//current.removeClass("product-hidden");
					//$(this).show()
					delaySize = delaySize + 80
					current.delay(delaySize).animate({opacity:1},{duration:200})
				}
			});
			if(parent.find(".product-el:not(.product-hidden)").length<1){
				emptyItem.removeClass("product-hidden");
			}else{
				emptyItem.addClass("product-hidden");
			}
		},100)
	});
	// toggle items type === end

	// location toggle
	$('.location-el__toggle').click(function(){
		var current = $(this);
		current.closest(".location-el").find(".location-el__cont").toggleClass("location-el__cont--show");
		current.closest(".location-el").find(".location-el__toggle").toggleClass("location-el__toggle--active");
	});
	// location toggle === end


	// location tab
	$('.location-toggle__el').click(function(){
		var current = $(this).index();

		$('.location-toggle__el').removeClass("location-toggle__el--active");
		$(this).addClass("location-toggle__el--active");
		$('.location-wrap').each(function(){
			if($(this).index()=== current){
				$(this).removeClass("location-wrap--hidden");
			}else{
				$(this).addClass("location-wrap--hidden");
			}
		})

	});
	// location tab === end

	//toggle menu
	$(document).mouseup(function (e) {
		var parrent = $(".cart-wrap");
		if (!parrent.is(e.target) && parrent.has(e.target).length === 0) {
			parrent.removeClass('active');
		}
	});
	$('.js-cart').click(function () {
		$(this).closest('.js-cart-wrap').toggleClass('active');
	});
	//toggle menu end

	// scroll to id
	var offsetId = $(document).width() < 769 ? 105 : 110
	$("a[rel='m_PageScroll2id']").mPageScroll2id({
		offset: offsetId,
		highlightClass: "active",
		onComplete: function () {
			$('.dropdown').removeClass('active');
			$('.slide-block').removeClass('slide-block--open');
			$('.head-toggle').removeClass('slide-block-toggle--open');
		}
	});

	// clip text
/*	$(".product__descr").dotdotdot({
			ellipsis: "...",
			wrap: "word",
			height: 70,
	});*/
	// clip text === end
	
	// basket total
	if ($(window).width() < 769) {
		var footerPosition = $('.footer-info-wrap').offset().top;
		var heightWindow = $(window).height()/2
		$(document).on('scroll',function(){
			if($(document).scrollTop() + heightWindow > footerPosition){
				$('.js-mobile-total').hide();
			}else{
				$('.js-mobile-total').show();
			}
		})
		
	}
	// basket total === end

	// phone mask
	var isFieldStart= true;
	$('.input-mask--phone').mask('+7(000)000-00-00', {
			onKeyPress: function (cep, event, currentField, options) {
				//console.log(currentField.val().length);
				if(cep == '+7(8' && isFieldStart){
					$('.input-mask--phone').val("+7(")
					return isFieldStart = false;
				}
				if(currentField.val().length<4){
					isFieldStart = true
				}
			},
		}
	);
	$('input').on('input',function(e){
		console.log(e.originalEvent.data);
	})
	// phone mask === end

	// set height modal
	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
	// set height modal === end

	// accordion row toggle
	body.on('click','.js-accordion-head', function(e){
		var current = $(this).closest('.js-accordion-el').index()
		$(this).closest('.js-accordion').find('.js-accordion-el').each(function(){
			if($(this).index()!=current){
				 $(this).find('.js-accordion-head').removeClass('active')
				 $(this).find('.js-accordion-content').slideUp('active')
			}else{
				 $(this).find('.js-accordion-content').slideToggle('active')
				 $(this).find('.js-accordion-head').toggleClass('active')
			}
		})
	});
	// accordion row toggle === end


	// tabs
	$('body').on('click','.js-tab',function(){
		var current = $(this).index();
		var parent = $(this).closest('.js-tab-wrap')
		parent.find('.js-tab-cont').removeClass('active')
		parent.find('.js-tab-cont').eq(current).addClass('active')
	});
	// tabs === end


});

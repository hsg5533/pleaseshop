$(document).ready(function () {
  if ($(".titlelilne").length) {
    $(".titlelilne").text(pageTitle); // 퍼블용 헤더 제목 붙이기...
  }
  if ($(".datepicker").length) {
    // 각 datepicker 요소에 대해 처리
    $(".datepicker").each(function () {
      var $datepicker = $(this);
      // DATEPICKER 설정
      $datepicker.datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        altFormat: "yy-mm-dd(DD)",
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        monthNamesShort: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        // 요일 텍스트 설정
        dayNames: ["일", "월", "화", "수", "목", "금", "토"],
        // 요일 텍스트 축약 설정&nbsp;
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        // 0: 일요일 부터 시작, 1:월요일 부터 시작
        firstDay: 0,
        onChangeMonthYear: function (year, month, inst) {
          // 연도 선택 옵션 변환
          setTimeout(function () {
            titleLayout($datepicker);
          }, 1);
        },
        onSelect: function (year, month, inst) {
          // 연도 선택 옵션 변환
          setTimeout(function () {
            titleLayout($datepicker);
          }, 1);
        },
      });
      // 초기 titleLayout 함수 호출
      titleLayout($datepicker);
    });
    function titleLayout($datepicker) {
      const monthSelect = $datepicker.find(".ui-datepicker-month");
      const yearSelect = $datepicker.find(".ui-datepicker-year");
      yearSelect.insertBefore(monthSelect); // yearSelect.after('<span class="yearprefix">년</span>');
      yearSelect.find("option").each(function () {
        $(this).text($(this).text() + "년");
      });
      $datepicker.css("visibility", "visible");
    }
  }
  if ($(".slidePushGui").length > 0)
    $(".slidePushGui").slideToUnlock({ useData: true });
  if ($(".btn-tabView").length) {
    $(".container").css({ paddingBottom: 40 });
  }
  $(".scrollTop").hide();
  setTimeout(function () {
    scrollAutoUi();
  }, 10);
  inputDeleteButton();
  toggleButton();
  textareaCountEvent();
  formShowHideUi();
  listCardUserLayout();
  sheetBarMoreLayer();
  // 버튼 sticky 자동조정
  bottomStickyDetect();
  $(".input-item").each(function () {
    $(this)
      .find('input[type="radio"]')
      .change(function () {
        bottomStickyDetect(); // bottomStickyDetect() 함수 호출
      });
  }); // modal Show Demo
  if ($(".modal").length) {
    modalSampleScript();
  }
  modalUi();
  innerTabUi();
  swiperPreviewImagesLoad();
  scrollResponsiveItem(); // 리스트 more 버는 화면너비 넘어가면 생기도록
  $(".list-type-more-ui").each(function () {
    const itemCount = $(this).find("li");
    const itemLength = itemCount.length;
    const itemWidth = itemCount.width();
    const listMoreCondition = itemLength * itemWidth;
    const deviceWidth = $(window).width();

    const listMoreButton = $(this).find(".listMore");
    if (listMoreCondition > deviceWidth) {
      listMoreButton.show();
    } else {
      listMoreButton.hide();
    }
  });
  animationStrong(); //요소강조 이벤트 이용내역 진행중 등
});
$(window)
  .on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    if (scrollTop > 0) {
      $(".scrollTop").show();
    } else {
      $(".scrollTop").hide();
    }
  })
  .trigger("scroll");
function animationStrong() {
  setTimeout(function () {
    if ($(".newItem-aniReverse").length) {
      $(".newItem-aniReverse").addClass("ani-heartBeatReverse");
    }
    if ($(".newItem-ani")) $(".newItem-ani").addClass("ani-heartBeat");
  }, 300);
}
function scrollResponsiveItem() {
  var lastScrollTop = 0;
  var scrollArea = $(".scroll-responsive-area");
  $(window).scroll(function (event) {
    const scrollTop = $(this).scrollTop();
    if (scrollTop >= 90) {
      if (scrollTop > lastScrollTop) {
        // 아래로 스크롤
        scrollArea.addClass("hide").removeClass("show");
      } else {
        scrollArea.addClass("show").removeClass("hide");
      }
    } else {
      // 스크롤 값이 90보다 작을 때
      scrollArea.addClass("show").removeClass("hide");
    }
    lastScrollTop = scrollTop;
  });
}
function bottomStickyDetect() {
  const sheetBar = $(".sheetbar");
  const button = $(".btm-fixed-item");
  const buttonH = button.outerHeight(true);
  const contentHeight = $("#viewport").height();
  const viewportOriginalHeight = $(window).height();
  const container = $(".container");
  if (sheetBar.length && button.length) {
    sheetBar.css({ paddingBottom: buttonH });
  }
  if (contentHeight > viewportOriginalHeight) {
    button.css({ position: "fixed" });
    container.css({ paddingBottom: buttonH });
  } else {
    button.css({ position: "fixed" });
  }
}
function formShowHideUi() {
  // 라디오 선택시 특정 폼 그룹 숨기기
  $(".targetHideEvtBtn").on("click", function () {
    $(".targetHideCont").hide();
    $(this)
      .parents()
      .siblings()
      .find("input")
      .on("click", function () {
        $(".targetHideCont").show();
      });
  }); // 라디오옵션별 컨텐츠 보이기
  $(".input-item").each(function () {
    // 라디오 버튼 변경 이벤트 처리
    $(this)
      .find('input[type="radio"][class^="checkingEvtOption"]')
      .change(function () {
        let checkedClass = $(this).attr("class");
        $(this).parents(".input-item").find(".checkingEvtOptionBox").hide();
        $(this)
          .parents(".input-item")
          .find(".checkingEvtOptionBox." + checkedClass)
          .show();
      }); // 페이지 로드 시 초기 상태 설정
    let checkedClass = $(this)
      .find('input[type="radio"][class^="checkingEvtOption"]:checked')
      .attr("class");
    $(this).find(".checkingOptionCont .checkingEvtOptionBox").hide();
    $(this)
      .find(".checkingOptionCont .checkingEvtOptionBox." + checkedClass)
      .show();
  });
  // 특정 옵션 보이기 숨기기
  $(".optionUse").change(function () {
    if ($(this).is(":checked")) {
      $(".optionUse-group").slideUp();
    } else {
      $(".optionUse-group").slideDown();
    }
  });
  // form 보이고 숨기기 // 라디오 버튼 변경 이벤트 처리
  $(".formOption").each(function () {
    $(this).change(function () {
      if ($(this).is(":checked") && $(this).hasClass("checkingForm")) {
        $(".checkingEvt-form").show();
      } else {
        $(".checkingEvt-form").hide();
      }
    });
    //페이지 로드 시 초기 상태 설정
    if ($(this).is(":checked") && $(this).hasClass("checkingForm")) {
      $(".checkingEvt-form").show();
    }
  }); // form 내부 옵션 토글
  $(".form")
    .find('.input-item-inner input[type="radio"]')
    .each(function () {
      $(this).change(function () {
        if ($(this).is(":checked") && $(this).hasClass("checkingEvt")) {
          $(this).parents(".form").find(".checkingEvt-box").show();
        } else {
          $(this).parents(".form").find(".checkingEvt-box").hide();
        }
      }); //페이지 로드 시 초기 상태 설정
      if ($(this).is(":checked") && $(this).hasClass("checkingEvt")) {
        $(this).parents(".form").find(".checkingEvt-box").show();
      }
    });
}
function scrollAutoUi() {
  const swiperAuto = new Swiper(".scroll-x-auto", {
    slidesPerView: "auto",
    spaceBetween: 10,
    pagination: false,
  });
  const swiperAutoMarginNone = new Swiper(".scroll-x-auto-marginNone", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false,
  });
  const swiperSelect = new Swiper(".scroll-y-auto", {
    direction: "vertical",
    slidesPerView: "auto",
    loop: true,
    pagination: false,
    centeredSlides: false,
    // 가장자리에서 터치 해제
    touchReleaseOnEdges: true,
    // 저항력 활성화
    resistance: true,
    // 저항력 비율 조정
    resistanceRatio: 0.65,
    // iOS 가장자리 스와이프 감지
    iOSEdgeSwipeDetection: true,
    // iOS 가장자리 스와이프 감지 임계값
    iOSEdgeSwipeThreshold: 50,
  });
  const swiperBasic = new Swiper(".slide-basic", {
    slidesPerView: "auto",
    pagination: true,
    pagination: { el: ".swiper-pagination", clickable: true },
  });
  const swiperBanner = new Swiper(".ad-banner-area", {
    slidesPerView: "auto",
    pagination: true,
    spaceBetween: 20,
    // effect: 'fade',
    autoplay: true,
    pagination: { el: ".swiper-pagination", clickable: true },
  });
}
function swiperPreviewImagesLoad() {
  // Swiper 초기화
  const modalSwiper = new Swiper(".modal-swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: { el: ".swiper-pagination", clickable: true },
  }); // 이미지 클릭 시 모달 열기
  $("a.attch-item").on("click", function () {
    // 클릭한 attch-item의 부모 리스트 요소
    const $parentList = $(this).closest(".list-attchfile");
    // 클릭한 attch-item의 인덱스
    const clickedIndex = $(this).parent().index(); // attchfile-images-preview-modal 모달 열기
    $(".attchfile-images-preview-modal").show();
    extendImageResizing();
    setTimeout(function () {
      $(".attchfile-images-preview-modal").addClass("on");
    }, 300); // modal-swiper-container의 슬라이드 내용 초기화
    const $modalSwiperWrapper = $(
      ".attchfile-images-preview-modal .swiper-wrapper"
    );
    $modalSwiperWrapper.empty(); // 이전에 있던 슬라이드 내용을 모두 제거 // 클릭한 attch-item의 부모 리스트 요소에 있는 모든 attch-item의 이미지를 modal-swiper-container로 이동
    $parentList.find(".swiper-slide").each(function () {
      const $clone = $(this).clone(); // 이미지를 복제
      $modalSwiperWrapper.append($clone); // 복제한 이미지를 modal-swiper-container에 추가
    }); // modal-swiper-container의 Swiper를 갱신
    modalSwiper.update(); // 클릭한 attch-item의 인덱스로 해당 슬라이드로 이동
    modalSwiper.slideTo(clickedIndex); // 이미지 리사이징 함수 호출
    extendImageResizing();
  });
  $(".preview-close").on("click", function (e) {
    e.preventDefault();
    const $modalSwiperWrapper = $(
      ".attchfile-images-preview-modal .swiper-wrapper"
    );
    $modalSwiperWrapper.empty();
    // 이전에 있던 슬라이드 내용을 모두 제거 // modal-swiper-container의 Swiper를 갱신
    modalSwiper.update();
    // 모달을 닫음
    $(".attchfile-images-preview-modal").removeClass("on");
    setTimeout(function () {
      $(".attchfile-images-preview-modal").hide();
    }, 300);
  });
}
function extendImageResizing() {
  $(".attchfile-images-preview-modal .attch-item").each(function () {
    var $element = $(this);
    var img = new Image();
    img.src = $element.css("background-image").replace(/url\(\"|\"\)/g, "");
    $(img).on("load", function () {
      var originalWidth = img.width;
      var originalHeight = img.height;
      var containerWidth = $element.parent().width();
      var containerHeight = $element.parent().height();
      if (originalWidth > containerWidth || originalHeight > containerHeight) {
        $element.css("background-size", "contain");
      } else {
        $element.css("background-size", "auto");
      }
    });
  });
}
function toastPosition() {
  const headerH = $(".header").outerHeight(true);
  const btmbarH = $(".btmBar").outerHeight(true);
  $(".toast").each(function () {
    if ($(this).hasClass("bottom")) {
      $(this).css("bottom", btmbarH);
    } else {
      $(this).css("top", headerH);
    }
  });
}
function textareaCountEvent() {
  $(".textarea-wrap textarea").each(function () {
    const $textarea = $(this);
    const $count = $textarea.parent(".textarea-wrap").find(".count em");
    const $max = $textarea.parent(".textarea-wrap").find(".count .max");
    const defaultSettingCount = $(this).prop("maxLength");
    $max.text(defaultSettingCount);
    $textarea.on("input", function () {
      // textarea의 현재 글자 수를 가져와서 div.count에 표시
      const charCount = $textarea.val().length;
      $count.text(charCount); // 최대 글자 수를 업데이트
      const maxLength = $textarea.prop("maxLength");
      $max.text(maxLength); // 입력된 글자 수가 최대 글자 수를 초과하면 잘라냄
      if (charCount > maxLength) {
        $textarea.val($textarea.val().substring(0, maxLength));
        $count.text(maxLength);
      }
    });
  });
}
function headerTitle() {
  const appTitle = $(".titlelilne");
  if (appTitle.length) {
    appTitle.text(pageTitle);
    if (pageTitle === null) {
      appTitle.parents(".left").hide();
    }
  }
}
function toggleButton() {
  // 만족도등록
  $(".star-rating .star").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("on").prevAll(".star").addClass("on");
    $(this).addClass("on").nextAll(".star").removeClass("on");
    return false;
  });
  // 텍스트 더보기
  $(".text-cont").each(function () {
    $(this)
      .find(".more")
      .on("click", function (e) {
        e.preventDefault();
        const buttonText = $(this).text();
        $(this).text(buttonText === "더 보기" ? "간략히" : "더 보기");
        $(this).parents(".text-cont").toggleClass("on");
      });
  }); // 다운드롭 공통
  $(".dropDownCnt").hide();
  $(".dropDownBtn").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // 이벤트 전파 중지
      $(this).parent().toggleClass("on").siblings().removeClass("on");
      $(this)
        .next(".dropDownCnt")
        .slideToggle()
        .parent()
        .siblings()
        .find(".dropDownCnt")
        .slideUp();
    });
  }); // $('.dropDownCnt').hide(); // $('.dropDownLst').on('click', '.dropDownBtn', function (e) { //     e.preventDefault(); //     const listItem = $(this).closest('li');
  //     listItem.toggleClass('on'); //     listItem.find('.dropDownCnt').slideToggle(); // }); //sheet 올라오는 이벤트
  $(".modalAni").on("click", function (e) {
    setTimeout(function () {
      $(".sheetbar").addClass("ani-up-active");
    }, 300);
  }); // sheet 초기 애니메이션
  if ($(".ani-up-active-default").length) {
    $(".ani-up-active-default").addClass("ani-up-active");
  } //카테고리 아이템 탭
  $(".ui-type-tab").each(function () {
    $(this)
      .find(".category-item")
      .on("click", function (e) {
        e.preventDefault();
        $(this)
          .addClass("active")
          .parents("li")
          .siblings()
          .find(".category-item")
          .removeClass("active");
      });
  });
  // 픽업 및 도착일정 탭
  $(".list-option-tab")
    .find("li")
    .on("click", function () {
      $(this).addClass("on").siblings().removeClass("on");
    }); // 리스트 필터
  $(".list-filter .type-btn").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("on");
  });
  // 대카테고리 리스트
  $(".categoryIcon-list.type-filter .category-mainItem").on(
    "click",
    function (e) {
      e.preventDefault();
      $(this)
        .addClass("on")
        .parent("li")
        .siblings()
        .find(".category-mainItem")
        .removeClass("on");
    }
  ); // 맨 위로 버튼
  $(".scrollTop").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 400);
    return false;
  }); // 즐겨찾기
  $(".ico.favorite, .ico.like").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("on");
    });
  }); // 새로고침
  $(".ico.refresh, .ico.myRefresh").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();

      $(this).toggleClass("clickSpin");
    });
  });
  // input 선택에 따라 보이기
  $(".inputShowContrl").on("change", function () {
    // 현재 체크된 inputShowContrl 요소의 형제인 inputShowTarget을 찾습니다.
    const correspondingTarget = $(this).siblings(".inputShowTarget"); // 현재 요소가 체크되어 있는지 확인합니다.
    if ($(this).find("input").prop("checked")) {
      // 체크되어 있으면 대상을 보여줍니다.
      correspondingTarget.slideDown("fast");
    } else {
      // 체크되어 있지 않으면 대상을 숨깁니다.
      correspondingTarget.slideUp("fast");
    }
  });
  $(".switch").each(function () {
    $(this).on("click", function () {
      if ($(this).hasClass("on")) {
        $(this).removeClass("on");
        $(this).find("input").attr("checked", false);
        return false;
      } else {
        $(this).addClass("on");
        $(this).find("input").attr("checked", true);
        return false;
      }
    });
  });
}
function inputDeleteButton() {
  $(".evt-ico").each(function () {
    const input = $(this);
    const delteBtn = input.next(".ico.delete").hide();
    delteBtn.on("click", function () {
      input.val("");
      delteBtn.hide();
      searchPreview.slideUp("fast");
    });
    input.on({
      keyup: function () {
        delteBtn.show();
      },
      focusout: function () {
        if (input.val() === "") {
          // 내용이 비어있을 때만 숨김
          delteBtn.hide();
        }
      },
    });
  });
}
function modalUi() {
  $(".modal").each(function () {
    const layerResize = $(window).height();
    const layerHeight = $(this).outerHeight();
    $(this).css({ marginTop: -layerHeight / 2 });
  });
}
function modalSampleScript() {
  $(".modal").hide();
  $(".modalLoad").on("click", function (e) {
    e.preventDefault();
    const $self = $(this);
    const $target = $($(this).attr("href"));
    const $targetId = $target.attr("id");
    $("html").addClass("overflow");
    $target.show();
    setTimeout(function () {
      $target.find(".modal-dim").addClass("on");
      $target.addClass("on");
    }, 300); // 이중팝업(이전팝업 닫힘)
    if ($(this).hasClass("loadNext")) {
      // $(this).parents('.modal').removeClass('on');
      // $(this).parents('.modal').find('.modal-dim').removeClass('on');
      $(this).parents(".modal").hide();
      $("html").addClass("overflow");
      // $target.find('.modal-dim').addClass('on');
      setTimeout(function () {
        $target.addClass("on");
      }, 300);
    }
    modalUi();
    // close and focusout
    const isVisible = $target.is(":visible");
    const modalLength = $(".modal:visible").length;
    $target.find(".modalClose").on("click", function (e) {
      e.preventDefault();
      closeModalMotionEvent();

      $target.find(".sheetbar").removeClass("ani-up-active");
      $("html").removeClass("overflow");
    }); // 모든 팝업 종료
    $target.find(".modalCloseAll").on("click", function (e) {
      e.preventDefault();
      $(".modal-dim").removeClass("on");
      $(".modal").removeClass("on");
      setTimeout(function () {
        $(".modal").hide();
      }, 300);
      $(".modal").find(".sheetbar").removeClass("ani-up-active");
      $("html").removeClass("overflow");
    });
    // 클릭 이벤트가 발생했을 때
    $(".targetCloseProtect").on("click", function (event) {
      // 모달 내부를 클릭한 경우는 무시
      if (!$(event.target).closest(".modal-inner").length) {
        closeModalMotionEvent();
      }
    });
    function closeModalMotionEvent() {
      $target.find(".modal-dim").removeClass("on");
      $target.removeClass("on");
      setTimeout(function () {
        $target.hide();
      }, 300);
      $(this).off("click");
      if (isVisible) {
        if (modalLength > 1) {
          $target.fadeOut(250);
        } else {
          removeDim();
        }
      }
    }
  });
}
function defaultShowModal() {
  $(".defaultShow").each(function () {
    const $target = $(this);
    $target.show();
    setTimeout(function () {
      $target.find(".modal-dim").addClass("on");
      $target.addClass("on");
    }, 300);
    modalUi(); // close and focusout
    const isVisible = $target.is(":visible");
    const modalLength = $(".modal:visible").length;
    $target.find(".modalClose").on("click", function (e) {
      e.preventDefault();
      $target.find(".modal-dim").removeClass("on");
      $target.removeClass("on");

      setTimeout(function () {
        $target.hide();
      }, 300);
      $(this).off("click");
      if (isVisible) {
        if (modalLength > 1) {
          $target.fadeOut(250);
        } else {
          removeDim();
        }
      }
    });
  });
}

function createDim() {
  if (!$(".dim").length) {
    $("body").append('<div class="dim"></div>');
  }
  $(".dim").fadeIn(250);
}
function removeDim() {
  $(".dim").fadeOut(250);
} // function sheetBarMoreLayer() { //     const $sheetbar = $('.sheetbar'); //     const $sheetbarInner = $('.sheetbar-inner'); //     const threshold = 30; // 터치 이동 감지 임계값 (픽셀 단위) //     const shakeThreshold = 5; // 흔들림 감지 임계값 (픽셀 단위) //     let startY = 0; //     let isScrolling = false; //     let isAnimating = false; //     // `article` 높이 체크하여 `more` 클래스 추가 //     if ($sheetbar.find('article').height() > 240) { //         $sheetbar.addClass('more'); //     } //     $sheetbarInner.on('touchstart', function(e) { //         startY = e.originalEvent.touches[0].clientY; //         isScrolling = false; //         isAnimating = false; //     }); //     $sheetbar.on('touchmove', function(e) { //         const currentY = e.originalEvent.touches[0].clientY; //         const diffY = currentY - startY; //         if (Math.abs(diffY) > shakeThreshold) { //             if (!isScrolling && Math.abs(diffY) > threshold) { //                 if (diffY > 0) { //                     if ($sheetbarInner.scrollTop() === 0) { //                         $sheetbar.removeClass('on'); //                         isAnimating = true; //                     }
//                 } else {
//                     $sheetbar.addClass('on'); //                     isAnimating = true;
//                 } //                 startY = currentY; // 새로운 시작점 설정 //                 isScrolling = true; //             }
//         } //     }); //     $sheetbar.on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
//         if (e.target === $sheetbar[0]) { //             // sheetbar의 transition이 완료된 경우에만 처리 //             if ($sheetbar.hasClass('on')) { //                 $sheetbarInner.addClass('on-scroll');
//             } else {
//                 $sheetbarInner.removeClass('on-scroll');
//             }
//             isAnimating = false;
//         }
//     }); //     $sheetbarInner.on('scroll', function() { //         if (!$sheetbar.hasClass('on') && !isAnimating) {
//             // sheetbar가 on 클래스가 없으면 sheetbar-inner의 스크롤 동작을 막음 //             $sheetbarInner.scrollTop(0); //         } //     }); //     // sheetbar 클래스가 제거될 때 sheetbar-inner 클래스도 함께 제거
//     $sheetbar.on('transitionend webkitTransitionEnd oTransitionEnd', function(e) { //         if (e.target === $sheetbar[0] && !$sheetbar.hasClass('on')) { //             $sheetbarInner.removeClass('on-scroll'); //         } //     }); // }
function sheetBarMoreLayer() {
  const $sheetbar = $(".sheetbar");
  const $sheetbarInner = $(".sheetbar-inner");
  const threshold = 30;
  // 터치 이동 감지 임계값 (픽셀 단위)
  const shakeThreshold = 5; // 흔들림 감지 임계값 (픽셀 단위)
  let startY = 0;
  let isScrolling = false;
  let isAnimating = false;
  // `article` 높이 체크하여 `more` 클래스 추가
  if ($sheetbar.find("article").height() > 240) {
    $sheetbar.addClass("more");
  }
  $sheetbarInner.on("touchstart", function (e) {
    startY = e.originalEvent.touches[0].clientY;
    isScrolling = false;
    isAnimating = false;
  });
  $sheetbar.on("touchmove", function (e) {
    const currentY = e.originalEvent.touches[0].clientY;
    const diffY = currentY - startY;
    if (Math.abs(diffY) > shakeThreshold) {
      if (!isScrolling && Math.abs(diffY) > threshold) {
        if (diffY > 0) {
          if ($sheetbarInner.scrollTop() === 0) {
            $sheetbar.removeClass("on");
            $sheetbarInner.css("overflow", "hidden"); // sheetbar가 활성화되지 않은 경우 overflow를 hidden으로 설정
            isAnimating = true;
          }
        } else {
          $sheetbar.addClass("on");
          $sheetbarInner.css("overflow", "auto"); // sheetbar가 활성화된 경우 overflow를 auto로 설정
          isAnimating = true;
        }
        startY = currentY; // 새로운 시작점 설정
        isScrolling = true;
      }
    }
  });
  $sheetbar.on(
    "transitionend webkitTransitionEnd oTransitionEnd",
    function (e) {
      if (e.target === $sheetbar[0]) {
        // sheetbar의 transition이 완료된 경우에만 처리
        if ($sheetbar.hasClass("on")) {
          $sheetbarInner.addClass("on-scroll");
        } else {
          $sheetbarInner.removeClass("on-scroll");
        }
        isAnimating = false;
      }
    }
  );
  $sheetbarInner.on("scroll", function () {
    if (!$sheetbar.hasClass("on") && !isAnimating) {
      // sheetbar가 on 클래스가 없으면 sheetbar-inner의 스크롤 동작을 막음
      $sheetbarInner.scrollTop(0);
    }
  }); // sheetbar 클래스가 제거될 때 sheetbar-inner 클래스도 함께 제거
  $sheetbar.on(
    "transitionend webkitTransitionEnd oTransitionEnd",
    function (e) {
      if (e.target === $sheetbar[0] && !$sheetbar.hasClass("on")) {
        $sheetbarInner.css("overflow", "hidden"); // sheetbar가 활성화되지 않은 경우 overflow를 hidden으로 설정
      }
    }
  );
}
function listCardUserLayout() {
  $(".list-card.user .list ul").each(function () {
    const box = $(this);
    const boxTop = box.offset().top;
    const boxBottom = boxTop + box.outerHeight();
    const boxChildren = box.children();
    let lastVisibleElement = null;
    let prevVisibleElement = null;
    boxChildren.each(function () {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      if (elementTop >= boxTop && elementBottom <= boxBottom) {
        prevVisibleElement = lastVisibleElement;
        lastVisibleElement = $(this);
      }
    });
    if (box.height() >= 60 && prevVisibleElement) {
      console.log(prevVisibleElement.text());
      lastVisibleElement.after(
        '<li class="autoAddedItem"><a href="#" class="hashitem type-ico">더 보기</a></li>'
      );
      const autoAddedItem = box.find(".autoAddedItem");
      const autoAddedItemTop = autoAddedItem.offset().top;
      const autoAddedItemBottom =
        autoAddedItemTop + autoAddedItem.outerHeight();
      if (autoAddedItemTop >= boxTop && autoAddedItemBottom <= boxBottom) {
      } else {
        // autoAddedItem이 안 보임
        autoAddedItem.prev().addClass("prevItem");
        box
          .find(".prevItem")
          .before(
            '<li class="autoAddedItem"><a href="#" class="hashitem type-ico">더 보기</a></li>'
          );
      }
    }
  });
}
function innerTabUi() {
  const tabTit = $(".inner-tab"),
    tabBtn = tabTit.find("li");
  const tabCnt = $(".tab-content"),
    tabIdx = tabCnt.index();
  // load style settings
  tabCnt.not(":eq(" + tabIdx + ")").hide();
  tabTit.each(function () {
    const defaultTit = $(this).children("li").eq(0);
    defaultTit.addClass("on");
  });
  $(".tab-component").each(function () {
    const defaultCnt = $(this).children(".tab-content").eq(0);
    defaultCnt.addClass("on").show();
  });
  tabBtn.on("click", function (e) {
    if ($(this).attr("rel")) {
      e.preventDefault();
      const $this = $(this),
        thisRel = $this.attr("rel");
      thisClass = $("." + thisRel);
      thisText = $this.text();
      target = thisClass.parent(".tab-component").attr("id");
      // content connect
      $("#" + target + ">.tab-content")
        .hide()
        .removeClass("on");
      $("#" + target + " ." + thisRel)
        .show()
        .addClass("on");
      // title styling and attr status
      $this.addClass("on").siblings().removeClass("on");
      thisClass.addClass("on").siblings().removeClass("on");
      $this
        .find("a")
        .attr("title", thisText + "tab active")
        .parent()
        .siblings()
        .find("a")
        .attr("title", "");
    }
  });
}

// 웹인경우
const CLIENTWEBELEMENT = $(".clientWeb");
$(document).ready(function () {
  executeOnLoad();
  setScreenSize();
  $(window).on("scroll", function () {
    executeOnScroll();
  }); // 함수 정의: 요소가 화면에 보이는지 확인하는 함수
  function elementInView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return elemTop <= docViewBottom && elemTop >= docViewTop;
  } // 페이지 로드 또는 스크롤 이벤트 발생 시 실행
  $(window).on("load scroll", function () {
    $(".counting-value").each(function () {
      var $this = $(this); // 요소가 화면에 보이면 애니메이션 시작
      if (elementInView($this) && !$this.data("animated")) {
        var countValue = parseInt($this.attr("count-value"));
        $this.prop("Counter", 0);
        $this.data("animated", true);
        setTimeout(function () {
          $({ Counter: 0 }).animate(
            { Counter: countValue },
            {
              duration: 500,
              easing: "linear",
              step: function (now) {
                $this.text(Math.ceil(now).toLocaleString());
              },
            }
          );
        }, 500);
      }
    });
  });
});
function executeOnLoad() {
  if (CLIENTWEBELEMENT.length > 0) {
    $(".gnb-open").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("on").next(".gnb").toggleClass("on");
    });
    $(".header-tric").length && $(".clientWeb-header").addClass("transparent");
    $(".btn-applecation.floating").length &&
      $(".clientWeb-footer").addClass("padding");
    // load animation Default Evt
    $(".el-move-load").each(function () {
      $(this).addClass("active");
    });
    $(".el-scale-load").each(function () {
      $(this).addClass("active");
    });
    function animateUp($element, $img, delay) {
      $element.animate(
        { bottom: "800px", opacity: 0 },
        5000 + delay,
        function () {
          $(this).css({ bottom: "-600px", opacity: 1 });
          animateUp($element, $img, delay);
        }
      );
      $img.animate({ width: "56px" }, 5000 + delay, function () {
        $(this).css({ width: "150px" });
        animateUp($element, $img, delay);
      });
    }
    // 각 li 요소에 대해 반복
    $("ul.list-userBlock li").each(function () {
      // 이미지 요소 선택
      var $img = $(this).find(">img");
      // 각 li 요소에 대한 애니메이션 시작
      var randomDelay = 2000 + Math.random() * 5000;
      animateUp($(this), $img, randomDelay);
    }); // 각 li 요소에 대해 반복

    $("ul.list-userBlock li").each(function () {
      // 이미지 요소 선택
      var $emoji = $(this).find(".arrow img"); // 이미지 파일명 랜덤 선택
      var randomImageNumber = Math.floor(Math.random() * 9) + 1;
      var randomImagePath =
        "./assets/emoji-positive-" + randomImageNumber + ".png";
      $emoji.attr("src", randomImagePath);
    });
  }
}
function executeOnScroll() {
  if (CLIENTWEBELEMENT.length > 0) {
    const scrollTop = $(this).scrollTop();
    const scrollBottom = scrollTop + $(window).height(); // header Evt
    $(".clientWeb-header").toggleClass("scroll", scrollTop > 0);
    $(".btn-applecation.floating").toggleClass("scroll", scrollTop > 0);
    // animation Default Evt
    $(".el-move, .el-left").each(function () {
      const elMoveOffset = $(this).offset().top;
      if (scrollBottom > elMoveOffset) {
        $(this).addClass("active");
      }
    });
  }
}
function setScreenSize() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
window.addEventListener("resize", setScreenSize);

function goAppStore() {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var randing = "";
  if (
    0 <= userAgent.indexOf("iphone") ||
    0 <= userAgent.indexOf("ipad") ||
    0 <= userAgent.indexOf("ipod")
  ) {
    randing = "https://itunes.apple.com/app/id1567338376?mt=8";
  } else if (0 <= userAgent.indexOf("macintosh")) {
    randing =
      "https://apps.apple.com/us/app/%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94-%EB%8F%99%EB%84%A4-%EC%8B%AC%EB%B6%80%EB%A6%84-%EC%95%B1/id1567338376";
  } else {
    randing =
      "https://apps.apple.com/us/app/%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94-%EB%8F%99%EB%84%A4-%EC%8B%AC%EB%B6%80%EB%A6%84-%EC%95%B1/id1567338376";
  }

  window.open("about:blank").location.href = randing;
}

function goPlayStore() {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var randing = "";

  if (0 <= userAgent.indexOf("android")) {
    randing = "market://details?id=kr.co.pleasehelp";
  } else if (0 <= userAgent.indexOf("windows")) {
    randing = "https://play.google.com/store/apps/details?id=kr.co.pleasehelp";
  } else {
    randing = "https://play.google.com/store/apps/details?id=kr.co.pleasehelp";
  }

  window.open("about:blank").location.href = randing;
}

function goCommonStore() {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var randing = "";

  if (0 <= userAgent.indexOf("android")) {
    //randing = "market://details?id=kr.co.pleasehelp";
    randing = "https://play.google.com/store/apps/details?id=kr.co.pleasehelp";
    //randing = "https://app.pleasehelp.co.kr/app";
    //location.href = randing;
  } else if (
    0 <= userAgent.indexOf("iphone") ||
    0 <= userAgent.indexOf("ipad") ||
    0 <= userAgent.indexOf("ipod")
  ) {
    randing = "https://itunes.apple.com/app/id1567338376?mt=8";
  } else if (0 <= userAgent.indexOf("windows")) {
    randing = "https://play.google.com/store/apps/details?id=kr.co.pleasehelp";
  } else if (0 <= userAgent.indexOf("macintosh")) {
    randing =
      "https://apps.apple.com/us/app/%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94-%EB%8F%99%EB%84%A4-%EC%8B%AC%EB%B6%80%EB%A6%84-%EC%95%B1/id1567338376";
  } else {
    randing = "market://details?id=kr.co.pleasehelp";
  }

  //window.open('about:blank').location.replace(randing);
  window.open(randing);
}

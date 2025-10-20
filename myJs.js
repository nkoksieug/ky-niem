const textConfig = {
  text1: "Ờmm...Hello Kem Đánh Răng",
  text2: "Biết hôm nay là ngày gì không...Đúng rồi 20/10 nèe 🌹🌷🌸",
  text3: "Bé Út có món quà tinh thần nho nhỏ này gửi tặng hai 🤪",
  text4: "Chúc chị 2 Gia Thiên và người thân một ngày 20/10 vui vẻ và ý nghĩa nha ",
  text5: "Từ chối muốn nhắn gửi gì đó cho Út =))",
  text6: "Okie, rất muốn nhắn gì đó cho Út cute <3",
  text7: "Đôi lời yêu thương muốn nói với bé Út 😆",
  text8: "Gửi cho Út coi nè 😘",
  text9: "Bé Út đẹp trai, cute, hài hước, chị 2 thương Út lắm, yêu Út...😉",
  text10: "1, 2, 3 củ khoai. 20/10 vui vẻ nha hai",
  text11:
    "Always keep your head up with a smile on the face. Giving best wishes and all the happiness in this world!",
  text12: "Không chịu buộc chịuu",
};

$(document).ready(function () {
  const bgAudio = document.getElementById('bgAudio');
  if (bgAudio) {
    // set default volume (0.0 - 1.0)
    bgAudio.volume = 0.3; // 30%
    // Autoplay handling: play muted first, then unmute on first user interaction
    bgAudio.muted = true;
    bgAudio.play().catch(() => {});
    const enableSound = () => {
      bgAudio.muted = false;
      // ensure volume still applied
      bgAudio.volume = 0.3;
      bgAudio.play().catch(() => {});
    };
    window.addEventListener('click', enableSound, { once: true });
    window.addEventListener('touchstart', enableSound, { once: true });
  }
  // ...existing code...
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/6.png",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button position
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    if (screen.width <= 600) {
      var x = Math.random() * 300;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 500;
    }
    var left = x + "px";
    var top = y + "px";
    $("#no").css("left", left);
    $("#no").css("top", top);
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
  }

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason'  placeholder='Viết gì đó cảm xúc vô nha haiii'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/Spongebob Squarepants GIF.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            window.location = "https://vt.tiktok.com/ZSUqaN3Nm/";
          },
        });
      }
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});

var sorular = [{
    baslik: "SORU 1",
    soru: "Son büyük savaşta Harry Potter hangi büyüyle Voldemort ile savaşmıştır ?",
    secim: ["Imperio", "Expecto Patronum", "Vermiculus", "Avada Kedavra", "Expelliarmus"],
    gorsel: '<img src="assets/soru1.jpg">',
    cevap: "Expelliarmus"

}, {
    baslik: "SORU 2",
    soru: "Profesör McGonagall hangi hayvana dönüşebilir ?",
    secim: ["Kedi", "Köpek", "Karakurbağası", "Baykuş"],
    gorsel: '<img src="assets/soru2.jpg">',
    cevap: "Kedi"

}, {
    baslik: "SORU 3",
    soru: "İlk filmin açılış cümlesi nedir ?",
    secim: ["Birileri kapıya bir şeyler bırakmış, canım.", "İyi akşamlar, Profesör Dumbledore.", "Burada olacağınızı bilmeliydim...", "Biz son derece normaliz, teşekkürler."],
    gorsel: '<img src="assets/soru3.jpg">',
    cevap: "Burada olacağınızı bilmeliydim..."

}, {
    baslik: "SORU 4",
    soru: "Harry'nin Quidditch maçında pozisyonu nedir ?",
    secim: ["Vurucu", "Kovalayıcı", "Tutucu", "Arayıcı"],
    gorsel: '<img src="assets/soru4.gif">',
    cevap: "Arayıcı"

}, {
    baslik: "SORU 5",
    soru: "Seçmen şapka Harry'i hangi binaya seçmiştir ?",
    secim: ["Slytherin", "Gryffindor", "Ravenclaw", "Hufflepuff"],
    gorsel: '<video controls autoplay><source src="assets/soru5.mp4" type="video/mp4"></source></video>',
    cevap: "Gryffindor"
}];
var i = 0;
var dogru = 0;
var soruSayisi = 0;
var zamanDurdur;
var saniye = 20;
var newButon;
var cevapNe = "Cevap Nedir?"
$(document).ready(function() {
    $("#bos").click(function e() {
        $("#baslat").html("");
        yeniSoru();
    });
    $(document).on('click', '#buton button', function() {
        soruSayisi++;
        clearInterval(zamanDurdur);
        $("button").prop("disabled", true);
        if ($(this).html() == sorular[i - 1].cevap) {
            $("#dogru-yanlis").html("Doğru !");
            $(this).css("background-color", "green");
            dogru++;
        } else {
            $("#dogru-yanlis").html("Yanlış !");
            $(this).css("background-color", "red");
            var x = document.querySelectorAll("button");
            for (var j = 0; j < sorular[i - 1].secim.length; j++) {
                if (x[j].innerHTML == sorular[i - 1].cevap) {
                    x[j].style.backgroundColor = "green";
                    console.log(x[j].innerHTML);
                }
            }
        }
        $("#dogru").html(dogru);
        $("#toplam").html(soruSayisi);
        setTimeout(function() {
            yeniSoru();
        }, 3000);

    });

    function yeniSoru() {
        if (i > 4) {
            yenidenbaslat();
            return;
        }
        $("button").prop("disabled", false);
        clearInterval(zamanDurdur);
        saniye = 20;
        $("#sifir").html("");
        $("#zaman").html("00");
        zamanDurdur = setInterval(zaman, 1000);
        $("#gorsel").html(sorular[i].gorsel);
        $("#baslik").html(sorular[i].baslik);
        $("#dogru-yanlis").html(cevapNe);
        $("#soru").html(sorular[i].soru);
        $("#buton").html("");
        for (var j = 0; j < sorular[i].secim.length; j++) {
            newButon = document.createElement("button");
            newButon.innerHTML = sorular[i].secim[j];
            $("#buton").append(newButon);
        }
        i++;
    }

    function zaman() {
        $("#zaman").html(saniye);
        saniye -= 1;
        if (saniye < 9) {
            $("#sifir").html(0);
        }
        if (saniye < 0) {
            clearInterval(zamanDurdur);
            $("#zaman").html("0");
            $("#dogru-yanlis").html("!!! SÜRENİZ DOLDU !!!");
            $("#gorsel").html('<img src="assets/suredoldu.png">');
            $("#baslik").html("");
            $("#soru").html("");
            $("#buton").html("");
            soruSayisi++;
            $("#toplam").html(soruSayisi);
            setTimeout(function() {
                yeniSoru();
            }, 2000);

        }
    }

    function yenidenbaslat() {
        console.log("yeni");
        clearInterval(zamanDurdur);
        $("#zaman").html("00");
        $("#sifir").html("");
        $("#buton").html("");
        newButon = document.createElement("button");
        newButon.innerHTML = "Yeniden Başlat";
        $("#buton").append(newButon);
        newButon.addEventListener("click", function() {
            $("#baslat").html("");
            yeniSoru();
        });
        $("#dogru").html("0");
        $("#toplam").html("0");
        $("#dogru-yanlis").html("");
        $("#gorsel").html('<img src="assets/oyunsonu.png">');
        $("#baslik").html("Final Skoru  " + dogru + "/" + soruSayisi);
        $("#soru").html("");
        i = 0;
        dogru = 0;
        soruSayisi = 0;

    }

});
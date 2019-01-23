const adasba = `
    <div class="vline l1"></div>
    <div class="vline l2"></div>
    <div class="hline l3"></div>
    <div class="vline l1 l1-1"></div>
    <div class="vline l2 l1-2"></div>
    <div class="hline l3 l1-3"></div>
    <div class="vline l1 l2-1"></div>
    <div class="vline l2 l2-2"></div>
    <div class="dline1 l4"></div>
    <div class="dline2 l5 l2-3"></div>
    <div class="vline l1 l3-1"></div>
    <div class="vline l2 l3-1"></div>
    <div class="hline l6"></div>
    <div class="vline l1 l3-2"></div>
    <div class="vline l2 l3-2"></div>
    <div class="hline l6 l1-3"></div>
    <div class="vline l1 l4-2"></div>
    <div class="vline l2 l4-1"></div>
    <div class="hline l7"></div>
    <div class="hline l7 l1-3"></div>
    <div class="hline l7 l2-3"></div>
    <div class="vline l1 l5-1"></div>
    <div class="hline l8 l1-3"></div>
    <div class="vline l2 l5-1"></div>
    <div class="dline1 l10"></div>
    <div class="dline2 l11 l2-3"></div>
    <div class="vline l1 l6-1"></div>
    <div class="vline l2 l6-1"></div>
    <div class="hline l9"></div>
    <div class="vline l1 l6-2"></div>
    <div class="vline l2 l6-2"></div>
    <div class="hline l9 l1-3"></div>
    <div class="hbar"></div>
    <p class="title-text">Experimental Portfolio</p>
`;

const arrows = `
    <div id="arrows">
        <div class="vline2 a1 aleft"></div>
        <div class="dline1 a2 aleft"></div>
        <div class="dline2 a3 aleft"></div>
        <div class="vline2 a4 aright"></div>
        <div class="dline1 a5 aright"></div>
        <div class="dline2 a6 aright"></div>
        <div class="hline a7 aright"></div>
    </div>
    <div class="hbar2"></div>
    <p class="title-text-2">Click to Continue</p>
`;

var adasba1 = document.getElementById("adasba1");
var adasba2 = document.getElementById("adasba2");
var adasba3 = document.getElementById("adasba3");
var adasba4 = document.getElementById("adasba4");

adasba1.innerHTML = adasba;
adasba2.innerHTML = adasba;
adasba3.innerHTML = arrows;
adasba4.innerHTML = arrows;

var e = adasba1.children;
var e2 = adasba2.children;
for (var i = 0; 32 > i; i++) {
    e[i].style.animationDelay = (0.06 * i) + "s";
    e2[i].style.animationDelay = (0.06 * i) + "s";
}
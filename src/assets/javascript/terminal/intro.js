import Next from './next';
import ScrambleText from 'scramble-text';
import { gsap } from "gsap";

const Intro = {
  introSect: document.querySelector('.intro'),
  spansCount: 0,
  completedCount: 0,

  init() {

    let tl = gsap.timeline({
      ease: "power4.in",
      delay: 0.5,
      onComplete: playScrambleText
    });

    tl.fromTo(".ascii-art", {y: -35}, {duration: .5, y: 0, opacity: 1});
    tl.fromTo("#fade1", {y: 5, opacity: 0}, {duration: .5, y: 0, opacity: 1});
    tl.fromTo("#fade3", {y: -7, opacity: 0}, {duration: .3, y: 0, opacity: 1}, "-=0.25");
    tl.fromTo("#fade2", {y: 5, opacity: 0}, {duration: .5, y: 0, opacity: 1}, "+=0.015");
    tl.fromTo("#fade4", {y: 5, opacity: 0}, {duration: .7, y: 0, opacity: 1}, "+=0.7");


    let scrambleTexts = [];

    var elements = document.querySelectorAll('.intro-text');

    elements.forEach(function(element) {
      var scrambleText = new ScrambleText(element, {
        timeOffset: 20,
        chars: [
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
          'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '/', '.', '!', '?', '#', '@', ':'
        ],
        callback: function () { console.log('ended'); }
      });

      scrambleText.play();
      scrambleTexts.push(scrambleText);
    });

    function playScrambleText() {
      scrambleTexts.forEach(function(scrambleText) {
        scrambleText.start();
      });
    }
  },
};

export default Intro;

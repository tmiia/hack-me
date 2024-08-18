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
      delay: 1,
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









    // const listP = this.introSect.querySelectorAll('p');

    // listP.forEach(p => {
    //   const text = p.innerText;
    //   p.innerText = '';

    //   for(let i = 0; i < text.length; i++) {
    //     const span = document.createElement("span");
    //     span.innerText = text[i];
    //     span.setAttribute('data-original', text[i]);
    //     p.appendChild(span);
    //   }
    // });

    // const spans = this.introSect.querySelectorAll('span');
    // this.spansCount = spans.length;

    // spans.forEach(span => {
    //   const delay = Math.random() * 1000;
    //   setTimeout(() => {
    //     this.animation(span);
    //   }, delay);
    // });
  },

  animation(letter){
    const alphabet = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '/', '.', '!', '?', '#', '@', ':'
    ];

    const min = 1500,
          max = 3000;

    let timer = setInterval(() => {
      const showOriginal = Math.random() < 0.5;

      if (showOriginal) {
        letter.innerText = letter.getAttribute('data-original');
      } else {
        letter.innerText = alphabet[Math.floor(Math.random() * 34)];
      }
    }, Math.floor(Math.random() * (max - min + 1)) + min);

    setTimeout(() => {
      clearInterval(timer);
      this.disappear(letter, this.checkCompletion.bind(this));
    }, 3000);
  },

  disappear(letter, callback){
    letter.classList.add('disappear');
    callback();
  },

  checkCompletion() {
    this.completedCount++;
    if (this.completedCount === this.spansCount) {
      Next.next();
    }
  }
};

export default Intro;

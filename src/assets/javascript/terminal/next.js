import Loader from './loader';
import ScrambleText from 'scramble-text';

const Next = {
  sections: document.querySelectorAll("section"),
  current: document.querySelector('section.active'),
  keyHandler: null,
  typpingLetterIndex: 0,
  finalText: "",
  isTypingComplete: false,
  seensSect: null,
  animationInterval: 0,

  init() {
    if (this.current) {
      this.attachKeyboardListener(this.current.dataset.next);
    }
  },

  attachKeyboardListener(key) {
    if (this.keyHandler) {
      document.removeEventListener('keypress', this.keyHandler);
    }

    this.keyHandler = (e) => {
      const typingText = this.current.querySelector('.typing-text');
      if (typingText) {
        if (!typingText.classList.contains('active') || !this.isTypingComplete) {
            if (!typingText.classList.contains('active')) {
                this.finalText = typingText.innerText;
                typingText.innerText = '';
                typingText.classList.add('active');
                this.typingLetterIndex = 0;
                this.isTypingComplete = false;
            }

            if (this.typingLetterIndex < this.finalText.length) {
                typingText.innerText += this.finalText[this.typingLetterIndex];
                this.typingLetterIndex++;
            } else {
                this.isTypingComplete = true;
                this.attachKeyboardListener("Enter");
            }
        }
    }

      if(this.current.dataset.next == "random"){
        this.next();
      }
      else if (key == e.key) {
        this.next();
      }
    };

    document.addEventListener('keypress', this.keyHandler);
  },

  next() {
    if (this.current) {
      const currentIndex = Array.from(this.sections).indexOf(this.current);
      const nextIndex = currentIndex + 1;

      if (nextIndex < this.sections.length) {
        this.current.classList.remove('active');

        if (this.current.classList.contains('terminal')) {
          this.current.classList.add('seen');
          this.current.querySelector('.typing-text').classList.remove('typing-text');
        }

        this.sections[nextIndex].classList.add('active');

        this.current = this.sections[nextIndex];

        this.attachKeyboardListener(this.current.dataset.next);

        if(this.current.querySelector('#ascii-progress-bar')){
          Loader.animation();
        }

        this.seensSect = document.querySelectorAll('.seen');
        this.stopAnimSeenSect()
        this.startAnimSeenSect()
      }

    }
  },

  animSeenSect() {

    if (this.seensSect.length > 0) {
      let rdmISeen = Math.floor(Math.random() * this.seensSect.length);
      let rdmSeen = this.seensSect[rdmISeen];

      let glitchableElt = rdmSeen.querySelectorAll('.glitchable');

      if (glitchableElt.length > 0) {
        let randomIndex = Math.floor(Math.random() * glitchableElt.length);
        let randomElement = glitchableElt[randomIndex];

          let scrambleText = new ScrambleText(randomElement, {
            timeOffset: 70,
            chars: [
              'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
              'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '/', '.', '!', '?', '#', '@', ':'
            ]
          });

          scrambleText.play().start();
      }

    }
  },

  startAnimSeenSect() {
    const min = 1000,
          max = 13000;

    let interval = Math.floor(Math.random() * (max - min + 1)) + min;;

    const loop = () => {
      this.animSeenSect();
    };

    this.animationInterval = setInterval(loop, interval); // Utilisation de la fonction fléchée loop, pour ne pas executer direct la fonction animSeenSect()
  },

  stopAnimSeenSect() {
    if (this.animationInterval) {
      console.log(this.animationInterval);

      clearInterval(this.animationInterval);
    }
  },
};

export default Next;

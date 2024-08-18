import Next from './next';

const Loader = {
  current_percent: 0,
  progressBar: document.getElementById('ascii-progress-bar'),

  init(percent) {
    for (let n = 0; n < 20; n++) {
      if (percent < (n+1)*5) {
        this.progressBar.append("░"); // alt-176
      }
      else {
        this.progressBar.append("▓"); // alt-178
      }
    }
  },

  reset(){
    this.progressBar.innerText = '';
  },

  animation() {
    this.reset();

    let progress = 0;
    const min = 30,
          max = 400;

    let timer = setInterval(function() {
      if (progress == 100) {
        clearInterval(timer);
        Next.next()
        return;
      }

      progress += 10;
      Loader.reset();
      Loader.init(progress);

    }, Math.floor(Math.random() * (max - min + 1)) + min);

  }
};

export default Loader;

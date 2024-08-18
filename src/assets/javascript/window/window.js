const Window = {
  targets: document.querySelectorAll('.iframeOpener'),
  filesFolder: document.querySelector('.folder'),
  windows: document.querySelectorAll('.window'),

  init() {
    console.log(this.targets);

    this.targets.forEach(tar => {
      tar.addEventListener('click', ()=>{
        this.openWin(this.filesFolder.querySelector(`[data-file = "${tar.dataset.file}"]`))
      })
    });

    this.windows.forEach(win => {
      const closeBtn = win.querySelector('.close');

      closeBtn.addEventListener('click', ()=>{
        this.closeWin(win)
      })
    });
  },

  openWin(file){
    file.classList.add('active');
  },

  closeWin(file){
    file.classList.remove('active');
  }
};

export default Window;

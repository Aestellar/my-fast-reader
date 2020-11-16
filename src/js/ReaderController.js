class ReaderController{

constructor(reader){
    this.reader = reader;
    this.playBtn;              
    this.pauseCallbackBinded = this.pauseCallback.bind(this);
    this.selectWordCallbackBinded = this.selectWordCallback.bind(this);
    this.selectWordBehindOverlayCallbackBinded = this.selectWordBehindOverlayCallback.bind(this);
    this.selectChapterCallbackBinded = this.selectChapterCallback.bind(this);
}


init(chaptersList){
    this.playBtn = document.querySelector('[data-fr-pause-button]');
    DOMHelper.attachClickEventS('[data-fr-pause-button]', this.pauseCallbackBinded);
    DOMHelper.attachClickEventS('[data-fr-text-container]', this.selectWordCallbackBinded);
    DOMHelper.attachClickEventS('[data-fr-overlay]', this.selectWordBehindOverlayCallbackBinded);
    this.spaceCallback = this.playCallback.bind(this);
    document.addEventListener('keyup', this.spaceCallback, true);
    this.initChaptersMenu(chaptersList);
    DOMHelper.attachClickEventS('[data-fr-chapters-menu-list]',this.selectChapterCallbackBinded);

}

clean(){
    DOMHelper.removeClickEventS('[data-fr-pause-button]', this.pauseCallbackBinded);
    DOMHelper.removeClickEventS('[data-fr-text-container]', this.selectWordCallbackBinded);
    DOMHelper.removeClickEventS('[data-fr-overlay]',this.selectWordBehindOverlayCallbackBinded);
    DOMHelper.removeClickEventS('[data-fr-chapters-menu-list]',this.selectChapterCallbackBinded);
    document.removeEventListener('keydown', this.spaceCallback, true);

}

initChaptersMenu(chaptersList){
    this.chaptersMenuElt = document.querySelector('.fr-chapters-menu-list');
    chaptersList.forEach((chapter,index)=>{
        let title = chapter.getTitleName();
        let chapterMenuElt = DOMHelper.createElement('div','fr-chapters-menu-chapter',title);
        chapterMenuElt.setAttribute('fr-chapter-menu-index',index);
        this.chaptersMenuElt.appendChild(chapterMenuElt);
    });
}

selectChapterCallback(e){
    let index = DOMHelper.getIndexFromChapterMenuElement(e.target);
    if(Number.isInteger(index)){
        this.reader.selectChapter(index);
    }
}


selectWordCallback(e) {
    let index = DOMHelper.getIndexFromWordElement(e.target);
    if(Number.isInteger(index)){
        this.reader.selectWord(index);
    }
}

selectWordBehindOverlayCallback(e){
    console.log('Overlay callback');
    let wordElt = DOMHelper.getElementByCoordinates(e.clientX, e.clientY,"fr-word");
    if(wordElt){
        let index = DOMHelper.getIndexFromWordElement(wordElt);
        this.reader.selectWord(index);
    }
}

playCallback(e) {
    console.log('Pressed key:' + e.key);

    if (e.key === "Control") {
        this.playBtn.click();
        e.preventDefault();
    }
}

// TODO Remove event binding with Play Button
pauseCallback(e) {
    if (this.reader.isPlaying()) {
        console.log('Paused');
        this.reader.pause();
        this.displayPause(true);
        // if (e) { e.target.innerHTML = 'Play' };
    }
    else {
        console.log('Playing');
        this.reader.play();
        this.reader.updatePlaying();
        this.displayPause(false);
        // if (e) { e.target.innerHTML = 'Pause' };
    }
}

displayPause(pauseFlag){
    if(pauseFlag){
        this.playBtn.innerHTML = "Play";
    }
    else{
        this.playBtn.innerHTML = "Pause";
    }
}

}
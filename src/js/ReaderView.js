class ReaderView {

    ReaderView(reader) {
        this.reader;

    }

    initChaptersMenu(chaptersList) {
        let chapterListMenuElt = document.querySelector('.fr-chapters-menu-list');
        chaptersList.forEach((chapter, index) => {
            let title = chapter.getTitleName();
            // let chapterMenuElt = DOMHelper.createElement('div', 'fr-chapters-menu-chapter', title);
            let chapterMenuElt = DOMHelper.createElement('div', 'fr-chapters-menu-chapter');
            chapterMenuElt.setAttribute('fr-chapter-menu-index', index);
            chapterListMenuElt.appendChild(chapterMenuElt);
            chapter.setMenuElement(chapterMenuElt);

            chapterMenuElt.appendChild(this.createProgressBar(title));

            let percentage = chapter.getPercentage().toPrecision(3) + '%';           
            chapterMenuElt.setAttribute('title', percentage);

            let textElt = chapterMenuElt.querySelector('.fr-chapters-menu-progress-bar-text');
            let height = textElt.getBoundingClientRect().height;
            chapterMenuElt.style.height= height+"px";

            let progressElt = chapterMenuElt.querySelector('.fr-chapters-menu-progress-bar-progress');
            progressElt.style.height = height+"px";
            progressElt.style.width = percentage;
            
        });
    }

    createProgressBar(text,) {
        let progressEltWrapper = DOMHelper.createElement('div', 'fr-chapters-menu-progress-wrapper');
        let textElt = DOMHelper.createElement('div', 'fr-chapters-menu-progress-bar-text', text);
        progressEltWrapper.appendChild(textElt);
        let progressElt = DOMHelper.createElement('div', 'fr-chapters-menu-progress-bar-progress');
        // progressElt.style.width = "width:" + percentage +"%;";
        progressEltWrapper.appendChild(progressElt);
        return progressEltWrapper;
    }

}

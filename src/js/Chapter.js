class Chapter{

    constructor(titleElt, innerNodeList, book){
        this.titleName = titleElt.textContent;
        this.titleElt = titleElt;
        this.innerNodeList = innerNodeList;
        this.book = book;
        this.menuElt;
    }

init()
{
    titleWords = this.titleElt.querySelectorAll(".fr-word");

}

    getTitleElement(){
        return this.titleElt;
    }

    getTitleName(){
        return this.titleElt.textContent;
    }

    getFirstWordIndex(){
        let firstWordElt = this.titleElt.querySelector('.fr-word');
        return DOMHelper.getIndexFromWordElement(firstWordElt);
    }
    
    extractIndex(){
        const i = parseInt(this.titleElt.getAttribute('data-fr-chapter-index'));
        return i;
    }

    getPercentage(){

        let localFirst = this.book.getWord(this.getFirstWordIndex()).getPreviousLength();
        let total = this.book.getTotalCharactersCount();
        let percentage = 100*(total-(total - localFirst))/total;
        return percentage;
    }

    setMenuElement(menuElt){
        this.menuElt = menuElt;
    }


    static buildChapterList(textElt, book){
        

        let chapterList = [];
        let titleList = textElt.querySelectorAll(".fr-chapter-title");

        for(let i=0;i<titleList.length;i++){
            let titleElt = titleList[i];
            let nodeList = [];
            // chapterContentMap.set(titleElt.textContent, nodeList);

            let nextSibling = titleElt.nextSibling;
            while(nextSibling&&nextSibling!==titleList[i+1]){
                nodeList.push(nextSibling);
                nextSibling = nextSibling.nextSibling;
            }
            let chapter = new Chapter(titleElt,nodeList, book);
            chapterList.push(chapter);
        }

        return chapterList;


   
            
            // let chapterContainer = DOMHelper.createFRElement('span','fr-chapter-container');
            // chapterContainer.setAttribute("data-"+'fr-chapter-index', i);
            // titleElt.after(chapterContainer);
            // nodeList.forEach((el)=>{
            //     chapterContainer.appendChild(el)
            // });



    }

}
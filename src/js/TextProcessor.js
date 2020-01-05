class TextProcessor {

    static processText(el) {
        let newElt = el.cloneNode(true);
        newElt.classList.remove('no_scroll_hide');
        // let textContainer = document.querySelector("[data-fr-text-container]");
        return newElt;
        //textContainer.appendChild(newElt);
    }

    static encapsulateBodyText() {
        console.log("Encapsulate started");
        let list = document.body.childNodes;
        let mapTypes = {};
        for (let i = 0; i < list.length; i++) {
            let le = list[i];
            if (mapTypes.hasOwnProperty(le.nodeType)) {
                mapTypes[le.nodeType] += 1;
            }
            else {
                mapTypes[le.nodeType] = 0;
            }
            if (le.nodeType == 3) {
                console.log(le);
                let spanNode = document.createElement("span");
                let newTextNode = document.createTextNode(le.textContent);
                spanNode.appendChild(newTextNode);
                le.parentNode.replaceChild(spanNode, le);
            }
        }
        console.log(mapTypes);
    }

    static countSymbols(textElt) {
        let nodeList = DOMHelper.getOrderedNodeList(textElt);
        let count = nodeList.reduce((previousValue,currentItem )=>{
            let nodeValue = currentItem.nodeValue;
            let length=0;
            if(nodeValue){length = nodeValue.length}
            return previousValue+length
            },0);

        return count;
    }

    static embraceWords(wordList){
        wordList.forEach((word,i,array)=>{
            array[i]=`<span class="fr-word"> ${word}</span>`;
        });
    }
    
    static parseWords(string){
        let wordList = string.split(' ');
        wordList = wordList.filter((el)=>{
            if(el.length>0){
                return true;
            }
            // console.log(wordsArr);
            return false;
        });
        // console.log(wordsArr)
        TextProcessor.embraceWords(wordList);

        let newString = wordList.join(' ');
        let newSpan = document.createElement("span");
        newSpan.classList.add('fr-sentence');
        newSpan.innerHTML = newString;
        return newSpan;
    }

    static formatText(textElt){
        let nodeList = DOMHelper.getOrderedNodeList(textElt,{excludes:['CODE']});

        nodeList.forEach((node)=>{
            let s = node.nodeValue;
            if(s){
                if(s!==' '&& s!=='\n'){
                let newElt = TextProcessor.parseWords(s);
                let parentElement = node.parentElement;
                parentElement.replaceChild(newElt,node);             
                }
            }
        });
    }
}


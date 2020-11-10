class DOMHelper {

    static activeFlag = false;

    static isActive(){
        return this.activeFlag;
    }

    static applyStyle(styleCSS){
        let styleElt = document.createElement("style");
        styleElt.innerHTML = styleCSS;
        document.head.appendChild(styleElt);
    }

    static createFRElement(type, className,  text) {
        let el = this.createElement(type, className, text);
        el.setAttribute(Constants.FAST_READER_ATTRIBUTE,1);
        return el;
    }

    static createElement(type, className, text) {
        let el = document.createElement(type);
        el.className += className;
        el.setAttribute("data-"+className, "");
        el.innerHTML = text || "";
        return el;
    }

    static attachClickEventS(selector,callback,parentElement){
        parentElement=parentElement||document;
        const el = parentElement.querySelector(selector);
        console.assert(!!el);
        el.addEventListener('click',callback);
    }

    static removeClickEventS(selector,callback,parentElement){
        parentElement=parentElement||document;
        const el = parentElement.querySelector(selector);
        console.assert(!!el);
        el.removeEventListener('click',callback);
    }

    static removeFRElements() {
        let list = document.querySelectorAll("[" + Constants.FAST_READER_ATTRIBUTE + "]");
        console.log(list);
        list = Array.from(list);
        list.forEach((e) => e.remove());

    }

    static getElementByCoordinates(x, y, className){
       let elementList = document.elementsFromPoint(x,y);
       let results = elementList.filter((el)=>{
           if(el.classList.contains(className))
           return el;
       });
       if(results.length){
           return results[0];
       }
       return null;
    }

    // static findElementByName(element,name){
    //     let selector = "["+name+"]";
    //     return element.querySelector(selector);
    // }

    static nameToSelector(name){
        return"["+name+"]";
    }

    static showPage(){
        let list = document.body.children;
        list = Array.from(list);
        list.forEach(l=>{
            l.classList.remove("no_scroll_hide");
        });
    }

    static hidePage(){
        let list = document.body.children;
        list = Array.from(list);
        list.forEach(l=>{
            l.classList.add("no_scroll_hide");
        });
    }



    static createOverlay(){
        if(document.querySelector(".fr-overlay")){
            return;
        }

        let overlay = DOMHelper.createFRElement("div","fr-overlay","data-fr-overlay");
        
        // = document.createElement("div");
        // overlay.className = "fr-overlay";



        overlay.style.height = document.body.scrollHeight+"px"; 
        document.body.appendChild(overlay);
    }

    static removeOverlay(){
        let overlay = document.querySelector(".fr-overlay");
        if(overlay){
            overlay.remove();
        }
    }

    static showOverlay(){
        let overlay = document.querySelector(".fr-overlay");
        overlay.style.display = "block";
    }

    static hideOverlay(){
        let overlay = document.querySelector(".fr-overlay");
        overlay.style.display = "none";
    }

    static getOverlayElement(){
        let overlay = document.querySelector(".fr-overlay");
        return overlay;
    }


    static cssPath (el) {
        if (!(el instanceof Element)) 
            return;
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                var sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector)
                       nth++;
                }
                if (nth != 1)
                    selector += ":nth-of-type("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
     }


    static getIndexFromWordElement(elt){
        if (elt.hasAttribute('data-fr-word-index')) {
            let index = elt.getAttribute('data-fr-word-index');
            index = parseInt(index);
            if (index === index) {
                return index;
            }
        }
        return null;
    }

    static isInViewport = function (elem) {
        var bounding = elem.getBoundingClientRect();
        return DOMHelper.isInViewportRect(bounding);
    };

    static isInViewportRect = function (bounding) {
        // var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };   

   static getIndexedElementList(orderedList,indexName){
       let indexedList = orderedList.map((el,index)=>{
        el.setAttribute(indexName,index);
        return el;
       });

       return indexedList;
   }

static getOrderedElementListByClass(containerElt, className){
    let orderedNodeList = DOMHelper.getOrderedNodeList(containerElt);
    console.log(orderedNodeList, 'orderedNodeList');
    let orderedElementList = orderedNodeList.filter((node)=>{
        if(node.nodeType===1&&node.classList.contains(className)){
            return true;
        }
        return false;
    });
    return orderedElementList;
}

//Walk in depth
static getOrderedNodeList(element,options) {
    options = options||{};
    const excludesList = options.excludes||[];
    const nodeList = element.childNodes;
    const nodeArray = Array.from(nodeList);
    const pathArray = [];
    const resultNodeList = [];


    let timeout = 0;
    for (let node of nodeArray) {
        let cNode = node;
        let parentNode = node;
        while (cNode != null) {
            // let text = cNode.nodeValue;
            // if(text){
            //     textArray.push(cNode.nodeValue);
            // }
            resultNodeList.push(cNode);
            let excludesFlag = false;

            if(cNode.nodeType ===1 && excludesList.length>0){
                excludesFlag = excludesList.includes(cNode.nodeName);
            }

            excludesList.includes(cNode.nodeName);
            if (cNode.childNodes.length > 0 && !excludesFlag) {
                pathArray.push(cNode);                
                cNode = cNode.childNodes[0];
            }

            else {
                if (cNode.childNodes.length == 0 && cNode == parentNode) {
                    break;
                }
                cNode = cNode.nextSibling;
            }

            while ((cNode == null) && (pathArray.length > 0)) {
                cNode = pathArray.pop().nextSibling;
            }

            timeout += 1;
            if (timeout > 1000000) {
                break;
            }
        }
    }

    return resultNodeList;
}
}

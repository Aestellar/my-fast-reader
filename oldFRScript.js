// ==UserScript==
// @name         My Fast Reader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tl.rulate.ru/*
// @match https://ranobes.com/*
// @match        *://*/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
    'use strict';

    const FRAttribute = "data-fast-reader-attribute";

    const styleCSS = `
.launch_button{
position:fixed;
top:70px;
left:1750px;
z-index: 100000;

font-size:18px;
background-color:#f5f5f5;
background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
border:1px solid #bbbbbb;
border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.35);
border-radius: 10px;
box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
cursor: pointer;
padding: 14px 28px;
}

.launch_button:hover{

text-decoration: none;
background-image: linear-gradient(to bottom, #ffffff, #b8b8b8);
background-color: #b8b8b8 ;

}
.launch_button:active{
background-image: linear-gradient(to bottom, #ffffff, #939393);
}

.no_scroll_hide{
display: none !important;
overflow: hidden;
}

.main-container{
display:block;
width:100%;
min-height: 100vh;
background: #EEE;
}

.text-container{
width:600px;
padding-top:100px;
background:#efefef;
margin-left: auto;
margin-right: auto;
}
.menu-container{
position:fixed;
top: 0;
height:50px;
width:100%;
background:#c4c4c4;
}
.menu{
width:600px;
margin-left: auto;
margin-right: auto;
}
.speed-counter{
display:inline-block;
width:300px;
}
.statistics{
display:inline-block;
width:300px;
}
.color1{
background:#EEE;
}
`;


    //document.body.addEventListener("click",testClick);

    function inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function testClick(e){
        console.log("test click");
        document.body.removeEventListener("click",testClick);
    }


    console.log("Hello books");
    init();

    let styleElt = document.createElement("style");
    styleElt.innerHTML = styleCSS;
    document.head.appendChild(styleElt);

    function init(){
        let launchButton = createLaunchButton();
        document.body.appendChild(launchButton);
        //console.log("Window.top", window.top);
    }

    function launch(e){
        console.log("Reading mode enabled");
        e.stopPropagation();
        pickTextFromPage();
    }

    function launchReadingMode(el){
        hidePage();
        showTextContainer();
        processText(el);
    }

    function exitReadingMode(){

        removeFRElements();
        showPage();

    }

    function mouseout(e){
        console.log("mouseout",e);
        e.target.classList.remove("color1");
    }

    function mouseenter(e){
        //console.log("mouseenter",e);
        //e.stopPropagation();
        //if(e.target!=this){
        //    console.log("fail",e.target,this);
        //    return;
        //}
        console.log(e.target,this);
        e.target.classList.add("color1");
    }

    function click(e){
        console.log("remove listeners");
        document.body.removeEventListener("mouseout",mouseout,true);
        document.body.removeEventListener("mouseleave",mouseout,true);
        document.body.removeEventListener("mouseenter",mouseenter,true);
        document.body.removeEventListener("mouseenter",click);
        let el = e.target;
        //classList.remove("color1");
        let el1 = e.target.parentNode;
        while(el.parentNode){
            //console.log("ParentNode",el);
            if(el.classList.contains("color1")){
                //el1 = el;
                //console.log("el1",el1);
            }
            el.classList.remove("color1");
            el = el.parentNode;
        }
        el1.classList.add("marked");
        console.log("click",e.target,el,el1);
        launchReadingMode(el1);
    }

    function onEscape(e){
        const key = e.key;
        if(key==="Escape"){
            console.log("Pressed Escape button");
            exitReadingMode();
        }

    }


    function pickTextFromPage(){
        document.body.addEventListener("mouseout", mouseout,true);
        document.body.addEventListener("mouseleave",mouseout,true);

        document.body.addEventListener("mouseenter",mouseenter,true);

        //setTimeout(500,()=>{document.body.addEventListener("click",click);})
        document.body.addEventListener("click",click,{once:true,capture:true});

    }

    function processText(el){
        let newElt = el.cloneNode(true);
        let textContainer = document.querySelector("[data-fr-text-container]");
        textContainer.appendChild(newElt);
    }

    function encapsulateBodyText(){
        console.log("Encapsulate started");
        let list = document.body.childNodes;
        let mapTypes = {};
        for(let i= 0; i<list.length; i++){
            let le = list[i];
            if(mapTypes.hasOwnProperty(le.nodeType)){
                mapTypes[le.nodeType]+=1;
            }
            else{
             mapTypes[le.nodeType]=0;
            }
            if(le.nodeType == 3){
                console.log(le);
                let spanNode = document.createElement("span");
                let newTextNode = document.createTextNode(le.textContent);
                spanNode.appendChild(newTextNode);
                le.parentNode.replaceChild(spanNode,le);
            }
        }
        console.log(mapTypes);
    }

    function createMenu(){
        let menuContainer = createFRElement("div","menu-container","data-fr-menu-container");
        let menu = createElement("div","menu","data-menu");
        menuContainer.appendChild(menu);
        let speedCounter = createElement("div","speed-counter","data-fr-speed-counter", "Reading speed:2000wpm");
        menu.appendChild(speedCounter);
        let statistics = createElement("div","statistics","data-fr-statistics","Statistics");
        menu.appendChild(statistics);

        let exitBtn = createElement("div","fr-exit-btn","data-fr-exitBtn","exit");
        statistics.appendChild(exitBtn);
        exitBtn.addEventListener("click",exitReadingMode,{"once":"true"});
        document.addEventListener("keydown",onEscape,{"once":"true"});
        return menuContainer;
    }

    function showTextContainer(){
        let mainContainer = createFRElement("div","main-container","data-fr-main-container");
        document.body.appendChild(mainContainer);
        let textContainer = createFRElement("div","text-container","data-fr-text-container");
        mainContainer.appendChild(textContainer);
        let menu = createMenu();
        mainContainer.appendChild(menu);
    }

    function hidePage(){
        let list = document.body.children;
        list = Array.from(list);
        list.forEach(l=>{
            l.classList.add("no_scroll_hide");
        });
    }

    function showPage(){
        let list = document.body.children;
        list = Array.from(list);
        list.forEach(l=>{
            l.classList.remove("no_scroll_hide");
        });
    }

    function createLaunchButton(){
        let b = createElement("div","launch_button",'data-fr-reader-button',"Start");
        console.log(b);
        b.addEventListener("click",launch);
        return b;
    }

    function removeFRElements(){
        let list = document.querySelectorAll("["+FRAttribute+"]");
        console.log(list);
        list = Array.from(list);
        list.forEach((e)=>e.remove());

    }

    function createFRElement(type, className, selfName, text){
        let el = createElement(type,className,selfName,text);
        el.setAttribute(FRAttribute,"true");
        return el;
    }

    function createElement(type,className,selfName,text){
        let el = document.createElement(type);
        el.className+=className;
        el.setAttribute(selfName,selfName);
        el.innerHTML = text||"";
        return el;
    }



})();
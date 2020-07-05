class FastReaderMain{


    static launch(event, quickStart){
        event.stopPropagation();
        let vm = new ViewManager();
        vm.createView(quickStart);
        console.log('static launch');
        // document.removeEventListener('click',FastReaderMain.launch);
    }

    static init(){
        console.log("Init FastReaderMain");
        this.applyStyle(styleCSS);
        let viewCreator = new ViewCreator();
        let launchBtn = viewCreator.createLaunchButton(FastReaderMain.launch);
        document.body.appendChild(launchBtn);
        FastReaderMain.expandStringPrototype();
        FastReaderMain.addMainListeners();
        }

    static addMainListeners(){
        document.addEventListener('keydown',(e)=>{
            if(e.code=='KeyQ'&&e.ctrlKey){
                if(!DOMHelper.isActive()){
                    FastReaderMain.launch(e, true);
                }
            }
        });
    }


    static expandStringPrototype(){
        String.prototype.toHHMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds;
        }
    }


    static applyStyle(styleCSS){
        let styleElt = document.createElement("style");
        styleElt.innerHTML = styleCSS;
        document.head.appendChild(styleElt);
    }
}

// Сначала FastReaderMain загружается, применяет css и создаёт кнопку запуска. В коллбеке этой кнопки создаётся DomHelper, вспомогательный класс с внедрением текстовых констант. 
// Затем создаётся объект контроллёра со всякими изменяющими функциями. А потом создаётся ViewManager который создаёт через ViewCreator нужный набор dom элементов. 
// К этим элементам ViewManager привязывает коллбеки контроллёра. И вообще весь менеджмент идёт через него. 
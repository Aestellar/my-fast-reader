var styleCSS = `

.fr-chapters-menu-container{
    position: fixed;
    z-index: 200000;
    padding-top:100px;
    left: 0;
    top:0;
    height: 100%;
    width: 300px;
    /* border-right: 2px solid #AAA; */
    overflow: auto;
}

.fr-chapters-menu-list{
    overflow: auto;
}

.fr-chapters-menu-chapter{
    /* background-color: #d9d9d9; */
    padding-left: 20px;
    padding-bottom: 3px;
    padding-top: 2px;
    user-select: none;
}

.fr-chapters-menu-chapter:hover{
    background-color: #AAA;
}
.fr-chapters-menu-chapter:active{
    background-color: #DDD;
}
.fr-menu-container{
    position:fixed;
    top: 0;
    min-height: 50px;
    width:100%;
    background:#dedede;
    z-index: 200000;
    font-size: 16px;
    }

    .fr-menu{
    color:black;
    font-family: Arial, Helvetica, sans-serif;
    width:1000px;
    margin-left: auto;
    margin-right: auto;
    line-height: normal;
    }

    .fr-menu button{
        color:black;
        background-color:#d9d9d9;
        height: 100%;
        vertical-align: top;
        font-size:16px;
        font-family: Arial, Helvetica, sans-serif;
        border:solid gray 1px;
        padding: 1px 6px 1px 6px;
    }

    .fr-menu button:active{
        border: solid #aaa 1px;
    }

    .fr-menu button:focus{
        border: solid #aaa 1px;
    }

    .fr-menu-control-block{
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        margin-right: 10px;
    }

    .fr-pause-button{
        /* padding: 1px 24px; */
        display: block;
        margin-left: auto;
        margin-right: auto;
        min-width: 70px;
        /* font-size: 24px; */
        /* height: 55px; */
    }

    .fr-exit-button{
        display: block;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        min-width: 70px;
        /* padding: 1px 24px; */
        /* font-size: 24px; */
        /* height: 55px; */
    }

    .fr-speed-block{
        display: inline-block;
        vertical-align: top;
    }

    .fr-speed-buttons-container{
        display: inline-block;
        vertical-align: top;
    }

    .fr-speed-counter{
    display:inline-block;
    vertical-align: top;
    /* width:300px; */
    }

    .fr-speed-block button{
        display: block;
    }




    .fr-statistics-block{
    display:inline-block;
    /* width:250px; */
    }
    /* .fr-pause-button{
        vertical-align: top;
        height: 100%;
    } */


    .fr-statistics-column{
    display:inline-block;
    margin-right: 10px;
    }
    

    .fr-words-per-selection{
        display: inline-block;
        vertical-align: top;
    }

.launch_button{
    position:fixed;
    top:70px;
    right:30px;
    z-index: 100000;
    opacity: .5;
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
    opacity: 1;
    
    }
    .launch_button:active{
    background-image: linear-gradient(to bottom, #ffffff, #939393);
    }
    

    
    .fr-main-container{
    display:block;
    width:100vw;
    min-height: 100vh;
    background: #EEE;
    overflow: auto;
    }
    
    .fr-text-container{
    width:600px;
    padding-top:100px;
    background:#efefef;
    margin-left: auto;
    margin-right: auto;
    }


    .fr-sentence{
        color:gray; 
    }

    .fr-focus-word{
        font-size: 150%;
        color: black;
        font-weight: bold;
    } 

    .fr-overlay{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        -webkit-user-select: none;
    }

    .color1{
    background:#EEE;
    }

    .no_scroll_hide{
        display: none !important;
        overflow: hidden;
    }`;
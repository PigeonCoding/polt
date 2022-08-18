const fileUrl = "./anime.json";
let vid, p, isMobile, titl, conn, brr, divv;
let content = [];

window.addEventListener('load', function () {
    //initialises some variables
    brr = document.createElement("br")
    vid = document.getElementById("vid");
    vid.style.visibility = "hidden";
    conn = this.document.getElementById("con");
    won = window.innerWidth;
    isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
    titl = document.getElementById("title");
    titl.textContent = "";
    
    refresh();
}, false);

function createButton(p, fol, ep) {
    //this function creates all the buttons based on if fol is true for a folder or false for a file
    let but = document.createElement("button");
    but.className = 'button'
    if (fol) {
        //but.textContent = content[p];
        but.id = p;
        
        //height:' + won * .04 + 'px
        if (isMobile) {
            but.style.cssText = 'font-size: ' + won * .03 + 'px';
        }
        else {
            but.style.cssText = 'font-size: ' + won * .012 + 'px';
        }
        
        but.style.backgroundColor = "#101213";
        but.addEventListener("click", viding);
        but.innerHTML = "<img style:'text-align:left' src='" + "./anime/"+ content[p] + "/" + content[p+2] + "' width='138' height='195'><br>" + content[p]
        conn.appendChild(but)
        
    }
    else {
        but.textContent = p;
        titl.textContent = ep;
        titl.align = "center";
        if (isMobile) {
            but.style.cssText = 'height:' + won * .1 + 'px';
        }
        else {
            but.style.cssText = 'height:' + won * .03 + 'px';
        }
        but.style.backgroundColor = "#101213"
        but.addEventListener("click", eping);
        conn.appendChild(but);
    }
}

function refresh() {
    //fetches the json file and stores the value in an array
    fetch(fileUrl).then(r => r.text()).then(t => ll(t));
}

function ll(t) {
    // loop the json file for all the elements and returns a single list
    let obj = JSON.parse(t);
    let anim = obj.content;
    for (const key in anim[0]) {
        for (const hell in anim[0][key]) {
            let arr = anim[0][key][hell];
            for (const mi in arr) {
                let mii = arr[mi];
                for (const l in mii) {
                    content.push(arr[mi][l]);
                }
            }
        }
    }
    // create the main button for the folders 3 by 3 steps cause of json format
    for (let i = 0; i < content.length; i+=3) {
        createButton(i, true, null);
    }
}

function viding() {
    // this function creates the sub-buttons to select episodes
    let con = this.textContent;
    let id = content.indexOf(con);
    
    //create the buttons for each episode in the list
    for (let i = 0; i < content[id + 1].length; i++) {
        console.log("./anime/" + content[id] + "/" + content[id + 1][i]); 
        createButton(content[id] + "/" + content[id + 1][i], false, content[id]);
    }
    
    //removes all buttons for the folders starting at index 0 and adding 3
    for (let i = 0; i < content.length; i += 3) {
        let bui = document.getElementById(i);
        bui.remove();
    }
}
function eping() {
    // this function display the video and removes the button
    let p = this.textContent;

    // check eather it's a mobile browser or a computer and adjustes the size to fit
    if (!isMobile) {
        vid.width = won - 300;
        vid.height = vid.width / 16 * 9;
    }
    else {
        vid.width = won;
        vid.height = vid.width / 16 * 9 + 100;
    }

    //set the parameters for the video
    vid.src = "./anime/" + p;
    vid.style.cssText = "align-self: center"
    vid.style.visibility = "visible";
    vid.controls = true
    

    this.remove();
}

function hello() {
    //pauses the video and reloades the page taking u back to main menu
    vid.pause();
    window.location.reload();
}

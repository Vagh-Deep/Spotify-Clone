
let songs_list = [];
let songs_name = [];
let curr_folder;




let music = new Audio();
let next_music;
let previous_music;




function secondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return " 00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Ensuring seconds are an integer

    // Pad with zeros if necessary
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}

function search_next(current_song) {
    console.log(current_song==undefined);
    if(current_song!=undefined){
        
    
   
    if(songs_name.includes(current_song)){ 
    let index = (songs_name.lastIndexOf(current_song) + 1) % songs_name.length;
    let prev_index=(songs_name.length+(index-2))%songs_name.length;
    console.log(index);
    next_music = songs_name[Number.parseInt(index)];
    previous_music =  songs_name[Number.parseInt(prev_index)];
    console.log(next_music, previous_music);
    }
}
}


async function playMusic(element) {
    if(element==undefined)
    {
        return ;
    }
    document.querySelector(".playbar").style.bottom = 0;
    play.src = "images/pause.svg";
    music.src = `songs/${curr_folder}/${element}_64(PagalWorld.com.sb).mp3`;


    music.onloadedmetadata = () => {


        music.play();
        document.querySelector(".info").innerHTML = element;

    }
    search_next(element);

}







async function fetch_songs(folder) {
    curr_folder = folder;
    let res = await fetch(` /spotify_clone/songs/${folder}/`);
    let direc = await res.text();

    let div = document.createElement("div");

    div.innerHTML = direc;
    //  console.log(direc);
    let Div = div.getElementsByTagName("div")[0];
    let list = Div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }


    return songs;

}

async function list_songs(folder) {
    let songs = await fetch_songs(folder).then((resolve) => { return resolve; })

    console.log(songs);

    // making another array of object which store the name and href of the songs
    let song = {
        href: null,
        name: null,
    }
    // let songs_list = [];

    for (let i = 0; i < songs.length; i++) {
        let str = songs[i].split(`songs/${curr_folder}/`)[1].split("_")[0].replaceAll("%20", " ");
        // let str=songs[i].split("_")[0].replaceAll("%20","");
        let s = Object.create(song);

        s.href = songs[i];
        s.name = str;
        songs_name.push(s.name);
        songs_list.push(s)

    }
    for (let i = 0; i < songs_list.length; i++) {
        console.log(songs_list[i].name);
    }

    for (let i = 0; i < songs.length; i++) {
        let node = document.createElement("li");
        node.className = "lib_card";
        node.innerHTML = `<h4>${songs_list[i].name}</h4>    <img class="invert" src="images/play2.svg" alt="play">`;
        console.log(i);

        let d = document.getElementById("libr").firstElementChild.append(node);







    }



    // the first song that display on the bar when  page is opened


    let playlist = Array.from(document.getElementsByClassName("lib_card"));
    console.log(playlist)

    playlist.forEach(e => {
        let element = e.firstElementChild.innerHTML;

e.addEventListener("mouseover",()=>{
    e.getElementsByTagName("img")[0].style.display="block";
})
e.addEventListener("mouseleave",()=>{
    e.getElementsByTagName("img")[0].style.display="none";
})
        e.addEventListener("click", () => {
            playMusic(element);
        })
    })


    // this is for adding first song in the playbar when page is just opened
    //    music.src = songs[0];
    //    next_music = songs_list[1].name;
    //    previous_music;



    //    document.querySelector(".info").innerHTML = songs_list[0].name;



}

async function main() {
    // let songs = await fetch_songs(folder).then((resolve) => { return resolve; })

    // console.log(songs);

    // // making another array of object which store the name and href of the songs
    // let song = {
    //     href: null,
    //     name: null,
    // }
    // // let songs_list = [];

    // for (let i = 0; i < songs.length; i++) {
    //     let str = songs[i].split(`songs/${curr_folder}/`)[1].split("_")[0].replaceAll("%20", " ");
    //     // let str=songs[i].split("_")[0].replaceAll("%20","");
    //     let s = Object.create(song);

    //     s.href = songs[i];
    //     s.name = str;
    //     songs_name.push(s.name);
    //     songs_list.push(s)

    // }
    // for (let i = 0; i < songs_list.length; i++) {
    //     console.log(songs_list[i].name);
    // }

    // for (let i = 0; i < songs.length; i++) {
    //     let node = document.createElement("li");
    //     node.className = "lib_card";
    //     node.innerHTML = `<h4>${songs_list[i].name}</h4>`;
    //     console.log(i);

    //     let d = document.getElementById("libr").firstElementChild.append(node);







    // }


    // // // // // // // 

    // let playlist = Array.from(document.getElementsByClassName("lib_card"));
    // console.log(playlist)

    // playlist.forEach(e => {
    //     let element = e.firstElementChild.innerHTML;


    //     e.addEventListener("click", () => {
    //         playMusic(element);
    //     })
    // })

    // adding evenet listener to play next and previous;
    play.addEventListener("click", () => {
        if (music.paused) {
            play.src = "images/pause.svg";
            music.play();

        }
        else {
            play.src = "images/play2.svg";
            music.pause();
        }

    })


    music.addEventListener("timeupdate", () => {
        // console.log(music.currentTime, music.duration)
        document.querySelector(".time").getElementsByClassName("time_info")[0].innerHTML = `${secondsToMinutes(music.currentTime)}/${secondsToMinutes(music.duration)}`;
        let length = ((music.currentTime / music.duration) * 100);
        document.querySelector(".circle").style.left =100 + "%";
        document.querySelector("#colored_bar").style.width=length + "%";

    })

    // add event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let length = (e.offsetX / document.querySelector(".seekbar").getBoundingClientRect().width) * 100
  document.querySelector(".circle").style.left = 100+ "%";
        document.querySelector("#colored_bar").style.width=length + "%";


        music.currentTime = (e.offsetX / document.querySelector(".seekbar").getBoundingClientRect().width) * music.duration;

    })


    // // // // // // 

    // // the first song that display on the bar when  page is opened

    // music.src = songs[0];
    // next_music = songs_list[1].name;
    // previous_music;



    // document.querySelector(".info").innerHTML = songs_list[0].name;

    // // // //  // // // //  / / / //
    document.querySelector("#hamburger").addEventListener("click", () => {

        {
            document.querySelector(".left").style.left = 0 + "%";
        }

    })

    document.querySelector("#close").addEventListener("click", () => {
        document.querySelector(".left").style.left = -100 + "%";
    })

    document.querySelector("#previous").addEventListener("click", () => {
        if (previous_music != undefined) {


            playMusic(previous_music);



        }
    })
    document.querySelector("#next").addEventListener("click", () => {
        if (next_music != undefined) {


            playMusic(next_music);



        }
        playMusic(next_music);
    })

    // adding event listener to the volume control
    document.querySelector("#sound_control").addEventListener("mouseover", () => {
        document.getElementById("volume_bar").style.display = "block";
        // document.querySelector("#circle1").style.display="block";

    })
    document.querySelector("#sound_control").addEventListener("mouseleave", () => {
        document.getElementById("volume_bar").style.display = "none";
        // document.querySelector("#circle1").style.display="none";
    })


    // adding event listener to the volume_bar
    document.querySelector("#volume_bar").addEventListener("click", e => {


        let length = (e.offsetX / document.querySelector("#volume_bar").getBoundingClientRect().width);

        document.querySelector("#circle1").style.left = 100 + "%";
        document.querySelector("#volume_container").style.width = length * 100 + "%";


        if (length == 0) {
            document.getElementById("sound_control").getElementsByTagName("img")[0].src = "images/silent.svg";

        }
        else {
            document.getElementById("sound_control").getElementsByTagName("img")[0].src = "images/sound.svg";
        }
        music.volume = length;
    })



    // adding eventlistner to the sound image


    document.getElementById("sound_control").getElementsByTagName("img")[0].addEventListener("click", () => {
        // console.log( document.getElementById("sound_control").getElementsByTagName("img")[0].src.split("/").slice(-1)[0]);
        if (document.getElementById("sound_control").getElementsByTagName("img")[0].src.split("/").slice(-1)[0] == "sound.svg") {
            document.getElementById("sound_control").getElementsByTagName("img")[0].src = "images/silent.svg";
            document.querySelector("#volume_container").style.width = 0 + "%";
            document.querySelector("#circle1").style.left = 0;
            music.volume = 0;
        }
        else {
            document.getElementById("sound_control").getElementsByTagName("img")[0].src = "images/sound.svg";
            document.querySelector("#volume_container").style.width = 100 + "%";
            document.querySelector("#circle1").style.left = 100 + "%";

            music.volume = 1;
        }
    })
    document.querySelector("#volume_container").style.width = 70 + "%";
    document.querySelector("#circle1").style.left = 100 + "%";
    music.volume = 0.7;


    // adding event listner to the playcard when we hover on it the play button will move up;
    let play_arr = Array.from(document.querySelectorAll(".play"));
    // let arr = Array.from(document.querySelectorAll(".playListCard"));
    let arr=Array.from(document.getElementsByClassName("playListCard"));
    console.log(arr,"these are all cards in the playlist");
    for (let element = 0; element < arr.length; element++) {

        arr[element].addEventListener("mouseover", () => {
            // arr[element].getElementsByClassName("play")[0].style.display = "block"; 
            arr[element].getElementsByClassName("play")[0].style.opacity = 1;
            arr[element].getElementsByClassName("play")[0].style.bottom = 100 + "px";
        })

    }

    for (let element = 0; element < arr.length; element++) {

        arr[element].addEventListener("mouseleave", () => {
            //  arr[element].getElementsByClassName("play")[0].style.display = "none"; 

            //  arr[element].getElementsByClassName("play")[0].style.bottom=40+"px";
            arr[element].getElementsByClassName("play")[0].style.opacity = 0;
            arr[element].getElementsByClassName("play")[0].style.bottom = 90 + "px";
        })

    }



}
//main("all");
// main("soft");
 

async function fetch_folders(){
    let fol_res= await fetch("/spotify_clone/songs/").then((response)=>{
        return response.text();
    }) ;
     let div=document.createElement("div");
     div.innerHTML=fol_res;
     
let folder_li=Array.from(div.getElementsByTagName("div")[0].getElementsByTagName("ul")[0].getElementsByTagName("li"));
let folder_hrefs=[];
for (const element of folder_li) {
   let href= element.getElementsByTagName("a")[0].getAttribute("href");
   if(href.startsWith("/spotify_clone/songs/")){
    folder_hrefs.push(href);
   }
     


}
 

// now dynamically adding the playlist cards to the playlist

for(let i=0;i<folder_hrefs.length;i++){
let Description= await fetch(`${folder_hrefs[i] }/info.json`).then((resolve)=>{
    return resolve.json();
})
console.log(Description);
    let card=document.createElement("div");
    card.className="playListCard";
    card.setAttribute("data-folder",`${folder_hrefs[i].split("/")[3]}`);
    card.innerHTML=` <img src=" ${folder_hrefs[i] }/cover.jpeg">
                <h2>${Description.title}</h2>
                    <p>${Description.description}</p>

                    <div class="play">
                        <button><img src="images/play.svg" alt="play"></button>


                    </div>
`
   




    document.getElementsByClassName("cardContainer")[0].append(card);


}



console.log(document.getElementsByClassName("playListCard"));


}
 

async function execute() {
await fetch_folders();
await main();
// here we will fetch the folders from the songs and then make card for each of them in the playlist 







    // this is default folder that will be open 
    list_songs("all");






    // adding event listner to the cards so that corresponding songs are added to the playlist
    let arr = Array.from(document.getElementsByClassName("playListCard"));
    console.log(arr,"all folders are ")
    for (const element of arr) {

        element.addEventListener("click", () => {
            let lib_cards = Array.from(document.querySelectorAll(".lib_card"));
            //      for (const card of lib_cards) {
            //     card.remove();

            //    }



            // making the inner html of playlist songs ul empty
            document.getElementById("libr").getElementsByTagName("ul")[0].innerHTML = "";
            //  play.src = "play2.svg";
            //  document.querySelector(".circle").style.left=0;
            //    music.pause();
            songs_list = [];
            songs_name = [];
            next_music = undefined;
            previous_music = undefined;
            let folder = element.getAttribute("data-folder");
            list_songs(folder);



        })


    }


}
execute();
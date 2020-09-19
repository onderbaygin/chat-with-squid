$(document).ready(()=>{

    var squid = new Squid({
        room: "chat", //db
        key: "xxxxxxxxxxxxxxxxxxxxxx",//your api key
        server: "wss://live.sq-db.com", //not change
        door: "daily" //table
    });

    if(!localStorage.username) {
        $('#main').load("html/username.html");
    } else {
        $('#main').load("html/chat.html");
    }
    $("#main").delegate("#join", "click", ()=>{
        localStorage.username = $('#username').val();
        $('#main').load("html/chat.html");
    });

    squid.onAdded((e)=>{
        console.log(e)
        $('#chat-area').prepend(
            '<div class="user-message" id="message-'+e.id+'"><span class="badge badge-dark">'+e.username+'</span><b class="message">'+e.message+'</b><div class="message-time"><i class="message-time">'+e.time+'</i></div><hr></div>'
        );
    })

    $("#main").delegate("#message", "keydown", (e)=>{
        if(e.keyCode == 13) {
            squid.query({
                username: localStorage.username,
                time: new Date(),
                message: $('#message').val()
            }).insert((e) => {
                console.log(e);
            })
        }
    });
})

// aqui se hace la conexión

var socket = io.connect(window.location.origin);

//Query DOM

var message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


//emitir los eventos

btn.addEventListener('click', function(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = hours + ':' + minutes;
    
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        time: formattedTime
    });
});


message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//escuchar a los eventos

socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message} <span style="color: gray; font-size: 0.8em;">${data.time}</span></p>`;
});


socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>' 
});

const toggleButton = document.getElementById('toggle-dark-mode');

toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌞';  
        toggleButton.textContent = '🌙'; 
    }
});
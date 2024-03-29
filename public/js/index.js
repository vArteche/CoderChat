
const socket = io();
let user;
let chatBox = document.querySelector('#chatBox');

Swal.fire({
    title: "Identifícate",
    input: "text",
    text : "Ingresá un usuario para identificarte en el chat",
    inputValidator: (value) =>{
        return !value && 'Necesitás escribir un usuario para continuar.'
    },
    allowOutsideClick : false
}).then(result=>{
    user = result.value
    console.log(user)
});

chatBox.addEventListener('keypress', e =>{
    if (e.key == "Enter"){

        if(chatBox.value.trim().length > 0){
            console.log(chatBox.value)
            socket.emit("message", {
                user,
                message: chatBox.value
            })
            chatBox.value= "";
        }
    }
})
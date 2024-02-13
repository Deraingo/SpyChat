# Spy Chat
This is a websocket based application assigned to me for USU's CS4610 the starting code is provided by Proffesor Josheph Ditton.  
# Use
The Spy Chat application is built using TypeScript as the backend and JavaScript in the frontend utilizing React.js.  
## To opperate: 
1. The user must cd to the SpyChat directory and run either `yarn install` or `npm install` to intialize the packages
2. The user then with a second terminal can cd to `SpyChat/client`
3. Using both terminals run `yarn dev` or `npm dev` this will start both the backend server and the frontend and allow communication between the two
## How it Works
Using web sockets the application allows for users to connect and send messages to an open chatroom, the catch is that all messages sent are encripted using CryptoJS  
In order to decrypt a message a user must know the password and press the "Decrypt" button in the sent message board.  
The user will then be prompted to enter the password of said message, upon successful decryption the message will be sent to the "Decrypted" Message board to be viewed only by the person who decrypted it

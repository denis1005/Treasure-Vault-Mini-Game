<p align="center">

  ![Home]![Capture](https://user-images.githubusercontent.com/19151979/216472202-d6a90e16-2aeb-4459-8b4d-0ca1aecd04ef.PNG)

</p>

<h3 align="center">Treasur Vault Minin Game</h3>



## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)


## 🧐 About <a name = "about"></a>
  A mini-game where the player needs to guess the correct combination in order to open the safe and win the game.
  

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing
A step by step series of examples that tell you how to get a development env running.


Open the project folder in integrated terminal 
and type:

```bash
 npm i
```

To start the game open the index.html file or open it with live server in VS Code

## 🎈 Usage <a name="usage"></a>

The game begins with the vault door closed. A random secret combination is logged in the browser console. Each pair is a number between 1 and 9 and a “clockwise”/
”counterclockwise” direction. For example: “ 2 clockwise, 7 counterclockwise, 5 clockwise”. 1 means a displacement of 1 position, i.e. 60°. So 6 would be a full rotation of the handle.

To rotate the handle the player can use the left/right arrow keys and to enter the combination the player could use the enter key. 

If the player guess the correct combination the safe will open with small glitter animation over the gold bars with a shine effect.
If the player makes an error entering the secret combination - the game resets. A new code is generated and the player has to start from the beginning. Also, the vault handle “spins like crazy” several rotations.


## ✍️ Author <a name = "authors"></a>
- [@denis1005](https://github.com/denis1005) 

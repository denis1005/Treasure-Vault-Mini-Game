
  const Application= PIXI.Application;
  const app=new Application({
     width:window.innerWidth,
     height:window.innerHeight,
     transparent:true,
  })

  document.body.appendChild(app.view)

let secret = generateSecret();
console.log("The secret combination is:", secret);



// Generates a random secret combination
function generateSecret() {
   let secret = [];
   for (let i = 0; i < 3; i++) {
     let number = Math.floor(Math.random() * 9) + 1;
     let direction = Math.random() < 0.5 ? "clockwise" : "counterclockwise";
     secret.push({ number, direction });
   }
   return secret;
 }

 
  
  
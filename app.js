
  const Application= PIXI.Application;
  const app=new Application({
     width:window.innerWidth,
     height:window.innerHeight,
     transparent:true,
  })

  document.body.appendChild(app.view)

let secret = generateSecret();
console.log("The secret combination is:", secret);

const backgroundTexture=PIXI.Texture.from('./images/bg.png')
  const backgroundSprite=new PIXI.Sprite(backgroundTexture);
  app.stage.addChild(backgroundSprite)
 
  backgroundSprite.width = app.view.width;
  backgroundSprite.height = app.view.height;

  // Center the background on the screen
  backgroundSprite.x = (app.view.width - backgroundSprite.width) / 2;
  backgroundSprite.y = (app.view.height - backgroundSprite.height) / 2;
  
  
  //Creating Door Open texture
  const doorOpenTexture=PIXI.Texture.from('./images/doorOpen.png')
  //Creating Adding door
  const doorCloseTexture=PIXI.Texture.from('./images/door.png')

  let doorSprite=new PIXI.Sprite(doorCloseTexture);
  app.stage.addChild(doorSprite)
  
  doorSprite.width = backgroundSprite.width/3;
  doorSprite.height = backgroundSprite.height/1.5;
  doorSprite.x = (app.view.width - doorSprite.width) / 2;
  doorSprite.y = (app.view.height - doorSprite.height) / 2;


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


  
  
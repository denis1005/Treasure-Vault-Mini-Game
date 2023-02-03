let playerMoves = [];
let clicksClockwise = 0;
let clicksCounterClockwise = 0;
let EnterCounter = 0
let isOpen = false;
let seconds = 0;
let minutes = 0;

let blinkTicker=new PIXI.Ticker()

// Initial setup
const Application = PIXI.Application;
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true,
});
document.body.appendChild(app.view);


let secret = generateSecret();
console.log("The secret combination is:", secret);

// Adding and positioning background
const backgroundTexture = PIXI.Texture.from('./images/bg.png');
const backgroundSprite = new PIXI.Sprite(backgroundTexture);
app.stage.addChild(backgroundSprite);
backgroundSprite.width = app.view.width;
backgroundSprite.height = app.view.height;
backgroundSprite.x = (app.view.width - backgroundSprite.width) / 2;
backgroundSprite.y = (app.view.height - backgroundSprite.height) / 2;


//Adding Door Open/Close 
const doorOpenTexture = PIXI.Texture.from('./images/doorOpen.png');
const doorCloseTexture = PIXI.Texture.from('./images/door.png');
let doorSprite = new PIXI.Sprite(doorCloseTexture);
app.stage.addChild(doorSprite);
doorSprite.width = backgroundSprite.width / 3;
doorSprite.height = backgroundSprite.height / 1.5;
doorSprite.x = (app.view.width - doorSprite.width) / 2;
doorSprite.y = (app.view.height - doorSprite.height) / 2;


// Adding handle shadow
const handleShadowTexture = PIXI.Texture.from('./images/handleShadow.png');
const handleShadowSprite = new PIXI.Sprite(handleShadowTexture);
app.stage.addChild(handleShadowSprite);
handleShadowSprite.width = doorSprite.width / 3;
handleShadowSprite.height = doorSprite.height / 3;
handleShadowSprite.x = (app.view.width - handleShadowSprite.width+10) / 1.83;
handleShadowSprite.y = (app.view.height - handleShadowSprite.height+10) / 1.59;
handleShadowSprite.interactive = true;
handleShadowSprite.anchor.set(0.5);



// Adding handle
const handleTexture = PIXI.Texture.from('./images/handle.png');
const handleSprite = new PIXI.Sprite(handleTexture);
app.stage.addChild(handleSprite);
handleSprite.width = doorSprite.width / 3;
handleSprite.height = doorSprite.height / 3;
handleSprite.x = (app.view.width - handleSprite.width) / 1.83;
handleSprite.y = (app.view.height - handleSprite.height) / 1.59;
handleSprite.interactive = true;
handleSprite.anchor.set(0.5);


//Adding and positioning blinks
const blinkTexture = PIXI.Texture.from('./images/blink.png');
const fistBlink = new PIXI.Sprite(blinkTexture);
const secondBlink = new PIXI.Sprite(blinkTexture);
const thirdBlink = new PIXI.Sprite(blinkTexture);
fistBlink.height = 150;
fistBlink.width = 150;
fistBlink.position.x = (app.view.width - 2 * fistBlink.width) / 2;
fistBlink.position.y = (app.view.height - fistBlink.height) / 2;
secondBlink.height = 150;
secondBlink.width = 150;
secondBlink.position.x = (app.view.width - 1.5 * secondBlink.width) / 2;
secondBlink.position.y = (app.view.height) / 2;
thirdBlink.height = 100;
thirdBlink.width = 100;
thirdBlink.position.x = (app.view.width) / 2;
thirdBlink.position.y = (app.view.height) / 2;


// Keys functionality 
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft") {
    if (clicksCounterClockwise < 9) {
      handleSprite.rotation += 0.6;
      handleShadowSprite.rotation+= 0.6;
      clicksCounterClockwise++;
    } else {
      clicksCounterClockwise = 0;
      RotateWheel()
    }

  }
  if (event.code === "ArrowRight") {

    if (clicksClockwise < 9) {
      handleSprite.rotation -= 0.6;
      handleShadowSprite.rotation-= 0.6;
      clicksClockwise++;
    } else {
      clicksClockwise = 0;
      RotateWheel()
    }


  }
  if (event.code === "Enter") {
    checkPlayerMoves()
    clearHandleRotation()
    console.log(playerMoves);
    EnterCounter++
    if (playerMoves.length == 3) {
      if (arraysEqual(playerMoves, secret)) {
        console.log('Success!!!')
        OpenSafe()
        setTimeout(()=>{
          clearGame()
          closeSafe()
        },5000)
      } else {
        clearGame()
      }
    }

  }


});


// Adding timer
const timerText = new PIXI.Text("0:00", {
  fontSize: 32,
  fill: 0xFF0000
});
timerText.x = app.screen.width / 3.42
timerText.y = app.screen.height / 2.28
timerText.width = 40
timerText.height = 20
app.stage.addChild(timerText);
const updateTimer = (delta) => {
  seconds += delta;

  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }

  const formattedSeconds = seconds < 10 ? `0${Math.floor(seconds)}` : Math.floor(seconds);
  timerText.text = `${minutes}:${formattedSeconds}`;
};
app.ticker.add(updateTimer);


function generateSecret() {
  let secret = [];
  for (let i = 0; i < 3; i++) {
    let number = Math.floor(Math.random() * 9) + 1;
    let direction = Math.random() < 0.5 ? "clockwise" : "counterclockwise";
    secret.push({ number, direction });
  }
  return secret;
}

function RotateWheel() {
  let ticker = PIXI.Ticker.shared;

  ticker.add((delta) => {
    handleShadowSprite.rotation+= delta;
    handleSprite.rotation += delta;
    setTimeout(() => {
      handleSprite.rotation=0;
      handleShadowSprite.rotation=0;
      ticker.stop();


    }, 300)
  });
}

function clearGame() {
  seconds = 0;
  minutes = 0;
  playerMoves = [];
  EnterCounter = 0;
  secret = generateSecret()
  console.clear()
  console.log("The secret combination is:", secret);
  RotateWheel()

}

function OpenSafe() {

  // Positioning Door Open
  doorSprite.texture = doorOpenTexture
  doorSprite.width = doorSprite.width/1.8;
  doorSprite.height =doorSprite.height;
  doorSprite.x = (app.view.width - doorSprite.width) - 270;
  doorSprite.y = (app.view.height - doorSprite.height) - 130;
  app.stage.removeChild(handleSprite);
  app.stage.removeChild(handleShadowSprite);
  blinkerAnimation();
  app.ticker.remove(updateTimer);
  
    
}

function closeSafe(){
  doorSprite.texture=doorCloseTexture;
  doorSprite.width = backgroundSprite.width / 3;
  doorSprite.height = backgroundSprite.height / 1.5;
  doorSprite.x = (app.view.width - doorSprite.width) / 2;
  doorSprite.y = (app.view.height - doorSprite.height) / 2;
  app.stage.addChild(handleShadowSprite);
  app.stage.addChild(handleSprite);
  app.stage.removeChild(fistBlink, secondBlink, thirdBlink);
  app.ticker.add(updateTimer);
  blinkTicker.stop();
}

function checkPlayerMoves() {
  if (clicksClockwise > 0 && clicksCounterClockwise == 0) {
    playerMoves.push({ number: clicksClockwise, direction: 'clockwise' })

  } else if (clicksCounterClockwise > 0 && clicksClockwise == 0) {
    playerMoves.push({ number: clicksCounterClockwise, direction: 'counterclockwise' })
  } else if (clicksClockwise > 0 && clicksCounterClockwise > 0) {
    if (clicksClockwise - clicksCounterClockwise > 0) {
      playerMoves.push({ number: clicksClockwise - clicksCounterClockwise, direction: 'clockwise' })
    } else {
      playerMoves.push({ number: clicksCounterClockwise - clicksClockwise, direction: 'counterclockwise' })
    }
  }
}

function clearHandleRotation() {
  handleSprite.rotation = 0;
  handleShadowSprite.rotation = 0;
  clicksClockwise = 0;
  clicksCounterClockwise = 0;
}

function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function blinkerAnimation() {
  app.stage.addChild(fistBlink, secondBlink, thirdBlink);
  let timer1 = 0, timer2 = 0, timer3 = 0;
  let duration1 = Math.random() * 5 + 2, duration2 = Math.random() * 5 + 2, duration3 = Math.random() * 5 + 2;

  blinkTicker.add((delta) => {
    timer1 += delta;
    timer2 += delta;
    timer3 += delta;

    if (timer1 > duration1) {
      timer1 = 0;
      duration1 = Math.random() * 5 + 2;

      if (Math.random() > 0.5) {
        app.stage.addChild(fistBlink);
      } else {
        app.stage.removeChild(fistBlink);
      }
    }

    if (timer2 > duration2) {
      timer2 = 0;
      duration2 = Math.random() * 5 + 2;

      if (Math.random() > 0.5) {
        app.stage.addChild(secondBlink);
      } else {
        app.stage.removeChild(secondBlink);
      }
    }

    if (timer3 > duration3) {
      timer3 = 0;
      duration3 = Math.random() * 5 + 2;

      if (Math.random() > 0.5) {
        app.stage.addChild(thirdBlink);
      } else {
        app.stage.removeChild(thirdBlink);
      }
    }
  });
  blinkTicker.start();
}

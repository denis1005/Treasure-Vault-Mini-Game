
  const Application= PIXI.Application;
  const app=new Application({
     width:window.innerWidth,
     height:window.innerHeight,
     transparent:true,
  })

  document.body.appendChild(app.view)
  
  
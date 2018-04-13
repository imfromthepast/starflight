// DRAW SHIPS

//  /$$$$$$             /$$                                     /$$               /$$
// |_  $$_/            | $$                                    | $$              | $$
//   | $$   /$$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$   /$$$$$$$ /$$$$$$    /$$$$$$ | $$
//   | $$  | $$__  $$|_  $$_/   /$$__  $$ /$$__  $$ /$$_____/|_  $$_/   /$$__  $$| $$
//   | $$  | $$  \ $$  | $$    | $$$$$$$$| $$  \__/|  $$$$$$   | $$    | $$$$$$$$| $$
//   | $$  | $$  | $$  | $$ /$$| $$_____/| $$       \____  $$  | $$ /$$| $$_____/| $$
//  /$$$$$$| $$  | $$  |  $$$$/|  $$$$$$$| $$       /$$$$$$$/  |  $$$$/|  $$$$$$$| $$
// |______/|__/  |__/   \___/   \_______/|__/      |_______/    \___/   \_______/|__/


function drawShip(options){
	var shipCont = new Container(),
		shipShape = new Shape(),
		baseColor = options.color!=null?options.color:'#555',
		lightColor = options.color!=null?options.color:'#888',
		darkColor = options.color!=null?options.color:'#333',
		hullY = 0			

	if(ship.missileClass>0 && options.drawWeapons){
		shipShape.graphics.beginFill('grey').dc(20,95,5).dc(80,95,5).ef()
		if(ship.weaponsArmed)shipShape.graphics.beginFill('red').dr(15,85+hullY,3,8).dr(82,85,3,8).ef()
	}
	shipShape.graphics
		.beginFill(baseColor)
		.beginStroke(darkColor)
		// left engine
		.rr(20,90+hullY,15,40,5)
		.beginFill(darkColor)
		.rr(23,93+hullY,9,34,3)
		// right engine
		.beginFill(baseColor)
		.rr(65,90+hullY,15,40,5)
		.beginFill(darkColor)
		.rr(68,93+hullY,9,34,3)
		// hull
		.beginFill(baseColor)
		.dr(30,80+hullY,40,20)
		// neck
		.beginFill(darkColor)
		.dr(45,30,10,50+hullY)
		// wings
		.beginFill(baseColor)
		.es()
		.mt(50,30)
		.lt(25,30)
		.lt(25,27)
		.lt(40,15)
		.lt(60,15)
		.lt(75,27)
		.lt(75,30)
		// bridge
		.s(darkColor).ss(0.5)
		.beginRadialGradientFill([lightColor,baseColor], [0, 1], 50, 20, 0, 50, 20, 15)
		.dc(50,20,15).ef()
		.beginFill(darkColor)
		.mt(40,20)
		.qt(40,10,50,10)
		.qt(60,10,60,20)
		.lt(55,20)
		.qt(55,15,50,15)
		.qt(45,15,45,20)
		.lt(40,20)
		.ef()
		.es()
	var details = new Shape()
	details.graphics
		.s(darkColor).ss(0.25)
		.dc(50,20,7)
		.dc(50,20,13)

		

	if(ship.laserClass>0 && options.drawWeapons){
		shipShape.graphics.beginFill('grey').dc(50,92,5).ef()
		if(ship.weaponsArmed)shipShape.graphics.beginFill('red').dr(45,83+hullY,3,8).dr(52,83,3,8).ef()
	}
	if(ship.plasmaClass>0 && options.drawWeapons){
		shipShape.graphics.beginFill('grey').dc(50,25,5).ef()
		if(ship.weaponsArmed)shipShape.graphics.beginFill('red').dr(48,15,4,10).ef()
	}
	var engineFlare = new Shape()
	engineFlare.name='engineFlare'
	//if(ship.enginesOn)shipShape.graphics
	engineFlare.graphics.beginLinearGradientFill(['white','purple','rgba(0,0,0,0)'], [0,0.25,1], 0, 130, 0, 160)
		.de(20,130,15,40)
		.de(65,130,15,40)
		.ef()

	if(ship.shieldsUp && options.drawShields && ship.shieldClass>0){
		var shieldCoords = [50,-10,90,-10,90,80,90,160,50,160,10,160,10,80,10,-10,50,-10]
		shipShape.graphics
			.beginStroke('red')
			.ss(!options.animateShields?5:ship.shieldsVal<20?1:Math.round(ship.shieldsVal/20))
			.mt(50,-10)
			.qt(90,-10,90,80)
			.qt(90,160,50,160)
			.qt(10,160,10,80)
			.qt(10,-10,50,-10)
			.es()
	}

	var x,y
	if(options.drawPods){
		for (var i = 0; i < ship.cargoPods; i++) {
			if(isEven(i)){
				x = 40
				y = i*3+35
			}else{
				x = 55
			}	
			shipShape.graphics.beginFill('grey').dr(x,y,5,5)
			if(!isEven(i))
				shipShape.graphics.beginFill('grey').dr(x-2,y+2,2,1)
			else			
				shipShape.graphics.beginFill('grey').dr(x+5,y+2,2,1)			
		}
		for (var i = 0; i < ship.blastoPods; i++) {
			if(isEven(i)){
				x = 40
				y = i*3+65
			}else{
				x = 55
			}	
			shipShape.graphics.beginFill('white').dr(x,y,5,5)						
		}
		for (var i = 0; i < ship.jumpPods; i++) {
			if(isEven(i)){
				x = 40
				y = i*3+75
			}else{
				x = 55
			}	
			shipShape.graphics.beginFill(blue).dr(x,y,5,5)						
		}
	}
	engineFlare.visible = ship.enginesOn
	shipCont.addChild(shipShape,details,engineFlare)

	//for (var i = 0; i < 8; i++) {
		var line = new Shape()
		line.regX = 50
		line.regY = 20
		line.graphics
			.mt(43,20)
			.lt(35,20)
			.es()
		line.rotation = 90//45*i
		shipCont.addChild(line)
	//}

	shipCont.scaleX = options.scale
	shipCont.scaleY = options.scale
	return shipCont
}

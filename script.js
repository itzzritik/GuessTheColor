var newGame,hard,easy,head,options,livesreplay,ease,color,correct,replayImg,replayEvent,playEvent;
var header,hText,palette,play,rgbKey,paletteKey,cardSize,hBackup,answer,life;

function onResize(){
	document.body.style.height = window.innerHeight + "px";
	setPaletteSize();
}
function generateCol(darkAsWell){
	var limit=255,modify=100;
	var r=Math.floor(Math.random()*limit);
	var g=Math.floor(Math.random()*limit);
	var b=Math.floor(Math.random()*limit);
	var space="\xa0\xa0\xa0";
	if(darkAsWell===-1){
		return [[r,g,b],"RGB("+r+", "+g+", "+b+")","RGB("+(r-modify)+", "+(g-modify)+", "+(b-modify)+")"];
	}
	if(darkAsWell===true){
		return["RGB("+r+", "+g+", "+b+")","RGB("+(r-modify)+", "+(g-modify)+", "+(b-modify)+")"];
	}
	return "RGB("+r+", "+g+", "+b+")";
}
function setColor(item,col,back){
	if(back){document.querySelector(item).style.backgroundColor=col;}
	else{document.querySelector(item).style.color=col;}
}
function addMouseEvent(item){
	item.addEventListener("mouseover",function(){
		this.style.background = color[0];
		this.style.color = '#fff';
	});
	item.addEventListener("mouseleave",function(){
		this.style.background = '#fff';
		this.style.color = color[0];
		if(ease==easy && this.getAttribute("class")!="newText"){
			ease.style.background = color[0];
			ease.style.color = '#fff';
		}
		else if(ease==hard && this.getAttribute("class")!="newText"){
			ease.style.background = color[0];
			ease.style.color = '#fff';
		}
	});
	item.addEventListener("mousedown",function(){
		this.style.background = color[1];
	});
	item.addEventListener("mouseup",function(){
		this.style.background = color[0];
	});
	item.addEventListener("click",function(){
		if(this.getAttribute("class")!="newText"){
			if(this.getAttribute("class")=="easy"){
				setEasy();
			}
			else if(this.getAttribute("class")=="hard"){
				setHard();
			}
		}
		else{
			newGame.style.pointerEvents='none';
			new_Game(1500);
		}
	});
}
function setEasy(){
	ease=easy;
	easy.style.background = color[1];hard.style.background = "#fff";
	easy.style.color = '#fff';hard.style.color = color[1];
	setLives(3);
}
function setHard(){
	ease=hard;
	hard.style.background = color[1];easy.style.background = "#fff";
	hard.style.color = '#fff';easy.style.color = color[1];
	setLives(2);
}
function setLives(num){
	life=num;
	lives.innerHTML="";
	for(var i=0;i<life;i++)
	{
		lives.innerHTML+="<i class='fas fa-heart'></i> ";
	}
}
function cardClick(){
	easy.style.pointerEvents='none';
	hard.style.pointerEvents='none';
	if(this.style.backgroundColor != answer.toLowerCase()){
		setLives(--life);
		this.classList.add('fade_item');
		this.style.borderRadius = '0px';
		this.removeEventListener('click',cardClick);
		if(life==0){
			gameOver(this);
		}
	}
	else{
		gameOver(this);
	}
}
function setPaletteSize(){
	for(var i=0;i<options.length;i++){
		options[i].classList.remove('fade_itemC');
		options[i].classList.remove('fade_item');
	}
	var gSize=window.innerHeight-260;
	cardSize=Math.min(window.innerWidth,gSize);
	palette.style.height = cardSize+'px';
	palette.style.width = cardSize+'px';
	for(var i=0;i<options.length;i++)
	{
		options[i].style.width = (cardSize*0.28)+'px';
		options[i].style.height = (cardSize*0.28)+'px';
		options[i].style.border = (cardSize*0.008)+'px solid #000';
		options[i].style.margin = (cardSize*0.01866)+'px';
		options[i].style.borderRadius = (cardSize*0.057)+'px';
	}
}
function newPalette(){
	setPaletteSize();
	correct=Math.round(Math.random()*5);
	answer = generateCol(-1);
	options[correct].style.border = (cardSize*0.008)+'px solid '+answer[2];
	document.querySelector('.hPane .current .r').innerHTML=answer[0][0];
	document.querySelector('.hPane .current .g').innerHTML=answer[0][1];
	document.querySelector('.hPane .current .b').innerHTML=answer[0][2];
	answer=answer[1];
	for(var i=0;i<options.length;i++)
	{
		if(i!=correct){
			var tempCol=generateCol(true);
			options[i].style.backgroundColor = tempCol[0];
			options[i].style.border = (cardSize*0.008)+'px solid '+tempCol[1];
		}
		else{
			options[i].style.backgroundColor = answer;
		}
		options[i].addEventListener("click",cardClick);
	}
}
function new_Game(timeOut){
	setLives((ease==easy)?3:2);
	newPalette();
	for(var i=0;i<options.length;i++){
		options[i].style.pointerEvents='none';
	}
	rgbKey=window.setInterval(function(){
		var tempColor=generateCol(-1)[0];
		document.querySelector('.hPane .current .r').innerHTML=tempColor[0];
		document.querySelector('.hPane .current .g').innerHTML=tempColor[1];
		document.querySelector('.hPane .current .b').innerHTML=tempColor[2];
	}, 90);
	paletteKey=window.setInterval(function(){
		for(var i=0;i<options.length;i++)
		{
			options[i].style.backgroundColor = generateCol(false);
		}
	}, 90);
	setTimeout(function() {
		clearInterval(rgbKey);
		clearInterval(paletteKey);
		newPalette();
		for(var i=0;i<options.length;i++){
			options[i].style.pointerEvents='all';
		}
		newGame.style.pointerEvents='all';
		easy.style.pointerEvents='all';
		hard.style.pointerEvents='all';
	}, timeOut);
}
function gameOver(item){
	for(var i=0;i<options.length;i++){
		options[i].classList.add('fade_itemC');
		if(life==0 && options[i]==item){options[i].style.borderRadius = '0px';}
		else{options[i].style.borderRadius = (cardSize)+'px';}
	}
	if(life==0){setColor('.hPane',"#555",true);}
	else{setColor('.hPane',answer,true);}
	document.querySelector('.controls').style.height = '0';
	document.querySelector('.controls').style.transition = '1.2s cubic-bezier(0.86, 0, 0.07, 1)';

	header.style.transition = '1.8s cubic-bezier(0.86, 0, 0.07, 1)';
	header.style.paddingTop = '0px';
	header.style.height = window.innerHeight+"px";
	replayEvent=1;

	setTimeout(function() {
		document.querySelector('.hPane .first').innerHTML = 'YOU WON';
		document.querySelector('.hPane .last').innerHTML = 'CONGRATULATIONS';
		if(life==0)
		{
			document.querySelector('.hPane .first').innerHTML = 'GAME OVER';
			document.querySelector('.hPane .last').innerHTML = 'NO MORE LIVES';
		}
	}, 100);
	setTimeout(function() {
		replayImg.style.width = '60px';
		replayImg.style.height = '60px';
		replayImg.style.transition = '0.3s ease'; 
		replay.style.pointerEvents='all';
		replay.style.opacity = '1';
	}, 1800);

	document.querySelector('.hCenter').style.transition = '1.8s cubic-bezier(0.86, 0, 0.07, 1)'; 
	document.querySelector('.hCenter').style.transform = 'translateY(-110px)';
}
function init(){
	playEvent=1;
	document.querySelector('.hCenter').style.transform = 'translateY(-20px)';
	hBackup=head.style.fontSize;
	first.style.fontSize = '60px';
	first.style.fontWeight = 'bold';
	last.style.fontSize = '40px';
	head.style.fontSize = '0px';
	header.style.height = window.innerHeight+'px';
	header.classList.add('splash');
	rgbKey=window.setInterval(function(){
		var color=generateCol(-1)[0];
		document.querySelector('.hPane .current .r').innerHTML=color[0];
		document.querySelector('.hPane .current .g').innerHTML=color[1];
		document.querySelector('.hPane .current .b').innerHTML=color[2];
	}, 80);
	setTimeout(function() {
		document.querySelector('.hCenter').style.transition = '1.8s cubic-bezier(0.86, 0, 0.07, 1)'; 
		document.querySelector('.hCenter').style.transform = 'translateY(-110px)';
		setTimeout(function() {
			head.style.transition = '0.3s ease'; 
			first.style.transition = '0.3s ease';
			last.style.transition = '0.3s ease';

			head.style.fontSize = hBackup;
			first.style.fontSize = '28px';
			first.style.fontWeight = 'normal';
			last.style.fontSize = '28px';
		}, 800);
		setTimeout(function() {
			document.querySelector('.hPane .play img').classList.add('img_grow');
			play.style.pointerEvents='all';
			play.addEventListener('mouseover',function(){
				if(playEvent==1){
					document.querySelector('.hPane .play img').style.width = '45px';
					document.querySelector('.hPane .play img').style.height = '45px';
				}
			});
			play.addEventListener('mouseleave',function(){
				if(playEvent==1){
					document.querySelector('.hPane .play img').style.width = '60px';
					document.querySelector('.hPane .play img').style.height = '60px';
				}
			});
			play.addEventListener('click',function(){
				playEvent=0;
				play.style.opacity = '0';
				document.querySelector('.hPane .play img').style.width = '0';
				document.querySelector('.hPane .play img').style.height = '0';
				setTimeout(function() {play.style.display='none';}, 300);
				document.querySelector('.hCenter').style.transform = 'translateY(0px)';
				header.style.transition = '1.8s cubic-bezier(0.86, 0, 0.07, 1)';
				header.style.height='200px';
				clearInterval(rgbKey);
				newPalette();
				newGame.style.pointerEvents='all';
			});
		}, 1500);
	}, 1000);
}
function main(){
	newGame=document.querySelector(".controls .newText");
	hard=document.querySelector(".controls .hard");
	easy=document.querySelector(".controls .easy");
	header=document.querySelector('.hPane');
	first=document.querySelector('.hPane .first');
	last=document.querySelector('.hPane .last');
	head=document.querySelector('.hPane .current');
	palette=document.querySelector('.palette');
	options=document.querySelectorAll(".palette .item");
	lives=document.querySelector('.lives');
	replay=document.querySelector('.replay');
	replayImg=document.querySelector('.replay img');
	play=document.querySelector('.hPane .play');

	ease=easy;
	setLives(3);
	color = generateCol(true);

	addMouseEvent(newGame);
	addMouseEvent(hard);
	addMouseEvent(easy);
	setLives(life);

	setColor('.hPane',color[0],true);
	setColor('.controls .contain .newGame',color[0],false);
	setColor('.controls .contain .hard',color[0],false);
	setColor('.lives',color[0],false);

	easy.style.background = color[0];
	easy.style.color = '#fff';

	init();
	onResize();
	replay.addEventListener('click',function(){
		replayEvent=0;
		replayImg.style.width = '0';
		replayImg.style.height = '0';
		replay.style.opacity = '0';
		replay.style.pointerEvents='none';
		newGame.style.pointerEvents='none';
		setLives((ease==easy)?3:2);
		new_Game(3500);
		easy.style.pointerEvents='all';
		hard.style.pointerEvents='all';

		setTimeout(function() {
			setColor('.hPane',color[0],true);
			document.querySelector('.controls').style.height = '20px';
			document.querySelector('.hCenter').style.transform = 'translateY(0px)';
			header.style.transition = '1.8s cubic-bezier(0.86, 0, 0.07, 1)';
			header.style.height='200px';
			setTimeout(function() {
				document.querySelector('.hPane .first').innerHTML = 'THE GREAT';
				document.querySelector('.hPane .last').innerHTML = 'GUESSING GAME';
			}, 800);
			setPaletteSize();
			newPalette();
		}, 1000);
	});
	replay.addEventListener('mouseover',function(){
		if(replayEvent===1){
			replayImg.style.width = '45px';
			replayImg.style.height = '45px';
		}
	});
	replay.addEventListener('mouseleave',function(){
		if(replayEvent===1){
			replayImg.style.width = '60px';
			replayImg.style.height = '60px';
		}
	});
}
main();
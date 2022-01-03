window.onload = init;

function init(){
	
	var xhr = new XMLHttpRequest();
	var streamJSON = '../sc/streamcontrol.json';
	var scObj;
	var startup = true;
	var animated = false;
	var cBust = 0;
	var game;
	var p1Wrap = $('#p1Wrapper');
	var p2Wrap = $('#p2Wrapper');
	var rdResize = $('#round');
	
	xhr.overrideMimeType('application/json');
	
	function pollJSON(){
		xhr.open('GET',streamJSON+'?v='+cBust,true);
		xhr.send();
		cBust++;
	}
	
	pollJSON();
	setInterval(function(){pollJSON();},500);
	
	xhr.onreadystatechange = parseJSON;
	
	function parseJSON(){
		if(xhr.readyState === 4){
			scObj = JSON.parse(xhr.responseText);
			if(animated == true){
				scoreboard();
			}
		}
	}
		
	function scoreboard(){
		
		
		if(startup == true){
			//I do want to implement game specific overlay support at some point
			/*game = scObj['game'];
			
			if(game == 'BBTAG' || game == 'SFVAE' || game == 'TEKKEN7' || game == 'UNIST'){
				$('#scoreboardVid').attr('src','../webm/scoreboard_1.webm');
			}
			else if(game == 'BBCF' || game == 'DBFZ' || game == 'GGXRD' || game == 'KOFXIV' || game == 'MVCI' || game == 'UMVC3'){
				$('#scoreboardVid').attr('src','../webm/scoreboard_2.webm'); //changes webm to 2nd one if appropriate game is picked
				TweenMax.set('#leftWrapper',{css:{y: adjust2}}); //sets scoreboard text wrappers to match placement of 2nd webm
				TweenMax.set('#rightWrapper',{css:{y: adjust2}});
			}
			else if(game == 'USF4'){
				$('#scoreboardVid').attr('src','../webm/scoreboard_3.webm');
				TweenMax.set('#leftWrapper',{css:{y: adjust3}});
				TweenMax.set('#rightWrapper',{css:{y: adjust3}});
			}
			else{				
				$('#scoreboardVid').attr('src','../webm/scoreboard_2.webm');
				TweenMax.set('#leftWrapper',{css:{y: adjust2}}); //if 'game' value is anything other than specified above it defaults to 2nd webm/placement
				TweenMax.set('#rightWrapper',{css:{y: adjust2}});
			$('#gameHold').html(game);
			}*/
			//``$('#scoreboardVid').attr('src','../webm/scoreboard_1.webm');
			document.getElementById('scoreboardVid').play(); //what will happen if I try to remove this line???
			getData();
			startup = false;
			animated = true;
			setTimeout(ticker,200);
			setTimeout(logoLoop, 200);
		}
		else{
			getData();
			
		}
		
	}
	setTimeout(scoreboard,300);
	
	function logoLoop() {
		var initialTime = 700; //initial fade-in time for first logo
		var intervalTime = 5000; //amount of time between changing of logos
		var fadeTime = 2000; //duration of crossfade between logos
		var currentItem = 0; //placement value within logoWrapper container of current logo being operated on in function
		var itemCount = $("#logoWrapper").children().length; //number of logo <img> objects located within logoWrapper container

		if (itemCount > 1) {
			$("#logoWrapper").find("img").eq(currentItem).fadeIn(initialTime);

			setInterval(function () {
				$("#logoWrapper").find("img").eq(currentItem).fadeOut(fadeTime);

				if (currentItem == itemCount - 1) {
					currentItem = 0;
				} else {
					currentItem++;
				}

				$("#logoWrapper").find("img").eq(currentItem).fadeIn(fadeTime);
			}, intervalTime);
		} else {
			$(".logos").fadeIn(initialTime);
		}
	}
	function ticker(){
		var ints = [scObj['int0'], scObj['int1'], scObj['int2'], scObj['int3']];
		
		var initialTime = 700; //initial fade-in time for first logo
		var intervalTime = 5000; //amount of time between changing of logos
		var fadeTime = 0.4; //duration of crossfade between logos (TweenMax value so needs to be in full seconds)
		var currentItem = 0; //placement value within logoWrapper container of current logo being operated on in function
		var itemCount = ints.length; //number of logo <img> objects located within logoWrapper container
		
		if(itemCount > 1){
			$('#ticker1').html(ints[0]);
			TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut});
			
			setInterval(function(){
				
				TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 0},ease:Quad.easeOut});
			
				setTimeout(function(){
					if(currentItem == itemCount - 1){
						currentItem = 0;
						ints[0] = scObj['int0']; // check int0 if it needs to be updated
					}
					else{
						var nextItem = currentItem+1; //what the next index in the array is
						var nextInt = 'int'+nextItem; //convert to a readable string for scObj check
						ints[currentItem+1] = scObj[nextInt]; //check and change the next variable
						currentItem++;
					}
					$('#ticker1').html(ints[currentItem]);
					
				
				}, 200);
				
				TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:fadeTime});
				
				
				
			},intervalTime);
		}
		else{
			$('#ticker1').html(ints[0]);
			TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut});
		}
	}
	
	function getData(){
		if (scObj['p1Loser'] == 1) {
			p1Name = scObj['p1Name'] + ' (L)';}
		else {
			p1Name = scObj['p1Name'];}
		if (scObj['p2Loser'] == 1) {
			p2Name = scObj['p2Name'] + ' (L)';}
		else {
			p2Name = scObj['p2Name'];}
		if (scObj['p1Team'] == '') {
			var p1Team = scObj['p1Team'];}
		else {
			var p1Team = scObj['p1Team'] + ' | ';}
		if (scObj['p2Team'] == '') {
			var p2Team = scObj['p2Team'];}
		else {
			var p2Team = scObj['p2Team'] + ' | ';}
		var p1Score = scObj['p1Score'];
		var p2Score = scObj['p2Score'];
		/*var p1Region = scObj['p1Region'];
		var p2Region = scObj['p2Region'];*/
		var round = scObj['round'];
		var comm1 = scObj['comm1'];
		var comm2 = scObj['comm2'];
		/*var int1 = scObj['int1'];
		var int2 = scObj['int2'];
		var int3 = scObj['int3'];
		var int4 = scObj['int4'];*/
		var comms = "Commentators: " + comm1 + " & " + comm2;
				
		if(startup == true){
			TweenMax.set('#p1Wrapper',{css:{x:p1Move}});
			TweenMax.set('#p2Wrapper',{css:{x:p2Move}});
			TweenMax.set('#round',{css:{y:rdMove}});
			$('#p1Name').html(p1Name);
			$('#p2Name').html(p2Name);
			$('#p1Team').html(p1Team);
			$('#p2Team').html(p2Team);
			$('#p1Score').html(p1Score);
			$('#p2Score').html(p2Score);
			$('#round').html(round);
			$('#comm1').html(comm1);
			$('#comm2').html(comm2);
			$('#comms').html(comms);
			/*$('#p1Region').attr('src', '../imgs/regions/'+p1Region+".png");
			$('#p2Region').attr('src', '../imgs/regions/'+p2Region+".png");*/
			
			p1Wrap.each(function(i, p1Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p1Wrap).css('font-size', newFontSize);
				}
			});
			
			p2Wrap.each(function(i, p2Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p2Wrap).css('font-size', newFontSize);
				}
			});
			
			rdResize.each(function(i, rdResize){
				while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
					var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
					$(rdResize).css('font-size', newFontSize);
				}
			});
			//First make the elements come in
			TweenMax.to('#p1NamePNG',nameTime,{css:{x:p1PNGMove,opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#p2NamePNG',nameTime,{css:{x:p2PNGMove,opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#roundPNG',rdTime,{css:{y:'+80px',opacity: 1},ease:Quad.easeOut,delay:rdDelay})
			TweenMax.to('#p1ScorePNG',scTime,{css:{x:p1SMove,opacity: 1},ease:Quad.easeOut,delay:sceDelay})
			TweenMax.to('#p2ScorePNG',scTime,{css:{x:p2SMove,opacity: 1},ease:Quad.easeOut,delay:sceDelay})
			//Then make the text come in
			TweenMax.to('#p1Wrapper',nameTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#p2Wrapper',nameTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('.scores',scTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:scDelay})
			TweenMax.to('#comms',nameTime,{css:{y:'-90px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#round',rdTime,{css:{y:'+0px', opacity: 1},ease:Quad.easeOut,delay:rdDelay})
			//TweenMax.to('.regions',rdTime,{css:{y:'+0px', opacity: 1},ease:Quad.easeOut,delay:rdDelay})
		}
		else{
			game = scObj['game'];
			
			if($('#p1Name').text() != p1Name || $('#p1Team').text() != p1Team){ //if either name or team do not match, fades out wrapper and updates them both
				TweenMax.to('#p1Wrapper',.3,{css:{x: p1Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ //uses onComplete parameter to execute function after TweenMax
					$('#p1Wrapper').css('font-size',nameSize); //restores default font size based on variable set in scoreboard.html
					$('#p1Name').html(p1Name); //updates name and team html objects with current json values
					$('#p1Team').html(p1Team);					
			
					p1Wrap.each(function(i, p1Wrap){//same resize functions from above
						while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p1Wrap).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#p1Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2}); //fades name wrapper back in while moving to original position
				}});
			}
			
			if($('#p2Name').text() != p2Name || $('#p2Team').text() != p2Team){
				TweenMax.to('#p2Wrapper',.3,{css:{x: p2Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Wrapper').css('font-size',nameSize);
					$('#p2Name').html(p2Name);
					$('#p2Team').html(p2Team);					
			
					p2Wrap.each(function(i, p2Wrap){
						while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p2Wrap).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#p2Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#round').text() != round){
				TweenMax.to('#round',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ //same format as changing names just no change in positioning, only fade in/out
					$('#round').css('font-size',rdSize);
					$('#round').html(round);					
			
					rdResize.each(function(i, rdResize){
						while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
							var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
							$(rdResize).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#round',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#comm1').text() != comm1){
				$('#comm1').html(comm1);
			}
				
			if($('#comm2').text() != comm2){
				$('#comm2').html(comm2);
			}
			
			if($('#comms').text() != comms){
				TweenMax.to('#comms',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#comms').html(comms);
					
					TweenMax.to('#comms',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			/*if($('#p1Region').attr('src') != '../imgs/regions/'+p1Region+".png"){ //just fade out, update image, fade back in
				TweenMax.to('#p1Region',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p1Region').attr('src', '../imgs/regions/'+p1Region+".png");
					TweenMax.to('#p1Region',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			if($('#p2Region').attr('src') != '../imgs/regions/'+p2Region+".png"){ //just fade out, update image, fade back in
				TweenMax.to('#p2Region',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Region').attr('src', '../imgs/regions/'+p2Region+".png");
					TweenMax.to('#p2Region',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}*/
			if($('#p1Score').text() != p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p1Score').html(p1Score);
					
					TweenMax.to('#p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#p2Score').text() != p2Score){
				TweenMax.to('#p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Score').html(p2Score);
					
					TweenMax.to('#p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
		}
		
	}
	
}
//TODO Needs serious cleanup!!!
main = function(player)
{
	var canvas = document.getElementById('maze');  
	var c = canvas.getContext('2d'); 
	var activeKeys = [];
	var maze,
		UP    = 1,
		LEFT  = 2,
		RIGHT = 3,
		DOWN  = 4;
	
	var players = [];
	var player = null;
	var opponents = [];
	var cellWidth = 20;
	var cellHeight = 20;
	
	this.setMaze = function(m){
		console.log('set maze ',m)
		maze = m
	}
	 
	this.setPlayer = function(p){
		console.log('add player ',p.cid);
		player = p;
	}
	
	this.setOpponents = function(op)
	{
		opponents = op;
	}
	
	this.removePlayer = function(p)
	{
		for (var j=0,jlen=players.length;j< jlen; j++)
		{
			if (p.cid == players[j].cid)
			{
				players.unshift(j,1);
				break;
			}
		}
	}
	
	/**
	 * starts the game assuming maze and players are known
	 */
	this.start = function(){
		
		console.log('start game')
		
		if (maze){
			console.log('render maze')
			drawMaze();
		}
		registerEvents();
		gameloop();		
	}
	
	registerEvents = function()
	{
		window.onkeydown = function(e)
		{		
			if (activeKeys.indexOf(e.keyCode) == -1)
			{
				activeKeys.push(e.keyCode);
			}	
		}	
		window.onkeyup = function(e)
		{
			if (activeKeys.indexOf(e.keyCode) != -1)
			{
				activeKeys.splice(activeKeys.indexOf(e.keyCode),1);
			}	
		}
	}
	var o = 0;
	var now = new Date().getTime();
	
	gameloop = function()
	{	
		c.fillStyle = "rgba(255, 255, 255, 1)";  
		c.fillRect (0, 0, canvas.width, canvas.height);
		
		var direction;
		
		if (new Date().getTime() - now > 100)
		{	
			direction = readInput();
						
			if( checkCollision(direction) ) {
				movePlayer(direction);
			
				if (direction)
				{
					ev.pub('game.onPlayerPositionUpdate',player);
				}
			}
			now = +new Date();
		}
		
		//colitiondedection();
		drawPlayers();
		
		setTimeout(function(){
			gameloop();			
		},40);
	}
	
	checkCollision = function( direction ) {
		// find player cell
		var cell_x = ~~(player.x / cellWidth),
			cell_y = ~~(player.y / cellHeight),
			current_cell,
			next_cell_x = ~~(player.x / cellWidth),
			next_cell_y = ~~(player.y / cellHeight),
			next_cell;
			
		// get next cell in direction
		switch(direction) {
			case LEFT:
				next_cell_x--;
				break;
			case RIGHT:
				next_cell_x++;
				break;
			case UP:
				next_cell_y--;
				break;
			case DOWN:
				next_cell_y++;
				break;
		}
		
		next_cell = maze[next_cell_y][next_cell_x];
		current_cell = maze[cell_y][cell_x];
		
		if(next_cell == "w" && direction == RIGHT) return true;
		if(next_cell == "n" && direction == DOWN) return true;
		if(current_cell == "w" && direction == LEFT) return true;
		if(current_cell == "n" && direction == UP) return true;
		
		return false;
	};
	
	movePlayer = function( direction ) {
		switch( direction ) {
			case LEFT:
				player.x -= cellWidth;
				break;
			case RIGHT:
				player.x += cellWidth;
				break;
			case UP:
				player.y -= cellHeight;
				break;
			case DOWN:
				player.y += cellHeight;
				break;
		}
	};
	
	readInput = function()
	{
		var i, direction;
		for (i = 0, len=activeKeys.length; i < len; i++)
		{
			switch (activeKeys[i])
			{
				case 37: //left
				direction = LEFT;
				break;
				case 38: //up
				direction = UP;
				break
				case 39: //right
				direction = RIGHT;
				break;
				case 40: //down
				direction = DOWN;
				break;
			}
		}
		
		return direction;
	}
	 

	playerGraphic = {w:cellWidth/2,h:cellHeight/2};
	
	
	drawMaze = function()
	{
        var container = document.getElementById("container"),
        height    = 20,
        width     = 20,
        render    = '',
        cell_height = 20,
        cell_width  = 20;

    if (!container) {
        throw "DOM Element with id '" + element_id + "' not found!";
    }

    console.log('render ',maze)
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            render += '<div class="cell open-' 
	    + maze[i][j] + '" style="top: ' 
	    + (i*cell_height) + 'px; left: ' 
	    + (j*cell_width) + 'px; height: ' 
	    + cell_height + 'px; width: ' 
	    + cell_width + 'px"></div>';
        }
    }

    container.innerHTML = render;
	}
	
	drawPlayers = function()
	{
		var i;
		for (i = 0, len=opponents.length; i < len; i++)
		{
			var p = opponents[i];
			c.fillStyle = p.color; 
			c.beginPath();
			c.arc(p.x, p.y, playerGraphic.w, 0, Math.PI*2, true); 
			c.closePath();
			c.fill();		
		}
	}
}
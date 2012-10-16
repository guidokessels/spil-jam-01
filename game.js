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
	
	initMaze = function()
	{
		maze = MazeGenerator.generate( 20,20 );
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
		c.fillStyle = "rgba(255, 255, 255, 0.3)";  
		c.fillRect (0, 0, canvas.width, canvas.height);
		
		var direction;
		
		if (new Date().getTime() - now > 100)
		{	
			direction = readInput();
			if( checkCollision(direction) ) {
				movePlayer(direction);
			}
			now = +new Date();
		}
		
		//colitiondedection();
		drawPlayers();
		
		setTimeout(function(){
			gameloop();			
		},20);
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
	
	drawPlayers = function()
	{
		var i;
		for (i = 0, len=players.length; i < len; i++)
		{
			var p = players[i];

			c.fillStyle = p.color; 
			c.beginPath();
			c.arc(p.x, p.y, playerGraphic.w, 0, Math.PI*2, true); 
			c.closePath();
			c.fill();		
		}
	}
	
	applyInput = function()
	{
	
	}
	
	initMaze();
	registerEvents();
	gameloop();

    this.getMaze = function() {
	return maze;
    }
}
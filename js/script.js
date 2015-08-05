$(document).ready(function(){
	$('.SlidingPuzzle').append($('<li>').addClass('EmptyTile Tile9'));
	
	var emptyTile = 9; // set 9th tile as empty tile by default.
	
	// Function to slide the Tiles.
	function slideTile(element){
		
		var dpr = 1;
	    if (isMobile.any()) {
	        dpr = window.devicePixelRatio;
	    }
	    
		var tileSize = $('li.Tile').outerWidth(true);
		
		var oldx = $('.SlidingPuzzle').children("li:nth-child(" + emptyTile + ")").position().left * dpr;
	    var oldy = $('.SlidingPuzzle').children("li:nth-child(" + emptyTile + ")").position().top * dpr;
	    var newx = $(element).position().left * dpr;
	    var newy = $(element).position().top * dpr;
	    
	    if (isSlidable(element)) {
	        
	        // Animate and slide clicked tile to the emptyTile position.
	        $(element).animate({ left: oldx, top: oldy }, 200, function(){
	            $('.SlidingPuzzle').children("li:nth-child(" + emptyTile + ")").css("left", newx);
	            $('.SlidingPuzzle').children("li:nth-child(" + emptyTile + ")").css("top", newy);
	        });
	    }
	    
	    function isSlidable(element) {
	
			var isSlidable = false;
			
			if (parseInt(oldx) == parseInt(newx) && parseInt(newy) == (parseInt(oldy) - tileSize)) { 
	    		
	    		// clicked tile is above the emptyTile and is slidable.
	        	isSlidable = true;
	    	} else if (parseInt(oldx) == parseInt(newx) && parseInt(newy) == (parseInt(oldy) + tileSize)) { 
	    		
	    		// clicked tile is below the emptyTile and is slidable
	        	isSlidable = true;
	    	} else if ((parseInt(oldx) - tileSize) == parseInt(newx) && parseInt(newy) == parseInt(oldy)) { 
	    		
	    		// clicked tile is in the left side of the emptyTile and is slidable.
	        	isSlidable = true;
	    	} else if ((parseInt(oldx) + tileSize) == parseInt(newx) && parseInt(newy) == parseInt(oldy)) { 
	    		
	    		// clicked tile is in the right side of the emptyTile and is slidable.
	        	isSlidable = true;
			}
			
			return isSlidable;
		}
	}
	
	// To initialize sliding puzzle. 
	function initSlidingPuzzle() {
		
		setTilePosition();
	
		// Attach click event to Tiles. 
		$('.SlidingPuzzle').children('li').click(function() { 
			slideTile(this); 
		});
	}
	
	// To position tiles.
	function setTilePosition() {
		var i=0,
			padding = $('.SlidingPuzzle').css('padding-left'),
			tileSize = $('li.Tile').outerWidth(true);
			
		$('ul.SlidingPuzzle > li').each(function (){
			$(this).css({
				left: (i % 3) * tileSize + parseInt(padding) - 1,
				top: Math.floor(i / 3) * tileSize + parseInt(padding) - 1
			});
			i++;
		});
	}
	
	// Reset tile positions on window resize.
	$( window ).resize(function() {
		setTilePosition();
	});
	
	// initialize the sliding puzzle.
	initSlidingPuzzle();
	
	// To check if a mobile device. 
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};
});

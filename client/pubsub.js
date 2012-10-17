game = {};
var subs = [];
var subsIndex = [];

game.sub = function(to,cb){
	
	var ci = subsIndex.indexOf(to);

	if (ci == -1){
		subsIndex.push(to);
		subs.push([]);
		ci = subsIndex.length-1;
		console.log('nee')
	}
	
	subs[ci].push({'to':to,'cb':cb});
}

game.pub = function(to,param){
	var triggerIndex = subsIndex.indexOf(to);
	
	if (triggerIndex == -1) return null;
	
	for (var i=0, len = subs[triggerIndex].length; i < len; i++)
	{
		subs[triggerIndex][i].cb(param);
	}
}

game.unsub = function(){
	
	//todo
}


//game.sub('test.a',function(e){
//	
//	console.log('monkey',e)
//});
//
//game.sub('test.a',function(e){
//	
//	console.log('monkey2',e)
//});
//
//game.sub('test.b',function(e){
//	
//	console.log('monkey3',e)
//});
//
//game.sub('test.b',function(e){
//	
//	console.log('monkey4',e)
//});
//
//game.sub('test.c',function(e){
//	
//	console.log('monkey5',e)
//});
//
//
//game.pub('test.a',{'data':'somedata'});
//console.log('---');
//game.pub('test.c',{'data':'somedata2'});
//console.log('---');
//game.pub('test.b',{'data':'somedata3'});
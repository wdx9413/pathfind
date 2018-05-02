/*
	1、起点加入open集合
	2、open集合中选最小值node，将其放入close集合中
	3、处理node，将邻居（非障碍且非close集合）加入到open集合中（如果已存在，且本次花费小于原节点则修改原节点，否则不）
	4、重复2
	结束条件：open集合为空，或者到达终点	
*/

var mapData = [
			[0,0,0,0,0],
			[0,0,1,0,0],
			[0,0,1,0,0],
			[0,0,1,0,0],
			[0,0,0,0,0]
		];
var start = [ 2, 0];
var end = [2, 4];
// global fields
var openList = [];
var closeList = [];
var maxX = 5;
var maxY = 5;
var gAdd = 10;
var hAdd = 10;
var endId;
class Tile{
	constructor(pId,id,gValue){
		this.pId = pId;
		this.id = id;
		this.gValue = gValue;
		var hValue = computeHValue(id);
		this.fValue = gValue+hValue?hValue:0;
	}
	change(pId,id,gValue,fValue){
		this.pId = pId;
		this.id = id;
		this.gValue = gValue;
		this.fValue = fValue;
	}
}
function aStarFinder(start,end,gridData){	
	var x0 = start[0];
	var y0 = start[1];
	var x1 = end[0];
	var y1 = end[1];
	if(gridData[x0][y0] == 1 || gridData[x1][y1] == 1){
		console.log('起点或终点不可行走');
		return;
	}
	var startTile = new Tile(-1,x0*maxY + y0,0);
	endId = x1*maxY+y1;
	closeList.push(startTile);
	pushOpen(startTile);
}

function findBestFValue(){
	if(openList.length<=0){
		console.log('无路径');
		return;
	} 
	var cost = openList[0].fValue;
	var index = 0;
	for(var i = 1; i < openList.length; i++){
		if(cost>openList[i]){
			index = i;
			cost = openList[i].fValue;
		}
	}
	var node = openList[index];
	openList.splice(index,1);
	closeList.push(node);
	pushOpen(node);
}
function pushOpen(tile){
	var id = tile.id;
	var x = Math.floor(id / maxY);
	var y = Math.floor(id % maxY);
	if(x-1>=0 && mapData[x-1][y] == 0 && !myIndexOf(closeList,id-5)){
		var aTile = myIndexOf(openList,id - 5);
		if(!aTile)
			openList.push(aTile = new Tile(id,id - 5,tile.gValue+gAdd));
		else{
			var gValue = tile.gValue + gAdd;
			var fValue = gValue + computeHValue(id-5);
			if(fValue < aTile.fValue){
				aTile.change(tile.id,id-5,gValue,fValue);
			}
		}	
		if(aTile.id == endId){
			console.log('over');
			printPath(aTile,[]);
			return;
		}
	}
	if(x+1<maxX && mapData[x+1][y] == 0 && !myIndexOf(closeList,id+5) ){
		var aTile = myIndexOf(openList,id+5);
		if(!aTile)
			openList.push(aTile = new Tile(id,id + 5,tile.gValue+gAdd));
		else{
			var gValue = tile.gValue + gAdd;
			var fValue = gValue + computeHValue(id+5);
			if(fValue < aTile.fValue){
				aTile.change(tile.id,id+5,gValue,fValue);
			}
		}
		if(aTile.id == endId){
			console.log('over');
			printPath(aTile,[]);
			return;
		}		
	}
	if(y-1>=0 && mapData[x][y-1] == 0 && !myIndexOf(closeList,id-1)){
		var aTile = myIndexOf(openList,id-1);
		if(!aTile)
			openList.push(aTile = new Tile(id,x,id - 1,tile.gValue+gAdd));
		else{
			var gValue = tile.gValue + gAdd;
			var fValue = gValue + computeHValue(id-1);
			if(fValue < aTile.fValue){
				aTile.change(tile.id,id-1,gValue,fValue);
			}
		}
		if(aTile.id == endId){
			console.log('over');
			printPath(aTile,[]);
			return;
		}
	}
	if(y+1<maxY && mapData[x][y+1] == 0 && !myIndexOf(closeList,id+1)){
		var aTile = myIndexOf(openList,id+1);
		if(!aTile)
			openList.push(aTile = new Tile(id,id + 1,tile.gValue+gAdd));
		else{
			var gValue = tile.gValue + gAdd;
			var fValue = gValue + computeHValue(id+1);
			if(fValue < aTile.fValue){
				aTile.change(tile.id,id+1,gValue,fValue);
			}
		}
		if(aTile.id == endId){
			console.log('over');
			printPath(aTile,[]);
			return;
		}
	}
	findBestFValue();
}
function myIndexOf(list,id){
	for(var i = 0; i < list.length; i++){
		if(list[i].id == id) return list[i];
	}
	return null;
}
function myIndexOf2(id){
	for(var i = 0; i < openList.length; i++){
		if(openList[i].id == id) return openList[i];
	}
	for(var i = 0; i < closeList.length; i++){
		if(closeList[i].id == id) return closeList[i];
	}
}
function computeHValue(id){
	var x0 = Math.floor(id / maxY);
	var y0 = id % maxY;
	var x1 = Math.floor(endId / maxY);
	var y1 = endId % maxY;
	var hValue = (Math.abs(x0-x1)+Math.abs(y0-y1))*hAdd;
	return hValue;
}
function printPath(tile,arr){
	var id = tile.id;
	arr.push([Math.floor(id/maxX),id%maxX]);
	if(tile.pId == -1){
		console.log(arr.reverse());
		return;	
	} 
	var aTile = myIndexOf2(tile.pId);
	printPath(aTile,arr);
}
aStarFinder(start,end,mapData);

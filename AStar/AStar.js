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
var start = {x : 2, y : 0};
var end = {x : 2, y : 4};
// global fields
var openList = [];
var closeList = [];
var maxX = 5;
var maxY = 5;
var gAdd = 10;
var hAdd = 10;
class Tile{
	constructor(pId,id,fValueValue){
		this.pId = pId;
		this.id = id;
		this.fValue = fValue;
	}
}
function aStarFinder(start,end,gridData){	
	var x0 = start.x;
	var y0 = start.y;
	var x1 = end.x;
	var y1 = end.y;
	if(gridData[x0][y0] == 1 || gridData[x1][y1] == 1){
		console.log('起点或终点不可行走');
		return;
	}
	var startTile = new Tile(,x0*maxY + y0,0);
	var endId = x1*maxY+y1;
	pushOpen(startTile,endId);
}

function findBestFValue(endId){
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
	pushOpen(openList[index],endId);
}
function pushOpen(tile,endId){
	var id = tile.id;
	var x = Math.floor(id / maxY);
	var y = id % maxY;
	if(x-1>=0 && mapData[x-1][y] == 0 && !myIndexOf(closeList,id-5)){
		var aTile = myIndexOf(openList,id - 5);
		if(!aTile)
			openList.push(aTile = new Tile(id,id - 5,computeFValue(tile.gValue + gAdd,id-5,endId)));
		else{
			var fValue = computeFValue(tile.gValue - gAdd,id - 5,endId);
			if(fValue < aTile.fValue){
				aTile.fValue = fValue;
				aTile.pId = id;
			}
		}	
		if(aTile.id == endId){
			console.log('终点到了',aTile);
			return;
		}
	}
	if(x+1<=maxX && mapData[x+1][y] == 0 && !myIndexOf(closeList,id+5)){
		var aTile = myIndexOf(openList,id+5);
		if(!aTile)
			openList.push(aTile = new Tile(id,id + 5,computeFValue(tile.gValue + gAdd,id+5,endId)));
		else{
			var fValue = computeFValue(tile.gValue - gAdd,id+5,endId);
			if(fValue < aTile.fValue){
				aTile.fValue = fValue;
				aTile.pId = id;
			}
		}
		if(aTile.id == endId){
			console.log('终点到了',aTile);
			return;
		}		
	}
	if(y-1>=0 && mapData[x][y-1] == 0 && !myIndexOf(closeList,id-1)){
		var aTile = myIndexOf(openList,id+1);
		if(!aTile)
			openList.push(aTile = new Tile(id,x,id - 1,computeFValue(tile.gValue + gAdd,id-1,endId)));
		else{
			var fValue = computeFValue(tile.gValue - gAdd,id-1,endId);
			if(fValue < aTile.fValue){
				aTile.fValue = fValue;
				aTile.pId = id;
			}
		}
		if(aTile.id == endId){
			console.log('终点到了',aTile);
			return;
		}
	}
	if(y+1<=maxY && mapData[x][y+1] == 0 && !myIndexOf(closeList,id+1)){
		var aTile = myIndexOf(openList,id+1);
		if(!aTile)
			openList.push(aTile = new Tile(id,id + 1,computeFValue(tile.gValue + gAdd,id+1,endId)));
		else{
			var fValue = computeFValue(tile.gValue + gAdd,id+1,endId);
			if(fValue < aTile.fValue){
				aTile.fValue = fValue;
				aTile.pId = id;
			}
		}
		if(aTile.id == endId){
			console.log('终点到了',aTile);
			return;
		}
	}
	findBestFValue(endId);
}
function myIndexOf(list,id){
	for(var i = 0; i < list.length; i++){
		if(list[i].id == id) return true;
	}
	return false;
}
function computeFValue(gValue,id,endId){
	var x0 = Math.floor(id / maxY);
	var y0 = id % maxY;
	var x1 = Math.floor(endId / maxY);
	var y1 = endId % maxY;
	var hValue = (Math.abs(x0-x1)+Math.abs(y0-y1))*hAdd;
	return gValue + hValue;
}
aStarFinder(start,end,mapData);
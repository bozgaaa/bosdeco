(function(){
	function run(){
		var g=function(id){
			return document.getElementById(id)
			},ttl=g("mmt"),btn=g("mmb"),menu=g("mm"),body=document.getElementsByTagName("body")[0],on=false,html,height;
			if(!btn||!menu||!body){
				return
			}
	function onclick(){
		on=!on;
		if(on){
			btn.className="on";menu.className="on";
			height=Math.max(window.innerHeight||document.documentElement.clientHeight,body.offsetHeight,menu.offsetHeight);
			menu.style.height=height+"px"
		} else {
			btn.className="";menu.className=""
		}
	}
	ttl.onclick=onclick;
	btn.onclick=onclick;
	menu.onclick=function(e){
		var target,parent;
		target=e?e.target:window.event.srcElement;
		target=target.nodeType===3?target.parentNode:target;
		if(target.tagName==="DIV"){
			parent=target.parentNode;
			parent.className=parent.className?"":"expanded"
		}
	}
}
var readyTimer=setInterval(function(){
	if(document.readyState==="complete"){
		run();
		clearInterval(readyTimer)
	}
},10)})();

(function(){function run(){var segments=[],innerBody=document.querySelector(".innerBody"),leaves=document.querySelectorAll(".mobile-leaf"),src,newBase,newLeaf,i,node,base,inTemplate,len,leaf,seg;for(i=0,len=leaves.length;i<len;i+=1){leaf=leaves[i];node=leaf.parentNode;inTemplate=true;base=null;while(node.tagName!=="BODY"){if(!base&&/mobile-base/.test(node.className)){base=node}if(inTemplate&&/holder/.test(node.className)){inTemplate=false}node=node.parentNode}segments.push({leaf:leaf,base:base,inTemplate:inTemplate,isCode:leaf.className.match("code"),isH1:leaf.className.match("text")&&leaf.querySelector(".textheading1"),isMenu:leaf.className.match("menuself")})}for(i=0,len=segments.length;i<len;i+=1){seg=segments[i];if(seg.inTemplate&&!seg.isH1&&!seg.isMenu&&!seg.isCode){newLeaf=document.createElement("DIV");newLeaf.setAttribute("class",seg.leaf.className);src=newLeaf;if(seg.base){newBase=document.createElement("DIV");newBase.setAttribute("class",seg.base.className);newBase.appendChild(newLeaf);src=newBase}seg.leaf.className+=" mobile-hide";src.className+=" mobile-show";innerBody.appendChild(src);seg.newLeaf=newLeaf}}function isMobile(){var width=window.innerWidth||document.documentElement.clientWidth;return width<=540}function move(){var mobile=isMobile();for(i=0,len=segments.length;i<len;i+=1){seg=segments[i];if(seg.newLeaf&&seg.leaf.children.length){if(mobile){addChildren(seg.newLeaf,seg.leaf.children)}else{addChildren(seg.leaf,seg.newLeaf.children)}}}}function addChildren(node,children){var child=children[0];while(child){node.appendChild(child);child=children[0]}}move();var timer;function timedMove(){clearTimeout(timer);timer=setTimeout(move,200)}if(window.addEventListener){window.addEventListener("resize",timedMove)}else if(window.attachEvent){window.attachEvent("onresize",timedMove)}}var readyTimer=setInterval(function(){if(document.readyState==="complete"){run();clearInterval(readyTimer)}},10)})();
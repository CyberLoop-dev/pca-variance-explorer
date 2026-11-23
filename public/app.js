import {parsePoints,computePCA} from "./pca.js";
const $=id=>document.getElementById(id),canvas=$("plot"),ctx=canvas.getContext("2d");
const sample="2, 1\n3, 2\n4, 2\n5, 4\n6, 4\n7, 5\n8, 6\n9, 7\n3, 3\n6, 5\n8, 8\n10, 8";
function draw(points,result){const w=canvas.width,h=canvas.height,pad=54;ctx.clearRect(0,0,w,h);ctx.fillStyle="#0b1727";ctx.fillRect(0,0,w,h);
const xs=points.map(p=>p.x),ys=points.map(p=>p.y),minX=Math.min(...xs)-1,maxX=Math.max(...xs)+1,minY=Math.min(...ys)-1,maxY=Math.max(...ys)+1;
const sx=x=>pad+(x-minX)/(maxX-minX||1)*(w-2*pad),sy=y=>h-pad-(y-minY)/(maxY-minY||1)*(h-2*pad);
ctx.strokeStyle="#20364a";ctx.lineWidth=1;for(let i=0;i<=5;i++){const x=pad+i*(w-2*pad)/5,y=pad+i*(h-2*pad)/5;ctx.beginPath();ctx.moveTo(x,pad);ctx.lineTo(x,h-pad);ctx.stroke();ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke();}
ctx.strokeStyle="#68859b";ctx.beginPath();ctx.moveTo(pad,h-pad);ctx.lineTo(w-pad,h-pad);ctx.moveTo(pad,pad);ctx.lineTo(pad,h-pad);ctx.stroke();
for(const p of points){ctx.beginPath();ctx.arc(sx(p.x),sy(p.y),5,0,Math.PI*2);ctx.fillStyle="#dbeafe";ctx.fill();}
const center={x:sx(result.mean.x),y:sy(result.mean.y)},scale=Math.min((w-2*pad)/(maxX-minX||1),(h-2*pad)/(maxY-minY||1))*1.3;
function arrow(vector,color,mult){const end={x:center.x+vector.x*Math.sqrt(result.eigenvalues[mult])*scale,y:center.y-vector.y*Math.sqrt(result.eigenvalues[mult])*scale};ctx.strokeStyle=color;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(center.x,center.y);ctx.lineTo(end.x,end.y);ctx.stroke();const a=Math.atan2(end.y-center.y,end.x-center.x);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(end.x,end.y);ctx.lineTo(end.x-12*Math.cos(a-.45),end.y-12*Math.sin(a-.45));ctx.lineTo(end.x-12*Math.cos(a+.45),end.y-12*Math.sin(a+.45));ctx.closePath();ctx.fill();ctx.font="bold 14px ui-monospace";ctx.fillText("PC"+(mult+1),end.x+8,end.y-8);}
arrow(result.components[0],"#fb7185",0);arrow(result.components[1],"#5eead4",1);
ctx.fillStyle="#93a8bb";ctx.font="12px ui-monospace";ctx.fillText("x",w-26,h-26);ctx.fillText("y",18,24);
}
function render(){try{const points=parsePoints($("data").value),result=computePCA(points);$("error").textContent="";$("count").textContent=points.length+" points";$("var1").textContent=result.variance[0].toFixed(1)+"%";$("var2").textContent=result.variance[1].toFixed(1)+"%";$("eig1").textContent=result.eigenvalues[0].toFixed(3);$("eig2").textContent=result.eigenvalues[1].toFixed(3);draw(points,result);const body=$("rows");body.replaceChildren();result.projected.slice(0,40).forEach((p,i)=>{const tr=document.createElement("tr");[i+1,p.x.toFixed(2),p.y.toFixed(2),p.pc1.toFixed(3),p.pc2.toFixed(3)].forEach(v=>{const td=document.createElement("td");td.textContent=String(v);tr.append(td);});body.append(tr);});}
catch(error){$("error").textContent=error.message;$("count").textContent="Invalid dataset";$("rows").replaceChildren();ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#0b1727";ctx.fillRect(0,0,canvas.width,canvas.height);}}
$("calculate").addEventListener("click",render);$("sample").addEventListener("click",()=>{$("data").value=sample;render();});$("data").addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")render();});render();

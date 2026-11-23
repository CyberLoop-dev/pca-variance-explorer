export function parsePoints(text) {
  const points=[];
  for(const [index,line] of text.split(/\r?\n/).entries()){
    const value=line.trim();if(!value)continue;
    const parts=value.split(/[\s,;]+/).filter(Boolean);
    if(parts.length!==2)throw new Error("Line "+(index+1)+": expected exactly two numbers separated by a comma or space.");
    const x=Number(parts[0]),y=Number(parts[1]);
    if(!Number.isFinite(x)||!Number.isFinite(y))throw new Error("Line "+(index+1)+": coordinates must be finite numbers.");
    points.push({x,y});
  }
  if(points.length<2)throw new Error("Enter at least two points.");
  return points;
}
export function computePCA(points) {
  if(points.length<2)throw new Error("PCA needs at least two points.");
  const n=points.length,mean={x:points.reduce((s,p)=>s+p.x,0)/n,y:points.reduce((s,p)=>s+p.y,0)/n};
  let xx=0,xy=0,yy=0;
  for(const p of points){const x=p.x-mean.x,y=p.y-mean.y;xx+=x*x;xy+=x*y;yy+=y*y;}
  xx/=n;xy/=n;yy/=n;
  const trace=xx+yy,delta=Math.sqrt((xx-yy)**2+4*xy*xy);
  const eigen1=Math.max(0,(trace+delta)/2),eigen2=Math.max(0,(trace-delta)/2);
  let vx,vy;
  if(Math.abs(xy)>1e-12){vx=eigen1-yy;vy=xy;}else if(xx>=yy){vx=1;vy=0;}else{vx=0;vy=1;}
  const length=Math.hypot(vx,vy)||1;vx/=length;vy/=length;
  const pc1={x:vx,y:vy},pc2={x:-vy,y:vx};
  const projected=points.map(p=>{const x=p.x-mean.x,y=p.y-mean.y;return {x:p.x,y:p.y,pc1:x*pc1.x+y*pc1.y,pc2:x*pc2.x+y*pc2.y};});
  return {mean,covariance:{xx,xy,yy},eigenvalues:[eigen1,eigen2],components:[pc1,pc2],variance:[trace?eigen1/trace*100:0,trace?eigen2/trace*100:0],projected};
}

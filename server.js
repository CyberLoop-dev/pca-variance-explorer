import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),"public");
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml"};
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname)}catch{res.writeHead(400);return res.end("Bad request")}
const file=path.resolve(root,"."+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end("Forbidden")}
fs.readFile(pathname==="/" ? path.join(root,"index.html"):file,(err,data)=>{if(err){res.writeHead(404);return res.end("Not found")}res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream","Cache-Control":"no-store"});res.end(data)})}).listen(Number(process.env.PORT||4177),"127.0.0.1",()=>console.log("PCA Variance Explorer: http://127.0.0.1:4177"));

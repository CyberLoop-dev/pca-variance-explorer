import test from "node:test";
import assert from "node:assert/strict";
import {parsePoints,computePCA} from "../public/pca.js";

test("parses comma and whitespace separated points",()=>{assert.equal(parsePoints("1, 2\n3 4").length,2);});
test("first component explains at least as much variance",()=>{const result=computePCA(parsePoints("0,0\n1,1\n2,2\n3,3"));assert.ok(result.variance[0]>=result.variance[1]);assert.ok(Math.abs(result.variance[0]-100)<1e-8);});
test("rejects non-finite coordinates",()=>{assert.throws(()=>parsePoints("1, NaN"),/finite numbers/);});

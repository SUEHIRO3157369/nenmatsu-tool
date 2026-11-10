/* 令和8年分 給与所得者の保険料控除申告書（表面の計算式）準拠 */
(function(root){
const fresh=p=>Math.ceil(p<=20000?p:p<=40000?p/2+10000:p<=80000?p/4+20000:40000);
const old=p=>Math.ceil(p<=25000?p:p<=50000?p/2+12500:p<=100000?p/4+25000:50000);
const special=p=>Math.ceil(p<=30000?p:p<=60000?p/2+15000:p<=120000?p/4+30000:60000);
const long=p=>Math.ceil(p<=10000?p:p<=20000?p/2+5000:15000);
function calculate(contracts,dependent,earthquake,legacy){
 const s={A:0,B:0,C:0,D:0,E:0};
 for(const c of contracts){const key=c.type==='medical'?(c.regime==='old'?'B':'C'):c.type==='pension'?(c.regime==='old'?'E':'D'):(c.regime==='old'?'B':'A');s[key]+=c.amount;}
 const n1=fresh(s.A),n2=special(s.A),o=old(s.B),nP=fresh(s.D),oP=old(s.E);
 const active=dependent&&s.A>0;
 const i4=Math.min(40000,n1+o),i5=Math.min(60000,n2+o),p8=Math.min(40000,nP+oP);
 const general=active?i5:Math.max(o,i4),medical=fresh(s.C),pension=Math.max(oP,p8);
 const life=Math.min(120000,general+medical+pension),eq=Math.min(50000,earthquake),lg=long(legacy),earth=Math.min(50000,eq+lg);
 return {...s,n1,n2,o,nP,oP,i4,i5,p8,active,general,medical,pension,life,eq,lg,earth,total:life+earth};
}
const api={fresh,old,special,long,calculate};if(typeof module!=='undefined')module.exports=api;else root.TaxCalc=api;
})(globalThis);

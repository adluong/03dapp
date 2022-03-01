import { BigNumber } from "ethers";


export const toHex = (str) => {
    const x = str.split(/[\[,"\]]/);
    const res = [];
    for(let i = 0; i < x.length; i++){
        if(x[i].length === 0){continue;}
        // else{res.push(BigNumber.from(x[i]));}
        else{res.push(x[i]);}
    }
    const a = res.splice(0,2);
    const a_p = res.splice(0,2);
    const b = res.splice(0,4);
    const b1 = b.splice(0,2);
    const b2 = [];
    b2.push(b1);
    b2.push(b);
    const b_p = res.splice(0,2);
    const c = res.splice(0,2);
    const c_p = res.splice(0,2);
    const h = res.splice(0,2);
    const k = res;
    const m = [];
    m.push(a);
    m.push(a_p);
    m.push(b2);
    m.push(b_p);
    m.push(c);
    m.push(c_p);
    m.push(h);
    m.push(k);
    return m;
}
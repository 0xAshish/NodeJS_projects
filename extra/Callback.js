
'use strict'
let add=(num1 , num2)=>{
    return num1+num2;

};
let mul=(num1,num2)=>{
     return num1*num2;
};
let calc=(num1,num2,callback)=>
{
return callback(num1,num2);
};
console.log(calc(5,5,add));
console.log(calc(5,5,mul));
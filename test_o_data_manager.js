import { O_test } from "./O_test.module.js"
import { O_data_manager} from "./O_data_manager.module.js"


// class Person {}
// var a = new Person()
// console.log(a.constructor)
// var b = new a.constructor()
// console.log(b)
// var o = {}
// o.constructor()
// console.log(o.constructor.name); 
// var a = []
// a.constructor()
// console.log(a.constructor.name); 
// Deno.exit(0);



var o_data_manager = new O_data_manager(); 

await o_data_manager.f_o_create(
    new O_test('lol')
); 

await o_data_manager.f_o_create(
    new O_test('hello')
); 

await o_data_manager.f_o_create(
    new O_test('yes')
); 

await o_data_manager.f_o_create(
    new O_test('indeed2')
); 

var n_i =0; 
while(n_i < 1000){
    await o_data_manager.f_o_create(
        new O_test('name '+ n_i)
    ); 
    n_i+=1;
}
console.log(o_data_manager)

;import {O_gphoto2_api} from "./O_gphoto2_api.module.js";

var o_gphoto2_api = await new O_gphoto2_api();
o_gphoto2_api.f_init();
if(o_gphoto2_api.a_o_camera.length == 0){
    console.error("no cameras connected !!!")
}

console.log(o_gphoto2_api.a_o_camera)
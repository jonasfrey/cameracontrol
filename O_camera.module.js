import {f_o_bash_command, f_o_bash_command_cached} from "./bash_stuff.module.js";

class O_camera{
    constructor(
        s_brand, 
        s_model, 
    ){
        this.s_brand = s_brand;
        this.s_model = s_model;
        this.a_o_gphoto2_camera_setting = this.f_a_o_gphoto2_camera_setting();

    }

    async f_a_o_gphoto2_camera_setting(){
        let o_bash_command  = await f_o_bash_command_cached("   ");
        var a_s_part = o_bash_command.s_stdout.split("\n");
        
    }
    

}
export {O_camera}
import {f_o_bash_command, f_o_bash_command_cached} from "./bash_stuff.module.js";
import {O_camera} from "./O_camera.module.js";
class O_gphoto2_api{
    constructor(){
        this.a_o_camera = []
    }

    async f_init(){
        this.a_o_camera = await this.f_a_o_camera()
    }

    async f_a_o_camera(){
        let o_bash_command = await f_o_bash_command("gphoto2 --auto-detect");
        let s_stdout = o_bash_command.s_stdout;
        // example output
        // Model                          Port                       
        // ----------------------------------------------------------
        // Canon EOS M100                 usb:001,014                
        
        const a_s_line = s_stdout.split("\n");
        let n_i = 0; 
        let s_brandmodel = "";
        let s_separator = " ";
        var a_o_camera = []
        const a_s_brandmodel = a_s_line.slice(2).filter(s => s.trim() != '');
        console.log(a_s_brandmodel)
        while(n_i < a_s_brandmodel.length){
            let s_brandmodel = a_s_brandmodel[n_i];
            
            let a_s_part = s_brandmodel.split(s_separator);
            let s_brand = a_s_part.shift()
            let s_model = a_s_part.join(s_separator)
            a_o_camera.push(
                new O_camera(
                    s_brand, 
                    s_model
                )
            )
            n_i++;
        }

        // console.log(s_stdout);

        return a_o_camera;
    }

    

}
export {O_gphoto2_api}
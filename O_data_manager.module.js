import { s_directory_separator } from "./constants.module.js";

class O_data_manager{
    constructor(){

        this.s_file_name = import.meta.url.split('/').pop()
        this.s_path_name = `.${s_directory_separator}.${s_file_name.split(".").shift()}`
        this.s_file_name_suffix = ".json"

    }

    f_a_o_create(
        s_model_name,
        o_input
    ){
        var s_file_name = s_model_name[0].toUpperCase() + s_model_name.slice(1) + this.s_file_name_suffix;
        var s_path_name_file_name = `${this.s_path_name}${s_directory_separator}${s_file_name}`

        await ensureDir(this.s_path_name)
        await ensureFile(s_path_name_file_name);
        console.log(s_path_name_file_name)

        var s_json = await Deno.readTextFile(s_path_name_file_name);
        try {
            var a_o_output = JSON.parse(s_json);
        } catch (error) {
            console.log(error)
            console.log(s_json)
            var a_o_output = []
        }
        a_o_output.push(o_input);
        var a_o_output = a_o_output.filter(function(o){
            var b_match = true; 
            for(var s_prop_name in o_input){
                if(
                    o[s_prop_name] != o_input[s_prop_name]
                ){
                    b_match = false;
                    break
                }
            }
            return b_match
        })

        console.log(o_bash_command);

        return a_o_output;
    }
    f_a_o_read(
        s_model_name,
        o_input
    ){

        
        if(!){
            const o_bash_command = await f_o_bash_command(s_command)
            a_o_bash_command.push(o_bash_command)
            var s_json = JSON.stringify(a_o_bash_command)
            await Deno.writeTextFile(s_path_name_file_name, s_json);
        }
        return a_o_output;
    }
    f_a_o_update(
        s_model_name,
        o_input
    ){
        
        return a_o_output;
    }
    f_a_o_delete(
        s_model_name,
        o_input
    ){
        
        return a_o_output;
    }
}

export {O_data_manager}
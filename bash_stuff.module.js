
import {
    ensureDir,
    ensureFile,
  } from "https://deno.land/std@0.77.0/fs/mod.ts";

import { s_directory_separator } from "./constants.module.js";

class O_bash_command{
    constructor(
        s_command, 
        s_stdout, 
        s_stderr, 
        n_ts_ms_ut_executed
    ){
        this.s_command = s_command, 
        this.s_stdout = s_stdout, 
        this.s_stderr = s_stderr, 
        this.n_ts_ms_ut_executed = n_ts_ms_ut_executed
    }
}
var f_o_bash_command = async function(
    s_command
){

    // simple example 
    var a_s_commmand = s_command.split(" ");
    var n_ts_ms_ut_executed = Date.now()
    const o_process_piped = Deno.run(
        {
            cmd: a_s_commmand,
            stdout: "piped",
            stderr: "piped"
        }
    );

    // console.log(o_process_piped)
    var o_status = await o_process_piped.status();

    const raw_stdout = await o_process_piped.output();
    const raw_stderr = await o_process_piped.stderrOutput();
    
    // console.log(raw_stdout);
    // console.log(raw_stderr);
    // var s_stdout = raw_stdout.toString();

    var s_stdout = new TextDecoder().decode(raw_stdout);
    var s_stderr = new TextDecoder().decode(raw_stderr);
    
    var o_bash_command = new O_bash_command(
        s_command,
        s_stdout,
        s_stderr,
        n_ts_ms_ut_executed,
    );

    return o_bash_command

}
var f_o_bash_command_cached = async function(
    s_command
){

    const s_file_name = import.meta.url.split('/').pop() + ".json"
    const s_path_name = `.${s_directory_separator}.${s_file_name.split(".").shift()}`
    const s_path_name_file_name = `${s_path_name}${s_directory_separator}a_o_bash_command.json`
    
    await ensureDir(s_path_name)
    await ensureFile(s_path_name_file_name);
    console.log(s_path_name_file_name)

    var s_json = await Deno.readTextFile(s_path_name_file_name);
    try {
        var a_o_bash_command = JSON.parse(s_json);
    } catch (error) {
        console.log(error)
        console.log(s_json)
        var a_o_bash_command = []
    }
    var o_bash_command = a_o_bash_command.filter(o=>o.s_command == s_command)[0] 
    if(!o_bash_command){
        const o_bash_command = await f_o_bash_command(s_command)
        a_o_bash_command.push(o_bash_command)
        var s_json = JSON.stringify(a_o_bash_command)
        await Deno.writeTextFile(s_path_name_file_name, s_json);
    }
    console.log(o_bash_command);
    
    return o_bash_command

}
export {
    f_o_bash_command, 
    f_o_bash_command_cached
}
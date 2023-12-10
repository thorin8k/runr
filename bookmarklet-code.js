async () => {
    const RUNR_PATH = "http://192.168.1.25:4023"
    const url = new URL(window.location.href);
    if(!url.pathname.includes("platform")){
        return alert("Website not supported");
    }
    const parts = url.pathname.split("/");
    const resp = await fetch(`${url.origin}/api/platforms/${parts[2]}/roms/${parts[3]}`)
    const data = await resp.json();

    console.log(data);
    window.open(`${RUNR_PATH}/?rom=${data?.full_path}&type=emu&core=${data?.p_slug}`)
}



// Play EmulatorJS

javascript:(async function(){    const RUNR_PATH = "http://192.168.1.25:4023"; const url = new URL(window.location.href); if(!url.pathname.includes("platform")){ return alert("Website not supported"); } const parts = url.pathname.split("/"); const resp = await fetch(`${url.origin}/api/platforms/${parts[2]}/roms/${parts[3]}`); const data = await resp.json(); window.open(`${RUNR_PATH}/?rom=${data?.full_path}&type=emu&core=${data?.p_slug}`); })();
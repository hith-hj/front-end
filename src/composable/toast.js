import { toast } from "bulma-toast";
const config = {
    duration: 3500,
    position: 'bottom-right',
    extraClasses: 'is-lighty px-6 py-1',
}

function noti(msg, type) {
    config.message = msg;
    config.type = type;
    return toast(config);
}

export {
    noti,
}
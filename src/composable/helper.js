import Vue from 'vue';

const errLog = (err) => {
    errors = [];
    for (let proprity in err.response.data) {
        if (typeof(err.response.data[proprity]) !== 'object') {
            errors.push(`${proprity} : ${err.response.data[proprity]}`);
        } else {
            for (let prop in err.response.data[proprity]) {
                errors.push(`${prop} : ${err.response.data[proprity][prop]}`);
            }
        }
    }
    return errors;
}

export default {
    errLog
}

const help = {
    install() {
        Vue.helpers = this;
        Vue.prototype.$helpers = this;
    }
}

Vue.use(help);
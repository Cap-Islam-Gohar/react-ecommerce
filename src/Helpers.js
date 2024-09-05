

export function clsx(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const regex = {
    name: /^[a-zA-Z][a-zA-Z\s ]{0,50}$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^01[0125][0-9]{8}$/, 
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,100}$/,
};
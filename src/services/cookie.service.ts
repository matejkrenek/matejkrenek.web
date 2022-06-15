import Cookies, { CookieSetOptions } from "universal-cookie";

const cookie = new Cookies()

namespace CookieService {
    export function get(key: string) {
        return cookie.get(key)
    }

    export function set(key: string, value: string, options: CookieSetOptions) {
        return cookie.set(key, value, options)
    }

    export function remove(key: string) {
        return cookie.remove(key)
    }
}

export default CookieService
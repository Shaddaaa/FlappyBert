class Cookie {

    constructor(std_expiry = false) {//std_expiry [Date] (Should because browsers do not like cookies and want to delete them as fast as possible!)
        this.expiry = std_expiry ? std_expiry.toUTCString() : false;
    }

    set(id, value, expiry = false) {
        let exp = expiry ? expiry.getUTCString() : false;
        exp = !exp && this.expiry ? this.expiry : false;
        document.cookie = id + "=" + value + (exp ? ";expires=" + exp : "");
    }

    get(id) {
        let str = document.cookie;
        if (str == "") return false;
        let pair_split = str.split("; ");

        for (let i = 0; i < pair_split.length; i++) {
            let tmp = pair_split[i].split("=");
            if (tmp[0] === id)
                return tmp[1];
        }
        return false;
    }

    get_raw() { return document.cookie; }

    delete(id) {
        document.cookie = id + "=;expires=Thu, 18 Dec 2013 12:00:00 UTC";
    }

    set_expiry(expiry = false, id = false) {//set_expiry(Date) => updates std_expiry; set_expiry(Date, String) => updates expiry of a specific key-value-pair;
        if (!expiry) return;

        if (!id && expiry) {
            this.expiry = expiry.toUTCString()
            return true;
        }

        let val = get(id);
        if (!val) return false;

        document.cookie = id + "=" + val + ";expires=" + expiry.toUTCString();
        return true;
    }

}
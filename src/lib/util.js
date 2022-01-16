

export const filterObject = (p, a) => {
    const r = {};
    for (const k in p) {
        if (a.includes(k)) {
            r[k] = p[k];
        }
    }
    return r;
}
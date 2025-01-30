export const response = async ( url, Method='GET', data = null ) => {
    let res;
    if (Method === 'GET' || Method === 'DELETE') {
        res = await fetch(url, {
            method:Method,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    else {
        res = await fetch(url, {
            method:Method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        });
    }

    res = await res.json();
    return res;
}
/**
 * 
 * @param  url 
 * @param  data 
 * 
 * post data to specific route in server
 */
const postData = async(url = '', data = {}) => {

    const result = await fetch(url, {
        method: 'POST',
        cache: "no-cache",
        mode: "cors",
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        const data = await result.json();
        return data;
    } catch (error) {
        Client.displayErrorMsg(error.message);
    }
}

export {
    postData
}
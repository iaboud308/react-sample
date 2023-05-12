
const getRequest = async (endpoint: string) => {
    
    try {

        let url = `${endpoint}`;
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const jsonResponse = await response.json();
        return jsonResponse;

    } catch (ex) {
        console.log(ex);
    }

}


const getRequestJwt = async (endpoint: string, jwt: string) => {
    
    try {

        let url = `${endpoint}`;
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });
        
        const jsonResponse = await response.json();
        return jsonResponse;

    } catch (ex) {
        console.log(ex);
    }

}


const postRequest = async (endpoint: string, body: any) => {
    
    try {
        let url = `${endpoint}`;
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        });
        if (response.status == 400) {
            throw new Error("Bad Request");
        }
        return await response.text();

    } catch (ex) {
        console.log(ex);
        return null;
    }

}



const postRequestJwt = async (endpoint: string, body: any, jwt: string) => {
    
    try {
        let url = `${endpoint}`;
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: body
        });
        
        console.log(response);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    } catch (ex) {
        console.log(ex);
    }

}


const deleteRequest = async (endpoint: string, id: number) => {

    try {
        let url = `${endpoint}`;
        const response = await fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
        const jsonResponse = response.text();
        return jsonResponse;
    } catch (ex) {
        console.log(ex);
    }

}


export {getRequest, getRequestJwt, postRequest, postRequestJwt, deleteRequest}
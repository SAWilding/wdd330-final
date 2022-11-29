const baseUrl = 'http://localhost:3000/';
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      throw { name: 'servicesError', message: data };
    }
  }
export default class DataService {
    constructor(endpoint){
        this.endpoint = endpoint;
        this.data = [];
    }
    async init(callback) {
        try {
            this.data = await this.getData();
            console.log(this.data);
            if(callback)
                callback(this.data);
        } catch (err) {
            console.log(err);
        }
    }
    async getData() {
        return await fetch(baseUrl+this.endpoint).then(convertToJson);
    }
    async postData(data) {
        try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
            const results = await fetch(baseUrl + this.endpoint, options).then(convertToJson);
            return results;
        } catch (err) {
            console.log(err);
        }
    }
}
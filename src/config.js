export default {
    api_url: process.env.NODE_ENV === 'production' ? 'https://uas-api.sunucum.cloud/api' : 'http://localhost:5000/api'
}
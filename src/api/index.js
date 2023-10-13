import axios from 'axios';


// 로컬 http://localhost:9004
// 운영 http://wcollector.idatabank.com:5229
axios.defaults.baseURL = "http://localhost:9004"
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API_URL

const fetchCreateSheet = () => {
    return axios.get('/luckysheet/api/insert')
}

const fetchRecentList = () => {
    return axios.get('/luckysheet/api/recentList')
}
const updateDocName = (listId,newDocName) => {
    return axios.post('/luckysheet/api/updateDocName',null,{
            params:{
                listId:listId,
                newDocName: newDocName
            }
        }
    )
}

const updateDocImage = (listId,imageBase64) => {
    return axios.post('/luckysheet/api/updateDocImage',null,{
            params:{
                listId:listId,
                imageBase64: imageBase64
            }
        }
    )
}
export {
    fetchCreateSheet,
    fetchRecentList,
    updateDocName,
    updateDocImage
}
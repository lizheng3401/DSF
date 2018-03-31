import axios from 'axios';


let host = 'http://api.deepsleeping.tech';

//login
export const login = params => { return axios.post(`api/Login/`, params)}

// history of unhealth people number

export const unhealthPeople = params => { return axios.get(`api/history/unhealthPeople`, params)}

// history of sleep people number

export const sleepPeople = params => { return axios.get(`api/history/sleepPeople`, params)}

// history of sleep peroid number

export const periodPeople = params => { return axios.get(`api/history/periodPeople`, params)}
import axios from 'axios';


let host = 'http://api.deepsleeping.tech';

// new unhealth people
export const newUnhealthPeople = params => { return axios.get(`api/newUnhealthPeople`, params)}

// history of unhealth people number

export const unhealthPeople = params => { return axios.get(`api/history/unhealthPeople`, params)}

// history of sleep people number

export const sleepPeople = params => { return axios.get(`api/history/sleepPeople`, params)}

// history of sleep peroid number

export const periodPeople = params => { return axios.get(`api/history/periodPeople`, params)}

// personal

export const detailPeople = params => { return axios.get(`api/detail/people`, params)}


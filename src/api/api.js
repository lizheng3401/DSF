import axios from 'axios';


let host = 'http://api.deepsleeping.tech/api/v1/';


//login
export const login = params => { return axios.post(`api/login`, params)}

// new unhealth people
export const newUnhealthPeople = params => { return axios.get(`${host}web/NewUnhealthPeople`, params)}

// history of unhealth people number

export const unhealthPeople = params => { return axios.get(`${host}web/HistoryUnhealthPeople`, params)}

// history of sleep people number

export const sleepPeople = params => { return axios.get(`${host}web/SleepPeople`, params)}

// history of sleep peroid number

export const periodPeople = params => { return axios.get(`${host}web/PeriodPeople`, params)}

// personal
export const detailPeople = params => { return axios.get(`${host}web/DetailPeople`, params)}

// live heart and breath
export const heartBreathLive = params => { return axios.get(`api/live/heartBreath`, params)}

// lastDay heart and breath

export const heartBreath = params => { return axios.get(`api/yesterday/heartBreath`, params)}

// move yesterday

export const move = params => { return axios.get(`api/yesterday/move`, params)}

// perid yesterday

export const peroid = params => { return axios.get(`api/yesterday/period`, params) }

//  random live people heart and breath  

export const live = params => { return axios.get(`${host}web/NowLive`, params)}

// live num

export const liveNum = params => { return axios.get(`${host}web/LiveNumber`,params)}


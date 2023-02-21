import * as actionTypes from './actionTypes';
import Cookies from 'js-cookie'

// import React from 'react'


/*
We are exporting thegetData function. This function will be called from our component to fetch the data from the server 
(therefore we must export it from this file). Then with axios, we are sending the GET request. 
If it is successful we are dispatching the getDataSuccess function which returns an object for the reducer file to use. 
*/

export const getLoginData = (data) => {
    Cookies.set('token', data.token)
    return{
        type: actionTypes.USER_LOGGED_DATA,
        data: data,
    }
}

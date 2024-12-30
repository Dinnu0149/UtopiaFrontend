import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import eventReducer from './eventReducer';
import ticketReducer from './ticketReducer';
import scheduleReducer from './scheduleReducer';
import speakerReducer from './speakerReducer';
import reviewReducer from './reviewReducer';
import transactionReducer from './transactionReducer';
import bookingReducer from './bookingReducer';
import revenueReducer from './revenueReducer';
import userReducer from './userReducer';
import userAdminEventReducer from './userAdminEventReducer';
import categoryReducer from './categoryReducer';
import dashboardReducer from './dashboardReducer';
import favoriteReducer from './favoriteReducer';
import notificationReducer from './notificationReducer';
import groupReducer from './groupReducer';
import organizationReducer from './organizationReducer';
import followerReducer from './followerReducer';
import redirectReducer from './redirectReducer';
import adminWalletReducer from './adminWalletReducer';
import sideDisplayReducer from './sideDisplayReducer';
import paymentReducer from './paymentReducer';
import messageReducer from './messageReducer';
import searchReducer from './searchReducer';




const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
    event: eventReducer,
    ticket: ticketReducer,
    schedule: scheduleReducer,
    speaker: speakerReducer,
    review: reviewReducer,
    transaction: transactionReducer,
    booking: bookingReducer,
    revenue: revenueReducer,
    user: userReducer,
    userAdminEvent: userAdminEventReducer,
    category: categoryReducer,
    favorite: favoriteReducer,
    notification: notificationReducer,
    group: groupReducer,
    organization: organizationReducer,
    follower: followerReducer,
    redirect: redirectReducer,
    adminWallet: adminWalletReducer,
    sideDisplay: sideDisplayReducer,
    payment: paymentReducer,
    message: messageReducer,
    search: searchReducer,



})

export default rootReducer;
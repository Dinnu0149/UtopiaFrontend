import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../pages/Authentication/SignUp";
import Login from "../pages/Authentication/Login";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import ForgetPasswordComfirm from "../pages/Authentication/ForgetPasswordComfirm";
import OrganizerDashboard from "../pages/Organizer/Dashboard/OrganizerDashboard";
import CreateEvent from "../pages/Organizer/Event/CreateEvent/CreateEvent";
import ChangePassword from "../pages/Authentication/ChangePassword";
import EditProfile from "../pages/Users/EditProfile";
import Events from "../pages/Organizer/Event/Events";
import Profile from "../pages/Users/Profile";
import Wallet from "../pages/Organizer/Wallet/Wallet";
import EventDetail from "../pages/Organizer/Event/EventDetail";
import CreateViewReview from "../pages/Organizer/Event/Reviews/CreateViewReview";
import EventInfoEdit from "../pages/Organizer/Event/EditEvent/EventInfoEdit";
import TicketEdit from "../pages/Organizer/Event/EditEvent/TicketEdit";
import SchduleEdit from "../pages/Organizer/Event/EditEvent/SchduleEdit";
import SpeakerEdit from "../pages/Organizer/Event/EditEvent/SpeakerEdit";
import {
  PrivateGroupRoute,
  UnauthencatedRoute,
  AuthencatedRoute,
  OrganizationProfileRequired,
} from "./PrivateRoute";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import AttendeeDashboard from "../pages/Attendee/Dashboard/AttendeeDashboard";
import ResetPassword from "../pages/Authentication/ResetPassword";
import UserList from "../pages/Admin/Users/UserList";
import Transactions from "../pages/Users/Transactions";
import RevenueList from "../pages/Organizer/Revenues/RevenueList";
import BookingList from "../pages/Users/BookingList";
import MyEvents from "../pages/Organizer/Event/MyEvents";
import EventsList from "../pages/Admin/Events/EventsList";
import EventTicket from "../pages/Organizer/Event/EventTicket";
import PaymentCallBack from "../pages/Users/PaymentCallBack";
import EventBookingReview from "../pages/Organizer/Event/EventBookingReview";
import TicketDetail from "../pages/Users/TicketDetail";
import CreateCategory from "../pages/Admin/Events/Category/CreateCategory";
import AdminListCategory from "../pages/Admin/Events/Category/AdminListCategory";
import Categorise from "../pages/Organizer/Event/Category/Categorise";
import CreateEventSchdule from "../pages/Organizer/Event/CreateEvent/CreateEventSchdule";
import CreateEventSpeaker from "../pages/Organizer/Event/CreateEvent/CreateEventSpeaker";
import CreateEventTicket from "../pages/Organizer/Event/CreateEvent/CreateEventTicket";
import UpcomingEvent from "../pages/Organizer/Event/UpcomingEvent";
import OrganizerSignUp from "../pages/Authentication/OrganizerSignUp";
import FavoriteEvent from "../pages/Users/FavoriteEvent";
import AccountSettings from "../pages/Users/AccountSettings";
import Notifications from "../pages/Users/Notifications/Notifications";
import NotificationDetail from "../pages/Users/Notifications/NotificationDetail";
import CreateNotification from "../pages/Users/Notifications/CreateNotification";
import OrganizationProfile from "../pages/Organizer/Organization/OrganizationProfile";
import EditOrganizationProfile from "../pages/Organizer/Organization/EditOrganizationProfile";
import Following from "../pages/Users/Following";
import ChangeUserPassword from "../pages/Admin/Users/ChangeUserPassword";
import AdminWallet from "../pages/Admin/Wallet/AdminWallet";
import AdminRevenueList from "../pages/Admin/Wallet/AdminRevenueList";
import AdminTransactions from "../pages/Admin/Wallet/AdminTransactions";
import ETicketVerifcation from "../pages/Users/ETicketVerifcation";
import QrScanner from "../pages/Scanner/QrScanner";
import PageNotFound from "../pages/Error/PageNotFound";
import SearchEventResult from "../pages/Users/Search/SearchEventResult";
import SearchOrganizationResult from "../pages/Users/Search/SearchOrganizationResult";
import TermsCondition from "../pages/Policy&HelpCenter/TermsCondition";
import HelpCenter from "../pages/Policy&HelpCenter/HelpCenter";


function NavigationControl() {
  return (
    <Router>
      <Routes>
        <Route element={<UnauthencatedRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/organizer" element={<OrganizerSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forget" element={<ForgetPassword />} />
          <Route
            path="/password/forget/comfirm"
            element={<ForgetPasswordComfirm />}
          />
          <Route
            path="/password/reset/:uidb64/:token"
            element={<ResetPassword />}
          />
        </Route>

        <Route element={<AuthencatedRoute />}>
          <Route element={<PrivateGroupRoute allowedGroups={["organizer"]} />}>

            <Route path="/organizer/dashboard" element={<OrganizerDashboard />}/>
            <Route path="/organization/profile/edit/:owner_id" element={<EditOrganizationProfile />} /> 

            <Route element={<OrganizationProfileRequired />}>
              <Route path="/organizer/event" element={<MyEvents />} />
              <Route path="/organizer/event/create" element={<CreateEvent />} />
              <Route path="/organizer/event/:event_id/create/schdule" element={<CreateEventSchdule />} />
              <Route path="/organizer/event/:event_id/create/speaker" element={<CreateEventSpeaker />} />
              <Route path="/organizer/event/:event_id/create/ticket" element={<CreateEventTicket />} />
              <Route path="/organizer/event/speaker/edit/:pk" element={<SpeakerEdit />} />
              <Route path="/organizer/event/schdule/edit/:pk" element={<SchduleEdit />} />
              <Route path="/organizer/event/ticket/edit/:pk" element={<TicketEdit />} />
              <Route path="/organizer/event/info/edit/:pk" element={<EventInfoEdit />} />
              <Route path="/organizer/wallet" element={<Wallet />} />
              <Route path="/organizer/revenue" element={<RevenueList />} /> 
            </Route>
          </Route>

          <Route element={<PrivateGroupRoute allowedGroups={["attendee"]} />}>
            <Route path="/attendee/dashboard" element={<AttendeeDashboard />} />
          </Route>

          <Route element={<PrivateGroupRoute allowedGroups={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user" element={<UserList />} />
            <Route path="/admin/events/list" element={<EventsList />} />
            <Route path="/admin/category" element={<AdminListCategory />} />
            <Route path="/admin/category/create" element={<CreateCategory />} />
            <Route path="/admin/create/notification" element={<CreateNotification />} />
            <Route path="/admin/change/user/password/:pk" element={<ChangeUserPassword />} />
            <Route path="/admin/wallet" element={<AdminWallet />} />
            <Route path="/admin/revenue" element={<AdminRevenueList />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
          </Route>

          <Route element={<PrivateGroupRoute allowedGroups={["organizer", "admin"]} />}>
            <Route path="/qrscanner" element={<QrScanner />} />
          </Route>

          <Route path="/change/password" element={<ChangePassword />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/payment/callback" element={<PaymentCallBack />} />
          <Route path="/ticket/:booking_id" element={<TicketDetail />} />

          <Route path="/transactions" element={<Transactions />} />
          <Route path="/booking" element={<BookingList />} />

          <Route path="/favorite" element={<FavoriteEvent />} />
          <Route path="/following" element={<Following />} />

          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notification/:pk" element={<NotificationDetail />} />
        </Route>
        
        <Route path="/organization/profile/:owner_id" element={<OrganizationProfile />} />
        <Route path="/ticket/verification/:booking_id" element={<ETicketVerifcation />} />
        <Route path="/events" element={<Events />} />
        <Route path="/upcoming/events" element={<UpcomingEvent />} />
        <Route path="/eventdetail/:pk" element={<EventDetail />} />
        <Route path="/eventdetail/:pk/tickets" element={<EventTicket />} />
        <Route path="/eventdetail/:pk/ticket/:ticket_id/review" element={<EventBookingReview />} />
        <Route path="/categorise" element={<Categorise />} />
        <Route path="/search/event" element={<SearchEventResult />} />
        <Route path="/search/organization" element={<SearchOrganizationResult />} />
        <Route path="/create/viewreview/:pk" element={<CreateViewReview />} />
        <Route path="/policy" element={<TermsCondition />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="*"  element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default NavigationControl;

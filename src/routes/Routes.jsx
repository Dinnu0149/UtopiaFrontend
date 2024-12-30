import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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


function NavigationControl() {
  return (
    <Router>
      <Routes>
        <Route element={<UnauthencatedRoute />}>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUp/Organizer" element={<OrganizerSignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route
            path="/ForgetPasswordComfirm"
            element={<ForgetPasswordComfirm />}
          />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<ResetPassword />}
          />
        </Route>

        <Route element={<AuthencatedRoute />}>
          <Route element={<PrivateGroupRoute allowedGroups={["organizer"]} />}>

            <Route path="/OrganizerDashboard" element={<OrganizerDashboard />}/>
            <Route path="/OrganizationEdit/:owner_id" element={<EditOrganizationProfile />} /> 

            <Route element={<OrganizationProfileRequired />}>
              <Route path="/MyEvents" element={<MyEvents />} />
              <Route path="/CreateEvent" element={<CreateEvent />} />
              <Route path="/:event_id/CreateEventSchdule" element={<CreateEventSchdule />} />
              <Route path="/:event_id/CreateEventSpeaker" element={<CreateEventSpeaker />} />
              <Route path="/:event_id/CreateEventTicket" element={<CreateEventTicket />} />
              <Route path="/SpeakerEdit/:pk" element={<SpeakerEdit />} />
              <Route path="/SchduleEdit/:pk" element={<SchduleEdit />} />
              <Route path="/TicketEdit/:pk" element={<TicketEdit />} />
              <Route path="/EventInfoEdit/:pk" element={<EventInfoEdit />} />
              <Route path="/Wallet" element={<Wallet />} />
              <Route path="/Revenue" element={<RevenueList />} /> 
            </Route>
   
          </Route>

          <Route element={<PrivateGroupRoute allowedGroups={["attendee"]} />}>
            <Route path="/AttendeeDashboard" element={<AttendeeDashboard />} />
          </Route>

          <Route element={<PrivateGroupRoute allowedGroups={["admin"]} />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/User" element={<UserList />} />
            <Route path="/EventsList" element={<EventsList />} />
            <Route path="/AdminCategory" element={<AdminListCategory />} />
            <Route path="/CreateCategory" element={<CreateCategory />} />
            <Route path="/CreateNotification" element={<CreateNotification />} />
            <Route path="/ChangeUserPassword/:pk" element={<ChangeUserPassword />} />
            <Route path="/AdminWallet" element={<AdminWallet />} />
            <Route path="/AdminRevenue" element={<AdminRevenueList />} />
            <Route path="/AdminTransactions" element={<AdminTransactions />} />
          </Route>

          <Route element={<PrivateGroupRoute allowedGroups={["organizer", "admin"]} />}>
            <Route path="/QrScanner" element={<QrScanner />} />
          </Route>

          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Profile" element={<Profile />} />

          <Route path="/UpcomingEvent" element={<UpcomingEvent />} />

          <Route path="/payment/callback" element={<PaymentCallBack />} />
          <Route path="/Ticket/:booking_id" element={<TicketDetail />} />

          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/Booking" element={<BookingList />} />

          <Route path="/Favorite" element={<FavoriteEvent />} />
          <Route path="/Following" element={<Following />} />

          <Route path="/Settings" element={<AccountSettings />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Notification/:pk" element={<NotificationDetail />} />
        </Route>
        
        <Route path="/OrganizationProfile/:owner_id" element={<OrganizationProfile />} />
        <Route path="/TicketVerification/:booking_id" element={<ETicketVerifcation />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/EventDetail/:pk" element={<EventDetail />} />
        <Route path="/EventDetail/:pk/tickets" element={<EventTicket />} />
        <Route path="/EventDetail/:pk/ticket/:ticket_id/review" element={<EventBookingReview />} />
        <Route path="/Categorise" element={<Categorise />} />
        <Route path="/SearchEvent" element={<SearchEventResult />} />
        <Route path="/SearchOrganization" element={<SearchOrganizationResult />} />
        <Route path="/CreateViewReview/:pk" element={<CreateViewReview />} />
        <Route path="*"  element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default NavigationControl;

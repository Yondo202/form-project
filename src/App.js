import React, {useEffect, useState,useContext} from 'react'
import { motion } from "framer-motion";
import Menu from './containers/menu/menu'
import UserContext from "./context/UserContext";
import HomeLogin from './components/home/homeLogin'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainForm from './containers/checkComp/MainForm';
import SignUp from './components/signup/Signup'
import ResetPassword from './components/home/ResetPassword'
import MainRequest from './containers/requestComp/mainRequest'
import EmialSender from './components/emailSend/EmailSend'
import EmialSender2 from './components/emailSend/EmailSend2'
import LoginDoneHome from './components/LoginDoneHome/MainHome'
import ReqHome from './components/LoginDoneHome/RequestHome'
import MainRequestOld from './containers/requestComp/mainRequestOld'

function App() {
  const ctxUser = useContext(UserContext);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  useEffect(() => {
      const userId = localStorage.getItem("userId", []);
      const userName = localStorage.getItem("userName", []);
      setUserId(userId);
      setUserName(userName);
    }, []);
    // const clickhandle = ()=>{
    //     ctxUser.logout();
    //     setTimeout(() => {
    //       window.location.reload(false);
    //      }, 100);
    // }
  
  return (
    <div className="App">
      <Router>
        {userId? <Menu /> : <></>}
        {userId ? (
        <Switch>
          <Route path="/" exact> 
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <LoginDoneHome />
             </motion.div>
         </Route>
         <Route path="/comp-check" component={MainForm} />
         <Route path="/comp-request" component={ReqHome} exact />
         <Route path="/comp-request/new" component={MainRequest} />
         <Route path="/comp-request/old" component={MainRequestOld} />
         <Route path="/email" component={EmialSender}  />
         <Route path="/email2" component={EmialSender2} />
       </Switch>
        ) : (
          <Switch>
          <Route path="/" exact> 
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <HomeLogin />
             </motion.div>
         </Route>
         <Route path="/comp-check">
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <MainForm />
             </motion.div>
         </Route>
         <Route path="/signup" >
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <SignUp />
             </motion.div>
         </Route>
         <Route path="/changepassword/:id" children={<ResetPassword />}>
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <ResetPassword />
             </motion.div>
         </Route>
       </Switch>
        )}
      </Router>
    </div>
    
  );
}

export default App;


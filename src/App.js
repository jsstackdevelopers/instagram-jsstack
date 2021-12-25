import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './Firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setSigninState } from './Components/App/UserSlice.js';
import { selectUserName } from './Components/App/UserSlice.js';

import Auth from './Components/Auth.js';
import Home from './Components/Home.js';
import Theme from './Components/Theme.js';

const App = () => {
    const currentUser = useSelector(selectUserName);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, async (userCredential) => {
            // console.log(userCredential.uid)
            if (userCredential) {
                dispatch(setSigninState({
                    name: userCredential?.displayName,
                    email: userCredential?.email,
                    uid: userCredential?.uid,
                    photo: userCredential?.photoURL,
                }));
                history.push("/home");
            }
        })
    }, [dispatch, history]);

    return (
        <>
            <Theme />
            <Switch>
                <Router>
                    {!currentUser ? (
                        <Route exact path="/" component={Auth} />
                    ) : (
                        <Route exact path="/home" component={Home} />
                    )}
                </Router>
            </Switch>
        </>
    );
};

export default App;

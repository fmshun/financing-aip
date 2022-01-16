import {
    Router, Route, Switch
} from 'react-router-dom';
import { createHashHistory } from 'history'
import './style.css';
import Nav from './nav/view.jsx';
import UserManage from './user/user-manage/view';
import JobManage from './job/job-manage/view';
import ContactsManage from './info/contacts-manage/view';
import Welcome from './welcome';
import Login from './login/Loginon';

const history = createHashHistory();
function NavRouter(props) {
    return (
        <div className="root">
            <Nav {...props}>
                <Switch>
                    <Route path="/user-manage" >
                        <UserManage />
                    </Route>
                    <Route path="/job/job-manage" >
                        <JobManage />
                    </Route>
                    <Route path="/contacts-manage" >
                        <ContactsManage />
                    </Route>
                    <Route path="/" component={Welcome} />
                </Switch>
            </Nav>
        </div>
    );
}


function Root() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/Login" component={Login} />
                <NavRouter />
            </Switch>
        </Router>
    )
}

export default Root;

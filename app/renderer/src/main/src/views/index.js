import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import Home from './Home/Home';
// import Automatic from './Automatic/Automatic'
// import Manual from './Manual/Manual'
import Mainpage from './MainPage/Mainpage'
import TestPage from './TestPage/TestPage'

import 'antd/dist/antd.css';

class AllPage extends React.Component{
    render(){
        return(
            <>
                <div style={{width:'100vw',height:'100vh'}}>
                    <HashRouter>
                        <Switch>
                            <Route exact path={'/'} component={Mainpage} />
                            <Route exact path={'/test-page'} component={TestPage} />
                            {/* <Route exact path={'/home-page'} component={Home} />
                            <Route exact path={'/automatic-page'} component={Automatic} />
                            <Route exact path={'/manual-page'} component={Manual} /> */}
                        </Switch>
                    </HashRouter>
                </div>
            </>
        )
    }
}

export default AllPage
import React, { Component, Fragment } from 'react'
import { ApolloConsumer } from 'react-apollo';
import Countdown from './CountDown';
import RecentLaunches from './RecentLaunches';
import './Home.scss';

export class Home extends Component {
    render() {
        return (
            <ApolloConsumer>
                { apolloClient => (
                    <Fragment>
                        <div className="container">
                        <Countdown apolloClient={apolloClient} />
                        </div>
                        <RecentLaunches limit="6"></RecentLaunches>
                    </Fragment>
                )}
            </ApolloConsumer>
        )
    }
}

export default Home

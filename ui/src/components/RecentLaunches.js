import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import {Query} from 'react-apollo';
import moment from 'moment';
import './RecentLaunches.scss';

export class RecentLaunches extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: null,
          success: false,
          path_image: null
        };
      }

      PAST_LAUNCHES_QUERY = gql`
        query PastLaunchesQuery {
            launches(scope: past, params: { order: "DESC", limit: ${this.props.limit || 6} }) {
                _id
                launch_success
                launch_date_utc
                links {
                mission_patch_small
                }
            }
        }
    `;

    render() {
        return (
            <Fragment>
                <section>
                <h2 className="recent-launches-title">Recent Missions</h2>
                <Query query={this.PAST_LAUNCHES_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return (<p>Loading...</p>)
                            if (error) console.log(error);

                            //console.log('past launches',data);
                            // We could have created another component for
                            // the past launch item... but we'll do it all here ;) 
                            return <Fragment>
                                <ul className="recent-missions">
                                {
                                    data.launches.map(launch => (
                                        <li key={launch._id}>
                                            <div className="mission">
                                                <img className="patch-image" src={launch.links.mission_patch_small} alt="Mission patch"/>
                                                <div className="info">
                                                    <span className={""+ launch.launch_success ? "text-success":"text-danger"}>
                                                    {launch.launch_success ? 'Successful' : 'Failure'}
                                                    </span>
                                                </div>
                                                <div className="launch-date">
                                                    {moment(new Date(launch.launch_date_utc)).format("MMMM Do YYYY")}
                                                </div>
                                                <div>
                                                    <Link to={`/launch/${launch._id}`} className="btn">Details</Link>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                </ul>
                            </Fragment>
                        }
                    }
                </Query>
                </section>
            </Fragment>
        )
    }
}

export default RecentLaunches

import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import moment from 'moment';
import "./Launch.scss";
import noBadge from '../imgs/no-image.png';
import ImageLoader from './ImageLoader';

const LAUNCH_QUERY = gql`
    query launch($id: String!) {
        launch(id: $id) {
            flight_number
            mission_name
            launch_date_utc
            launch_success
            details
            links {
            article_link
            mission_patch_small
            mission_patch
            presskit
            reddit_campaign
            reddit_launch
            reddit_media
            reddit_recovery
            wikipedia
            video_link
            youtube_id
            flickr_images
            }
            launch_site {
            site_id
            site_name
            site_name_long
            }
            launch_year
            reuse {
            capsule
            core
            fairings
            side_core1
            side_core2
            }
            rocket {
            rocket_id
            rocket_name
            rocket_type
            }
            telemetry {
            flight_club
            }
        }
    }
`;

export class Launch extends Component {


    // This is for demonstration purposes on the ImageLoader Component
    // It'll only fire if the image z-index !== -2
    onBannerClick = () => {
        console.log('Banner clicked!');
    }

    render() {
        //console.log(this.props);
        // the launch id is passed in the URI via props
        // (must match the definition in the route!)
        let { id } =  this.props.match.params;
        //console.log(`Flight id: ${id}`);
        return (
            <Query 
                query={LAUNCH_QUERY}
                variables={{ id: id }}
                >
                {({data, loading, error, refetch, networkStatus}) => {
                    // TODO: show loading overlay
                    if (loading) return ''
                    if (error) {console.log(`Error!: ${error}`)}
                    // TODO: show error overlay
                    if (error) return '';

                    //console.log(data);
                    return (
                        <Fragment>
                            <div className="gradient-bg">
                                {/* Make the image appear gracefully */}
                                <ImageLoader
                                    src={data.launch.links.flickr_images[0]}
                                    onClick={this.onBannerClick}
                                />
                                {/* <img src={data.launch.links.flickr_images[0]} alt="Flickr"/> */}
                                <div className="summary-title">
                                    Mission Summary
                                </div>
                            </div>

                            <div className="summary">
                                
                                
                                <div className="status">
                                <div className={`status-color ${data.launch.launch_success === null ? 'waiting' : data.launch.launch_success  ? "success" : "failure"}`}></div>
                                <span className={`${data.launch.launch_success === null ?
                                     'text-warning' :
                                      data.launch.launch_success ?
                                      "text-success":"text-danger"}`}
                                >
                                    {data.launch.launch_success === null ? 'Waiting' : data.launch.launch_success ? 'Successful' : 'Failure'}
                                </span>
                                    <span className="flight-number">#{data.launch.flight_number}</span>
                                </div>

                                <div className="info">
                                    <div className="badge">
                                        <img src={data.launch.links.mission_patch_small ?
                                            data.launch.links.mission_patch_small :
                                            noBadge} alt="Mission badge" />
                                    </div>
                                    <div className="description">
                                        <p className="mission-name">{data.launch.mission_name}</p>
                                        {data.launch.details}
                                    </div>
                                    <div className="aux-data">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="label">Launch Date:</td>
                                                    <td>{moment(new Date(data.launch.launch_date_utc)).format("MMMM Do YYYY")}</td>
                                                </tr>
                                                <tr>
                                                    <td className="label">Launch Site:</td>
                                                    <td>{data.launch.launch_site.site_name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="label">Rocket Type:</td>
                                                    <td>{data.launch.rocket.rocket_type}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )

                }}
            </Query>
        )
    }
}

export default Launch

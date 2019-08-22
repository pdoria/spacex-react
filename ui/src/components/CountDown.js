import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import moment from "moment";
import './Countdown.scss';

// TODO: use ApolloConsumer instead!

export class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: null,
            timer: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
            },
            nextLaunchDate: null,
            missionName: '',
            missionId: null
        };
    }

    componentDidMount() {
        this.props.apolloClient
        .query({
          query: gql`
            query NextLaunchQuery {
              launches(scope: next, params: {limit: 1}) {
                _id
                mission_name
                launch_date_utc
              }
            }
          `
        })
        .then(res => {
          //console.log(res);
          let launchDate = moment(new Date(res.data.launches[0].launch_date_utc));
          let missionName = res.data.launches[0].mission_name;
          let missionId = res.data.launches[0]._id;
          this.setState({
            missionName: missionName,
            missionId: missionId,
            nextLaunchDate: launchDate
          });
          
          var intervalId = setInterval(() => {this.timer()}, 1000);
          // store intervalId in the state so it can be accessed later:
          this.setState({intervalId: intervalId});
          });
      }
    
      componentWillUnmount() {
        clearInterval(this.state.intervalId);
      }
    
      timer() {
        if (this.state.nextLaunchDate!==null) {
          const now = moment(new Date());
          const diff = this.state.nextLaunchDate.diff(now);
          const duration = moment.duration(diff);
    
          const daysDiff = Math.floor(duration.asDays());
          const hoursDiff = duration.hours();
          const minutesDiff = duration.minutes();
          const secondsDiff = duration.seconds();
          this.setState({
            timer : {
              days: daysDiff,
              hours: hoursDiff,
              minutes: minutesDiff,
              seconds: secondsDiff
            }
          });
        }
      }

    render() {
        return (
            <div className="clock-wrapper">
                <h1 className="mission-name">{this.state.missionName}</h1>
                <p>Next Launch date:</p>
                <p>{this.state.nextLaunchDate ? this.state.nextLaunchDate.format("dddd, MMMM Do YYYY, hh:mm:ssZ") : ''}</p>

                <div className="countdown-wrapper">
                    <div className="timer-wrapper">
                    <div className="block">
                        <span>{this.state.timer.days < 10 ? '0'+this.state.timer.days : this.state.timer.days}</span>
                        <div className="unit">Days</div>
                    </div>
                    <div className="block">
                        <span>{this.state.timer.hours < 10 ? '0'+this.state.timer.hours : this.state.timer.hours}</span>
                        <div className="unit">Hours</div>
                    </div>
                    <div className="block">
                        <span>{this.state.timer.minutes < 10 ? '0'+this.state.timer.minutes : this.state.timer.minutes}</span>
                        <div className="unit">Minutes</div>
                    </div>
                    <div className="block">
                        <span>{this.state.timer.seconds < 10 ? '0'+this.state.timer.seconds : this.state.timer.seconds}</span>
                        <div className="unit">Seconds</div>
                    </div>
                    </div>

                </div>
                {
                    // mission button 
                    this.state.missionId &&
                    <Link to={`/launch/${this.state.missionId}`} className="btn">Mission details</Link>
                }
             </div>
        )
    }
}

export default CountDown

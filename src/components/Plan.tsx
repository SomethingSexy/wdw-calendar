// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardContent,
  Content,
  Image,
  Media,
  MediaContent,
  MediaLeft,
  // Subtitle,
  Title,
} from 'bloomer';
import * as moment from 'moment';
import React, { Component } from 'react';
import { IPlan } from '../types';

interface IProps {
  plan: IPlan;
}

const styles = {
  button: {
    marginRight: '10px'
  },
  card: {
    marginBottom: '10px',
  },
  overlayStyle: {
    display: 'none',
    width: '100%',
    height: '50%',
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#00d1b2',
    opacity: 0.75,
    padding: '20px',
    textAlign: 'center' as 'center'
  },
  plan: {
    position: 'relative' as 'relative'
  }
};

class Plan extends Component<IProps> {
  public render() {
    const { plan } = this.props;
    const { date } = plan;
    const displayDate = moment(date, 'MM/DD/YYYY').format('dddd, MMMM Do YYYY');
    return (
      <div className="plan" style={styles.plan}>
        <Card style={styles.card}>
          <CardContent>
            <Media>
              <MediaLeft>
                <Image isSize="48x48" src="https://via.placeholder.com/96x96" />
              </MediaLeft>
              <MediaContent>
                <Title isSize={4}>New Activity!</Title>
                {/* <Subtitle isSize={6}>@John Wick</Subtitle> */}
              </MediaContent>
            </Media>
            <Content>
              Pick something to do for this time!
              <br/>
              <small>{displayDate}</small>
              {/* <small>11:09 PM - 30 October 2014</small> */}
            </Content>
          </CardContent>
        </Card>
        <div className="overlay" style={styles.overlayStyle}>
          <Button style={styles.button}>Edit</Button>
          <Button>Remove</Button>
        </div>
      </div>
    );
  }
}

export default Plan;

import React, { Component } from 'react';
import Series from './api-serie/PopularSeries'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <Series/>
      </div>
    );
  }
}

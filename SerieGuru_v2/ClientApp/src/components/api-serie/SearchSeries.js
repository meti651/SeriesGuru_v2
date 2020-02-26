import React, { Component } from 'react';
import SeriesList from '../models/SeriesList';
import Loader from '../models/Loader';

export class SearchSeries extends Component {
    static displayName = SearchSeries.name;

    constructor(props) {
        super(props);
        this.state = {
            series: [],
            seriesName: '',
            isFetching: false };
    }




    onSeriesInputChange = ({target: { value }}) => {
        this.setState({
            seriesName: value,
            isFetching: true
        });
        if(value.length > 0){
            fetch('api/serie/search/' + value)
                .then(response => response.json())
                .then(series => {
                    this.setState({
                        series,
                        isFetching: false
                    });
                });
        }

    };

    BlurHandle = () => {
        setTimeout(() => this.setState({series: []}), 300 );
    };


    render() {
        const { series, seriesName, isFetching } = this.state;
        let searchResults;
        if(isFetching) {
            searchResults = <Loader />;
        }else if (!isFetching) {
            searchResults = <SeriesList list={series} id="mainContainer"/>;
        }
        return (
            
            <div id="searchDiv" onBlur={this.BlurHandle}>
                <input
                    className="searchResult"
                    id="searchInput"
                    value={seriesName}
                    type="text"
                    placeholder="Search"
                    onChange={this.onSeriesInputChange}
                    onFocus={this.onSeriesInputChange}
                    />
                {searchResults}
            </div>
        )
    }
}

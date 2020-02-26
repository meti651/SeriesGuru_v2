import React, { Component } from 'react';
import SerieCard from '../models/SerieCard';
import Loader from '../models/Loader';
import {Table} from "reactstrap";

class Series extends Component {
    static displayName = Series.name;

    constructor(props) {
        super(props);
        this.state = { series: [], loading: true };
    }

    componentDidMount() {
        this.populatePopulareSerieData();
    }

    async populatePopulareSerieData() {
        const response = await fetch('api/serie/popularSeries');
        const data = await response.json();
        this.setState({ series: data, loading: false });
    }

    
    createTable = (series) => {
        let table = [];
        for (let i = 0; i < series.length / 4; i++) {
            let row = [];
            for (let amount = 0; amount < 4; amount++) {
                if (series[amount + i * 4] === undefined) {
                    table.push(<tr >{row}</tr>);
                    return table;
                }
                row.push(<td key={series[amount + i * 4].ids.slug}><SerieCard  serie={series[amount + i * 4]} /></td>);

                
            }
            table.push(<tr key={(i).toString()}>{row}</tr>);
        }
        return table;
    };

    renderPopularSeriesTable = (series) => {
        return (
            <Table striped className="mainSeries">
                <tbody>
                    {this.createTable(series)}
                </tbody>
            </Table>
        );
    };

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPopularSeriesTable(this.state.series);

        return (
            <div className="popularSeriesContainer">
                {contents}
            </div>
        );
    }
}

export default Series;

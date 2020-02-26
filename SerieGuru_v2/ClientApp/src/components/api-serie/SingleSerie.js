import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Loader from '../models/Loader';
import NoImage from "../../images/No-image-found.jpg";
import SaveSeriesService from "../api-user/SaveSeriesService";
import ReactPlayer from "react-player";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class SingleSeries extends Component {
    state = {
        show: null
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch("api/serie/" + id).then(response => response.json()).then(
            json => this.setState({ show: json })
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params !== prevProps.match.params) {
            const { id } = this.props.match.params;
            fetch("api/serie/" + id).then(response => response.json()).then(
                json => this.setState({ show: json })
            );
        }

    }

    saveSeries = async (show) => {
        const saveService = new SaveSeriesService(show);
        await saveService.saveSeries();
    };

    render() {
        const { show } = this.state;
        if(show !== null) console.log(show);
        return (
            <div>
                {show === null && <Loader />}
                {
                    show !== null &&
                    <div>
                        <p>{show.title}</p>
                        <div className="videoContainer">
                            { show.trailer === null && <p>There is no trailer for the show</p>}
                            { show.trailer !== null && <ReactPlayer url={show.trailer}/>}
                        </div>
                        <p>Premiered: {show.year}</p>
                        <Rating name="read-only" value={show.rating}
                                precision={0.5}
                                max={10}
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                readOnly />
                        <p>Episodes: {show.airedEpisodes}</p>
                        <p>Overview: {show.overview}</p>
                        <p>
                            {show.images.banner.full !== null && <img alt="show" src={show.images.banner} onError={(e) => { e.target.onError = null }} />}
                            {show.images.banner.full === null && <img src={NoImage} alt="Image"/>}
                        </p>
                        <Button onClick={() => this.saveSeries(show)} className="saveSerie" variant="secondary" size="sm">Save</Button>

                    </div>
                }
            </div>
        )
    }
}

export default SingleSeries;

import React from 'react';
import Loader from './Loader';
import './SerieCard.css';
import {Link, NavLink} from "react-router-dom";
import NoImage from '../../images/No-image-found.jpg';

const seriCard = serie => {
    let overview = serie.serie.overview.substring(0, 200) + "...";
    return (
        <div key={serie.ids} className="serieCard">
            <NavLink to={`/serie/${serie.serie.ids.slug}`} className="mainSeriesListItem">
                <div className="imageContainer">
                    {serie.image !== undefined && <img src={serie.image} alt="Image"/>}
                    {serie.image === undefined && <img src={NoImage} alt="Image"/>}
                </div>
                <div className="informationsContainer">
                    <div className="titleContainer">{serie.serie.title}</div>
                    <span>Overview:</span>
                    <div className="descriptionContainer">{overview}</div>
                    <div className="statusContainer">Status: {serie.serie.status.objectName}</div>
                    <span>Genres:</span>
                    <div className="genreContainer">{serie.serie.genres.map(genre => "#" + genre + "  ")}</div>
                </div>
            </NavLink>
        </div>
    )

};

export default seriCard;
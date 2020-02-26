import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './SeriesList.css';
import NoImage from '../../images/No-image-found.jpg'

const SeriesListItem = ({series}) => (
  <li>
      {series.show.images !== null && <img className="searchResultImage" src={series.show.images} alt="Image"/>}
      {series.show.images === null && <img className="searchResultImage" src={NoImage} alt="Image" /> }
    <div className="searchResultTitle">
      {series.show.title}
    </div>
  </li>
);


const SeriesList = (props) => {
  return (
    <div className="searchResult">
      <ul className="series-list">
        {props.list.map(series => (
            <NavLink to={`/serie/${series.show.ids.slug}`} className="seriesListItem">
                <SeriesListItem key={series.show.id} series={series} />
            </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SeriesList;
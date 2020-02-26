import React from 'react';
import authService from "../api-authorization/AuthorizeService";
import history from "../../utility/history";
import {ApplicationPaths} from "../api-authorization/ApiAuthorizationConstants";


class SaveSeriesService{
    _series = null;
    _user = null;

    constructor(series) {
        this._series = series;
    }

    initialUserId = async () => {
        const user = await authService.getUser();
        const token = await authService.getAccessToken();
        await fetch('api/user/id', {
            method: 'POST',
            body: JSON.stringify(user.name),
            headers: !token ? {'Content-Type': 'application/json'} : { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(user => {
                this._user = user;
            });

    };

    saveSeries = async () => {
        if(await authService.isAuthenticated()) {
            await this.initialUserId();
            const requestSeries = { "Name" : this._series.title.toString(), "UserId": this._user.id.toString()};
            await fetch('api/series', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestSeries)
            })
                .then(response => response.json())
                .then(json => console.log(json));
        }else {
            window.location.assign(ApplicationPaths.Login);
        }

    }

}

export default SaveSeriesService;
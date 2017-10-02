import db from '../db';

export default class Site {
    model = {
        name: ''
    }

    constructor(site) {
        this.model.name = site.name;
    }
};
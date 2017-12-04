import db from '../db'

export default class Site {
	model = {
		title: '',
		url: '',
		pages: []
	}

	constructor(newSite) {
		this.model.id = newSite.id ? newSite.id : db.get('sites').size() + 1;
		this.model.title = newSite.title;
		this.model.url = newSite.url;
		this.model.pages = newSite.pages;
	}

};

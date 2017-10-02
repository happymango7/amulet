import db from '../db'

export default class Page {
	model = {
		title: '',
		slug: '',
		content: []
	}

	constructor(newPage) {
		this.model.id = newPage.id ? newPage.id : db.get('pages').size() + 1;
		this.model.title = newPage.title;
		this.model.slug = newPage.slug;
		this.model.content = newPage.content;
	}

};

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ArticlesArticleRoute extends Route {
  @service store;

  model(params) {
    let article = this.store.peekAll('article', params.id);
    if (!article) {
      console.log('sorry, no article for this one ' + params.id);
    }
    console.log(`found it: ${article}`);
    return this.store.findRecord('article', params.id);
  }

  // make sure that tags are loaded in ember-data before template is rendered
  // to ensure fastboot has all data on time
  // (note: "before the template is rendered" meaning it pauses the render of the route)
  async afterModel(model) {
    await model.get('tags');
    await model.get('authors');
    return model;
  }
}

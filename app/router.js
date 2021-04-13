import EmberRouter from '@ember/routing/router';
import config from 'thezendevapp/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('articles', function () {
    this.route('article', { path: '/:id' });
  });
});

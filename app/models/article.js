import Model, { attr, hasMany } from '@ember-data/model';

export default class articleModel extends Model {
  @attr content;
  @attr created;
  @attr html;
  @attr image;
  @attr title;
  @attr unsplashtext;
  @attr unsplashurl;
  @hasMany('author') authors;
  @hasMany('tag') tags;

  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  createdAt;
}

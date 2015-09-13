import Ember from 'ember';
import d3 from 'd3';
import { module, test } from 'qunit';
import VisualModel from 'dummy/models/visual';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | gallery', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /gallery', assert => {
  visit('/gallery');

  andThen(() => {
    assert.equal(currentURL(), '/gallery');
  });

  VisualModel.FIXTURES.forEach(({ id }) => {
    var pathname = `/${id.replace(/\./g, '/')}`;

    visit(pathname);

    andThen(() => {
      assert.equal(currentURL(), pathname, `Successfully rendered ${id} without errors`);
      assert.ok(d3.selectAll('#ember-testing .shape').length, 'Shapes are rendered');
    });
  });
});

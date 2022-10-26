import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Changeset, lookupValidator } from 'validated-changeset';
import { validatePresence } from 'ember-changeset-validations/validators';
import { BufferedChangeset } from 'validated-changeset';

const CHANGESET: BufferedChangeset = Changeset(
  { name: 'John Doe' },
  lookupValidator({
    name: validatePresence(true),
  }),
  {
    name: validatePresence(true),
  }
);

module('Integration | Component | validated-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('changeset', CHANGESET);

    await render(
      hbs`<ValidatedInput @changeset={{this.changeset}} @valuePath="name"/>`
    );

    assert.strictEqual(this.element.querySelector('input')?.value, 'John Doe');
  });

  test('it populates attributes on wrapper DIV', async function (assert) {
    this.set('changeset', CHANGESET);

    await render(
      hbs`<ValidatedInput @changeset={{this.changeset}} @valuePath="name" data-test='testing'/>`
    );

    assert.strictEqual(
      this.element.querySelector('div')?.getAttribute('data-test'),
      'testing'
    );
  });

  test('it populates label element', async function (assert) {
    this.set('changeset', CHANGESET);

    await render(
      hbs`<ValidatedInput @changeset={{this.changeset}} @valuePath="name" @label='testing'/>`
    );

    assert.strictEqual(
      this.element.querySelector('label')?.textContent?.trim(),
      'testing'
    );
  });

  test('it params are set', async function (assert) {
    this.set('changeset', CHANGESET);

    await render(
      hbs`
        <ValidatedInput
          @changeset={{this.changeset}}
          @valuePath="name"
          @type="text"
          @id='testing-id'
          @name='testing-name'
          @placeholder= 'testing-placeholder'
          @disabled={{true}}
          @autocomplete='testing-autocomplete'
          @inputClass='testing-class'
        />
      `
    );

    assert.strictEqual(
      this.element.querySelector('input')?.getAttribute('id'),
      'testing-id'
    );

    assert.strictEqual(
      this.element.querySelector('input')?.getAttribute('name'),
      'testing-name'
    );

    assert.strictEqual(
      this.element.querySelector('input')?.getAttribute('type'),
      'text'
    );

    assert.strictEqual(
      this.element.querySelector('input')?.getAttribute('placeholder'),
      'testing-placeholder'
    );

    assert.strictEqual(
      this.element.querySelector('input')?.getAttribute('autocomplete'),
      'testing-autocomplete'
    );

    assert.strictEqual(
      this.element.querySelector('input')?.hasAttribute('disabled'),
      true
    );

    assert.true(
      this.element
        .querySelector('input')
        ?.getAttribute('class')
        ?.includes('testing-class')
    );
  });
});

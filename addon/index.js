import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';
import Changeset from 'ember-changeset';

export function buildChangeset(model) {
  assert('Object does not contain any validations', typeOf(model.get('validations')) === 'object');

  return {
    validationMap: model.get('validations.validatableAttributes').reduce((o, attr) => {
      o[attr] = () => {};
      return o;
    }, {}),

    validateFn: ({ key, newValue }) => {
      const { validations } = model.validateAttribute(key, newValue);

      return validations.isValid ? true : validations.message;
    }
  };
}

export default function createChangeset(model, fn) {
  let { validateFn, validationMap } = buildChangeset(model);
  let _fn;

  if (fn && typeof fn === 'function') {
    _fn = function() {
      return fn(...arguments, validateFn);
    };
  }

  return new Changeset(model, _fn || validateFn, validationMap);
}

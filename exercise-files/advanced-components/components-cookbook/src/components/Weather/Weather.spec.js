import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import AuthenticatedContent from './AuthenticatedContent';

describe('<AuthenticatedContent />', () => {
  describe('rendering', () => {
    it('contains text', () => {
      const local = shallow(<AuthenticatedContent />);
    });
  });
});

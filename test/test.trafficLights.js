'use strict';
const assert = chai.assert;

describe('The trafficLight function', () => {
  let trafficLight;
  let dummyData;

  before(() => {
    dummyData = {
      frequency: 10,
      service: 'fakeService',
      url: 'http://localhost/fake-service'
    };
    trafficLight = new TrafficLight(dummyData);
  });

  it('should be an instance of TrafficLight', () => {
    assert.instanceOf(trafficLight, TrafficLight);
  });

  describe('renderTrafficLight method', () => {
    it('is a function', () => {
      assert.isFunction(trafficLight.renderTrafficLight);
    });

    it('should render a trafficLight object', () => {
      $('<div id="test-container"></div>').appendTo('body');
      trafficLight.renderTrafficLight('test-container');
      assert.equal($('#fakeService-status').length, 1);
      $('#test-container').remove();
    });
  });

  describe('updateHistory method', () => {
    it('is a function', () => {
      assert.isFunction(trafficLight.updateHistory);
    });

    it('should update the instance history array', () => {
      trafficLight.history = [200, 404, 200];
      let updatedHistory = [200, 404, 200, 200];
      trafficLight.updateHistory(200);
      assert.deepEqual(trafficLight.history, updatedHistory);
    });
  });

  describe('toggleLight method', () => {
    beforeEach(() => {
      $('<div id="test-container"></div>').appendTo('body');
    });

    it('is a function', () => {
      assert.isFunction(trafficLight.toggleLight);
    });

    it('should turn off the green light and turn on the blinking red light', () => {
      trafficLight.renderTrafficLight('test-container');
      trafficLight.toggleLight('red', 'green');
      assert.equal($('#fakeService-green').hasClass('green-on'), false);
      assert.equal($('#fakeService-red').hasClass('red-on'), true);
      assert.equal($('#fakeService-red').hasClass('blink'), true);
    });

    it('should turn on the green light and turn off red light', () => {
      trafficLight.renderTrafficLight('test-container');
      trafficLight.toggleLight('green', 'red');
      assert.equal($('#fakeService-green').hasClass('green-on'), true);
      assert.equal($('#fakeService-red').hasClass('red-on'), false);
      assert.equal($('#fakeService-red').hasClass('blink'), false);
    });

    afterEach(() => {
      $('#test-container').remove();
    });
  });

  describe('updateLights method', () => {
    it('is a function', () => {
      assert.isFunction(trafficLight.updateLights);
    });

    describe('calls toggleLight with the correct params', () => {
      let stub;

      beforeEach(() => {
        stub = sinon.stub(trafficLight, 'toggleLight');
      });

      afterEach(() => {
        stub.restore();
      });

      it('when history array length < 3 and the last element is not 200', () => {
        trafficLight.history = [200, 404]
        trafficLight.updateLights();
        sinon.assert.calledWith(stub, 'red', 'green');
      });

      it('when history array length < 3 and the last element is 200', () => {
        trafficLight.history = [200, 200]
        trafficLight.updateLights();
        sinon.assert.calledWith(stub, 'green', 'red');
      });

      it('when history array length > 3 and there are less than 3 200 statuses', () => {
        trafficLight.history = [404, 200, 200, 404, 500]
        trafficLight.updateLights();
        sinon.assert.calledWith(stub, 'red', 'green');
      });

      it('when history array length > 3 and there are over 3 200 statuses', () => {
        trafficLight.history = [404, 200, 200, 404, 500]
        trafficLight.updateLights();
        sinon.assert.calledWith(stub, 'red', 'green');
      });
    })
  });

  describe('checkUrl method', () => {
    it('is a function', () => {
      assert.isFunction(trafficLight.checkUrl);
    });

    it('makes an ajax call', (done) => {
      sinon.spy($, "ajax");
      trafficLight.checkUrl(dummyData);
      assert.equal($.ajax.calledOnce, true);
      assert.equal($.ajax.getCall(0).args[0].url, 'http://localhost/fake-service');
      done();
      $.ajax.restore();
    });
  });

  describe('watch method', () => {
    it('is a function', () => {
      assert.isFunction(trafficLight.watch);
    });

    it('invokes the checkUrl method', (done) => {
      sinon.stub(trafficLight, 'checkUrl').returns(null);
      trafficLight.watch();
      assert.equal(trafficLight.checkUrl.calledOnce, true);
      done();
      clearInterval(this.watch.startWatch)
      trafficLight.checkUrl.restore();
    });
  });

});

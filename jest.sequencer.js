const Sequencer = require("@jest/test-sequencer").default;

class CustomerSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((firstTest, secondTest) =>
      firstTest.path > secondTest.path ? 1 : -1
    );
  }
}

module.exports = CustomerSequencer;

format = require('modules/format/main')

describe 'hx-format tests', ->
  check = (a, b) -> a.should.equal(b)

  it "round works",  ->
    check format.round(2)(123), '120'
    check format.round(3)(1234), '1230'
    check format.round(3)(0.00234), '0.00234'
    check format.round(2)(0.00234), '0.0023'
    check format.round(2)(0.00000234), '0.0000023'
    check format.round(2)(0.00000237), '0.0000024'
    check format.round(2)(1), '1'
    check format.round(2)(9), '9'
    check format.round(1)(10), '10'
    check format.round(1)(101), '100'
    check format.round(3)(10101), '10100'
    check format.round(1)(10101), '10000'
    check format.round(1)(1010101), '1000000'
    check format.round(5)(1010101), '1010100'
    check format.round(2)(-123), '-120'
    check format.round(3)(-1234), '-1230'
    check format.round(3)(-0.00234), '-0.00234'
    check format.round(2)(-0.00234), '-0.0023'
    check format.round(2)(-0.00000234), '-0.0000023'
    check format.round(2)(-0.00000237), '-0.0000024'
    check format.round(2)(-1), '-1'
    check format.round(2)(-9), '-9'
    check format.round(1)(-10), '-10'
    check format.round(1)(-101), '-100'
    check format.round(3)(-10101), '-10100'
    check format.round(1)(-10101), '-10000'
    check format.round(1)(-1010101), '-1000000'
    check format.round(5)(-1010101), '-1010100'

    check format.round(2, true)('string test'), "NaN"
    check format.round(2, false)('string test'), "string test"
    check format.round(2)('string test'), "string test"

  it "si works",  ->
    check format.si(2)(123), '120'
    check format.si(3)(1234), '1.23K'
    check format.si(3)(0.00234), '2340µ'
    check format.si(2)(0.00234), '2300µ'
    check format.si(2)(0.00000234), '2.3µ'
    check format.si(2)(0.00000237), '2.4µ'
    check format.si(2)(1), '1'
    check format.si(2)(9), '9'
    check format.si(1)(10), '10'
    check format.si(1)(101), '100'
    check format.si(3)(10101), '10.1K'
    check format.si(1)(10101), '10K'
    check format.si(1)(1010101), '1M'
    check format.si(5)(1010101), '1.0101M'
    check format.si(2)(-123), '-120'
    check format.si(3)(-1234), '-1.23K'
    check format.si(3)(-0.00234), '-2340µ'
    check format.si(2)(-0.00234), '-2300µ'
    check format.si(2)(-0.00000234), '-2.3µ'
    check format.si(2)(-0.00000237), '-2.4µ'
    check format.si(2)(-1), '-1'
    check format.si(2)(-9), '-9'
    check format.si(1)(-10), '-10'
    check format.si(1)(-101), '-100'
    check format.si(3)(-10101), '-10.1K'
    check format.si(1)(-10101), '-10K'
    check format.si(1)(-1010101), '-1M'
    check format.si(5)(-1010101), '-1.0101M'
    check format.si(2)(-0.0062), "-6200µ"
    check format.si(3)(1.1e27), "1100Y"
    check format.si(3)(1.1e28), "11000Y"
    check format.si(3)(1.1e29), "110000Y"
    check format.si(3)(1.1e30), "1100000Y"

    check format.si(2, true)('string test'), "NaN"
    check format.si(2, false)('string test'), "string test"
    check format.si(2)('string test'), "string test"

  it "exp works",  ->
    check format.exp(2)(123), '1.2e2'
    check format.exp(2)(1234), '1.2e3'
    check format.exp(2)(12345), '1.2e4'
    check format.exp(2)(-123), '-1.2e2'
    check format.exp(2)(-1234), '-1.2e3'
    check format.exp(2)(-12345), '-1.2e4'
    check format.exp(1)(123), '1e2'
    check format.exp(1)(1234), '1e3'
    check format.exp(1)(12345), '1e4'
    check format.exp(1)(-123), '-1e2'
    check format.exp(1)(-1234), '-1e3'
    check format.exp(1)(-12345), '-1e4'
    check format.exp(1)(192), '2e2'
    check format.exp(1)(1923), '2e3'
    check format.exp(1)(19234), '2e4'
    check format.exp(1)(-192), '-2e2'
    check format.exp(1)(-1923), '-2e3'
    check format.exp(1)(-19234), '-2e4'
    check format.exp(1)(0.0192), '2e-2'
    check format.exp(1)(0.001923), '2e-3'
    check format.exp(1)(0.0019234), '2e-3'
    check format.exp(1)(-0.00192), '-2e-3'
    check format.exp(1)(-0.0001923), '-2e-4'
    check format.exp(1)(-0.000019234), '-2e-5'

    check format.exp(2, true)('string test'), "NaN"
    check format.exp(2, false)('string test'), "string test"
    check format.exp(2)('string test'), "string test"

  it "fixed works",  ->
    check format.fixed(2)(123), "123.00"
    check format.fixed(2)(1234), "1234.00"
    check format.fixed(2)(12345), "12345.00"
    check format.fixed(2)(-123), "-123.00"
    check format.fixed(2)(-1234), "-1234.00"
    check format.fixed(2)(-12345), "-12345.00"
    check format.fixed(1)(123), "123.0"
    check format.fixed(1)(1234), "1234.0"
    check format.fixed(1)(12345), "12345.0"
    check format.fixed(1)(-123), "-123.0"
    check format.fixed(1)(-1234), "-1234.0"
    check format.fixed(1)(-12345), "-12345.0"
    check format.fixed(1)(192), "192.0"
    check format.fixed(1)(1923), "1923.0"
    check format.fixed(1)(19234), "19234.0"
    check format.fixed(1)(-192), "-192.0"
    check format.fixed(1)(-1923), "-1923.0"
    check format.fixed(1)(-19234), "-19234.0"
    check format.fixed(1)(0.192), "0.2"
    check format.fixed(1)(0.001923), "0.0"
    check format.fixed(1)(0.0019234), "0.0"
    check format.fixed(1)(-0.00192), "-0.0"
    check format.fixed(1)(-0.0001923), "-0.0"
    check format.fixed(1)(-0.000019234), "-0.0"
    check format.fixed(2)(1.234), "1.23"
    check format.fixed(2)(-1.234), "-1.23"
    check format.fixed(2)(10.234), "10.23"
    check format.fixed(2)(-10.234), "-10.23"

    check format.fixed(2, true)('string test'), "NaN"
    check format.fixed(2, false)('string test'), "string test"
    check format.fixed(2)('string test'), "string test"

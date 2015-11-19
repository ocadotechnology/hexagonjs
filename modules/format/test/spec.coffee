describe 'hx-format tests', ->
  check = (a, b) -> expect(a).toEqual(b)

  it "round works",  ->
    check hx.format.round(2)(123), '120'
    check hx.format.round(3)(1234), '1230'
    check hx.format.round(3)(0.00234), '0.00234'
    check hx.format.round(2)(0.00234), '0.0023'
    check hx.format.round(2)(0.00000234), '0.0000023'
    check hx.format.round(2)(0.00000237), '0.0000024'
    check hx.format.round(2)(1), '1'
    check hx.format.round(2)(9), '9'
    check hx.format.round(1)(10), '10'
    check hx.format.round(1)(101), '100'
    check hx.format.round(3)(10101), '10100'
    check hx.format.round(1)(10101), '10000'
    check hx.format.round(1)(1010101), '1000000'
    check hx.format.round(5)(1010101), '1010100'
    check hx.format.round(2)(-123), '-120'
    check hx.format.round(3)(-1234), '-1230'
    check hx.format.round(3)(-0.00234), '-0.00234'
    check hx.format.round(2)(-0.00234), '-0.0023'
    check hx.format.round(2)(-0.00000234), '-0.0000023'
    check hx.format.round(2)(-0.00000237), '-0.0000024'
    check hx.format.round(2)(-1), '-1'
    check hx.format.round(2)(-9), '-9'
    check hx.format.round(1)(-10), '-10'
    check hx.format.round(1)(-101), '-100'
    check hx.format.round(3)(-10101), '-10100'
    check hx.format.round(1)(-10101), '-10000'
    check hx.format.round(1)(-1010101), '-1000000'
    check hx.format.round(5)(-1010101), '-1010100'

    check hx.format.round(2, true)('string test'), "NaN"
    check hx.format.round(2, false)('string test'), "string test"
    check hx.format.round(2)('string test'), "string test"

  it "si works",  ->
    check hx.format.si(2)(123), '120'
    check hx.format.si(3)(1234), '1.23K'
    check hx.format.si(3)(0.00234), '2340µ'
    check hx.format.si(2)(0.00234), '2300µ'
    check hx.format.si(2)(0.00000234), '2.3µ'
    check hx.format.si(2)(0.00000237), '2.4µ'
    check hx.format.si(2)(1), '1'
    check hx.format.si(2)(9), '9'
    check hx.format.si(1)(10), '10'
    check hx.format.si(1)(101), '100'
    check hx.format.si(3)(10101), '10.1K'
    check hx.format.si(1)(10101), '10K'
    check hx.format.si(1)(1010101), '1M'
    check hx.format.si(5)(1010101), '1.0101M'
    check hx.format.si(2)(-123), '-120'
    check hx.format.si(3)(-1234), '-1.23K'
    check hx.format.si(3)(-0.00234), '-2340µ'
    check hx.format.si(2)(-0.00234), '-2300µ'
    check hx.format.si(2)(-0.00000234), '-2.3µ'
    check hx.format.si(2)(-0.00000237), '-2.4µ'
    check hx.format.si(2)(-1), '-1'
    check hx.format.si(2)(-9), '-9'
    check hx.format.si(1)(-10), '-10'
    check hx.format.si(1)(-101), '-100'
    check hx.format.si(3)(-10101), '-10.1K'
    check hx.format.si(1)(-10101), '-10K'
    check hx.format.si(1)(-1010101), '-1M'
    check hx.format.si(5)(-1010101), '-1.0101M'
    check hx.format.si(2)(-0.0062), "-6200µ"
    check hx.format.si(3)(1.1e27), "1100Y"
    check hx.format.si(3)(1.1e28), "11000Y"
    check hx.format.si(3)(1.1e29), "110000Y"
    check hx.format.si(3)(1.1e30), "1100000Y"

    check hx.format.si(2, true)('string test'), "NaN"
    check hx.format.si(2, false)('string test'), "string test"
    check hx.format.si(2)('string test'), "string test"

  it "exp works",  ->
    check hx.format.exp(2)(123), '1.2e2'
    check hx.format.exp(2)(1234), '1.2e3'
    check hx.format.exp(2)(12345), '1.2e4'
    check hx.format.exp(2)(-123), '-1.2e2'
    check hx.format.exp(2)(-1234), '-1.2e3'
    check hx.format.exp(2)(-12345), '-1.2e4'
    check hx.format.exp(1)(123), '1e2'
    check hx.format.exp(1)(1234), '1e3'
    check hx.format.exp(1)(12345), '1e4'
    check hx.format.exp(1)(-123), '-1e2'
    check hx.format.exp(1)(-1234), '-1e3'
    check hx.format.exp(1)(-12345), '-1e4'
    check hx.format.exp(1)(192), '2e2'
    check hx.format.exp(1)(1923), '2e3'
    check hx.format.exp(1)(19234), '2e4'
    check hx.format.exp(1)(-192), '-2e2'
    check hx.format.exp(1)(-1923), '-2e3'
    check hx.format.exp(1)(-19234), '-2e4'
    check hx.format.exp(1)(0.0192), '2e-2'
    check hx.format.exp(1)(0.001923), '2e-3'
    check hx.format.exp(1)(0.0019234), '2e-3'
    check hx.format.exp(1)(-0.00192), '-2e-3'
    check hx.format.exp(1)(-0.0001923), '-2e-4'
    check hx.format.exp(1)(-0.000019234), '-2e-5'

    check hx.format.exp(2, true)('string test'), "NaN"
    check hx.format.exp(2, false)('string test'), "string test"
    check hx.format.exp(2)('string test'), "string test"

  it "fixed works",  ->
    check hx.format.fixed(2)(123), "123.00"
    check hx.format.fixed(2)(1234), "1234.00"
    check hx.format.fixed(2)(12345), "12345.00"
    check hx.format.fixed(2)(-123), "-123.00"
    check hx.format.fixed(2)(-1234), "-1234.00"
    check hx.format.fixed(2)(-12345), "-12345.00"
    check hx.format.fixed(1)(123), "123.0"
    check hx.format.fixed(1)(1234), "1234.0"
    check hx.format.fixed(1)(12345), "12345.0"
    check hx.format.fixed(1)(-123), "-123.0"
    check hx.format.fixed(1)(-1234), "-1234.0"
    check hx.format.fixed(1)(-12345), "-12345.0"
    check hx.format.fixed(1)(192), "192.0"
    check hx.format.fixed(1)(1923), "1923.0"
    check hx.format.fixed(1)(19234), "19234.0"
    check hx.format.fixed(1)(-192), "-192.0"
    check hx.format.fixed(1)(-1923), "-1923.0"
    check hx.format.fixed(1)(-19234), "-19234.0"
    check hx.format.fixed(1)(0.192), "0.2"
    check hx.format.fixed(1)(0.001923), "0.0"
    check hx.format.fixed(1)(0.0019234), "0.0"
    check hx.format.fixed(1)(-0.00192), "-0.0"
    check hx.format.fixed(1)(-0.0001923), "-0.0"
    check hx.format.fixed(1)(-0.000019234), "-0.0"
    check hx.format.fixed(2)(1.234), "1.23"
    check hx.format.fixed(2)(-1.234), "-1.23"
    check hx.format.fixed(2)(10.234), "10.23"
    check hx.format.fixed(2)(-10.234), "-10.23"

    check hx.format.fixed(2, true)('string test'), "NaN"
    check hx.format.fixed(2, false)('string test'), "string test"
    check hx.format.fixed(2)('string test'), "string test"

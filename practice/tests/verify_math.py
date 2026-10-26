"""Independent arithmetic checks; no use of the JavaScript grading engine."""
import json
import math
from fractions import Fraction
from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'courses/corporate-finance'
course = json.loads((root / 'course.json').read_text())
questions = {q['id']: q for u in course['units'] for f in u['lessons'] for q in json.loads((root / f['file']).read_text())['questions']}

compound = (math.sqrt(1.25 * .80) - 1) * 100
assert compound == int(compound)
no_price = 1 / 1.25 - .25
capm = 3 + 2 * (9 - 3)
assert capm == int(capm)
checks = {
    'lec15-compound-round-trip': compound,
    'lec16-no-price': no_price,
    'lec16-replication': 800 * .25 + 200 * no_price,
    'lec18-cost-equity': capm,
    'lec18-alpha': 13.4 - (3 + 1.4 * (9 - 3)),
    'prep1-market-premium': 11 - 3,
    'prep1-capm': 3 + 1.5 * (11 - 3),
    'prep2-mm-equity': 10 + .5 * (10 - 4),
    'prep3-wacc': .5 * 14 + .5 * 8 * (1 - .25),
    'prep3-tax-shield': .20 * 80,
    'lec19-equity-return': 12 + 1 * (12 - 4),
    'lec19-wacc': Fraction(100, 150) * 14 + Fraction(50, 150) * 8,
    'lec19-unlever-beta': 3 / (1 + 2),
    'lec20-annual-shield': .25 * .08 * 100,
    'lec20-levered-value': 360 + .25 * 160,
    'lec20-after-tax-wacc': .5 * 18 + .5 * 8 * (1 - .25),
    'lec20-buyback-price': (480 + .20 * 120) / 12,
}
for name, answer in checks.items():
    assert math.isclose(questions[name]['answer'], answer, abs_tol=1e-12), (name, answer)
assert set(checks) == {key for key, q in questions.items() if q['type'] == 'numerical'}
assert math.isclose(100 * 1.25 * .8, 100)
assert (25 - 20) / 2 == 2.5
assert not math.isclose(100 * 1.025**2, 100)
assert math.isclose(1 - .85, .15)
assert math.isclose((.25 + no_price) * 1.25, 1)
assert 800 * 1 + 200 * 0 == 800 and 800 * 0 + 200 * 1 == 200
assert math.isclose(capm - 3, 12)
assert 3 + .5 * 6 == 6 < 10 < 12 == 3 + 1.5 * 6
assert questions['lec18-project-hurdle']['answer'] == 'reject'
assert all(float(v).is_integer() for k, v in checks.items() if k.startswith('prep'))
assert (1 / 3) * 3 + (2 / 3) * 0 == 1
assert 400 - 160 == 240
assert 480 / 12 == 40 and (.20 * 120) / 12 == 2
assert math.isclose((504 - 120) / (12 - 120 / 42), 42)
assert all(float(v).is_integer() for k, v in checks.items() if k.startswith(('lec19-', 'lec20-')))
print(f'Verified all {len(checks)} numeric answers, compounding, replication, CAPM, MM, WACC, beta and tax-shield/buyback arithmetic.')

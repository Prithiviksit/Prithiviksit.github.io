"""Independent arithmetic checks; no use of the JavaScript grading engine."""
import json
import math
from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'courses/corporate-finance'
course = json.loads((root / 'course.json').read_text())
questions = {q['id']: q for u in course['units'] for f in u['lessons'] for q in json.loads((root / f['file']).read_text())['questions']}

compound = (math.sqrt(1.40 * .90) - 1) * 100
no_price = 1 / 1.25 - .25
capm = 3 + 1.4 * (9 - 3)
checks = {
    'lec15-compound-return': round(compound, 2),
    'lec16-no-price': no_price,
    'lec16-replication': 800 * .25 + 200 * no_price,
    'lec18-required-return': capm,
    'lec18-alpha': 13.4 - capm,
}
for name, answer in checks.items():
    assert math.isclose(questions[name]['answer'], answer, abs_tol=1e-12), (name, answer)
assert set(checks) == {key for key, q in questions.items() if q['type'] == 'numerical'}
assert math.isclose(100 * 1.4 * .9, 126)
assert (40 - 10) / 2 == 15
assert not math.isclose(100 * 1.15**2, 126)
assert math.isclose(1 - .85, .15)
assert math.isclose((.25 + no_price) * 1.25, 1)
assert 800 * 1 + 200 * 0 == 800 and 800 * 0 + 200 * 1 == 200
assert math.isclose(capm - 3, 8.4)
assert 3 + .5 * 6 == 6 < 10 < 12 == 3 + 1.5 * 6
assert questions['lec18-project-hurdle']['answer'] == 'reject'
print('Verified all five numeric answers, compounding versus arithmetic means, arbitrage profit, both replication states, CAPM premiums and project hurdles.')

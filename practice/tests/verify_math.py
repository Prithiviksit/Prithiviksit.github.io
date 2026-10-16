"""Independent arithmetic checks: no use of the JavaScript grading engine."""
import json
import math
from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'courses/corporate-finance'
course = json.loads((root / 'course.json').read_text())
questions = {q['id']: q for u in course['units'] for f in u['lessons'] for q in json.loads((root / f).read_text())['questions']}

expected_a = .8 * 20 + .2 * -40
expected_b = .8 * -5 + .2 * 60
checks = {
    'expected-return': expected_a,
    'risk-premium': 10 - 4,
    'offset-portfolio': .5 * -20 + .5 * 40,
    'levered-loss': ((100 + 100) * .9 - 100 - 100) / 100 * 100,
}
for name, answer in checks.items():
    assert math.isclose(questions[name]['answer'], answer, abs_tol=1e-12), (name, answer)
assert set(checks) == {key for key, q in questions.items() if q['type'] == 'numerical'}
assert expected_a == expected_b == 8
assert math.isclose(math.sqrt(.8 * (20 - 8)**2 + .2 * (-40 - 8)**2), 24)
assert math.isclose(math.sqrt(.8 * (-5 - 8)**2 + .2 * (60 - 8)**2), 26)
assert math.sqrt(.5 * (0 - 5)**2 + .5 * (10 - 5)**2) == 5
assert math.sqrt(.5 * (-15 - 5)**2 + .5 * (25 - 5)**2) == 20
assert .5 * 40 + .5 * -20 == 10
assert math.isclose(((200 * 1.1 - 100) - 100) / 100 * 100, 20)
assert math.isclose(.8 * 1 + .2 * -.5, .7)
assert math.isclose(.8 * 1 + .2 * 0, .8)
print('Verified every numerical answer plus all supporting means, volatilities, levered gains, and portfolio betas.')

import unittest
from calculator import clamp


class ClampTests(unittest.TestCase):
    def test_below_lower(self):
        self.assertEqual(clamp(-5, 0, 10), 0)

    def test_inside_float(self):
        self.assertEqual(clamp(2.5, 0, 10), 2.5)

    def test_above_upper(self):
        self.assertEqual(clamp(15, 0, 10), 10)

    def test_inclusive_endpoints(self):
        with self.subTest("lower"):
            self.assertEqual(clamp(0, 0, 10), 0)
        with self.subTest("upper"):
            self.assertEqual(clamp(10, 0, 10), 10)


if __name__ == "__main__":
    unittest.main()

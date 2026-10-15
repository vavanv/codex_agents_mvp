def clamp(value: float, lower: float, upper: float) -> float:
    """Return value clamped to the inclusive [lower, upper] range."""
    if lower > upper:
        raise ValueError("lower must not exceed upper")
    if value < lower:
        return lower
    if value > upper:
        return upper
    return value

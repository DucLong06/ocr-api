def sort_Rect(rect, cols):
    tolerance_factor = 10
    origin = rect
    return ((origin[2] // tolerance_factor) * tolerance_factor) * cols + origin[1]


def recognize_ci(model, image):
    
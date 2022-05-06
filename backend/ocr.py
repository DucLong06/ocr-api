import pytesseract
import os
import sys


async def read_image(img_path, lang="vie"):
    try:
        return pytesseract.image_to_string(img_path, lang=lang)
    except Exception as e:
        return "[ERROR Tesseract] {0}".format(str(e))


async def read_images_from_dir(dir_path, lang="vie", write_to_file=False):

    converted_text = {}
    for file_ in os.listdir(dir_path):
        if file_.endswith(("png", "jpeg", "jpg")):
            text = await read_image(os.path.join(dir_path, file_), lang=lang)
            converted_text[os.path.join(dir_path, file_)] = text
    if write_to_file:
        for file_path, text in converted_text.items():
            _write_to_file(text, os.path.splitext(file_path)[0] + ".txt")
    return converted_text


def _write_to_file(text, file_path):
    print("[INFO] Writing text to file: {0}".format(file_path))
    with open(file_path, "w") as fp:
        fp.write(text)
import base64
import os
import uuid

from flask import Flask, request
from flask_cors import CORS

import my_cccd
import my_cv
import my_env
import my_logger
import my_yolo
import my_ocr

# Khởi tạo Flask Server Backend
app = Flask(__name__)

# Apply Flask CORS
CORS(app)

# path model
PATH_INIT_MODEL = os.path.join(my_env.PATH_TO_MODEL_REC_CI, "init_model.meta")
PATH_MODEL_META = os.path.join(
    my_env.PATH_TO_MODEL_REC_CHECKPOINT, "model.ckpt-1184100.meta"
)
PATH_CHECKPOINT = my_env.PATH_TO_MODEL_REC_CHECKPOINT

# Load model
MODEL_CV = my_yolo.load_model(my_env.PATH_TO_MODEL_DETECT_CV)
MODEL_DETECT_CI = my_yolo.load_model(my_env.PATH_TO_MODEL_DETECT_CI)
MODEL_REC = my_ocr.load_model_recog(PATH_INIT_MODEL, PATH_MODEL_META, PATH_CHECKPOINT)

# Logger
logger = my_logger.Logger("LOG", my_env.LOG)


def _call_my_yolo(model, path_to_save):
    return my_yolo.predict_model(model, path_to_save)


def _call_my_ocr(model, list_area, path_to_save):
    return my_ocr.recognize_images(model, list_area, path_to_save)


def _convert_and_save(b64_string):
    path_to_save = os.path.join(my_env.UPLOAD_FOLDER, str(uuid.uuid4())) + ".jpg"
    logger.info("Preprocessing image: %s" % str(path_to_save))
    with open(path_to_save, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
    logger.info("Save file: %s" % path_to_save)
    return path_to_save


@app.route("/", methods=["GET"])
def ping():
    return {"msg": "Server is OK"}


@app.route("/cv", methods=["POST"])
def detect_cv():
    b64_string = request.get_json()["ImageBase64"]

    try:
        path_to_save = _convert_and_save(b64_string)

        logger.info("Detecting image: %s" % str(path_to_save))
        imagebase64, area = _call_my_yolo(MODEL_CV, path_to_save)

        if len(area) != 0:
            logger.info("Recognizing image: %s" % str(path_to_save))
            res = my_cv.handle_ocr_cv(area, path_to_save, MODEL_DETECT_CI, MODEL_REC)
        else:
            res = ""

        logger.info("Done processing")

        return {"res": res, "imagebase64": str(imagebase64.decode("utf-8"))}
    except Exception as e:
        logger.error("Error processing image: %s" % str(e))
    return "Đã có lỗi xảy ra"


@app.route("/img2text", methods=["POST"])
def recognize():
    b64_string = request.get_json()["ImageBase64"]

    try:
        path_to_save = _convert_and_save(b64_string)

        logger.info("Detecting image: %s" % str(path_to_save))
        imagebase64, area = _call_my_yolo(MODEL_DETECT_CI, path_to_save)

        if len(area) != 0:
            logger.info("Recognizing image: %s" % str(path_to_save))
            text = _call_my_ocr(MODEL_REC, area, path_to_save)
        else:
            text = ""

        logger.info("Done processing")
        return {"text": text, "imagebase64": str(imagebase64.decode("utf-8"))}
    # return {"text":text}
    except Exception as e:
        logger.error("Error processing image: %s" % str(e))
    return "Đã có lỗi xảy ra"


@app.route("/cccd", methods=["POST"])
def recognize_cccd():
    text = ""
    b64_string = request.get_json()["ImageBase64"]

    try:
        path_to_save = _convert_and_save(b64_string)

        logger.info("Detecting image: %s" % str(path_to_save))
        imagebase64, area = _call_my_yolo(MODEL_DETECT_CI, path_to_save)

        if len(area) != 0:
            logger.info("Recognizing image: %s" % str(path_to_save))
            text = _call_my_ocr(MODEL_REC, area, path_to_save)
            res = my_cccd.handle_CCCD(text, area)
        else:
            res = []

        logger.info("Done processing")
        return {"res": res, "imagebase64": str(imagebase64.decode("utf-8")), "text": text}
    # return {"text":text}
    except Exception as e:
        logger.error("Error processing image: %s" % str(e))
    return "Đã có lỗi xảy ra"


# Start Backend
if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")

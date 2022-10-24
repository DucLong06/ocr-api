import os
import uuid

from flask import Flask, request
from flask_cors import CORS


import my_env
import my_logger
import my_yolo

# Khởi tạo Flask Server Backend
app = Flask(__name__)

# Apply Flask CORS
CORS(app)

# Load model
MODEL_CV = my_yolo.load_model(my_env.PATH_TO_MODEL_CV)
MODEL_DETECT_CI = my_yolo.load_model(my_env.PATH_TO_MODEL_CI)
# Loger
logger = my_logger.Logger("LOG", my_env.LOG)


def _call_my_yolo(model, path_to_save):
    return my_yolo.predict_model(model, path_to_save)


@app.route("/", methods=["GET"])
def ping():
    return {"msg": "Server is OK"}


@app.route("/detect-ci", methods=["POST"])
def detect_text():
    image = request.files["file"]
    logger.info("Improcessing image: %s" % str(image.filename))
    try:
        if image:
            path_to_save = os.path.join(
                my_env.UPLOAD_FOLDER, str(uuid.uuid4()) + image.filename
            )
            image.save(path_to_save)
            logger.info("Save file: %s" % path_to_save)
            imagebase64, area = _call_my_yolo(MODEL_DETECT_CI, path_to_save)
            logger.info("Done processing")
        return {"Area": area, "ImageBase64": str(imagebase64)}
    except Exception as e:
        logger.error("Error processing image: %s" % str(e))
    return "Upload file to detect"


@app.route("/cv", methods=["POST"])
def detect_cv():
    image = request.files["file"]
    logger.info("Improcessing image: %s" % str(image.filename))
    try:
        if image:
            path_to_save = os.path.join(
                my_env.UPLOAD_FOLDER, str(uuid.uuid4()) + image.filename
            )
            image.save(path_to_save)
            logger.info("Save file: %s" % path_to_save)
            imagebase64, area = _call_my_yolo(MODEL_CV, path_to_save)
            logger.info("Done processing")
        return {"area": area, "imagebase64": imagebase64}
    except Exception as e:
        logger.error("Error processing image: %s" % str(e))
    return "Upload file to detect"


@app.route("/img2text", methods=["POST"])
def recognize():
    image = request.files["file"]
    logger.info("Improcessing image: %s" % str(image.filename))
    try:
        if image:
            path_to_save = os.path.join(
                my_env.UPLOAD_FOLDER, str(uuid.uuid4()) + image.filename
            )
            image.save(path_to_save)
            logger.info("Save file: %s" % path_to_save)
            imagebase64, area = _call_my_yolo(MODEL_CV, path_to_save)
            logger.info("Done processing")
        return {"area": area, "imagebase64": imagebase64}
    except Exception as e:
        logger.error("Error processing image: %s" % str(e))
    return "Upload file to detect"

# Start Backend
if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")

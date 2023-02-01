import os

# model detect resume
PATH_TO_MODEL_DETECT_CV = os.getenv(
    "PATH_TO_MODEL_DETECT_CV", "weights/detect_cv/best.pt"
)
# model Chu in
PATH_TO_MODEL_DETECT_CI = os.getenv(
    "PATH_TO_MODEL_DETECT_CI", "weights/detect_ci/best.pt"
)
PATH_TO_MODEL_REC_CI = os.getenv("PATH_TO_MODEL_REC_CI", "weights/recognize_ci/")
PATH_TO_MODEL_REC_CHECKPOINT_CI = os.getenv(
    "PATH_TO_MODEL_REC_CHECKPOINT_CI", "weights/recognize_ci/checkpoints"
)

# system
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "input")
OUTPUT_FOLDER = os.getenv("OUTPUT_FOLDER", "output")
LOG = os.getenv("LOG", "log/LOG")

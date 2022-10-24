import os

PATH_TO_MODEL_CV = os.getenv("PATH_TO_MODEL_CV", "weights/detect_cv/best.pt") 
PATH_TO_MODEL_CI = os.getenv("PATH_TO_MODEL_CI", "weights/detect_ci/best.pt") 
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "input") 
OUTPUT_FOLDER =  os.getenv("OUTPUT_FOLDER", "output") 
LOG = os.getenv("LOG", "log/LOG") 

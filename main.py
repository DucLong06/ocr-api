from fastapi import FastAPI, Request, File, UploadFile, BackgroundTasks
from fastapi.templating import Jinja2Templates
import shutil
import ocr
import os
import uuid
import json

app = FastAPI()
templates = Jinja2Templates(directory="templates")


@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/extract_text")
async def extract_text(image: UploadFile = File(...)):
    temp_file = _save_file_to_disk(image, path="temp", save_as="temp")
    text = await ocr.read_image(temp_file)
    return {"filename": image.filename, "data": text}


@app.post("/bulk_extract_text")
async def bulk_extract_text(request: Request, bg_task: BackgroundTasks):
    images = await request.form()
    folder_name = str(uuid.uuid4())
    os.mkdir(folder_name)

    for image in images.values():
        temp_file = _save_file_to_disk(image, path=folder_name, save_as=image.filename)

    bg_task.add_task(ocr.read_images_from_dir, folder_name, write_to_file=True)
    return {"task_id": folder_name, "num_files": len(images)}


@app.get("/bulk_output/{task_id}")
async def bulk_output(task_id):
    list_out = []
    for file_ in os.listdir(task_id):
        if file_.endswith("json"):
            path_input = os.path.join(task_id, file_)
            f = open(path_input, "r", encoding="utf-8",)
            data = json.load(f)
            f.close()
            out = {file_.replace(".json", ""): data}
            list_out.append(out)
    return {"id": task_id, "data": list_out}


def _save_file_to_disk(uploaded_file, path=".", save_as="default"):
    extension = os.path.splitext(uploaded_file.filename)[-1]
    temp_file = os.path.join(path, save_as + extension)
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(uploaded_file.file, buffer)
    return temp_file

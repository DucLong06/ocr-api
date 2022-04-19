FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY app/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./app /app

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "80"]
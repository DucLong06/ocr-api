FROM python:3.9-slim

COPY requirements.txt .

RUN apt-get update && \
    apt-get -y install --no-install-recommends \ 
    tesseract-ocr\
    tesseract-ocr-vie && \
    # Install depencies
    pip --no-cache install \
    pillow \
    pytesseract && \
    # Instal project requirements
    pip --no-cache install -r requirements.txt && \
    # Cleanings
    apt-get clean               && \
    apt-get autoremove          && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/cache/*         && \
    rm -rf /usr/share/doc/*     && \
    rm -rf /usr/share/X11/*     && \
    rm -rf /usr/share/fonts/*

COPY . .

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]

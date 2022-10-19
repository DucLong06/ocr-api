FROM python:3.7-slim-buster

COPY requirements.txt .

RUN apt-get -y update\
    && apt-get -y install git\ 
    && apt-get install ffmpeg libsm6 libxext6  -y\
    && pip install --no-cache-dir -r requirements.txt\
    && find /usr/local \
    \( -type d -a -name test -o -name tests \) \
    -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
    -exec rm -rf '{}' + \
    && runDeps="$( \
    scanelf --needed --nobanner --recursive /usr/local \
    | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
    | sort -u \
    | xargs -r apk info --installed \
    | sort -u \
    )" 

COPY . .


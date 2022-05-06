
#!/usr/bin/env bash

# clean docker 
docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# build image
docker build -t ocr-apis .

# run image detached
docker run -d -p 8000:8000 ocr-apis

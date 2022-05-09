
#!/usr/bin/env bash
# uvicorn main:app --host=0.0.0.0 --port 8000 --reload

# permission
sudo chmod 666 /var/run/docker.sock

# clean docker docker-compose
docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# clearn docker image <none>
docker rmi $(docker images -q)
docker rmi $(docker images | grep “^” | awk “{print $3}”)
docker rmi $(docker images -f “dangling=true” -q)

# build image
docker build -t ocr-apis .

# run image detached
docker run -d -p 8000:8000 ocr-apis

echo 'build image on local'
docker build -t register-ax-cloud_frontend:v1 --build-arg BE_URL=https://cloud.cyberapis.com/apis .
echo 'add tag'
docker tag register-ax-cloud_frontend:v1 gcr.io/ce-cbl-devall/register-ax-cloud_frontend:v1
echo 'push image on GCP'
docker push gcr.io/ce-cbl-devall/register-ax-cloud_frontend:v1
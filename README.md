# Getting Started with Docker

docker build . -t todo-frontend
docker run -p 4020:3000 -d todo-frontend

# search for the <container name or id>
# and the <image name or id> using the command:
docker ps
docker images

## clear
docker stop <container name or id>
# if you get error:
<!--
<container name or id>: Cannot kill container <container name or id>: unknown error after kill: runc did not terminate sucessfully: container_linux.go:392: signaling init process caused "permission denied"
: unknown
-->
# run:
<!-- sudo aa-remove-unknown -->
docker rm <container name or id>
docker rmi <image name or id>

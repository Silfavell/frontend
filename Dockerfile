FROM node:10 as builder

WORKDIR /usr/src/app

ENV REACT_APP_NODE_ENV=prod

# copy the package.json to install dependencies
COPY package.json yarn.lock ./

# Install the dependencies and make the folder
RUN npm install 

COPY . .

# Build the project and copy the files
RUN npm run build

FROM nginx

COPY ./private /etc/nginx/certs
#COPY ./test/default.conf /etc/nginx/conf.d

COPY ./private/silfavell_swarm/default.conf /etc/nginx/conf.d

# Copy from the stahg 1
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 443 
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

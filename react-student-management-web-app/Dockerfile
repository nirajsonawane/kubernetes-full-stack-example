# base image
FROM node:12

# set working directory
WORKDIR /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install nginx
RUN apt-get update
RUN apt-get install nginx -y
COPY nginx.conf /etc/nginx/sites-available/default
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf


# install and cache app dependencies
COPY ./ /app/
RUN yarn install
RUN ls
RUN yarn 
RUN yarn build
RUN cp -R build/* /var/www/html/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
# start app
CMD ["nginx"]

############################################################
# Dockerfile for Marvel-us.                                #
# Based on Centos                                          #
############################################################

FROM  centos:6.4
# Enable EPEL for Node.js
RUN   rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN   yum install -y npm

# Install Bower
RUN   npm install -g bower
# Install nodemon
RUN   npm install -g nodemon
# Install inherits dependency for gulp
RUN npm install -g inherits
# Install Gulp
RUN   npm install -g gulp
# Bundle app source
ADD   . /src
# Install server dependencies
RUN   cd /src; npm install
# Or alternatively install for deployment
# RUN   cd /src; npm install --production
# Install front-end dependencies
# RUN   cd /src/public; bower install --allow-root 

EXPOSE  49300:3000

CMD cd /src ; npm start
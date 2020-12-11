FROM node:10

# Install programs
RUN apt-get update
RUN apt-get install -y nano
RUN apt-get install -y git
RUN apt-get install -y packagekit-gtk3-module

# Install python3
WORKDIR /tmp
RUN wget https://www.python.org/ftp/python/3.6.3/Python-3.6.3.tgz
RUN tar -xvf Python-3.6.3.tgz
WORKDIR /tmp/Python-3.6.3
RUN ./configure
RUN make
RUN make install
RUN alias python3=python3.6

# Prepare python packages
RUN apt install -y python3-pip
RUN pip3 install jsonpickle
RUN pip3 install Jinja2
RUN pip3 install python-jenkins
RUN pip3 install firebase_admin
RUN pip3 install selenium


# Clone the repository
WORKDIR /opt
RUN git clone https://stash.sed.hu/scm/dep/inclouded-dashboard.git monitor-be

# Get project generator
RUN mkdir generator
WORKDIR /opt/generator
RUN git clone https://stash.sed.hu/scm/dep/jenkins-project-generator.git .
RUN git config --global user.name ""
RUN git config --global user.email ""

# Install Firefox
WORKDIR /tmp
COPY firefox-81.tar.bz2 /tmp
RUN tar xjf firefox-*.tar.bz2

# Install dependencies
WORKDIR /opt/monitor-be/Backend
RUN npm install

# Run the backend server
# CMD sleep infinity
CMD node app.js
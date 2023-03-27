FROM python:3.8
WORKDIR /usr/src/app
COPY . .
RUN pip install --upgrade pip
RUN apt-get update
RUN apt-get install apt-file -y
RUN apt-file update
RUN apt-get install vim -y
RUN pip install -r "requirements.txt"
RUN apt-get install libsndfile-dev -y
RUN apt-get install sox
RUN apt-get install ffmpeg
RUN apt-get install wget
EXPOSE 9999
CMD ["python3", "manage.py", "runserver", "0.0.0.0:9999"]
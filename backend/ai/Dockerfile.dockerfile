FROM python:3.8
WORKDIR /usr/src/app
COPY . .
RUN pip install --upgrade pip
RUN pip install -r "requirements.txt"
EXPOSE 9999
CMD ["python3", "manage.py", "runserver", "0.0.0.0:9999"]
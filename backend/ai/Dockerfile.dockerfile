FROM python:3.10.10
WORKDIR /usr/src/app
COPY . .
RUN pip install -r "requirements.txt"
EXPOSE 9999
CMD ["python3", "manage.py", "runserver", "0.0.0.0:9999"]
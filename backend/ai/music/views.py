from django.shortcuts import render
from .apps import WebappConfig
import subprocess

######## rest_framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

######## models & serializers
from .models import *
from .serializers import *

######## s3
import boto3
import os
import logging
from botocore.exceptions import ClientError

######## convert music format
from pydub import AudioSegment
############################################################################

s3 = boto3.client('s3')

# Create your views here.
def upload_file(file_name, bucket, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

class MusicAPIView(APIView):
    def get(self, request):
        music_path = request.GET.get('music_path'),
        preset_path = request.query_params.get('preset_path'),
        # image_path = request.data.get('image_path')

        # S3에서 data에 담긴 path에 저장되어 있는 음악, 프리셋, 이미지 가져오기
        s3.download_file(
            # 1. 버킷 이름
            'AWS_STORAGE_BUCKET_NAME',
            # 2. 다운로드 할 객체
            music_path,
            # 3. 다운로드 할 위치와 파일명
            '/tmp/input.mp3',
            ),
        preset = '',
        image = ''

        # mp3 to wav
        # 참고 - https://pythonbasics.org/convert-mp3-to-wav/
        src = "music.mp3"
        dst = "input.wav"

        sound = AudioSegment.from_mp3(src)
        sound.export(dst, format="wav")

        # AI 모델 돌리기
        checkpoint_path = 'checkpoints/style/jamendo/autodiff/lightning_logs/version_0/checkpoints/epoch\=362-step\=1210241-val-jamendo-autodiff.ckpt'
        args = ["python", "model/scripts/process.py", "-i", "/tmp/input.wav", "-r", "프리셋 위치", "-c", checkpoint_path]
        try:
            subprocess.run(args, check=True)
        except subprocess.CalledProcessError:
            return Response({'status' : 'failure'})
        
        # wav to mp3
        

        # AI를 돌린 후 결과물 음악, 이미지를 S3에 저장하기
        s3.upload_file(
            # 업로드할 파일 경로
            f'exmaples/{input}_out_ref={preset}.wav'
            # 버킷 이름
            'AWS_STORAGE_BUCKET_NAME'
            # 저장할 파일 명칭
        )

        # results에는 s3에 업로드한 파일들의 path를 저장
        results = {
            'music' : '',
            'image' : ''
        }

        # 결과물을 serialization해서 spring 서버로 return
        serializers = MusicSerializer(data = results)
        if serializers.is_valid():
            # serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.error, status=status.HTTP_400_BAD_REQUEST)
    
class ImageAPIView(APIView):
    def post():
        return
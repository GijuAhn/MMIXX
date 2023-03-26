from django.shortcuts import render
# from .apps import WebappConfig
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

######## convert music format
from pydub import AudioSegment
import io
from scipy.io.wavfile import read, write
import wave
from .utills import mp3_to_wav
############################################################################

# s3 access 정보 가져오기 -> 가능하면 암호화(?)하면 좋을듯...
s3 = boto3.client('s3',
                aws_access_key_id='AKIAY2NHL6NEZPWL57H5',
                aws_secret_access_key='DvYAVRk51XhHMyx3Ohf6FN21z4O47t1jAp1/dHPJ')
bucket_name = 'bucket-mp3-file-for-mmixx'
# Create your views here.
class MusicAPIView(APIView):
    def get(self, request):
        # # s3 path를 query_params로 주는지 확인해야 함.
        # music_path = request.GET.get('music_path')
        # preset_path = request.GET.get('preset_path')
        # music_path = 'music/1fc0908e-180f-429c-aec8-8d600b374910.mp3'
        music_path = 'music/ba466b9d-3c76-4469-bbe7-6ceb6ef818d9.mp3'
        preset_path = 'music/5771f0b4-0326-4041-ac57-d86cb8353272.mp3'
        # preset_path = 'music/ba466b9d-3c76-4469-bbe7-6ceb6ef818d9.mp3'

        # # # AI 모델 돌리기
        checkpoint_path = './style_transfer/model/music/checkpoints/style/jamendo/autodiff/lightning_logs/version_0/checkpoints/epoch=362-step=1210241-val-jamendo-autodiff.ckpt'
        args = ["python", "./style_transfer/model/music/scripts/process.py", "-i", music_path, "-r", preset_path, "-c", checkpoint_path]
        try:
            subprocess.run(args, check=True)
        except subprocess.CalledProcessError:
            return Response({'status' : 'failure'})

        # results에는 s3에 업로드한 결과 파일의 path를 저장
        results = {
            'music' : 'music/' + f'{music_path[6:-4]}'+'_mix.wav',
        }
        print('results : ', results)
        # 결과물을 serialization해서 springboot 서버로 return
        serializers = MusicSerializer(data = results)
        if serializers.is_valid():
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.error, status=status.HTTP_400_BAD_REQUEST)
    
class ImageAPIView(APIView):
    def get(self, request):
        # image_path = request.GET.get('image_path')
        # image_path = 'images/ecd15cfd-9e8e-48e3-9e70-d42a4a3e5d68.jpg'
        image_path = 'images/fedf9914-9744-4a23-9026-0d1024e2853d.jpg'
        
        # 분위기에 맞는 preset을 넘겨주기?
        # preset_path = ''
        # image_response = s3.get_object(bucket_name, image_path)
        # image = image_response['Body'].read()
        # print('이미지 타입 :', type(image))
        # 'python neural_style_transfer.py --content_img_name <content-img-name> --style_img_name <style-img-name>'
        args = ["python", "./style_transfer/model/images/neural_style_transfer.py", "--content_img_name", image_path, "--style_img_name", "ben_giles.jpg"]
        # args = ["python", "./style_transfer/model/images/neural_style_transfer.py", "--content_img_name", "taj_mahal.jpg", "--style_img_name", "ben_giles.jpg"]
        try:
            subprocess.run(args, check=True)
        except subprocess.CalledProcessError:
            return Response({'status' : 'failure'})
        
        results = {
            'image' : 'image/' + f'{image_path[6:-4]}'+'_mix.jpg',
        }
        serializers = ImageSerializer(data = results)
        if serializers.is_valid():
            return Response(serializers.data, status=status.HTTP_201_CREATED)

        return Response({'status' : 'failure'})
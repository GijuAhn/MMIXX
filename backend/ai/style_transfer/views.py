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
# from pydub import AudioSegment
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
        # music_path = 'https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/music/1fc0908e-180f-429c-aec8-8d600b374910.mp3'
        # preset_path = 'https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/music/ba466b9d-3c76-4469-bbe7-6ceb6ef818d9.mp3'
        
        # # S3에서 data에 담긴 path에 저장되어 있는 음악, 프리셋 가져오기
        # music_bucket = bucket_name + 'music'
        # music_response = s3.get_object(music_bucket,music_path)
        # preset_response = s3.get_object(music_bucket, preset_path)

        # music = music_response['Body'].read()
        # preset = preset_response['Body'].read()

        ############################# mp3 to wav ################################
        # # 1. 참고 - https://pythonbasics.org/convert-mp3-to-wav/
        # src = "music.mp3"
        # dst = "input.wav"
        # sound = AudioSegment.from_mp3(src)
        # sound.export(dst, format="wav")

        # # 2.
        # proc = subprocess.Popen(['ffmpeg', '-i', 'pipe:0', '-f', 'wav', '-'], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        # wav_data, _ = proc.communicate(input=music)
        #########################################################################

        # AI 모델 돌리기, args에 input.wav와 reference.wav는 s3에서 받은 데이터를 넣을 것(Todo)
        checkpoint_path = './style_transfer/model/music/checkpoints/style/jamendo/autodiff/lightning_logs/version_0/checkpoints/epoch=362-step=1210241-val-jamendo-autodiff.ckpt'
        args = ["python", "./style_transfer/model/music/scripts/process.py", "-i", "./style_transfer/model/music/examples/TeddyBear.wav", "-r", "./style_transfer/model/music/examples/Aves.wav", "-c", checkpoint_path]
        # args = ["python", "./model/scripts/process.py", "-i", wav_data, "-r", preset, "-c", checkpoint_path]
        try:
            # DeepAFx-ST의 결과로 s3에 저장한 path를 return받음 (ouyput에 저장)
            output = subprocess.run(args, check=True)
            print('output :', output)
        except subprocess.CalledProcessError:
            return Response({'status' : 'failure'})
        
        ############################# process.py에서 수행 ##########################################
        # wav to mp3

        # AI를 돌린 후 결과물 음악, 이미지를 S3에 저장하기
        # new_key = 'path/to/your/new/wav/file'
        # s3.put_object(Bucket='AWS_STORAGE_BUCKET_NAME' + 'music', Key=new_key, Body="결과물 파일")
        ############################################################################################

        # results에는 s3에 업로드한 결과 파일의 path를 저장
        results = {
            'music' : output,
        }
        print('results : ', results)
        # 결과물을 serialization해서 springboot 서버로 return
        serializers = MusicSerializer(data = results)
        if serializers.is_valid():
            # serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.error, status=status.HTTP_400_BAD_REQUEST)
    
class ImageAPIView(APIView):
    def get(self, request):
        image_path = request.GET.get('image_path')

        image_bucket = bucket_name + 'images'
        image_response = s3.get_object(bucket_name, image_path)
        image = image_response['Body'].read()
        args = ["python", "./style_transfer/model/images/main.py"]
        try:
            subprocess.run(args, check=True)
        except subprocess.CalledProcessError:
            return Response({'status' : 'failure'})
        return
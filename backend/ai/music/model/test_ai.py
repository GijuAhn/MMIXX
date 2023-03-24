import subprocess

def test():
    checkpoint_path = 'checkpoints/style/jamendo/autodiff/lightning_logs/version_0/checkpoints/epoch\=362-step\=1210241-val-jamendo-autodiff.ckpt'
    args = ["python", "scripts/process.py", "-i", "examples/TeddyBear.wav", "-r", "examples/Aves.wav", "-c", checkpoint_path]
    try:
        output = subprocess.run(args, check=True)
        return output, "success"
    except subprocess.CalledProcessError:
        print('failure')
        # return Response({'status' : 'failure'})
        return False

test()
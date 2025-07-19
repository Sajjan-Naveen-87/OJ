import subprocess
import tempfile
import time
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response

LANGUAGE_EXTENSIONS = {
    'c': 'c',
    'cpp': 'cpp',
    'python': 'py',
    'java': 'java'
}

COMPILE_COMMANDS = {
    'c': lambda filename: ['gcc', filename, '-o', 'Main'],
    'cpp': lambda filename: ['g++', filename, '-o', 'Main'],
    'java': lambda filename: ['javac', filename],
    'python': lambda filename: []  # Python does not need compilation
}

EXECUTE_COMMANDS = {
    'c': lambda: ['./Main'],
    'cpp': lambda: ['./Main'],
    'python': lambda filename: ['python3', filename],
    'java': lambda: ['java', 'Main']
}

@api_view(['POST'])
def compile_code(request):
    code = request.data.get('code')
    language = request.data.get('language')
    custom_input = request.data.get('input_tests', '')

    if not code or language not in LANGUAGE_EXTENSIONS:
        return Response({'error': 'Invalid code or language'}, status=400)

    file_ext = LANGUAGE_EXTENSIONS[language]

    with tempfile.TemporaryDirectory() as temp_dir:
        filename = f'Main.{file_ext}'
        file_path = os.path.join(temp_dir, filename)

        with open(file_path, 'w') as f:
            f.write(code)

        # Compile the code
        compile_cmd = COMPILE_COMMANDS[language](filename)
        if compile_cmd:
            compile_proc = subprocess.run(
                compile_cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                cwd=temp_dir
            )
            if compile_proc.returncode != 0:
                return Response({
                    'verdict': 'Compilation Error',
                    'output': compile_proc.stderr.decode()
                })

        # Execute the compiled code
        try:
            start = time.time()
            exec_cmd = EXECUTE_COMMANDS[language](file_path) if language == 'python' else EXECUTE_COMMANDS[language]()
            exec_proc = subprocess.run(
                exec_cmd,
                input=custom_input.encode(),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                cwd=temp_dir,
                timeout=5
            )
            end = time.time()
        except subprocess.TimeoutExpired:
            return Response({'verdict': 'Time Limit Exceeded', 'output': ''})
        except Exception as e:
            return Response({'verdict': 'Runtime Error', 'output': str(e)})

        runtime = round((end - start) * 1000, 2)
        memory_usage_kb = exec_proc.__sizeof__() // 1024

        output = exec_proc.stdout.decode()
        stderr = exec_proc.stderr.decode()

        verdict = 'Accepted' if exec_proc.returncode == 0 else 'Runtime Error'

        return Response({
            'output': output or stderr,
            'verdict': verdict,
            'runtime': runtime,
            'memory': memory_usage_kb,
            'code': code
        })
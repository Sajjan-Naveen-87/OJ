from django.shortcuts import render

# Create your views here.
import subprocess, tempfile, time, os, resource, json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Compiler
from .serializers import CompilerSerializer
from problem_set.models import Problems

@api_view(['POST'])
def compile_code(request):
    data = request.data
    code = data.get("code")
    problem_id = data.get("problem_id")
    problem = Problems.objects.get(id=problem_id)
    test_cases = json.loads(problem.test_cases.read())

    verdicts = []
    total_output = []
    max_runtime = 0
    max_memory = 0

    for test in test_cases:
        input_data = test["input"]
        expected_output = test["output"]
        
        with tempfile.NamedTemporaryFile(mode='w+', suffix='.py', delete=False) as temp:
            temp.write(code)
            temp.flush()

            start_time = time.time()
            try:
                def limit_resources():
                    resource.setrlimit(resource.RLIMIT_CPU, (2, 2))  # CPU time limit
                    resource.setrlimit(resource.RLIMIT_AS, (256 * 1024 * 1024, 256 * 1024 * 1024))  # Memory 256MB

                result = subprocess.run(
                    ['python3', temp.name],
                    input=input_data.encode(),
                    capture_output=True,
                    timeout=problem.max_runtime.total_seconds(),
                    preexec_fn=limit_resources
                )

                end_time = time.time()
                runtime = round(end_time - start_time, 4)
                output = result.stdout.decode().strip()
                error = result.stderr.decode().strip()
                memory_used = 0  # Placeholder for now, can use external packages to estimate
                max_runtime = max(max_runtime, runtime)

                if error:
                    verdicts.append("Runtime Error")
                elif output == expected_output.strip():
                    verdicts.append("Accepted")
                else:
                    verdicts.append("Wrong Answer")

                total_output.append(output)

            except subprocess.TimeoutExpired:
                verdicts.append("Time Limit Exceeded")
                total_output.append("")

            os.unlink(temp.name)

    compiler_instance = Compiler.objects.create(
        problem=problem,
        code=code,
        input_tests=json.dumps([t["input"] for t in test_cases]),
        output=json.dumps(total_output),
        verdicts=json.dumps(verdicts),
        runtime=max_runtime,
        memory_used=max_memory
    )

    # Update Problem Stats
    problem.problem_runtime = max_runtime
    problem.problem_memory = max_memory
    problem.previous_submissions.append({
        "verdicts": verdicts,
        "output": total_output,
        "runtime": max_runtime
    })
    problem.save()

    return Response({
        "verdicts": verdicts,
        "output": total_output,
        "runtime": max_runtime
    })

@api_view(['GET'])
def get_problem_with_samples(request, id):
    try:
        problem = Problems.objects.get(id=id)
        with open(problem.test_cases.path) as file:
            data = json.load(file)
        sample_cases = data.get('samples', [])[:2]

        return Response({
            'id': problem.id,
            'title': problem.title,
            'problem_desc': problem.problem_desc,
            'samples': sample_cases,
        })
    except Problems.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=404)
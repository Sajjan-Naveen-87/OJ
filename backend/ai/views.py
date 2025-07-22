import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

@csrf_exempt
def code_review(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code = data.get('code', '')
            language = data.get('language', '')
            problem_title = data.get('problem_title', '')

            prompt = f"""Review this {language} code for the problem titled '{problem_title}'. 
Suggest improvements, highlight any bugs, and recommend optimizations:\n\n{code}"""
            print(os.getenv('OPENROUTER_API_KEY'))
            headers = {
                "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",  # Update this for production
                "X-Title": "BubbleCodeAI",
            }

            body = {
                "model": "google/gemini-flash-2",
                "messages": [{"role": "user", "content": prompt}],
            }

            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                data=json.dumps(body)
            )

            result = response.json()
            reply = result.get("choices", [{}])[0].get("message", {}).get("content", "No feedback received.")

            return JsonResponse({"feedback": reply})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)
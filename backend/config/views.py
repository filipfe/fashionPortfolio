from django.shortcuts import render

def index(self, request, *args, **kwargs):
    return render(request, 'dist/index.html')
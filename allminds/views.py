import django_filters.rest_framework
from tablib import Dataset
from django.contrib.auth.models import User
from .models import Person
from rest_framework import viewsets
from allminds.serializers import PersonSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
# from rest_framework import filters

def index(request):
	return render(request, "build/index.html")

def simple_upload(request):
	if request.method == 'POST':
		person_resource = PersonResource()
		dataset = Dataset()
		new_persons = request.FILES['myfile']

		imported_data = dataset.load(new_persons.read())
		result = person_resource.import_data(dataset, dry_run=True)  # Test the data import

		if not result.has_errors():
			person_resource.import_data(dataset, dry_run=False)  # Actually import now

	return render(request, 'core/simple_upload.html')


class PersonViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows users to be viewed or edited.
	"""
	queryset = Person.objects.all().order_by('-first_name')
	serializer_class = PersonSerializer
	filter_backends = [filters.SearchFilter, DjangoFilterBackend]
	filterset_fields = ['first_name', 'last_name']
	search_fields = ['^first_name', '^last_name']

def sendEmail(request):
	subject = request.POST.get('subject', '')
	randnum = request.POST.get('name', '')
	message = request.POST.get('message', '')
	from_email = request.POST.get('message', 'mudassir.creative@gmail.com')
	if subject and message and from_email:
		me = send_mail(subject, message, from_email, ['mudassir_mir_25@hotmail.com'])
		return JsonResponse(me, safe=False)
	else:
		return JsonResponse('Make sure all fields are entered and valid.', safe=False)
		
	# def get_queryset(self):
	#     """
	#     Optionally restricts the returned purchases to a given user,
	#     by filtering against a `username` query parameter in the URL.
	#     """
	#     last_name = self.request.query_params.get('last_name', None)
	#     if last_name is not None:
	#         self.queryset = self.queryset.filter(last_name=last_name)
	#     return self.queryset
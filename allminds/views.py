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
import json
from rest_framework.parsers import JSONParser
from .resources import PersonResource
# from rest_framework import filters

def index(request):
	return render(request, "build/index.html")

def simple_upload(request):
	print('here we are')
	if request.method == 'POST':
		print('here we are')
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
	parser_classes = [JSONParser]
	queryset = Person.objects.all().order_by('-first_name')
	serializer_class = PersonSerializer
	filter_backends = [filters.SearchFilter, DjangoFilterBackend]
	#filterset_fields = ['first_name', 'last_name','gender']
	search_fields = ['^first_name', '^last_name']

	def get_queryset(self):
		"""
		Optionally restricts the returned purchases to a given user,
		by filtering against a `username` query parameter in the URL.
		"""
		gender = self.request.query_params.get('gender', None)
		# if gender is not None:
		# 	gender = json.loads(gender)
		# 	self.queryset = self.queryset.filter(gender__in=json.loads(gender))

		title = self.request.query_params.get('title', None)
		if title is not None:
			titleArray = json.loads(title)
			for title in titleArray:
				self.queryset = self.queryset.filter(title__contains=title)

		years_in_practice = self.request.query_params.get('yearsInPractice', None)
		if years_in_practice is not None:
			years_in_practiceArray = json.loads(years_in_practice)
			for years_in_practice in years_in_practiceArray:
				if('<' in years_in_practice):
					years_in_practice = years_in_practice.replace("<","")
					self.queryset = self.queryset.filter(years_in_practice_total__lt=years_in_practice)

				if('-' in years_in_practice):
					years_in_practiceArray = years_in_practice.split('-')
					self.queryset = self.queryset.filter(years_in_practice_total__gt=years_in_practiceArray[0], years_in_practice_total__lt=years_in_practiceArray[1])

				if('>' in years_in_practice):
					years_in_practice = years_in_practice.replace(">","")
					self.queryset = self.queryset.filter(years_in_practice_total__gt=years_in_practice)


		i_also_speak = self.request.query_params.get('languages', None)
		if i_also_speak is not None:
			i_also_speakArray = json.loads(i_also_speak)
			for i_also_speak in i_also_speakArray:
				self.queryset = self.queryset.filter(i_also_speak__contains=i_also_speak)

		specialties = self.request.query_params.get('specialties', None)
		if specialties is not None:
			specialtiesArray = json.loads(specialties)
			for specialties in specialtiesArray:
				self.queryset = self.queryset.filter(specialties__contains=specialties)

		age = self.request.query_params.get('ageGroup', None)
		if age is not None:
			if age == 'Teens':
				self.queryset = self.queryset.filter(Q(age__contains='teens'),Q(age__contains='teen'))
			if age == 'Adults':
				self.queryset = self.queryset.filter(age__contains='Adults')
			if age == 'Elders':
				self.queryset = self.queryset.filter(age__contains='Elders')

		communities = self.request.query_params.get('communities', None)
		if communities is not None:
			communitiesArray = json.loads(communities)
			for communities in communitiesArray:
				self.queryset = self.queryset.filter(communities__contains=communities)

		accepted_insurance_plans = self.request.query_params.get('insurance', None)
		if accepted_insurance_plans is not None:
			accepted_insurance_plansArray = json.loads(accepted_insurance_plans)
			for accepted_insurance_plans in accepted_insurance_plansArray:
				self.queryset = self.queryset.filter(accepted_insurance_plans__contains=accepted_insurance_plans)

		cost_per_session_min = self.request.query_params.get('min', None)
		if cost_per_session_min is not None:
			cost_per_session_minArray = json.loads(cost_per_session_min)
			self.queryset = self.queryset.filter(cost_per_session_min__gte=cost_per_session_minArray)

		cost_per_session_max = self.request.query_params.get('max', None)
		if cost_per_session_max is not None:
			cost_per_session_maxArray = json.loads(cost_per_session_max)
			self.queryset = self.queryset.filter(cost_per_session_max__lte=cost_per_session_maxArray)

		return self.queryset

def sendEmail(request):
	# subject = request.POST.get('subject', '')
	name = request.POST.get('name', '')
	phone = request.POST.get('phone', '')
	message = request.POST.get('message', '')
	subject = 'subject'
	from_email = request.POST.get('email', 'mudassir.creative@gmail.com')
	if subject and message and from_email:
		me = send_mail(subject, message, from_email, ['mudassir_mir_25@hotmail.com'])
		return JsonResponse(me, safe=False)
	else:
		return JsonResponse('Make sure all fields are entered and valid.', safe=False)

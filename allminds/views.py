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
from django.db.models import Q
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
		if gender is not None:
			gender = json.loads(gender)
			if len(gender) > 0:
				self.queryset = self.queryset.filter(gender__in=gender)

		title = self.request.query_params.get('title', None)
		if title is not None:
			titleArray = json.loads(title)
			if len(titleArray) > 0:
				for title in titleArray:
					if title == 'Licensed therapist':
						self.queryset = self.queryset.filter(Q(title__contains='Clinical Social Work/Therapist') | Q(title__contains='Marriage & Family Therapist'))
					elif title == 'Associate Therapist':
						self.queryset = self.queryset.filter(Q(title__contains='Marriage & Family Therapist Associate'))
					elif title == 'Psychologist':
						self.queryset = self.queryset.filter(Q(title__contains='Psychologist'))

		years_in_practice = self.request.query_params.get('yearsInPractice', None)
		if years_in_practice is not None:
			years_in_practiceArray = json.loads(years_in_practice)
			if len(years_in_practiceArray) > 0:
				for years_in_practice in years_in_practiceArray:
					if('<' in years_in_practice):
						years_in_practice = years_in_practice.replace("<","")
						self.queryset = self.queryset.filter(years_in_practice__lte=years_in_practice)

					if('-' in years_in_practice):
						years_in_practiceArray = years_in_practice.split('-')
						self.queryset = self.queryset.filter(years_in_practice_total__gte=5, years_in_practice_total__lte=15)

					if('>' in years_in_practice):
						years_in_practice = years_in_practice.replace(">","")
						self.queryset = self.queryset.filter(years_in_practice__gte=years_in_practice)


		i_also_speak = self.request.query_params.get('languages', None)
		if i_also_speak is not None:
			i_also_speakArray = json.loads(i_also_speak)
			if len(i_also_speakArray) > 0:
				for i_also_speak in i_also_speakArray:
					self.queryset = self.queryset.filter(i_also_speak__contains=i_also_speak)

		specialties = self.request.query_params.get('specialties', None)
		if specialties is not None:
			specialtiesArray = json.loads(specialties)
			if len(specialtiesArray) > 0:
				for specialties in specialtiesArray:
					if specialties == 'Addiction':
						self.queryset = self.queryset.filter(Q(specialties__contains='Addiction') | Q(specialties__contains='Alcohol Abuse') | Q(specialties__contains='Drug Abuse') | Q(specialties__contains='Gambling') | Q(specialties__contains='Internet Addiction') | Q(specialties__contains='Sexual Addiction') | Q(specialties__contains='Substance Abuse') | Q(specialties__contains='Video Game Addiction'))
					elif specialties == 'ADHD or attention issues':
						self.queryset = self.queryset.filter(Q(specialties__contains='ADHD'))
					elif specialties == 'Anxiety or panic attacks':
						self.queryset = self.queryset.filter(Q(specialties__contains='Anxiety'))
					elif specialties == 'Depression':
						self.queryset = self.queryset.filter(Q(specialties__contains='Depression') | Q(specialties__contains='Bipolar Disorder') | Q(specialties__contains='Self-Harming') | Q(specialties__contains='Self Esteem') | Q(specialties__contains='Suicidal Ideation'))
					elif specialties == 'Eating and food issues':
						self.queryset = self.queryset.filter(Q(specialties__contains='Eating Disorders'))
					elif specialties == 'Family Issues':
						self.queryset = self.queryset.filter(Q(specialties__contains='Adoption') | Q(specialties__contains='Behavioral Issues') | Q(specialties__contains='Child or Adolescent') | Q(specialties__contains='Family Conflict') | Q(specialties__contains='Oppositional Defiance') | Q(specialties__contains='Parenting'))
					elif specialties == 'Grief':
						self.queryset = self.queryset.filter(Q(specialties__contains='Grief'))
					elif specialties == 'Health Issues':
						self.queryset = self.queryset.filter(Q(specialties__contains="Alzheimer's") | Q(specialties__contains="Asperger's Syndrome") | Q(specialties__contains='Autism') | Q(specialties__contains='Chronic Ilness') | Q(specialties__contains='Chronic Pain') | Q(specialties__contains='Infertility') | Q(specialties__contains='Obesity') | Q(specialties__contains='Traumatic Brain Injury') | Q(specialties__contains='Weight Loss') | Q(specialties__contains='HIV / AIDS Allied'))
					elif specialties == 'Relationship issues':
						self.queryset = self.queryset.filter(Q(specialties__contains='Codependency') | Q(specialties__contains='Divorce') | Q(specialties__contains='Infidelity') | Q(specialties__contains='Marital and Premarital') | Q(specialties__contains='Relationship Issues'))
					elif specialties == 'Life transitions':
						self.queryset = self.queryset.filter(Q(specialties__contains='Life Transitions') | Q(specialties__contains='Pregnancy, Prenatal, Postpartum'))
					elif specialties == 'Sex and sexuality':
						self.queryset = self.queryset.filter(Q(specialties__contains='Sexual Identity') | Q(specialties__contains='Sex Therapy') | Q(specialties__contains='Open Relationships Non-Monogamy') | Q(specialties__contains='Sex-Positive, Kink Allied'))
					elif specialties == 'Trauma or abuse':
						self.queryset = self.queryset.filter(Q(specialties__contains='Domestic Abuse') | Q(specialties__contains='Domestic Violence') | Q(specialties__contains='Sexual Abuse') | Q(specialties__contains='Trauma and PTSD'))

		age = self.request.query_params.get('ageGroup', None)
		if age is not None:
			ageArray = json.loads(age)
			if len(ageArray) > 0:
				for age in ageArray:
					if age == 'Teens':
						self.queryset = self.queryset.filter(Q(age__contains='teen') | Q(age__contains='Toddlers') | Q(age__contains='Children'))
					if age == 'Adults':
						self.queryset = self.queryset.filter(age__contains='Adults')
					if age == 'Elders':
						self.queryset = self.queryset.filter(age__contains='Elders')

		communities = self.request.query_params.get('communities', None)
		if communities is not None:
			communitiesArray = json.loads(communities)
			if len(communitiesArray) > 0:
				for communities in communitiesArray:
					self.queryset = self.queryset.filter(communities__contains=communities)

		accepted_insurance_plans = self.request.query_params.get('insurance', None)
		if accepted_insurance_plans is not None:
			accepted_insurance_plansArray = json.loads(accepted_insurance_plans)
			if len(accepted_insurance_plansArray) > 0:
				for accepted_insurance_plans in accepted_insurance_plansArray:
					if accepted_insurance_plans == 'Out-of-network' or accepted_insurance_plans == 'Any insurance':
						self.queryset = self.queryset.filter(accepted_insurance_plans__contains='Out of network')
					else:
						self.queryset = self.queryset.filter(accepted_insurance_plans__contains=accepted_insurance_plans)

		cost_per_session_min = self.request.query_params.get('min', None)
		if cost_per_session_min is not None:
			cost_per_session_min = int(json.loads(cost_per_session_min))
			if cost_per_session_min > 0:
				self.queryset = self.queryset.filter(cost_per_session_min__gte=cost_per_session_min)

		cost_per_session_max = self.request.query_params.get('max', None)
		if cost_per_session_max is not None:
			cost_per_session_max = int(json.loads(cost_per_session_max))
			if cost_per_session_max > 0:
				self.queryset = self.queryset.filter(cost_per_session_max__lte=cost_per_session_max)

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

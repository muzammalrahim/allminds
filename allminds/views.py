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
from django.db import connection
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
						self.queryset = self.queryset.filter(Q(specialties__contains="Alzheimer's") | Q(specialties__contains="Asperger's Syndrome") | Q(specialties__contains='Autism') | Q(specialties__contains='Chronic Ilness') | Q(specialties__contains='Chronic Pain') | Q(specialties__contains='Infertility') | Q(specialties__contains='Obesity') | Q(specialties__contains='Traumatic Brain Injury') | Q(specialties__contains='Weight Loss') | Q(communities__contains='HIV / AIDS Allied'))
					elif specialties == 'Relationship issues':
						self.queryset = self.queryset.filter(Q(specialties__contains='Codependency') | Q(specialties__contains='Divorce') | Q(specialties__contains='Infidelity') | Q(specialties__contains='Marital and Premarital') | Q(specialties__contains='Relationship Issues'))
					elif specialties == 'Life transitions':
						self.queryset = self.queryset.filter(Q(specialties__contains='Life Transitions') | Q(specialties__contains='Pregnancy, Prenatal, Postpartum'))
					elif specialties == 'Sex and sexuality':
						self.queryset = self.queryset.filter(Q(specialties__contains='Sexual Identity') | Q(specialties__contains='Sex Therapy') | Q(communities__contains='Open Relationships Non-Monogamy') | Q(communities__contains='Sex-Positive, Kink Allied'))
					elif specialties == 'Trauma or abuse':
						self.queryset = self.queryset.filter(Q(specialties__contains='Domestic Abuse') | Q(specialties__contains='Domestic Violence') | Q(specialties__contains='Sexual Abuse') | Q(specialties__contains='Trauma and PTSD'))

		genderFocus = self.request.query_params.get('genderFocus', None)
		if genderFocus is not None:
			genderFocusArray = json.loads(genderFocus)
			if len(genderFocusArray) > 0:
				for genderFocus in genderFocusArray:
					if genderFocus == 'Female':
						print("Women\'s issues")
						self.queryset = self.queryset.filter(specialties__contains="Women's Issues")
					if genderFocus == 'Male':
						self.queryset = self.queryset.filter(specialties__contains="Men's Issues")
					if genderFocus == 'Non-binary':
						self.queryset = self.queryset.filter(communities__contains="Non-Binary Allied")

		age = self.request.query_params.get('ageGroup', None)
		if age is not None:
			ageArray = json.loads(age)
			if len(ageArray) > 0:
				for age in ageArray:
					if age == 'Teens':
						self.queryset = self.queryset.filter(Q(age__contains='Toddlers / Preschoolers') | Q(age__contains='Children') | Q(age__contains='Preteens / Tweens') | Q(age__contains='Adolescents / Teenagers') | Q(specialties__contains='Child or Adolescent'))
					if age == 'Adults':
						self.queryset = self.queryset.filter(age__contains='Adults')
					if age == 'Elders':
						self.queryset = self.queryset.filter(age__contains='Elders')

		communities = self.request.query_params.get('communities', None)
		if communities is not None:
			communitiesArray = json.loads(communities)
			if len(communitiesArray) > 0:
				for communities in communitiesArray:
					if communities == 'Ethnic minorites':
						self.queryset = self.queryset.filter(Q(ethnicity__contains='Asian') | Q(ethnicity__contains='African-American') | Q(ethnicity__contains='Hispanic, Latino') | Q(ethnicity__contains='Pacific Islander') | Q(ethnicity__contains='Other Racial or Ethnic Background') | Q(communities__contains='Racial Justice Allied') | Q(specialties__contains='Racial Identity'))
					elif communities == 'LGBTQ':
						self.queryset = self.queryset.filter(Q(specialties__contains='Transgender') | Q(specialties__contains='Gay') | Q(specialties__contains='Lesbian') | Q(specialties__contains='Bisexual') | Q(communities__contains='Bisexual Allied') | Q(communities__contains='Gay Allied') | Q(communities__contains='HIV / AIDS Allied') | Q(communities__contains='Intersex Allied') | Q(communities__contains='Lesbian Allied') | Q(communities__contains='Transgender Allied') | Q(communities__contains='Non-Binary Allied') | Q(communities__contains='Queer Allied'))
					elif communities == 'Veterans':
						self.queryset = self.queryset.filter(Q(communities__contains='Veterans'))
					elif communities == 'Cancer survivors':
						self.queryset = self.queryset.filter(Q(communities__contains='Cancer'))
					elif communities == 'Religious / Spiritual':
						self.queryset = self.queryset.filter(Q(specialties__contains='Spirituality') | Q(faith__contains='Buddhist') | Q(faith__contains='Christian') | Q(faith__contains='Hindu') | Q(faith__contains='Islam') | Q(faith__contains='Jewish') | Q(faith__contains='Mormon') | Q(faith__contains='Other Spiritual or Religious Affiliations'))

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
					elif title == 'Associate therapist':
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
						self.queryset = self.queryset.filter(years_in_practice_total__lte=years_in_practice)

					if('-' in years_in_practice):
						years_in_practiceArray = years_in_practice.split('-')
						self.queryset = self.queryset.filter(years_in_practice_total__gte=5, years_in_practice_total__lte=15).exclude(years_in_practice__contains="15+")

					if('>' in years_in_practice):
						years_in_practice = years_in_practice.replace(">","")
						self.queryset = self.queryset.filter(years_in_practice_total__gte=years_in_practice)

		i_also_speak = self.request.query_params.get('languages', None)
		if i_also_speak is not None:
			i_also_speakArray = json.loads(i_also_speak)
			if len(i_also_speakArray) > 0:
				for i_also_speak in i_also_speakArray:
					self.queryset = self.queryset.filter(i_also_speak__contains=i_also_speak)

		availability = self.request.query_params.get('availability', None)
		if availability is not None:
			availabilityArray = json.loads(availability)
			if len(availabilityArray) > 0:
				for availability in availabilityArray:
					if availability == 'Evenings':
						self.queryset = self.queryset.filter(Q(about__contains='evening') | Q(about__contains='Evening'))
					elif availability == 'Weekends':
						self.queryset = self.queryset.filter(Q(about__contains='weekend') | Q(about__contains='Weekend'))

		accepted_insurance_plans = self.request.query_params.get('insurance', None)
		if accepted_insurance_plans is not None:
			accepted_insurance_plansArray = json.loads(accepted_insurance_plans)
			if len(accepted_insurance_plansArray) > 0:
				for accepted_insurance_plans in accepted_insurance_plansArray:
					# if accepted_insurance_plans == 'Out-of-network' or accepted_insurance_plans == 'Any insurance':
					if accepted_insurance_plans == 'Out-of-network':
						self.queryset = self.queryset.filter(accepted_insurance_plans__icontains='Out of network')
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

		search = self.request.query_params.get('search', None)
		if search is not None:
			self.queryset = self.queryset.filter(Q(first_name__icontains=search) | Q(last_name__icontains=search))
		# exclude therapist without rates
		self.queryset = self.queryset.exclude(cost_per_session_max=None, cost_per_session_min=None).exclude(profile_image_url="N/A").exclude(cost_per_session="N/A")
		return self.queryset

def sendEmail(request):
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	# print(body.get('name', ''))
	name = body.get('name', '')
	email = body.get('email', '')
	phoneNumber = body.get('phoneNumber', '')
	message = body.get('message', '')
	subject = 'Contact Therapist'
	from_email = name + ' <' + email + '>'
	if subject and message and from_email:
		me = send_mail(subject, message, from_email, ['juan@allminds.io', 'gmac@allminds.io'])
		return JsonResponse(me, safe=False)
	else:
		return JsonResponse('Make sure all fields are entered and valid.', safe=False)

def feedback(request):
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	name = body.get('name', '')
	email = body.get('email', '')
	from_email = name + ' <' + email + '>'
	# from_email = body.get('email', 'mudassir.creative@gmail.com')
	message = body.get('message', '')
	subject = 'Feedback'
	if subject and message and from_email:
		me = send_mail(subject, message, from_email, ['juan@allminds.io', 'gmac@allminds.io'])
		return JsonResponse(me, safe=False)
	else:
		return JsonResponse('Make sure all fields are entered and valid.', safe=False)

def averageRate(self):
	rates = Person.objects.filter(~Q(cost_per_session_min = None) | ~Q(cost_per_session_max = None)).values_list('cost_per_session_min','cost_per_session_max')
	counter = 0
	totalRate = 0
	for rate in rates:
		counter = counter + 1
		# print(list(rate)[0], 'min',list(rate)[1], 'max', counter)
		
		if(list(rate)[0] != None and list(rate)[1] != None):
			totalRate += (list(rate)[0] + list(rate)[1]) / 2
			# print(totalRate)
		elif(list(rate)[0] == None and list(rate)[1] != None):
			totalRate += list(rate)[1]
			# print(totalRate)
		elif(list(rate)[0] != None and list(rate)[1] == None):
			totalRate += list(rate)[0]
			# print(totalRate)

	averageRate = round(totalRate/counter,0)
	# print(averageRate,'averageRate')
	return JsonResponse(averageRate, safe=False)
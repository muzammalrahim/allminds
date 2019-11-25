from django.db import models

class Person(models.Model):
	first_name = models.CharField(max_length=100, null=True)
	middle_name = models.CharField(max_length=100, null=True)
	last_name = models.CharField(max_length=100, null=True)
	phone = models.CharField(max_length=100, null=True)
	profile_image_url = models.CharField(max_length=200, null=True)
	gender = models.CharField(max_length=100, null=True)
	city = models.CharField(max_length=100, null=True)
	state = models.CharField(max_length=100, null=True)
	zip_code = models.CharField(max_length=20, null=True)
	title = models.CharField(max_length=200, null=True)
	about = models.TextField(null=True)
	school = models.CharField(max_length=200, null=True)
	years_in_practice = models.CharField(max_length=100, null=True)
	year_graduated = models.CharField(max_length=100, null=True)
	license_n_state = models.CharField(max_length=100, null=True)
	cost_per_session = models.CharField(max_length=200, null=True)
	sliding_scale = models.CharField(max_length=100, null=True)
	pay_by = models.TextField(null=True)
	accepted_insurance_plans = models.TextField(null=True)
	specialties = models.TextField(null=True)
	issues = models.TextField(null=True)
	mental_health = models.TextField(null=True)
	sexuality = models.CharField(max_length=100, null=True)
	ethnicity = models.TextField(null=True)
	faith = models.CharField(max_length=100, null=True)
	age = models.TextField(null=True)
	communities = models.TextField(null=True)
	i_also_speak = models.TextField(null=True)
	types_of_therapy = models.TextField(null=True)
	modality = models.CharField(max_length=100, null=True)
	video_skype = models.CharField(max_length=100, null=True)
	accepting_new_clients = models.IntegerField(default=0, null=True)
	url = models.CharField(max_length=200, null=True)
	cost_per_session_min = models.IntegerField(default=0, null=True)
	cost_per_session_max = models.IntegerField(default=0, null=True)
	years_in_practice_total = models.IntegerField(default=0, null=True)

	def __str__(self):
		return '{} {}'.format(self.first_name,self.last_name)

from .models import Person
from rest_framework import serializers


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'title', 'first_name', 'middle_name', 'last_name', 'phone', 'profile_image_url', 'city', 'zip_code', 'about', 'cost_per_session','about','specialties','communities', 'gender', 'years_in_practice', 'accepted_insurance_plans']
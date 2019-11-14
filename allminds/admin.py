from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Person
from .resources import PersonResource

@admin.register(Person)
class PersonAdmin(ImportExportModelAdmin):
    resource_class = PersonResource

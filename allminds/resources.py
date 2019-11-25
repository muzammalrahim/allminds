from import_export import resources
from .models import Person

class PersonResource(resources.ModelResource):
    def before_save_instance(self, instance, using_transactions, dry_run):
        instance.cost_per_session_min = None
        instance.cost_per_session_max = None
        years_in_practice_total = None
        if(instance.cost_per_session != 'N/A'):
            instance.cost_per_session_min = instance.cost_per_session.strip().replace("$","")
            instance.cost_per_session_max = instance.cost_per_session.strip().replace("$","")
            if('Up to' in instance.cost_per_session):
                #print(instance.cost_per_session)
                instance.cost_per_session_min = None
                instance.cost_per_session_max = instance.cost_per_session.replace("Up to","").strip().replace("$","")
            if('-' in instance.cost_per_session):
                #print(instance.cost_per_session.split('-'))
                costArray = instance.cost_per_session.split('-')
                instance.cost_per_session_min = costArray[0].strip().replace("$","")
                instance.cost_per_session_max = costArray[1].strip().replace("$","")
            if('+' in instance.cost_per_session):
                #print(instance.cost_per_session)
                costArray = instance.cost_per_session.split('+')
                instance.cost_per_session_min = costArray[0].strip().replace("$","")
                instance.cost_per_session_max = None


        if(instance.years_in_practice != 'N/A'):
            years_in_practice_total = instance.years_in_practice.strip()
            if('Years' in years_in_practice_total):
                years_in_practice_total = years_in_practice_total.replace("Years","").strip()
            if('Year' in years_in_practice_total):
                years_in_practice_total = years_in_practice_total.replace("Year","").strip()
            if('+' in years_in_practice_total):
                #print(instance.cost_per_session)
                years_in_practice_total = years_in_practice_total.replace("+","").strip()
            if('<' in years_in_practice_total):
                years_in_practice_total = years_in_practice_total.replace("<","").strip()
        instance.years_in_practice_total = years_in_practice_total
        pass

    class Meta:
        model = Person

from allminds import resources
from .models import Person

class PersonResource(resources.ModelResource):
    class Meta:
        model = Person


    class Resource(metaclass=DeclarativeMetaclass):
        def before_save_instance(self, instance, using_transactions, dry_run):
            self.cost_per_session
            pass

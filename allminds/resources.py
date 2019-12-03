from import_export import resources
from .models import Person
from django.db import models

class PersonResource(resources.ModelResource):
    # def before_import(self, dataset, using_transactions, dry_run, **kwargs):
    #     profileIdArray = []
    #     datasetNew = []
    #     tempDatasetList = list(dataset)
    #     print(tempDatasetList,'tempDatasetList')
        # for index, data in enumerate(tempDatasetList, start=0):
        #     url = list(data)[len(data)-2]
        #     # print('data',dataset[index])
        #     arrayIndex = index - 1
        #     if(url != ''):
        #         urlArray = url.strip().split("?")
        #         urlArray = urlArray[0].strip().split("/")
        #         i = len(urlArray) - 1
        #         profile_id = urlArray[i]
        #         # if profile_id not in profileIdArray:
        #             # profileIdArray.append(profile_id)
        #         print("datasetttttttttttttttttt")
        #         del tempDatasetList[arrayIndex]
        #             # dataset = dataset.pop(index)
        #         print(profile_id,'index', arrayIndex)
        #         # else:
        #             # datasetNew.append(dataset[index])
        #             # print(index,'no index')
        #         # row.profile_id = profile_id
        #         # print(dataset[index],'dataset[index]')
        #         # print(profile_id,'profile_id')
        #     # print(dataset,'dataset')
        # dataset = tuple(tempDatasetList)
        # # print(dataset,'dataset')
        # # print(tempDatasetList,'tempDatasetList')
        # return super(self.__class__, self).before_import(dataset, using_transactions, dry_run, **kwargs)

    # def before_import_row(self, row, **kwargs):
    #     profile_id = None
    #     # print(row['url'])
    #     if(row['url'] != ''):
    #         urlArray = row['url'].strip().split("?")
    #         urlArray = urlArray[0].strip().split("/")
    #         index = len(urlArray) - 1
    #         profile_id = urlArray[index]
    #         # row.profile_id = profile_id
    #         print(profile_id,'profile_id')
    #     pass

    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        print('after_import')
        # profiles = Person.objects.values_list('profile_id')
        for row in Person.objects.all():
            if Person.objects.filter(profile_id=row.profile_id).count() > 1:
                row.delete()

    def before_save_instance(self, instance, using_transactions, dry_run):
        instance.cost_per_session_min = None
        instance.cost_per_session_max = None
        years_in_practice_total = None 
        profile_id = None
        
        if(instance.url != ''):
            urlArray = instance.url.strip().split("?")
            urlArray = urlArray[0].strip().split("/")
            index = len(urlArray) - 1
            profile_id = urlArray[index]
            instance.url = urlArray[0]
            instance.profile_id = profile_id
            # print(profile_id,'profile_id')

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

# Generated by Django 2.2.6 on 2019-10-31 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0003_auto_20191031_1326'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='profile_image_url',
            field=models.CharField(max_length=200),
        ),
    ]

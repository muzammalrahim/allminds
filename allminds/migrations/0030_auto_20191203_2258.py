# Generated by Django 2.2.7 on 2019-12-03 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0029_auto_20191203_2254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='profile_id',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
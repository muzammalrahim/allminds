# Generated by Django 2.2.7 on 2019-11-12 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0009_auto_20191112_1234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='gender',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='last_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='middle_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='phone',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='profile_image_url',
            field=models.CharField(max_length=200, null=True),
        ),
    ]

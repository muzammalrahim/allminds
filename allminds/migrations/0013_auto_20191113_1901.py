# Generated by Django 2.2.7 on 2019-11-13 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0012_auto_20191112_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='city',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='gender',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='license_n_state',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='sexuality',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='state',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='video_skype',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='year_graduated',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='years_in_practice',
            field=models.CharField(max_length=100, null=True),
        ),
    ]

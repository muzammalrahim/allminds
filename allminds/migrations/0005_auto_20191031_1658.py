# Generated by Django 2.2.6 on 2019-10-31 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0004_auto_20191031_1652'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='accepted_insurance_plans',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='person',
            name='city',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='person',
            name='cost_per_session',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='person',
            name='first_name',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='person',
            name='gender',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='person',
            name='last_name',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='person',
            name='middle_name',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='person',
            name='phone',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='person',
            name='sliding_scale',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='person',
            name='state',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='person',
            name='year_graduated',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='person',
            name='zip_code',
            field=models.CharField(max_length=300),
        ),
    ]

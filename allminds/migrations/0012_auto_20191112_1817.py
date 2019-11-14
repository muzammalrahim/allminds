# Generated by Django 2.2.7 on 2019-11-12 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0011_auto_20191112_1804'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='about',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='accepted_insurance_plans',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='age',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='communities',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='ethnicity',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='i_also_speak',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='issues',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='mental_health',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='pay_by',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='specialties',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='types_of_therapy',
            field=models.TextField(null=True),
        ),
    ]
